#!/usr/bin/env node
/**
 * 数据校验 · 江山行止
 *
 * 校验对象：
 *   js/atlas_works.js     作品（50 条）
 *   js/atlas_journeys.js  行迹读本（导语与站间承接语）
 *
 * 核心规则（对应 AGENTS.md §3.2 / §3.3 / §3.6）：
 *   1. 作品必须有 source；赏析必须带 by 与 license
 *   2. 行迹读本的每条叙述必须有 source（史料或原文），否则不算可复核
 *   3. 枚举合法：genre / certainty
 *   4. 站间承接语的站序号必须在范围内
 *
 * 用法：node scripts/_validate_data.cjs
 */
'use strict';

const path = require('path');

const ROOT = path.resolve(__dirname, '..');
global.window = {};
require(path.join(ROOT, 'js', 'atlas_works.js'));
require(path.join(ROOT, 'js', 'atlas_journeys.js'));
require(path.join(ROOT, 'js', 'lore_data.js'));
// 行迹补录（我们把上游没有的人物推入 HISTORICAL_JOURNEYS / PERSON_PROFILES）
require(path.join(ROOT, 'js', 'atlas_overlay.js'));

const WORKS = window.ATLAS_WORKS || {};
const JOURNEYS = window.ATLAS_JOURNEYS || {};
const UPSTREAM = window.ATLAS_LORE_DATA.HISTORICAL_JOURNEYS || [];

const errors = [];
const warns = [];
const err = (m) => errors.push(m);
const warn = (m) => warns.push(m);

const GENRES = new Set(['shi', 'ci', 'fu', 'wen', 'history']);
const CERTAINTY = new Set(['confirmed', 'probable', 'disputed', 'unknown']);

// ---------- 作品 ----------
const workKeys = Object.keys(WORKS);
workKeys.forEach((key) => {
  const w = WORKS[key];
  const at = `work "${key}"`;
  if (!w.titleZh) err(`${at}: 缺 titleZh`);
  if (!GENRES.has(w.genre)) err(`${at}: genre 非法 → ${w.genre}`);
  if (!CERTAINTY.has(w.certainty)) err(`${at}: certainty 非法 → ${w.certainty}`);
  if (!Array.isArray(w.text) || !w.text.length) err(`${at}: text 为空`);
  if (!w.source) err(`${at}: 缺 source（必须有出处）`);
  if (w.appreciation) {
    if (!w.appreciation.text) err(`${at}: appreciation 缺 text`);
    if (!w.appreciation.by) err(`${at}: appreciation 缺 by（须为「本站自撰」）`);
    if (!w.appreciation.license) err(`${at}: appreciation 缺 license`);
    if (w.appreciation.inference && !w.appreciation.inference.basis)
      err(`${at}: 推测缺 basis（依据）`);
  }
  if (!w.meaning) warn(`${at}: 缺 meaning（大意）`);
  if (!w.appreciation) warn(`${at}: 缺 appreciation（赏析）`);
});

// ---------- 行迹读本 ----------
const upstreamByKey = new Map(UPSTREAM.map((j) => [j.key, j]));
Object.keys(JOURNEYS).forEach((key) => {
  const src = JOURNEYS[key];
  const at = `journey "${key}"`;
  const upstream = upstreamByKey.get(key);
  if (!upstream) err(`${at}: 上游没有这条行迹（键名拼错？）`);
  const stopCount = upstream ? (upstream.stops || []).length : 0;

  if (src.intro) {
    if (!src.intro.text) err(`${at}: intro 缺 text`);
    if (!src.intro.source) err(`${at}: intro 缺 source（叙述必须有据）`);
  } else {
    warn(`${at}: 没有导语`);
  }

  Object.keys(src.links || {}).forEach((n) => {
    const item = src.links[n];
    const at2 = `${at} links[${n}]`;
    if (!/^\d+$/.test(n)) err(`${at2}: 键必须是站序号（1 起）`);
    if (stopCount && Number(n) > stopCount) err(`${at2}: 站序号越界（该行迹仅 ${stopCount} 站）`);
    if (!item || !item.text) err(`${at2}: 缺 text`);
    if (!item || !item.source) err(`${at2}: 缺 source（叙述必须有据）`);
  });
});

// ---------- 汇总 ----------
const report = {
  作品: workKeys.length,
  行迹读本: Object.keys(JOURNEYS).length,
  导语: Object.values(JOURNEYS).filter((j) => j.intro).length,
  承接语: Object.values(JOURNEYS).reduce((s, j) => s + Object.keys(j.links || {}).length, 0),
};
console.log('\n《江山行止》数据校验');
console.table(report);

if (warns.length) {
  console.log('\n提示（不影响构建）：');
  warns.slice(0, 10).forEach((w) => console.log('  · ' + w));
  if (warns.length > 10) console.log(`  … 其余 ${warns.length - 10} 条省略`);
}
if (errors.length) {
  console.error('\n错误：');
  errors.forEach((e) => console.error('  ✕ ' + e));
  process.exit(1);
}
console.log('\n✓ 数据校验通过\n');
