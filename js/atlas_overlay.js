/**
 * 行迹补录 · 江山行止
 *
 * 上游的 HISTORICAL_JOURNEYS 只有 7 条行迹；本文件把**上游没有的人物**以
 * overlay 的方式追加进去（不改上游数据文件，只在运行时推入数组）。
 *
 * 载入顺序：必须在 js/lore_data.js 之后、js/app.js 之前——
 * 因为 app.js 初始化时会读 ATLAS_LORE_DATA.HISTORICAL_JOURNEYS / PERSON_PROFILES
 * 建立人物切换器与搜索索引。
 *
 * 铁律（AGENTS.md §3.6）：叙述必须有据；生卒与年份无确考者标「约」并写明。
 *
 * ── 蒋捷（约1245—约1305）───────────────────────────────
 * 依据：
 *   《宋史》无传；生平见《词林纪事》《宋诗纪事》及《竹山词》诸本。
 *   咸淳十年（1274）登进士第；宋亡不仕，隐居竹山，人称竹山先生；
 *   元大德间有荐其才者，不就。字号、籍贯、进士年份为通行说法；
 *   生卒年月无确考，故行迹中年份除 1274、1276 外均标「约」。
 */
(function () {
  'use strict';

  var D = window.ATLAS_LORE_DATA;
  if (!D) return;

  var PERSON = {
    key: 'jiangjie',
    zh: '蒋捷',
    en: 'Jiang Jie',
    courtesyZh: '字胜欲 · 号竹山 · 生卒年无确考（约1245—约1305）',
    courtesyEn: 'Styled Shengyu, styled Zhushan',
    dynastyKey: 'nansong',
    span: [1245, 1305],
    journeyKey: 'jiangjie',
    aliases: ['竹山', '竹山先生', '胜欲', 'Jiang Jie', 'Zhushan'],
    tokens: ['蒋捷', '竹山先生'],
  };

  var JOURNEY = {
    key: 'jiangjie',
    dynastyKey: 'nansong',
    color: '#8a5a44',
    shortZh: '蒋捷竹山遗民',
    shortEn: 'Jiang Jie',
    titleZh: '蒋捷：宋亡之后的竹山',
    titleEn: 'Jiang Jie: A Song Loyalist at Zhushan',
    spanZh: '约1245年 — 约1305年（生卒年无确考）',
    spanEn: 'c. 1245 – c. 1305 (exact dates unknown)',
    stops: [
      {
        year: 1245,
        eraZh: '约 淳祐间',
        coord: [119.823, 31.36],
        labelPos: 'top',
        ancientZh: '宜兴',
        modernZh: '江苏宜兴',
        ancientEn: 'Yixing',
        modernEn: 'Yixing, Jiangsu',
        titleZh: '生于阳羡',
        titleEn: 'Born at Yixing',
        descZh:
          '蒋捷字胜欲，号竹山，常州宜兴人。生年无确考，约在宋理宗淳祐间。有《竹山词》传世。',
        descEn:
          'Jiang Jie, styled Shengyu and known as Zhushan, was a native of Yixing in Changzhou. His birth year is not precisely recorded.',
        quoteZh: '',
        quoteEn: '',
        persons: ['jiangjie'],
      },
      {
        year: 1274,
        eraZh: '咸淳十年',
        coord: [120.155, 30.274],
        labelPos: 'top',
        ancientZh: '临安',
        modernZh: '浙江杭州',
        ancientEn: "Lin'an",
        modernEn: 'Hangzhou, Zhejiang',
        titleZh: '咸淳十年进士',
        titleEn: 'Jinshi in 1274',
        descZh: '咸淳十年登进士第。其时襄樊已失，宋室危殆，距临安开城不过二年。',
        descEn:
          'He passed the metropolitan examination in 1274, when the Song court was already near collapse.',
        quoteZh: '',
        quoteEn: '',
        persons: ['jiangjie'],
      },
      {
        year: 1276,
        eraZh: '德祐二年',
        coord: [120.155, 30.274],
        labelPos: 'bottom',
        ancientZh: '临安',
        modernZh: '浙江杭州',
        ancientEn: "Lin'an",
        modernEn: 'Hangzhou, Zhejiang',
        titleZh: '宋亡不仕',
        titleEn: 'The Song Falls',
        descZh: '德祐二年，元军入临安，宋室南奔。蒋捷此后不仕，隐居乡里，人称竹山先生。',
        descEn:
          "In 1276 Yuan forces entered Lin'an. Jiang Jie never took office under the new dynasty and withdrew to his native place.",
        quoteZh: '',
        quoteEn: '',
        persons: ['jiangjie'],
      },
      {
        year: 1277,
        eraZh: '约 景炎间',
        coord: [120.641, 31.16],
        labelPos: 'top',
        ancientZh: '吴江',
        modernZh: '江苏苏州吴江',
        ancientEn: 'Wujiang',
        modernEn: 'Wujiang, Suzhou',
        titleZh: '舟过吴江',
        titleEn: 'Boat Past Wujiang',
        descZh: '宋亡后漂泊吴中，舟过吴江而作《一剪梅》。「流光容易把人抛」一句，写的是羁旅，也是亡国。',
        descEn:
          'Wandering the Wu region after the fall of the Song, he wrote "Yi Jian Mei" while passing Wujiang by boat.',
        quoteZh: '蒋捷《一剪梅·舟过吴江》：“一片春愁待酒浇。江上舟摇，楼上帘招。”',
        quoteEn:
          'Jiang Jie, Yi Jian Mei: "A spring sorrow waits to be washed down with wine; the boat rocks on the river, the tavern banner beckons."',
        persons: ['jiangjie'],
      },
      {
        year: 1305,
        eraZh: '约 大德间',
        coord: [119.823, 31.36],
        labelPos: 'bottom',
        ancientZh: '宜兴',
        modernZh: '江苏宜兴',
        ancientEn: 'Yixing',
        modernEn: 'Yixing, Jiangsu',
        titleZh: '竹山终老',
        titleEn: 'Old Age at Zhushan',
        descZh:
          '隐居竹山，元大德间有荐其才者，不就。晚年作《虞美人·听雨》，以三场雨写尽一生。卒年无确考。',
        descEn:
          'He lived out his years in retirement at Zhushan, declining recommendations to office. His late ci "Yu Mei Ren: Listening to Rain" tells a life in three rains.',
        quoteZh: '蒋捷《虞美人·听雨》：“少年听雨歌楼上，红烛昏罗帐。”',
        quoteEn:
          'Jiang Jie, Yu Mei Ren: "As a boy I listened to rain in the singing house, red candles dimming the silken bed-curtains."',
        persons: ['jiangjie'],
      },
    ],
  };

  if (!D.PERSON_PROFILES) D.PERSON_PROFILES = [];
  if (!D.PERSON_PROFILES.some(function (p) { return p.key === PERSON.key; })) {
    D.PERSON_PROFILES.push(PERSON);
  }

  if (!D.HISTORICAL_JOURNEYS) D.HISTORICAL_JOURNEYS = [];
  if (!D.HISTORICAL_JOURNEYS.some(function (j) { return j.key === JOURNEY.key; })) {
    D.HISTORICAL_JOURNEYS.push(JOURNEY);
  }
})();
