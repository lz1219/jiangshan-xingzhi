#!/usr/bin/env node
/**
 * 把 atlas_works.js 的「主对象 + 三个补丁块」合并成单一数据结构。
 *
 * 做法：在 Node 里把模块跑一遍，拿到补丁应用后的最终对象，
 * 按固定字段顺序重新序列化，再用新文件重新加载、与旧快照逐字段比对。
 * 这样合并不靠手抄，不会丢内容也不会改错字。
 */
'use strict';

const fs = require('fs');
const path = require('path');

const TARGET = path.resolve(__dirname, '..', 'js', 'atlas_works.js');
// 现为生成物：结构归一必须回到唯一源头，不能重写生成器头部或产生第二份手写数据。
if (fs.readFileSync(TARGET, 'utf8').includes('本文件由 poem-data/scripts/emit-atlas.mjs 生成')) {
  const generator = path.resolve(__dirname, '../../poem-data/scripts/emit-atlas.mjs');
  if (!fs.existsSync(generator)) throw new Error('请在兄弟 poem-data 仓库运行 emit-atlas；禁止手改生成物');
  const result = require('child_process').spawnSync(process.execPath, [generator, '--target', path.resolve(__dirname, '..')], { stdio: 'inherit' });
  process.exit(result.status == null ? 1 : result.status);
}

const FIELD_ORDER = [
  'alias',
  'titleZh',
  'titleEn',
  'authorZh',
  'authorEn',
  'year',
  'placeZh',
  'placeEn',
  'genre',
  'certainty',
  'text',
  'meaning',
  'notes',
  'background',
  'appreciation',
  'source',
];
const APPRECIATION_ORDER = ['text', 'inference', 'by', 'license'];
const INFERENCE_ORDER = ['text', 'basis'];

function loadPoems(file) {
  delete require.cache[require.resolve(file)];
  global.window = {};
  require(file);
  return global.window.ATLAS_WORKS;
}

function reorder(source, order) {
  const out = {};
  order.forEach((key) => {
    if (source && Object.prototype.hasOwnProperty.call(source, key)) out[key] = source[key];
  });
  // 兜底：schema 之外的字段不能被静默丢掉
  Object.keys(source || {}).forEach((key) => {
    if (!(key in out)) {
      console.warn(`! 字段不在约定顺序内，已追加：${key}`);
      out[key] = source[key];
    }
  });
  return out;
}

function normalize(poems) {
  const out = {};
  Object.keys(poems).forEach((key) => {
    const entry = reorder(poems[key], FIELD_ORDER);
    if (entry.appreciation) entry.appreciation = reorder(entry.appreciation, APPRECIATION_ORDER);
    if (entry.appreciation && entry.appreciation.inference) {
      entry.appreciation.inference = reorder(entry.appreciation.inference, INFERENCE_ORDER);
    }
    out[key] = entry;
  });
  return out;
}

function serialize(poems) {
  const body = JSON.stringify(poems, null, 2);
  return `/**
 * 诗歌数据层 · 江山行止（江山时序改造层）
 *
 * 一个对象，一种结构。字段顺序固定：
 *   alias → 标题三件套 → 作者 → 年份地点 → 文体与系年 → 正文
 *   → 大意 → 注释 → 写作背景 → 赏析（含推测） → 出处
 *
 * 收录边界：诗词赋史全覆盖。
 *   genre: shi 诗 / ci 词 / fu 赋 / wen 文 / history 史传
 *   文与史传在界面标「摘录」——我们给的是被引用的段落，不是全本。
 *
 * 内容规则（详见 docs/specs/0001-jiangshan-poetry-layer）：
 *   1. 大意写「说什么、怎么转、落在哪」，不做逐句对译。
 *   2. 注释解释用法、语境与典故出处，不给同义词了事。
 *   3. 赏析正文只做文本内能支撑的判断；结合史事的推演一律进 inference，
 *      界面以「推测」标出，basis 必须能落在本条 background / source 里。
 *   4. 赏析全部自撰（by: 本站自撰），不引用任何点校本。
 */
window.ATLAS_WORKS = ${body};
`;
}

// ---------- 1. 读旧文件（补丁已应用） ----------
const before = normalize(loadPoems(TARGET));

// ---------- 2. 备份并写新文件 ----------
const backup = TARGET.replace(/\.js$/, '.merge-backup.js');
fs.writeFileSync(backup, fs.readFileSync(TARGET));
fs.writeFileSync(TARGET, serialize(before));

// ---------- 3. 重新加载，逐字段比对 ----------
const after = loadPoems(TARGET);
const same = JSON.stringify(before) === JSON.stringify(after);

const stats = {
  条目: Object.keys(after).length,
  有正文: Object.values(after).filter((p) => (p.text || []).length).length,
  有大意: Object.values(after).filter((p) => p.meaning).length,
  注释总条数: Object.values(after).reduce((sum, p) => sum + (p.notes || []).length, 0),
  有赏析: Object.values(after).filter((p) => p.appreciation).length,
  含推测: Object.values(after).filter((p) => p.appreciation && p.appreciation.inference).length,
  内容一致: same,
};
console.log(JSON.stringify(stats, null, 2));

if (!same) {
  console.error('合并前后内容不一致，已回滚');
  fs.writeFileSync(TARGET, fs.readFileSync(backup));
  process.exit(1);
}
console.log(`合并完成：${path.basename(TARGET)}（备份 ${path.basename(backup)}）`);
