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
  // 上游可能已有同名人物条目（白居易、杜甫等），此时必须合并而非跳过：
  // 关键是补上 journeyKey，否则 app 找不到我们建的行迹
  (function () {
    var idx = D.PERSON_PROFILES.findIndex(function (p) { return p.key === PERSON.key; });
    if (idx >= 0) {
      var cur = D.PERSON_PROFILES[idx];
      for (var k in PERSON) { if (PERSON[k] !== undefined) cur[k] = PERSON[k]; }
    } else {
      D.PERSON_PROFILES.push(PERSON);
    }
  })();

  if (!D.HISTORICAL_JOURNEYS) D.HISTORICAL_JOURNEYS = [];
  var existing = D.HISTORICAL_JOURNEYS.findIndex(function (j) { return j.key === JOURNEY.key; });
  if (existing >= 0) D.HISTORICAL_JOURNEYS[existing] = JOURNEY;
  else D.HISTORICAL_JOURNEYS.push(JOURNEY);
})();

/**
 * ── 白居易（772—846）────────────────────────────────
 * 依据：
 *   行迹骨架取 CBDB 仕宦（CBDB 32227），27 条记录中 11 处任所；
 *   生卒与进士年见《旧唐书》卷一六六《白居易传》。
 *   站点年份均取自 CBDB c_firstyear；有争议者标「约」。
 */
(function () {
  'use strict';
  var D = window.ATLAS_LORE_DATA;
  if (!D) return;

  var SRC_LIFE = '《旧唐书》卷一六六《白居易传》；CBDB 32227';
  var SRC_OFF = 'CBDB POSTED_TO_OFFICE_DATA（32227）';

  var PERSON = {
    key: 'baijuyi',
    zh: '白居易',
    en: 'Bai Juyi',
    courtesyZh: '字乐天 · 号香山居士 · 醉吟先生',
    courtesyEn: 'Styled Letian',
    dynastyKey: 'tang',
    span: [772, 846],
    journeyKey: 'baijuyi',
    aliases: ['乐天', '香山居士', '醉吟先生', '白乐天', 'Bai Juyi'],
    tokens: ['白居易', '白乐天'],
  };

  var JOURNEY = {
    key: 'baijuyi',
    dynastyKey: 'tang',
    color: '#6f7f4a',
    shortZh: '白居易诗宦一生',
    shortEn: 'Bai Juyi',
    titleZh: '白居易：从拾遗到香山',
    titleEn: 'Bai Juyi: From Remonstrance to Fragrant Hills',
    spanZh: '772年 — 846年',
    spanEn: '772 – 846',
    stops: [
      {
        year: 772, eraZh: '大历七年', coord: [113.74, 34.39], labelPos: 'top',
        ancientZh: '新郑', modernZh: '河南新郑', ancientEn: 'Xinzheng', modernEn: 'Xinzheng, Henan',
        titleZh: '生于新郑', titleEn: 'Born at Xinzheng',
        descZh: '白居易生于郑州新郑县。祖籍太原，曾祖时迁居下邽。',
        descEn: 'Bai Juyi was born at Xinzheng in Zhengzhou.',
        quoteZh: '', quoteEn: '', persons: ['baijuyi'],
        source: SRC_LIFE,
      },
      {
        year: 787, eraZh: '贞元三年', coord: [108.94, 34.34], labelPos: 'top',
        ancientZh: '长安', modernZh: '陕西西安', ancientEn: "Chang'an", modernEn: "Xi'an, Shaanxi",
        titleZh: '少年入长安', titleEn: 'To the Capital as a Boy',
        descZh: '少年白居易携诗文谒顾况，顾况见「野火烧不尽」句而改容。此为传世轶闻，见唐人记载。',
        descEn: 'As a youth he brought his poems to Gu Kuang in the capital.',
        quoteZh: '白居易《赋得古原草送别》：“野火烧不尽，春风吹又生。”',
        quoteEn: 'Bai Juyi: "Wild fire cannot burn it out; spring wind blows it back to life."',
        persons: ['baijuyi'],
        source: '唐·张固《幽闲鼓吹》；《赋得古原草送别》',
      },
      {
        year: 800, eraZh: '贞元十六年', coord: [108.94, 34.34], labelPos: 'bottom',
        ancientZh: '长安', modernZh: '陕西西安', ancientEn: "Chang'an", modernEn: "Xi'an, Shaanxi",
        titleZh: '进士及第', titleEn: 'Jinshi Degree',
        descZh: '贞元十六年登进士第，年二十九。',
        descEn: 'He passed the jinshi examination in 800.',
        quoteZh: '', quoteEn: '', persons: ['baijuyi'],
        source: SRC_LIFE,
      },
      {
        year: 806, eraZh: '元和元年', coord: [108.22, 34.16], labelPos: 'top',
        ancientZh: '盩厔', modernZh: '陕西周至', ancientEn: 'Zhouzhi', modernEn: 'Zhouzhi, Shaanxi',
        titleZh: '盩厔县尉', titleEn: 'County Defender at Zhouzhi',
        descZh: '任盩厔县尉，亲见麦收之苦，作《观刈麦》。同年作《长恨歌》。',
        descEn: 'As county defender at Zhouzhi he wrote "Watching the Wheat Harvest".',
        quoteZh: '白居易《观刈麦》：“足蒸暑土气，背灼炎天光。”',
        quoteEn: 'Bai Juyi: "Feet steamed by the summer soil, backs scorched by the blazing sun."',
        persons: ['baijuyi'],
        source: SRC_OFF + '；《观刈麦》',
      },
      {
        year: 808, eraZh: '元和三年', coord: [108.94, 34.34], labelPos: 'top',
        ancientZh: '长安', modernZh: '陕西西安', ancientEn: "Chang'an", modernEn: "Xi'an, Shaanxi",
        titleZh: '左拾遗', titleEn: 'Remonstrance Official',
        descZh: '拜左拾遗，屡上疏言事。这一时期所作讽谕诗最多。',
        descEn: 'Appointed to the remonstrance office; most of his satirical poems date from these years.',
        quoteZh: '', quoteEn: '', persons: ['baijuyi'],
        source: SRC_OFF,
      },
      {
        year: 815, eraZh: '元和十年', coord: [115.99, 29.71], labelPos: 'top',
        ancientZh: '江州', modernZh: '江西九江', ancientEn: 'Jiangzhou', modernEn: 'Jiujiang, Jiangxi',
        titleZh: '贬江州司马', titleEn: 'Exiled to Jiangzhou',
        descZh: '因上疏请捕刺宰相之贼，贬江州司马。次年秋作《琵琶行》。',
        descEn: 'Demoted to Jiangzhou; the next autumn he wrote "Song of the Pipa".',
        quoteZh: '白居易《琵琶行》：“同是天涯沦落人，相逢何必曾相识。”',
        quoteEn: 'Bai Juyi: "We are both wanderers at the world\'s end; meeting, why need we have known each other?"',
        persons: ['baijuyi'],
        source: SRC_LIFE + '；《琵琶行》',
      },
      {
        year: 818, eraZh: '元和十三年', coord: [108.04, 30.30], labelPos: 'bottom',
        ancientZh: '忠州', modernZh: '重庆忠县', ancientEn: 'Zhongzhou', modernEn: 'Zhongxian, Chongqing',
        titleZh: '忠州刺史', titleEn: 'Prefect of Zhongzhou',
        descZh: '量移忠州刺史，自江州溯江西上。',
        descEn: 'Transferred as prefect of Zhongzhou, upstream on the Yangtze.',
        quoteZh: '', quoteEn: '', persons: ['baijuyi'],
        source: SRC_OFF,
      },
      {
        year: 822, eraZh: '长庆二年', coord: [120.15, 30.27], labelPos: 'top',
        ancientZh: '杭州', modernZh: '浙江杭州', ancientEn: 'Hangzhou', modernEn: 'Hangzhou, Zhejiang',
        titleZh: '杭州刺史', titleEn: 'Prefect of Hangzhou',
        descZh: '任杭州刺史，筑堤蓄水灌田，西湖至今有白堤。任上作《钱塘湖春行》。',
        descEn: 'As prefect of Hangzhou he built embankments and wrote "Spring Walk by West Lake".',
        quoteZh: '白居易《钱塘湖春行》：“乱花渐欲迷人眼，浅草才能没马蹄。”',
        quoteEn: 'Bai Juyi: "Wild flowers gradually confuse the eye; young grass just hides the hooves."',
        persons: ['baijuyi'],
        source: SRC_OFF + '；《钱塘湖春行》',
      },
      {
        year: 825, eraZh: '宝历元年', coord: [120.59, 31.30], labelPos: 'bottom',
        ancientZh: '苏州', modernZh: '江苏苏州', ancientEn: 'Suzhou', modernEn: 'Suzhou, Jiangsu',
        titleZh: '苏州刺史', titleEn: 'Prefect of Suzhou',
        descZh: '转苏州刺史，次年因病去职。晚年所忆「江南」，一半是杭州，一半是苏州。',
        descEn: 'Prefect of Suzhou; he resigned the next year on grounds of illness.',
        quoteZh: '白居易《忆江南》：“江南忆，其次忆吴宫。”',
        quoteEn: 'Bai Juyi: "Recalling Jiangnan, next I recall the Wu palace."',
        persons: ['baijuyi'],
        source: SRC_OFF + '；《忆江南》',
      },
      {
        year: 829, eraZh: '大和三年', coord: [112.45, 34.62], labelPos: 'top',
        ancientZh: '洛阳', modernZh: '河南洛阳', ancientEn: 'Luoyang', modernEn: 'Luoyang, Henan',
        titleZh: '分司东都', titleEn: 'Retired to the Eastern Capital',
        descZh: '以太子宾客分司东都，居洛阳履道里，自此不复出。',
        descEn: 'He settled at Luoyang as a nominal eastern-capital official and never returned to power.',
        quoteZh: '', quoteEn: '', persons: ['baijuyi'],
        source: SRC_OFF,
      },
      {
        year: 846, eraZh: '会昌六年', coord: [112.45, 34.62], labelPos: 'bottom',
        ancientZh: '洛阳', modernZh: '河南洛阳', ancientEn: 'Luoyang', modernEn: 'Luoyang, Henan',
        titleZh: '卒于洛阳', titleEn: 'Death at Luoyang',
        descZh: '会昌六年卒于洛阳，年七十五，葬龙门香山。',
        descEn: 'He died at Luoyang in 846, aged seventy-five.',
        quoteZh: '', quoteEn: '', persons: ['baijuyi'],
        source: SRC_LIFE,
      },
    ],
  };

  if (!D.PERSON_PROFILES) D.PERSON_PROFILES = [];
  // 上游可能已有同名人物条目（白居易、杜甫等），此时必须合并而非跳过：
  // 关键是补上 journeyKey，否则 app 找不到我们建的行迹
  (function () {
    var idx = D.PERSON_PROFILES.findIndex(function (p) { return p.key === PERSON.key; });
    if (idx >= 0) {
      var cur = D.PERSON_PROFILES[idx];
      for (var k in PERSON) { if (PERSON[k] !== undefined) cur[k] = PERSON[k]; }
    } else {
      D.PERSON_PROFILES.push(PERSON);
    }
  })();
  if (!D.HISTORICAL_JOURNEYS) D.HISTORICAL_JOURNEYS = [];
  var ex = D.HISTORICAL_JOURNEYS.findIndex(function (j) { return j.key === JOURNEY.key; });
  if (ex >= 0) D.HISTORICAL_JOURNEYS[ex] = JOURNEY; else D.HISTORICAL_JOURNEYS.push(JOURNEY);
})();

/**
 * ── 杜甫（712—770）──────────────────────────────────
 * 与白居易不同：杜甫 CBDB 仕宦仅 6 条、3 处任所，撑不起行迹。
 * 故本行迹走「年谱定年 + 诗题定地」：
 *   年谱据《旧唐书》卷一九〇《杜甫传》及通行杜甫年谱；
 *   每个站点的位置由其本人诗题与诗中地名确定，年份标「约」者存疑。
 */
(function () {
  'use strict';
  var D = window.ATLAS_LORE_DATA;
  if (!D) return;

  var SRC_LIFE = '《旧唐书》卷一九〇《杜甫传》；杜甫年谱';
  var SRC_POEM = '杜甫诗题与诗中地名';

  var PERSON = {
    key: 'dufu',
    zh: '杜甫',
    en: 'Du Fu',
    courtesyZh: '字子美 · 自号少陵野老 · 世称杜工部',
    courtesyEn: 'Styled Zimei',
    dynastyKey: 'tang',
    span: [712, 770],
    journeyKey: 'dufu',
    aliases: ['子美', '少陵野老', '杜工部', '杜少陵', '诗圣', 'Du Fu'],
    tokens: ['杜甫', '杜工部'],
  };

  var JOURNEY = {
    key: 'dufu',
    dynastyKey: 'tang',
    color: '#7a5c3e',
    shortZh: '杜甫漂泊西南',
    shortEn: 'Du Fu',
    titleZh: '杜甫：从长安到湘江',
    titleEn: 'Du Fu: From Chang\'an to the Xiang',
    spanZh: '712年 — 770年',
    spanEn: '712 – 770',
    stops: [
      {
        year: 712, eraZh: '先天元年', coord: [113.02, 34.75], labelPos: 'top',
        ancientZh: '巩县', modernZh: '河南巩义', ancientEn: 'Gongxian', modernEn: 'Gongyi, Henan',
        titleZh: '生于巩县', titleEn: 'Born at Gongxian',
        descZh: '杜甫生于河南巩县。祖杜审言为初唐诗人，家世「奉儒守官」。',
        descEn: 'Du Fu was born at Gongxian in Henan, into a family of scholar-officials.',
        quoteZh: '', quoteEn: '', persons: ['dufu'], source: SRC_LIFE,
      },
      {
        year: 736, eraZh: '开元二十四年', coord: [117.10, 36.25], labelPos: 'top',
        ancientZh: '泰山', modernZh: '山东泰安', ancientEn: 'Mount Tai', modernEn: 'Tai\'an, Shandong',
        titleZh: '望岳', titleEn: 'Gazing at Mount Tai',
        descZh: '游齐赵间，望泰山而作《望岳》。此时尚未登顶，诗里是志愿。',
        descEn: 'Travelling in Qi and Zhao, he wrote "Gazing at the Holy Mountain".',
        quoteZh: '杜甫《望岳》：“会当凌绝顶，一览众山小。”',
        quoteEn: 'Du Fu: "One day I shall climb to the very summit, and see all mountains as small."',
        persons: ['dufu'], source: SRC_POEM + '《望岳》',
      },
      {
        year: 744, eraZh: '天宝三载', coord: [112.45, 34.62], labelPos: 'bottom',
        ancientZh: '洛阳', modernZh: '河南洛阳', ancientEn: 'Luoyang', modernEn: 'Luoyang, Henan',
        titleZh: '洛阳遇李白', titleEn: 'Meeting Li Bai at Luoyang',
        descZh: '与李白初遇于洛阳，同游梁宋，为中国诗史上最有名的一次相遇。',
        descEn: 'He first met Li Bai at Luoyang; they travelled together in the Liang-Song region.',
        quoteZh: '', quoteEn: '', persons: ['dufu'], source: '《旧唐书》卷一九〇《杜甫传》',
      },
      {
        year: 746, eraZh: '天宝五载', coord: [108.94, 34.34], labelPos: 'top',
        ancientZh: '长安', modernZh: '陕西西安', ancientEn: "Chang'an", modernEn: "Xi'an, Shaanxi",
        titleZh: '长安求仕', titleEn: 'Seeking Office in the Capital',
        descZh: '入长安应制举，李林甫以「野无遗贤」尽黜之。此后困居长安近十年，干谒求荐。',
        descEn: 'He sat the special examination in the capital; all candidates were rejected. He then spent nearly ten years in Chang\'an seeking patronage.',
        quoteZh: '', quoteEn: '', persons: ['dufu'], source: SRC_LIFE,
      },
      {
        year: 756, eraZh: '至德元年', coord: [109.38, 35.99], labelPos: 'bottom',
        ancientZh: '鄜州', modernZh: '陕西富县', ancientEn: 'Fuzhou', modernEn: 'Fu County, Shaanxi',
        titleZh: '携家避乱', titleEn: 'Family in Hiding',
        descZh: '安史乱起，杜甫携家避居鄜州羌村；闻肃宗即位灵武，只身往投，途中被俘。',
        descEn: 'As the rebellion spread he hid his family at Fuzhou, then set out alone to join the new emperor and was captured on the way.',
        quoteZh: '杜甫《月夜》：“今夜鄜州月，闺中只独看。”',
        quoteEn: 'Du Fu: "Tonight the moon over Fuzhou — only she watches it alone."',
        persons: ['dufu'], source: SRC_LIFE + '；《月夜》',
      },
      {
        year: 757, eraZh: '至德二载', coord: [108.94, 34.34], labelPos: 'top',
        ancientZh: '长安', modernZh: '陕西西安', ancientEn: "Chang'an", modernEn: "Xi'an, Shaanxi",
        titleZh: '陷贼春望', titleEn: 'Captive in the Capital',
        descZh: '困居沦陷的长安，作《春望》。同年脱身奔凤翔，授左拾遗。',
        descEn: 'Held in occupied Chang\'an he wrote "Spring View"; that year he escaped to Fengxiang and was appointed to the remonstrance office.',
        quoteZh: '杜甫《春望》：“国破山河在，城春草木深。”',
        quoteEn: 'Du Fu: "The state is shattered, yet rivers and mountains remain."',
        persons: ['dufu'], source: SRC_LIFE + '；《春望》',
      },
      {
        year: 760, eraZh: '上元元年', coord: [104.07, 30.57], labelPos: 'top',
        ancientZh: '成都', modernZh: '四川成都', ancientEn: 'Chengdu', modernEn: 'Chengdu, Sichuan',
        titleZh: '成都草堂', titleEn: 'The Thatched Cottage',
        descZh: '弃官西行，经秦州、同谷入蜀，于浣花溪畔筑草堂。次年秋作《茅屋为秋风所破歌》。',
        descEn: 'He abandoned office and travelled west to Chengdu, building a thatched cottage by the Huanhua Creek.',
        quoteZh: '杜甫《茅屋为秋风所破歌》：“安得广厦千万间，大庇天下寒士俱欢颜。”',
        quoteEn: 'Du Fu: "Could I but get ten thousand broad mansions to shelter all the poor scholars of the world."',
        persons: ['dufu'], source: SRC_LIFE + '；《茅屋为秋风所破歌》',
      },
      {
        year: 765, eraZh: '永泰元年', coord: [106.55, 29.56], labelPos: 'bottom',
        ancientZh: '渝州', modernZh: '重庆', ancientEn: 'Yuzhou', modernEn: 'Chongqing',
        titleZh: '舟下渝州', titleEn: 'Downriver by Boat',
        descZh: '离成都东下，舟行于渝州、忠州间，作《旅夜书怀》。此后两年漂泊夔州。',
        descEn: 'Leaving Chengdu by boat he wrote "Night Thoughts on a Journey".',
        quoteZh: '杜甫《旅夜书怀》：“飘飘何所似，天地一沙鸥。”',
        quoteEn: 'Du Fu: "What am I like, drifting? A single sand-gull between heaven and earth."',
        persons: ['dufu'], source: SRC_POEM + '；《旅夜书怀》',
      },
      {
        year: 767, eraZh: '大历二年', coord: [109.47, 31.02], labelPos: 'top',
        ancientZh: '夔州', modernZh: '重庆奉节', ancientEn: 'Kuizhou', modernEn: 'Fengjie, Chongqing',
        titleZh: '夔州登高', titleEn: 'Climbing High at Kuizhou',
        descZh: '寓居夔州两年，作诗四百余首，为其创作最盛期。重阳登高作《登高》。',
        descEn: 'His two years at Kuizhou were his most productive; on the Double Ninth he wrote "Climbing High".',
        quoteZh: '杜甫《登高》：“无边落木萧萧下，不尽长江滚滚来。”',
        quoteEn: 'Du Fu: "Endless falling leaves rustle down; the endless Long River rolls on."',
        persons: ['dufu'], source: SRC_POEM + '；《登高》',
      },
      {
        year: 768, eraZh: '大历三年', coord: [113.13, 29.37], labelPos: 'top',
        ancientZh: '岳阳', modernZh: '湖南岳阳', ancientEn: 'Yueyang', modernEn: 'Yueyang, Hunan',
        titleZh: '登岳阳楼', titleEn: 'Climbing Yueyang Tower',
        descZh: '出峡后漂泊江湘，登岳阳楼作诗。「亲朋无一字，老病有孤舟」是他最后几年的写照。',
        descEn: 'After leaving the gorges he drifted on the Xiang and wrote "Climbing Yueyang Tower".',
        quoteZh: '杜甫《登岳阳楼》：“亲朋无一字，老病有孤舟。”',
        quoteEn: 'Du Fu: "Not one word from kin or friends; old and sick, I have only a lone boat."',
        persons: ['dufu'], source: SRC_POEM + '；《登岳阳楼》',
      },
      {
        year: 770, eraZh: '大历五年', coord: [112.94, 28.23], labelPos: 'bottom',
        ancientZh: '潭州', modernZh: '湖南长沙', ancientEn: 'Tanzhou', modernEn: 'Changsha, Hunan',
        titleZh: '卒于湘江', titleEn: 'Death on the Xiang',
        descZh: '大历五年冬，杜甫卒于潭州往岳阳的舟中，年五十九。',
        descEn: 'He died in winter 770 on a boat between Tanzhou and Yueyang, aged fifty-nine.',
        quoteZh: '', quoteEn: '', persons: ['dufu'], source: SRC_LIFE,
      },
    ],
  };

  if (!D.PERSON_PROFILES) D.PERSON_PROFILES = [];
  (function () {
    var idx = D.PERSON_PROFILES.findIndex(function (p) { return p.key === PERSON.key; });
    if (idx >= 0) {
      var cur = D.PERSON_PROFILES[idx];
      for (var k in PERSON) { if (PERSON[k] !== undefined) cur[k] = PERSON[k]; }
    } else { D.PERSON_PROFILES.push(PERSON); }
  })();
  if (!D.HISTORICAL_JOURNEYS) D.HISTORICAL_JOURNEYS = [];
  var ex = D.HISTORICAL_JOURNEYS.findIndex(function (j) { return j.key === JOURNEY.key; });
  if (ex >= 0) D.HISTORICAL_JOURNEYS[ex] = JOURNEY; else D.HISTORICAL_JOURNEYS.push(JOURNEY);
})();
