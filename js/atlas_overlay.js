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
 * 铁律（AGENTS.md §3.6）：叙述必须有据。
 * 本文件的每个站都带 source 字段（上游 stop 没有这个字段，渲染器会忽略），
 * _validate_data.cjs 会对「非上游行迹」强制检查 source。
 *
 * ── 蒋捷（约1245—1314 之后）──────────────────────────────
 * 依据：
 *   杨景龙校注《蒋捷词校注》（中华书局，2010）；《竹山词》；《词林纪事》。
 *   生平要点（据新华社系媒体《新华日报》2024-07-19 报道引杨景龙说）：
 *     生于淳祐五年（1245）前后；咸淳十年（1274）进士；宋亡不仕；
 *     隐居竹山（宜兴周铁镇竺山）很长时间，又在吴越一带漂泊；
 *     晚年迁居武进，教书授徒；约 1314 年之后去世，葬于竹山福善寺。
 *   卒年有异说：旧说「约1305」（见通行百科），杨景龙主「1314 年之后」。
 *   故 span 取 [1245, 1314]，并在 courtesy 中注明异说。
 *
 *   漂泊地点的依据是他自己的词题（词题即纪行）：
 *     《贺新郎·兵后寓吴》 → 苏州（吴门）
 *     《一剪梅·舟过吴江》 → 吴江
 *     《高阳台·江阴道中有怀》 → 江阴
 *     《一剪梅·宿龙游朱氏楼》 → 衢州龙游
 *   词题只能证明「到过/寓居过」，不能定年，故这些站点的年份一律标「约」。
 */
(function () {
  'use strict';

  var D = window.ATLAS_LORE_DATA;
  if (!D) return;

  var SRC_LIFE = '杨景龙校注《蒋捷词校注》（中华书局，2010）；《词林纪事》';
  var SRC_CITY = '《竹山词》词题';

  var PERSON = {
    key: 'jiangjie',
    zh: '蒋捷',
    en: 'Jiang Jie',
    courtesyZh: '字胜欲 · 号竹山 · 生卒年无确考（约1245—1314 之后，卒年有异说）',
    courtesyEn: 'Styled Shengyu, styled Zhushan',
    dynastyKey: 'nansong',
    span: [1245, 1314],
    journeyKey: 'jiangjie',
    aliases: ['竹山', '竹山先生', '胜欲', '樱桃进士', 'Jiang Jie', 'Zhushan'],
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
    spanZh: '约1245年 — 1314年之后（生卒年无确考）',
    spanEn: 'c. 1245 – after 1314 (exact dates unknown)',
    stops: [
      {
        year: 1245,
        eraZh: '约 淳祐五年',
        coord: [119.823, 31.36],
        labelPos: 'top',
        ancientZh: '宜兴',
        modernZh: '江苏宜兴',
        ancientEn: 'Yixing',
        modernEn: 'Yixing, Jiangsu',
        titleZh: '生于阳羡',
        titleEn: 'Born at Yixing',
        descZh:
          '蒋捷字胜欲，号竹山，常州宜兴人。生年无确考，约在淳祐五年（1245）前后。宜兴蒋氏为当地大族，有《竹山词》传世。',
        descEn:
          'Jiang Jie, styled Shengyu and known as Zhushan, was a native of Yixing in Changzhou. His birth year is not recorded precisely.',
        quoteZh: '',
        quoteEn: '',
        persons: ['jiangjie'],
        source: SRC_LIFE,
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
        descZh: '咸淳十年登进士第。时襄樊已失，宋室危殆，距临安开城不过二年。',
        descEn: 'He passed the examination in 1274, when the Song state was already near collapse.',
        quoteZh: '',
        quoteEn: '',
        persons: ['jiangjie'],
        source: SRC_LIFE,
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
        descZh: '德祐二年，元军入临安，宋室南奔。蒋捷义不仕元，此后以遗民自居。',
        descEn: 'In 1276 Yuan forces entered Lin\'an. Jiang Jie refused office under the new dynasty.',
        quoteZh: '',
        quoteEn: '',
        persons: ['jiangjie'],
        source: '《宋史》卷四七《瀛国公纪》；' + SRC_LIFE,
      },
      {
        year: 1277,
        eraZh: '约 至元间',
        coord: [120.585, 31.298],
        labelPos: 'top',
        ancientZh: '苏州',
        modernZh: '江苏苏州',
        ancientEn: 'Suzhou',
        modernEn: 'Suzhou, Jiangsu',
        titleZh: '兵后寓吴',
        titleEn: 'Lodging in Wu After the War',
        descZh:
          '宋亡后漂泊吴中，寓居吴门，作《贺新郎·兵后寓吴》。「兵后」二字，是他给自己的时间标记。',
        descEn:
          'After the fall he drifted in the Wu region and lodged at Suzhou, writing "He Xin Lang: Lodging in Wu After the War".',
        quoteZh: '',
        quoteEn: '',
        persons: ['jiangjie'],
        source: SRC_CITY + '《贺新郎·兵后寓吴》',
      },
      {
        year: 1278,
        eraZh: '约 至元间',
        coord: [120.641, 31.16],
        labelPos: 'bottom',
        ancientZh: '吴江',
        modernZh: '江苏苏州吴江',
        ancientEn: 'Wujiang',
        modernEn: 'Wujiang, Suzhou',
        titleZh: '舟过吴江',
        titleEn: 'Boat Past Wujiang',
        descZh:
          '舟过吴江而作《一剪梅》。「何日归家洗客袍」是羁旅之问，「流光容易把人抛」是亡国之叹，一句里两层。',
        descEn:
          'Passing Wujiang by boat he wrote "Yi Jian Mei"; homesickness and the loss of the state run through the same lines.',
        quoteZh: '蒋捷《一剪梅·舟过吴江》：“一片春愁待酒浇。江上舟摇，楼上帘招。”',
        quoteEn:
          'Jiang Jie, Yi Jian Mei: "A spring sorrow waits to be washed down with wine; the boat rocks on the river, the tavern banner beckons."',
        persons: ['jiangjie'],
        source: SRC_CITY + '《一剪梅·舟过吴江》',
      },
      {
        year: 1280,
        eraZh: '约 至元间',
        coord: [120.286, 31.921],
        labelPos: 'top',
        ancientZh: '江阴',
        modernZh: '江苏江阴',
        ancientEn: 'Jiangyin',
        modernEn: 'Jiangyin, Jiangsu',
        titleZh: '江阴道中',
        titleEn: 'On the Road at Jiangyin',
        descZh: '行经江阴，作《高阳台·江阴道中有怀》。词题即纪行，是他漂泊路线的一处坐标。',
        descEn: 'On the road through Jiangyin he wrote "Gao Yang Tai: Thoughts on the Road at Jiangyin".',
        quoteZh: '',
        quoteEn: '',
        persons: ['jiangjie'],
        source: SRC_CITY + '《高阳台·江阴道中有怀》',
      },
      {
        year: 1285,
        eraZh: '约 至元间',
        coord: [119.172, 29.031],
        labelPos: 'bottom',
        ancientZh: '龙游',
        modernZh: '浙江衢州龙游',
        ancientEn: 'Longyou',
        modernEn: 'Longyou, Quzhou',
        titleZh: '宿龙游朱氏楼',
        titleEn: 'Lodging at Longyou',
        descZh: '南行至衢州龙游，宿于朱氏楼，作《一剪梅·宿龙游朱氏楼》。',
        descEn: 'He travelled south to Longyou in Quzhou and lodged at the Zhu family house, writing a ci on the occasion.',
        quoteZh: '',
        quoteEn: '',
        persons: ['jiangjie'],
        source: SRC_CITY + '《一剪梅·宿龙游朱氏楼》',
      },
      {
        year: 1300,
        eraZh: '约 大德间',
        coord: [119.942, 31.783],
        labelPos: 'top',
        ancientZh: '武进',
        modernZh: '江苏常州武进',
        ancientEn: 'Wujin',
        modernEn: 'Wujin, Changzhou',
        titleZh: '迁居武进',
        titleEn: 'Moving to Wujin',
        descZh: '晚年迁居武进，教书授徒度其余生。元大德间有荐其才者，不就。',
        descEn: 'In his later years he moved to Wujin and taught for a living, declining recommendations to office.',
        quoteZh: '蒋捷《虞美人·听雨》：“少年听雨歌楼上，红烛昏罗帐。”',
        quoteEn:
          'Jiang Jie, Yu Mei Ren: "As a boy I listened to rain in the singing house, red candles dimming the silken bed-curtains."',
        persons: ['jiangjie'],
        source: '《新华日报》2024-07-19（引杨景龙说）；' + SRC_CITY + '《虞美人·听雨》',
      },
      {
        year: 1314,
        eraZh: '约 延祐初',
        coord: [119.823, 31.36],
        labelPos: 'bottom',
        ancientZh: '宜兴',
        modernZh: '江苏宜兴',
        ancientEn: 'Yixing',
        modernEn: 'Yixing, Jiangsu',
        titleZh: '归葬竹山',
        titleEn: 'Buried at Zhushan',
        descZh:
          '约 1314 年之后卒，葬于宜兴竹山福善寺。今宜兴周铁镇竺山有蒋捷墓。旧说卒于约 1305 年，与此不同。',
        descEn:
          'He died sometime after 1314 and was buried at Zhushan, Yixing. Older accounts give c. 1305.',
        quoteZh: '',
        quoteEn: '',
        persons: ['jiangjie'],
        source: '《新华日报》2024-07-19（引杨景龙说）；' + SRC_LIFE,
      },
    ],
  };

  if (!D.PERSON_PROFILES) D.PERSON_PROFILES = [];
  if (!D.PERSON_PROFILES.some(function (p) { return p.key === PERSON.key; })) {
    D.PERSON_PROFILES.push(PERSON);
  }

  if (!D.HISTORICAL_JOURNEYS) D.HISTORICAL_JOURNEYS = [];
  var existing = D.HISTORICAL_JOURNEYS.findIndex(function (j) { return j.key === JOURNEY.key; });
  if (existing >= 0) D.HISTORICAL_JOURNEYS[existing] = JOURNEY;
  else D.HISTORICAL_JOURNEYS.push(JOURNEY);
})();
