#!/usr/bin/env node
/** 导出缺失作品的原文引句，供人工撰写 background / notes 时逐字核对 */
'use strict';
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

global.window = {};
require(path.join(ROOT, 'js', 'lore_data.js'));
require(path.join(ROOT, 'js', 'atlas_poems.js'));

const J = window.ATLAS_LORE_DATA.HISTORICAL_JOURNEYS || [];
const POEMS = window.ATLAS_POEMS || {};

const covered = (title) => {
  if (POEMS[title]) return true;
  return Object.values(POEMS).some((p) => (p.alias || []).includes(title));
};

const works = new Map();
for (const j of J) {
  (j.stops || []).forEach((st, idx) => {
    const q = st.quoteZh || '';
    const m = /《([^》]+)》/.exec(q);
    if (!m) return;
    const title = m[1];
    if (covered(title)) return;
    if (!works.has(title)) works.set(title, []);
    // 取「」或 “” 内的引文；没有则整句
    const inner = /[「“]([^」”]+)[」”]/.exec(q);
    works.get(title).push({
      journey: j.key,
      seg: j.shortZh,
      stop: idx + 1,
      year: st.year,
      place: st.ancientZh,
      passage: (inner ? inner[1] : q).trim(),
    });
  });
}

const out = {};
for (const [title, list] of [...works.entries()].sort((a, b) => b[1].length - a[1].length)) {
  out[title] = list;
}
console.log(JSON.stringify(out, null, 2));
