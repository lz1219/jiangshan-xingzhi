#!/usr/bin/env node
/** 补录蒋捷两首词到 ATLAS_WORKS */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const TARGET = path.join(ROOT, 'js', 'atlas_works.js');
global.window = {};
require(TARGET);
const W = window.ATLAS_WORKS;

const BY = '本站自撰';
const LIC = 'CC BY-SA 4.0';

const ADD = {
  '一剪梅·舟过吴江': {
    alias: ['一剪梅·舟过吴江', '一剪梅'],
    titleZh: '一剪梅 · 舟过吴江',
    titleEn: 'Yi Jian Mei: Boat Past Wujiang',
    authorZh: '蒋捷',
    authorEn: 'Jiang Jie',
    year: 1277,
    placeZh: '吴江',
    placeEn: 'Wujiang',
    genre: 'ci',
    certainty: 'probable',
    text: [
      '一片春愁待酒浇。江上舟摇，楼上帘招。秋娘渡与泰娘桥，风又飘飘，雨又萧萧。',
      '何日归家洗客袍？银字笙调，心字香烧。流光容易把人抛，红了樱桃，绿了芭蕉。',
    ],
    meaning:
      '上阕写舟行所见：春愁待酒，舟摇帘招，过了秋娘渡与泰娘桥，一路风飘雨萧。下阕转到归家之愿——何日才能洗净客袍？末以「红了樱桃，绿了芭蕉」收束，用植物的颜色写时间流逝。',
    notes: [
      { term: '秋娘渡、泰娘桥', explain: '吴江一带地名，以唐代歌妓秋娘、泰娘命名。' },
      { term: '银字笙', explain: '管上以银字标识音高的笙。' },
      { term: '心字香', explain: '制成心字形的香。' },
    ],
    background:
      '宋亡后蒋捷漂泊吴中，舟过吴江作此词。「何日归家洗客袍」是羁旅之问，也是遗民之问。',
    appreciation: {
      text: '上阕四个短句连下：舟、帘、渡、桥一闪而过，写的是「行」；下阕忽然转「归家」，末句以樱桃芭蕉收束——用植物的颜色写时间，比任何感叹都狠。',
      by: BY,
      license: LIC,
    },
    source: '《竹山词》',
  },
  '虞美人·听雨': {
    alias: ['虞美人·听雨', '虞美人'],
    titleZh: '虞美人 · 听雨',
    titleEn: 'Yu Mei Ren: Listening to Rain',
    authorZh: '蒋捷',
    authorEn: 'Jiang Jie',
    year: 1305,
    placeZh: '宜兴',
    placeEn: 'Yixing',
    genre: 'ci',
    certainty: 'probable',
    text: [
      '少年听雨歌楼上，红烛昏罗帐。',
      '壮年听雨客舟中，江阔云低、断雁叫西风。',
      '而今听雨僧庐下，鬓已星星也。',
      '悲欢离合总无情，一任阶前、点滴到天明。',
    ],
    meaning:
      '以三场雨写一生：少年在歌楼，红烛罗帐；壮年在客舟，江阔云低、断雁西风；如今在僧庐，鬓已斑白。悲欢离合总归无情，任凭阶前雨点滴到天明。',
    notes: [
      { term: '僧庐', explain: '僧舍。' },
      { term: '星星', explain: '形容鬓发花白。' },
      { term: '断雁', explain: '失群的雁。' },
    ],
    background: '蒋捷晚年隐居竹山时作。三场雨分写少年、壮年、晚年，地点一次比一次空。',
    appreciation: {
      text: '三场雨，三个年龄，三个地点：歌楼、客舟、僧庐。地点一次比一次空，声音一次比一次少，最后只剩「点滴到天明」。全词不着一句国破，而国破在其中。',
      inference: {
        text: '「僧庐」「鬓已星星」与宋亡后不仕的处境相合，此词当作于入元之后。',
        basis:
          '蒋捷宋亡不仕、隐居竹山（见 js/atlas_overlay.js 的行迹叙述）；词中「而今」而僧庐听雨，非仕宋时境。',
      },
      by: BY,
      license: LIC,
    },
    source: '《竹山词》',
  },
};

const FIELD_ORDER = [
  'alias', 'titleZh', 'titleEn', 'authorZh', 'authorEn', 'year', 'placeZh', 'placeEn',
  'genre', 'certainty', 'text', 'meaning', 'notes', 'background', 'appreciation', 'source',
];

let added = 0;
for (const [key, entry] of Object.entries(ADD)) {
  if (W[key]) continue;
  const ordered = {};
  FIELD_ORDER.forEach((f) => {
    if (f in entry) ordered[f] = entry[f];
  });
  W[key] = ordered;
  added++;
}

const header = fs.readFileSync(TARGET, 'utf8').split('window.ATLAS_WORKS =')[0];
fs.writeFileSync(TARGET, header + 'window.ATLAS_WORKS = ' + JSON.stringify(W, null, 2) + ';\n');
console.log(JSON.stringify({ 新增: added, 条目: Object.keys(W).length }, null, 2));
