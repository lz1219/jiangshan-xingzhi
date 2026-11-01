/**
 * 人物与行迹（生成物）
 * ⚠ 本文件由 poem-data/scripts/emit-atlas.mjs 生成，请勿手动编辑。
 *   内容源头：poem-data/data/*.json
 * 人物 18 位；新建行迹 11 条；补站 1 组 */

(function () {
  'use strict';
  var D = window.ATLAS_LORE_DATA;
  if (!D) return;
  if (!D.PERSON_PROFILES) D.PERSON_PROFILES = [];
  if (!D.HISTORICAL_JOURNEYS) D.HISTORICAL_JOURNEYS = [];

  // 上游已有同名人物时合并，而不是跳过——否则 journeyKey 挂不上，行迹不显示
  function mergePerson(p) {
    var idx = D.PERSON_PROFILES.findIndex(function (x) { return x.key === p.key; });
    if (idx >= 0) {
      var cur = D.PERSON_PROFILES[idx];
      for (var k in p) { if (p[k] !== undefined) cur[k] = p[k]; }
    } else {
      D.PERSON_PROFILES.push(p);
    }
  }

  function pushPerson(p) {
    if (!D.PERSON_PROFILES.some(function (x) { return x.key === p.key; })) D.PERSON_PROFILES.push(p);
  }

  function pushJourney(j) {
    var i = D.HISTORICAL_JOURNEYS.findIndex(function (x) { return x.key === j.key; });
    if (i >= 0) D.HISTORICAL_JOURNEYS[i] = j;
    else D.HISTORICAL_JOURNEYS.push(j);
  }

  // 上游已有该行迹：只补它缺的站，不覆盖上游
  function addStops(key, stops) {
    var j = D.HISTORICAL_JOURNEYS.find(function (x) { return x.key === key; });
    if (!j) return;
    var seen = {};
    (j.stops || []).forEach(function (s) { seen[s.year + '|' + s.ancientZh] = 1; });
    var merged = (j.stops || []).slice();
    stops.forEach(function (s) {
      if (!seen[s.year + '|' + s.ancientZh]) { merged.push(s); seen[s.year + '|' + s.ancientZh] = 1; }
    });
    merged.sort(function (a, b) { return (a.year || 0) - (b.year || 0); });
    j.stops = merged;
  }

  mergePerson({
    "key": "baijuyi",
    "zh": "白居易",
    "en": "Bai Juyi",
    "courtesyZh": "字乐天 · 号香山居士 · 醉吟先生",
    "courtesyEn": "",
    "dynastyKey": "tang",
    "span": [
      772,
      846
    ],
    "journeyKey": "baijuyi",
    "aliases": [
      "乐天",
      "香山居士",
      "醉吟先生",
      "白乐天",
      "Bai Juyi"
    ],
    "tokens": [
      "白居易",
      "乐天",
      "香山居士",
      "醉吟先生",
      "白乐天",
      "Bai Juyi"
    ]
  });

  pushPerson({
    "key": "censhen",
    "zh": "岑参",
    "en": "Cen Shen",
    "courtesyZh": "世称岑嘉州",
    "courtesyEn": "",
    "dynastyKey": "tang",
    "span": [
      715,
      770
    ],
    "journeyKey": "censhen",
    "aliases": [
      "岑嘉州"
    ],
    "tokens": [
      "岑参",
      "岑嘉州"
    ]
  });

  mergePerson({
    "key": "dufu",
    "zh": "杜甫",
    "en": "Du Fu",
    "courtesyZh": "字子美 · 自号少陵野老 · 世称杜工部",
    "courtesyEn": "",
    "dynastyKey": "tang",
    "span": [
      712,
      770
    ],
    "journeyKey": "dufu",
    "aliases": [
      "子美",
      "少陵野老",
      "杜工部",
      "杜少陵",
      "诗圣",
      "Du Fu"
    ],
    "tokens": [
      "杜甫",
      "子美",
      "少陵野老",
      "杜工部",
      "杜少陵",
      "诗圣",
      "Du Fu"
    ]
  });

  pushPerson({
    "key": "dumu",
    "zh": "杜牧",
    "en": "",
    "courtesyZh": "",
    "courtesyEn": "",
    "dynastyKey": "",
    "span": [
      803,
      853
    ],
    "journeyKey": "dumu",
    "aliases": [],
    "tokens": [
      "杜牧"
    ]
  });

  mergePerson({
    "key": "hanyu",
    "zh": "韩愈",
    "en": "Han Yu",
    "courtesyZh": "字退之 · 郡望昌黎 · 世称韩昌黎",
    "courtesyEn": "",
    "dynastyKey": "tang",
    "span": [
      768,
      824
    ],
    "journeyKey": "hanyu",
    "aliases": [
      "退之",
      "韩昌黎",
      "韩文公",
      "昌黎先生"
    ],
    "tokens": [
      "韩愈",
      "退之",
      "韩昌黎",
      "韩文公",
      "昌黎先生"
    ]
  });

  pushPerson({
    "key": "jiangjie",
    "zh": "蒋捷",
    "en": "Jiang Jie",
    "courtesyZh": "字胜欲 · 号竹山 · 生卒年无确考（约1245—1314 之后，卒年有异说）",
    "courtesyEn": "",
    "dynastyKey": "nansong",
    "span": [
      1245,
      1314
    ],
    "journeyKey": "jiangjie",
    "aliases": [
      "竹山",
      "竹山先生",
      "胜欲",
      "樱桃进士",
      "Jiang Jie",
      "Zhushan"
    ],
    "tokens": [
      "蒋捷",
      "竹山",
      "竹山先生",
      "胜欲",
      "樱桃进士",
      "Jiang Jie",
      "Zhushan"
    ]
  });

  mergePerson({
    "key": "libai",
    "zh": "李白",
    "en": "Li Bai",
    "courtesyZh": "诗仙 · 字太白 · 青莲居士",
    "courtesyEn": "",
    "dynastyKey": "tang",
    "span": [
      701,
      762
    ],
    "journeyKey": "libai",
    "aliases": [
      "太白",
      "李太白",
      "青莲居士",
      "诗仙",
      "谪仙人",
      "Li Po",
      "Taibai"
    ],
    "tokens": [
      "李白",
      "太白",
      "李太白",
      "青莲居士",
      "诗仙",
      "谪仙人",
      "Li Po",
      "Taibai"
    ]
  });

  mergePerson({
    "key": "liuyuxi",
    "zh": "刘禹锡",
    "en": "Liu Yuxi",
    "courtesyZh": "字梦得",
    "courtesyEn": "",
    "dynastyKey": "tang",
    "span": [
      772,
      842
    ],
    "journeyKey": "liuyuxi",
    "aliases": [
      "梦得",
      "刘梦得"
    ],
    "tokens": [
      "刘禹锡",
      "梦得",
      "刘梦得"
    ]
  });

  mergePerson({
    "key": "ouyangxiu",
    "zh": "欧阳修",
    "en": "Ouyang Xiu",
    "courtesyZh": "醉翁 · 六一居士 · 字永叔",
    "courtesyEn": "",
    "dynastyKey": "beisong",
    "span": [
      1007,
      1072
    ],
    "journeyKey": "ouyangxiu",
    "aliases": [
      "永叔",
      "醉翁",
      "六一居士",
      "欧阳文忠公"
    ],
    "tokens": [
      "欧阳修",
      "永叔",
      "醉翁",
      "六一居士",
      "欧阳文忠公"
    ]
  });

  mergePerson({
    "key": "qinshihuang",
    "zh": "秦始皇",
    "en": "Qin Shi Huang",
    "courtesyZh": "嬴政 · 始皇帝",
    "courtesyEn": "",
    "dynastyKey": "qin",
    "span": [
      -259,
      -210
    ],
    "journeyKey": "qinshihuang",
    "aliases": [
      "嬴政",
      "秦王政",
      "始皇帝",
      "祖龙",
      "First Emperor"
    ],
    "tokens": [
      "秦始皇",
      "嬴政",
      "秦王政",
      "始皇帝",
      "祖龙",
      "First Emperor"
    ]
  });

  mergePerson({
    "key": "sushi",
    "zh": "苏轼",
    "en": "Su Shi",
    "courtesyZh": "苏东坡 · 字子瞻 · 东坡居士",
    "courtesyEn": "",
    "dynastyKey": "beisong",
    "span": [
      1037,
      1101
    ],
    "journeyKey": "sushi",
    "aliases": [
      "东坡",
      "苏东坡",
      "子瞻",
      "苏子瞻",
      "东坡居士",
      "Su Dongpo",
      "Dongpo"
    ],
    "tokens": [
      "苏轼",
      "东坡",
      "苏东坡",
      "子瞻",
      "苏子瞻",
      "东坡居士",
      "Su Dongpo",
      "Dongpo"
    ]
  });

  mergePerson({
    "key": "wangyangming",
    "zh": "王阳明",
    "en": "Wang Yangming",
    "courtesyZh": "王守仁 · 阳明心学宗师 · 知行合一",
    "courtesyEn": "",
    "dynastyKey": "ming",
    "span": [
      1472,
      1529
    ],
    "journeyKey": "wangyangming",
    "aliases": [
      "王守仁",
      "伯安",
      "王伯安",
      "阳明先生",
      "王文成公"
    ],
    "tokens": [
      "王阳明",
      "王守仁",
      "伯安",
      "王伯安",
      "阳明先生",
      "王文成公"
    ]
  });

  pushPerson({
    "key": "weiyingwu",
    "zh": "韦应物",
    "en": "Wei Yingwu",
    "courtesyZh": "京兆韦氏",
    "courtesyEn": "",
    "dynastyKey": "tang",
    "span": [
      737,
      792
    ],
    "journeyKey": "weiyingwu",
    "aliases": [
      "韦苏州",
      "韦江州"
    ],
    "tokens": [
      "韦应物",
      "韦苏州",
      "韦江州"
    ]
  });

  mergePerson({
    "key": "xuanzang",
    "zh": "玄奘",
    "en": "Xuanzang",
    "courtesyZh": "三藏法师 · 西行求法",
    "courtesyEn": "",
    "dynastyKey": "tang",
    "span": [
      602,
      664
    ],
    "journeyKey": "xuanzang",
    "aliases": [
      "唐僧",
      "唐三藏",
      "陈祎",
      "三藏法师"
    ],
    "tokens": [
      "玄奘",
      "唐僧",
      "唐三藏",
      "陈祎",
      "三藏法师"
    ]
  });

  pushPerson({
    "key": "xueneng",
    "zh": "薛能",
    "en": "Xue Neng",
    "courtesyZh": "字太拙",
    "courtesyEn": "",
    "dynastyKey": "tang",
    "span": [
      0,
      880
    ],
    "journeyKey": "xueneng",
    "aliases": [
      "太拙"
    ],
    "tokens": [
      "薛能",
      "太拙"
    ]
  });

  pushPerson({
    "key": "yuanzhen",
    "zh": "元稹",
    "en": "Yuan Zhen",
    "courtesyZh": "字微之 · 与白居易并称元白",
    "courtesyEn": "",
    "dynastyKey": "tang",
    "span": [
      779,
      831
    ],
    "journeyKey": "yuanzhen",
    "aliases": [
      "微之",
      "元微之"
    ],
    "tokens": [
      "元稹",
      "微之",
      "元微之"
    ]
  });

  mergePerson({
    "key": "zhangqian",
    "zh": "张骞",
    "en": "Zhang Qian",
    "courtesyZh": "博望侯 · 凿空西域",
    "courtesyEn": "",
    "dynastyKey": "xihan",
    "span": [
      -164,
      -114
    ],
    "journeyKey": "zhangqian",
    "aliases": [
      "博望侯",
      "张子文"
    ],
    "tokens": [
      "张骞",
      "博望侯",
      "张子文"
    ]
  });

  mergePerson({
    "key": "zhugeliang",
    "zh": "诸葛亮",
    "en": "Zhuge Liang",
    "courtesyZh": "武乡侯 · 字孔明 · 卧龙",
    "courtesyEn": "",
    "dynastyKey": "sanguo",
    "span": [
      181,
      234
    ],
    "journeyKey": "zhugeliang",
    "aliases": [
      "孔明",
      "诸葛孔明",
      "卧龙",
      "武侯",
      "诸葛武侯",
      "Kongming"
    ],
    "tokens": [
      "诸葛亮",
      "孔明",
      "诸葛孔明",
      "卧龙",
      "武侯",
      "诸葛武侯",
      "Kongming"
    ]
  });

  pushJourney({
    "key": "baijuyi",
    "dynastyKey": "tang",
    "color": "#7a5c3e",
    "shortZh": "白居易：从拾遗到香山",
    "shortEn": "",
    "titleZh": "白居易：从拾遗到香山",
    "titleEn": "Bai Juyi: From Remonstrance to Fragrant Hills",
    "spanZh": "772年 — 846年",
    "spanEn": "",
    "stops": [
      {
        "year": 772,
        "eraZh": "大历七年",
        "coord": [
          113.74,
          34.39
        ],
        "labelPos": "top",
        "ancientZh": "新郑",
        "modernZh": "河南新郑",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "生于新郑",
        "titleEn": "",
        "descZh": "白居易生于郑州新郑县。祖籍太原，曾祖时迁居下邽。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "baijuyi"
        ],
        "source": "《旧唐书》卷一六六《白居易传》；CBDB 32227"
      },
      {
        "year": 787,
        "eraZh": "贞元三年",
        "coord": [
          108.94,
          34.34
        ],
        "labelPos": "top",
        "ancientZh": "长安",
        "modernZh": "陕西西安",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "少年入长安",
        "titleEn": "",
        "descZh": "少年白居易携诗文谒顾况，顾况见「野火烧不尽」句而改容。此为传世轶闻，见唐人记载。",
        "descEn": "",
        "quoteZh": "白居易《赋得古原草送别》：“野火烧不尽，春风吹又生。”",
        "quoteEn": "",
        "persons": [
          "baijuyi"
        ],
        "source": "唐·张固《幽闲鼓吹》；《赋得古原草送别》"
      },
      {
        "year": 800,
        "eraZh": "贞元十六年",
        "coord": [
          108.94,
          34.34
        ],
        "labelPos": "top",
        "ancientZh": "长安",
        "modernZh": "陕西西安",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "进士及第",
        "titleEn": "",
        "descZh": "贞元十六年登进士第，年二十九。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "baijuyi"
        ],
        "source": "《旧唐书》卷一六六《白居易传》；CBDB 32227"
      },
      {
        "year": 806,
        "eraZh": "元和元年",
        "coord": [
          108.22,
          34.16
        ],
        "labelPos": "top",
        "ancientZh": "盩厔",
        "modernZh": "陕西周至",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "盩厔县尉",
        "titleEn": "",
        "descZh": "任盩厔县尉，亲见麦收之苦，作《观刈麦》。同年作《长恨歌》。",
        "descEn": "",
        "quoteZh": "白居易《观刈麦》：“足蒸暑土气，背灼炎天光。”",
        "quoteEn": "",
        "persons": [
          "baijuyi"
        ],
        "source": "CBDB POSTED_TO_OFFICE_DATA（32227）；《观刈麦》"
      },
      {
        "year": 808,
        "eraZh": "元和三年",
        "coord": [
          108.94,
          34.34
        ],
        "labelPos": "top",
        "ancientZh": "长安",
        "modernZh": "陕西西安",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "左拾遗",
        "titleEn": "",
        "descZh": "拜左拾遗，屡上疏言事。这一时期所作讽谕诗最多。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "baijuyi"
        ],
        "source": "CBDB POSTED_TO_OFFICE_DATA（32227）"
      },
      {
        "year": 815,
        "eraZh": "元和十年",
        "coord": [
          115.99,
          29.71
        ],
        "labelPos": "top",
        "ancientZh": "江州",
        "modernZh": "江西九江",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "贬江州司马",
        "titleEn": "",
        "descZh": "因上疏请捕刺宰相之贼，贬江州司马。次年秋作《琵琶行》。",
        "descEn": "",
        "quoteZh": "白居易《琵琶行》：“同是天涯沦落人，相逢何必曾相识。”",
        "quoteEn": "",
        "persons": [
          "baijuyi"
        ],
        "source": "《旧唐书》卷一六六《白居易传》；CBDB 32227；《琵琶行》"
      },
      {
        "year": 818,
        "eraZh": "元和十三年",
        "coord": [
          108.04,
          30.3
        ],
        "labelPos": "top",
        "ancientZh": "忠州",
        "modernZh": "重庆忠县",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "忠州刺史",
        "titleEn": "",
        "descZh": "量移忠州刺史，自江州溯江西上。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "baijuyi"
        ],
        "source": "CBDB POSTED_TO_OFFICE_DATA（32227）"
      },
      {
        "year": 822,
        "eraZh": "长庆二年",
        "coord": [
          120.15,
          30.27
        ],
        "labelPos": "top",
        "ancientZh": "杭州",
        "modernZh": "浙江杭州",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "杭州刺史",
        "titleEn": "",
        "descZh": "任杭州刺史，筑堤蓄水灌田，西湖至今有白堤。任上作《钱塘湖春行》。",
        "descEn": "",
        "quoteZh": "白居易《钱塘湖春行》：“乱花渐欲迷人眼，浅草才能没马蹄。”",
        "quoteEn": "",
        "persons": [
          "baijuyi"
        ],
        "source": "CBDB POSTED_TO_OFFICE_DATA（32227）；《钱塘湖春行》"
      },
      {
        "year": 825,
        "eraZh": "宝历元年",
        "coord": [
          120.59,
          31.3
        ],
        "labelPos": "top",
        "ancientZh": "苏州",
        "modernZh": "江苏苏州",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "苏州刺史",
        "titleEn": "",
        "descZh": "转苏州刺史，次年因病去职。晚年所忆「江南」，一半是杭州，一半是苏州。",
        "descEn": "",
        "quoteZh": "白居易《忆江南》：“江南忆，其次忆吴宫。”",
        "quoteEn": "",
        "persons": [
          "baijuyi"
        ],
        "source": "CBDB POSTED_TO_OFFICE_DATA（32227）；《忆江南》"
      },
      {
        "year": 829,
        "eraZh": "大和三年",
        "coord": [
          112.45,
          34.62
        ],
        "labelPos": "top",
        "ancientZh": "洛阳",
        "modernZh": "河南洛阳",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "分司东都",
        "titleEn": "",
        "descZh": "以太子宾客分司东都，居洛阳履道里，自此不复出。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "baijuyi"
        ],
        "source": "CBDB POSTED_TO_OFFICE_DATA（32227）"
      },
      {
        "year": 846,
        "eraZh": "会昌六年",
        "coord": [
          112.45,
          34.62
        ],
        "labelPos": "top",
        "ancientZh": "洛阳",
        "modernZh": "河南洛阳",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "卒于洛阳",
        "titleEn": "",
        "descZh": "会昌六年卒于洛阳，年七十五，葬龙门香山。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "baijuyi"
        ],
        "source": "《旧唐书》卷一六六《白居易传》；CBDB 32227"
      }
    ]
  });

  pushJourney({
    "key": "censhen",
    "dynastyKey": "tang",
    "color": "#7a5c3e",
    "shortZh": "岑参：从安西到嘉州",
    "shortEn": "",
    "titleZh": "岑参：从安西到嘉州",
    "titleEn": "Cen Shen: From Anxi to Jiazhou",
    "spanZh": "约715年 — 770年",
    "spanEn": "",
    "stops": [
      {
        "year": 749,
        "eraZh": "天宝八载",
        "coord": [
          82.96,
          41.72
        ],
        "labelPos": "top",
        "ancientZh": "安西",
        "modernZh": "新疆库车",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "安西节度掌书记",
        "titleEn": "",
        "descZh": "入安西节度使高仙芝幕府为掌书记，西出龟兹。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "censhen"
        ],
        "source": "CBDB 32583（節度使掌書記，安西軍節度，749）"
      },
      {
        "year": 754,
        "eraZh": "天宝十三载",
        "coord": [
          89.18,
          44.01
        ],
        "labelPos": "top",
        "ancientZh": "北庭",
        "modernZh": "新疆吉木萨尔",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "安西北庭节度判官",
        "titleEn": "",
        "descZh": "再度出塞，入安西北庭节度使封常清幕为判官，驻庭州。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "censhen"
        ],
        "source": "CBDB 32583（節度使判官，安西北庭軍節度，754）"
      },
      {
        "year": 756,
        "eraZh": "至德元载",
        "coord": [
          108.941,
          34.341
        ],
        "labelPos": "top",
        "ancientZh": "长安",
        "modernZh": "陕西西安",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "支度副使",
        "titleEn": "",
        "descZh": "东归后任支度副使，安史乱起，辗转于朝。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "censhen"
        ],
        "source": "CBDB 32583（支度副使，756）"
      },
      {
        "year": 762,
        "eraZh": "宝应元年",
        "coord": [
          108.941,
          34.341
        ],
        "labelPos": "top",
        "ancientZh": "长安",
        "modernZh": "陕西西安",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "关西节度判官",
        "titleEn": "",
        "descZh": "任关西节度判官，后又为祠部员外郎。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "censhen"
        ],
        "source": "CBDB 32583（節度使判官，關西軍節度，762；祠部員外郎，763）"
      },
      {
        "year": 765,
        "eraZh": "永泰元年",
        "coord": [
          103.77,
          29.55
        ],
        "labelPos": "top",
        "ancientZh": "嘉州",
        "modernZh": "四川乐山",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "嘉州刺史",
        "titleEn": "",
        "descZh": "出为嘉州刺史，世称「岑嘉州」。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "censhen"
        ],
        "source": "CBDB 32583（州刺史，嘉州／犍為，765—768）"
      },
      {
        "year": 766,
        "eraZh": "大历元年",
        "coord": [
          104.071,
          30.571
        ],
        "labelPos": "top",
        "ancientZh": "成都",
        "modernZh": "四川成都",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "剑南西川节度判官",
        "titleEn": "",
        "descZh": "入剑南西川节度使杜鸿渐幕为判官，居成都。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "censhen"
        ],
        "source": "CBDB 32583（節度使判官，劍南西川軍節度，766）"
      },
      {
        "year": 770,
        "eraZh": "大历五年",
        "coord": [
          104.071,
          30.571
        ],
        "labelPos": "top",
        "ancientZh": "成都",
        "modernZh": "四川成都",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "卒于成都",
        "titleEn": "",
        "descZh": "罢嘉州后客居成都，大历五年卒。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "censhen"
        ],
        "source": "CBDB 32583（c_deathyear=770）"
      }
    ]
  });

  pushJourney({
    "key": "dufu",
    "dynastyKey": "tang",
    "color": "#7a5c3e",
    "shortZh": "杜甫：从长安到湘江",
    "shortEn": "",
    "titleZh": "杜甫：从长安到湘江",
    "titleEn": "Du Fu: From Chang'an to the Xiang",
    "spanZh": "712年 — 770年",
    "spanEn": "",
    "stops": [
      {
        "year": 712,
        "eraZh": "先天元年",
        "coord": [
          113.02,
          34.75
        ],
        "labelPos": "top",
        "ancientZh": "巩县",
        "modernZh": "河南巩义",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "生于巩县",
        "titleEn": "",
        "descZh": "杜甫生于河南巩县。祖杜审言为初唐诗人，家世「奉儒守官」。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "dufu"
        ],
        "source": "《旧唐书》卷一九〇《杜甫传》；杜甫年谱"
      },
      {
        "year": 736,
        "eraZh": "开元二十四年",
        "coord": [
          117.1,
          36.25
        ],
        "labelPos": "top",
        "ancientZh": "泰山",
        "modernZh": "山东泰安",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "望岳",
        "titleEn": "",
        "descZh": "游齐赵间，望泰山而作《望岳》。此时尚未登顶，诗里是志愿。",
        "descEn": "",
        "quoteZh": "杜甫《望岳》：“会当凌绝顶，一览众山小。”",
        "quoteEn": "",
        "persons": [
          "dufu"
        ],
        "source": "杜甫诗题与诗中地名《望岳》"
      },
      {
        "year": 744,
        "eraZh": "天宝三载",
        "coord": [
          112.45,
          34.62
        ],
        "labelPos": "top",
        "ancientZh": "洛阳",
        "modernZh": "河南洛阳",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "洛阳遇李白",
        "titleEn": "",
        "descZh": "与李白初遇于洛阳，同游梁宋，为中国诗史上最有名的一次相遇。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "dufu"
        ],
        "source": "《旧唐书》卷一九〇《杜甫传》"
      },
      {
        "year": 746,
        "eraZh": "天宝五载",
        "coord": [
          108.94,
          34.34
        ],
        "labelPos": "top",
        "ancientZh": "长安",
        "modernZh": "陕西西安",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "长安求仕",
        "titleEn": "",
        "descZh": "入长安应制举，李林甫以「野无遗贤」尽黜之。此后困居长安近十年，干谒求荐。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "dufu"
        ],
        "source": "《旧唐书》卷一九〇《杜甫传》；杜甫年谱"
      },
      {
        "year": 756,
        "eraZh": "至德元年",
        "coord": [
          109.38,
          35.99
        ],
        "labelPos": "top",
        "ancientZh": "鄜州",
        "modernZh": "陕西富县",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "携家避乱",
        "titleEn": "",
        "descZh": "安史乱起，杜甫携家避居鄜州羌村；闻肃宗即位灵武，只身往投，途中被俘。",
        "descEn": "",
        "quoteZh": "杜甫《月夜》：“今夜鄜州月，闺中只独看。”",
        "quoteEn": "",
        "persons": [
          "dufu"
        ],
        "source": "《旧唐书》卷一九〇《杜甫传》；杜甫年谱；《月夜》"
      },
      {
        "year": 757,
        "eraZh": "至德二载",
        "coord": [
          108.94,
          34.34
        ],
        "labelPos": "top",
        "ancientZh": "长安",
        "modernZh": "陕西西安",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "陷贼春望",
        "titleEn": "",
        "descZh": "困居沦陷的长安，作《春望》。同年脱身奔凤翔，授左拾遗。",
        "descEn": "",
        "quoteZh": "杜甫《春望》：“国破山河在，城春草木深。”",
        "quoteEn": "",
        "persons": [
          "dufu"
        ],
        "source": "《旧唐书》卷一九〇《杜甫传》；杜甫年谱；《春望》"
      },
      {
        "year": 760,
        "eraZh": "上元元年",
        "coord": [
          104.07,
          30.57
        ],
        "labelPos": "top",
        "ancientZh": "成都",
        "modernZh": "四川成都",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "成都草堂",
        "titleEn": "",
        "descZh": "弃官西行，经秦州、同谷入蜀，于浣花溪畔筑草堂。次年秋作《茅屋为秋风所破歌》。",
        "descEn": "",
        "quoteZh": "杜甫《茅屋为秋风所破歌》：“安得广厦千万间，大庇天下寒士俱欢颜。”",
        "quoteEn": "",
        "persons": [
          "dufu"
        ],
        "source": "《旧唐书》卷一九〇《杜甫传》；杜甫年谱；《茅屋为秋风所破歌》"
      },
      {
        "year": 765,
        "eraZh": "永泰元年",
        "coord": [
          106.55,
          29.56
        ],
        "labelPos": "top",
        "ancientZh": "渝州",
        "modernZh": "重庆",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "舟下渝州",
        "titleEn": "",
        "descZh": "离成都东下，舟行于渝州、忠州间，作《旅夜书怀》。此后两年漂泊夔州。",
        "descEn": "",
        "quoteZh": "杜甫《旅夜书怀》：“飘飘何所似，天地一沙鸥。”",
        "quoteEn": "",
        "persons": [
          "dufu"
        ],
        "source": "杜甫诗题与诗中地名；《旅夜书怀》"
      },
      {
        "year": 767,
        "eraZh": "大历二年",
        "coord": [
          109.47,
          31.02
        ],
        "labelPos": "top",
        "ancientZh": "夔州",
        "modernZh": "重庆奉节",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "夔州登高",
        "titleEn": "",
        "descZh": "寓居夔州两年，作诗四百余首，为其创作最盛期。重阳登高作《登高》。",
        "descEn": "",
        "quoteZh": "杜甫《登高》：“无边落木萧萧下，不尽长江滚滚来。”",
        "quoteEn": "",
        "persons": [
          "dufu"
        ],
        "source": "杜甫诗题与诗中地名；《登高》"
      },
      {
        "year": 768,
        "eraZh": "大历三年",
        "coord": [
          113.13,
          29.37
        ],
        "labelPos": "top",
        "ancientZh": "岳阳",
        "modernZh": "湖南岳阳",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "登岳阳楼",
        "titleEn": "",
        "descZh": "出峡后漂泊江湘，登岳阳楼作诗。「亲朋无一字，老病有孤舟」是他最后几年的写照。",
        "descEn": "",
        "quoteZh": "杜甫《登岳阳楼》：“亲朋无一字，老病有孤舟。”",
        "quoteEn": "",
        "persons": [
          "dufu"
        ],
        "source": "杜甫诗题与诗中地名；《登岳阳楼》"
      },
      {
        "year": 770,
        "eraZh": "大历五年",
        "coord": [
          112.94,
          28.23
        ],
        "labelPos": "top",
        "ancientZh": "潭州",
        "modernZh": "湖南长沙",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "卒于湘江",
        "titleEn": "",
        "descZh": "大历五年冬，杜甫卒于潭州往岳阳的舟中，年五十九。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "dufu"
        ],
        "source": "《旧唐书》卷一九〇《杜甫传》；杜甫年谱"
      }
    ]
  });

  pushJourney({
    "key": "dumu",
    "dynastyKey": "",
    "color": "#7a5c3e",
    "shortZh": "杜牧：从扬州到长安",
    "shortEn": "",
    "titleZh": "杜牧：从扬州到长安",
    "titleEn": "Du Mu: From Yangzhou to Chang'an",
    "spanZh": "803年 — 853年",
    "spanEn": "",
    "stops": [
      {
        "year": 803,
        "eraZh": "贞元十九年",
        "coord": [
          108.941,
          34.341
        ],
        "labelPos": "top",
        "ancientZh": "长安",
        "modernZh": "陕西西安",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "生于京兆万年",
        "titleEn": "",
        "descZh": "杜牧生于京兆府万年县，出身宰相之家，祖父杜佑撰《通典》。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "dumu"
        ],
        "source": "CBDB 21194（c_birthyear=803）"
      },
      {
        "year": 833,
        "eraZh": "大和七年",
        "coord": [
          119.411,
          32.391
        ],
        "labelPos": "top",
        "ancientZh": "扬州",
        "modernZh": "江苏扬州",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "淮南节度推官",
        "titleEn": "",
        "descZh": "入淮南节度使牛僧孺幕府为推官，居扬州。此后追忆扬州之作最多。",
        "descEn": "",
        "quoteZh": "杜牧《遣怀》：“十年一觉扬州梦，赢得青楼薄幸名。”",
        "quoteEn": "",
        "persons": [
          "dumu"
        ],
        "source": "CBDB 21194（節度使推官，淮南道，833）"
      },
      {
        "year": 835,
        "eraZh": "大和九年",
        "coord": [
          112.451,
          34.621
        ],
        "labelPos": "top",
        "ancientZh": "洛阳",
        "modernZh": "河南洛阳",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "监察御史分司东都",
        "titleEn": "",
        "descZh": "入朝为监察御史，分司东都洛阳。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "dumu"
        ],
        "source": "CBDB 21194（監察御史分司東都，835）"
      },
      {
        "year": 837,
        "eraZh": "开成二年",
        "coord": [
          118.759,
          30.94
        ],
        "labelPos": "top",
        "ancientZh": "宣州",
        "modernZh": "安徽宣城",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "宣歙观察使团练判官",
        "titleEn": "",
        "descZh": "入宣歙观察使幕为团练判官。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "dumu"
        ],
        "source": "CBDB 21194（觀察使團練判官，宣歙，837）"
      },
      {
        "year": 842,
        "eraZh": "会昌二年",
        "coord": [
          114.88,
          30.45
        ],
        "labelPos": "top",
        "ancientZh": "黄州",
        "modernZh": "湖北黄冈",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "黄州刺史",
        "titleEn": "",
        "descZh": "出为黄州刺史。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "dumu"
        ],
        "source": "CBDB 21194（州刺史，黄州，842）"
      },
      {
        "year": 844,
        "eraZh": "会昌四年",
        "coord": [
          117.491,
          30.665
        ],
        "labelPos": "top",
        "ancientZh": "池州",
        "modernZh": "安徽池州",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "池州刺史",
        "titleEn": "",
        "descZh": "转池州刺史，在任约两年。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "dumu"
        ],
        "source": "CBDB 21194（州刺史，池州，844）"
      },
      {
        "year": 845,
        "eraZh": "会昌五年",
        "coord": [
          119.4989,
          29.5445
        ],
        "labelPos": "top",
        "ancientZh": "睦州",
        "modernZh": "浙江建德",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "睦州刺史",
        "titleEn": "",
        "descZh": "再转睦州刺史。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "dumu"
        ],
        "source": "CBDB 21194（州刺史，睦州，845）"
      },
      {
        "year": 848,
        "eraZh": "大中二年",
        "coord": [
          108.941,
          34.341
        ],
        "labelPos": "top",
        "ancientZh": "长安",
        "modernZh": "陕西西安",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "史馆修撰",
        "titleEn": "",
        "descZh": "入朝为史馆修撰，回到长安。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "dumu"
        ],
        "source": "CBDB 21194（史館修撰，848）"
      },
      {
        "year": 850,
        "eraZh": "大中四年",
        "coord": [
          120.087,
          30.894
        ],
        "labelPos": "top",
        "ancientZh": "湖州",
        "modernZh": "浙江湖州",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "湖州刺史",
        "titleEn": "",
        "descZh": "出为湖州刺史。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "dumu"
        ],
        "source": "CBDB 21194（州刺史，湖州，850—851）"
      },
      {
        "year": 852,
        "eraZh": "大中六年",
        "coord": [
          108.941,
          34.341
        ],
        "labelPos": "top",
        "ancientZh": "长安",
        "modernZh": "陕西西安",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "中书舍人",
        "titleEn": "",
        "descZh": "还朝为中书舍人。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "dumu"
        ],
        "source": "CBDB 21194（中書舍人，852）"
      },
      {
        "year": 853,
        "eraZh": "大中七年",
        "coord": [
          108.941,
          34.341
        ],
        "labelPos": "top",
        "ancientZh": "长安",
        "modernZh": "陕西西安",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "卒于长安",
        "titleEn": "",
        "descZh": "大中七年卒，年五十。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "dumu"
        ],
        "source": "CBDB 21194（c_deathyear=853）"
      }
    ]
  });

  pushJourney({
    "key": "hanyu",
    "dynastyKey": "tang",
    "color": "#7a5c3e",
    "shortZh": "韩愈：从汴徐到潮袁",
    "shortEn": "",
    "titleZh": "韩愈：从汴徐到潮袁",
    "titleEn": "Han Yu: From Bianzhou to Chaozhou",
    "spanZh": "768年 — 824年",
    "spanEn": "",
    "stops": [
      {
        "year": 768,
        "eraZh": "大历三年",
        "coord": [
          112.785,
          34.9
        ],
        "labelPos": "top",
        "ancientZh": "河阳",
        "modernZh": "河南孟州",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "生于河阳",
        "titleEn": "",
        "descZh": "韩愈生于河阳（今河南孟州），郡望昌黎。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "hanyu"
        ],
        "source": "CBDB 3332（c_birthyear=768）"
      },
      {
        "year": 796,
        "eraZh": "贞元十二年",
        "coord": [
          114.311,
          34.801
        ],
        "labelPos": "top",
        "ancientZh": "汴州",
        "modernZh": "河南开封",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "宣武军观察推官",
        "titleEn": "",
        "descZh": "入宣武军节度使董晋幕为观察推官，居汴州。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "hanyu"
        ],
        "source": "CBDB 3332（觀察推官，宣武軍節度，796）"
      },
      {
        "year": 799,
        "eraZh": "贞元十五年",
        "coord": [
          117.181,
          34.261
        ],
        "labelPos": "top",
        "ancientZh": "徐州",
        "modernZh": "江苏徐州",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "武宁军节度判官",
        "titleEn": "",
        "descZh": "转武宁军节度判官，居徐州。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "hanyu"
        ],
        "source": "CBDB 3332（節度使判官，武寧軍節度，799）"
      },
      {
        "year": 802,
        "eraZh": "贞元十八年",
        "coord": [
          108.941,
          34.341
        ],
        "labelPos": "top",
        "ancientZh": "长安",
        "modernZh": "陕西西安",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "四门博士",
        "titleEn": "",
        "descZh": "入朝为四门博士，次年转监察御史。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "hanyu"
        ],
        "source": "CBDB 3332（四門博士，802；監察御史，803）"
      },
      {
        "year": 805,
        "eraZh": "永贞元年",
        "coord": [
          112.2,
          30.35
        ],
        "labelPos": "top",
        "ancientZh": "江陵",
        "modernZh": "湖北荆州",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "江陵府法曹参军",
        "titleEn": "",
        "descZh": "贬为江陵府法曹参军。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "hanyu"
        ],
        "source": "CBDB 3332（法曹參軍，江陵府，805）"
      },
      {
        "year": 806,
        "eraZh": "元和元年",
        "coord": [
          112.451,
          34.621
        ],
        "labelPos": "top",
        "ancientZh": "洛阳",
        "modernZh": "河南洛阳",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "国子博士分司东都",
        "titleEn": "",
        "descZh": "为国子博士，分司东都洛阳。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "hanyu"
        ],
        "source": "CBDB 3332（國子博士分司東都，806）"
      },
      {
        "year": 816,
        "eraZh": "元和十一年",
        "coord": [
          108.941,
          34.341
        ],
        "labelPos": "top",
        "ancientZh": "长安",
        "modernZh": "陕西西安",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "中书舍人",
        "titleEn": "",
        "descZh": "迁中书舍人，在朝掌制诰。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "hanyu"
        ],
        "source": "CBDB 3332（中書舍人，816）"
      },
      {
        "year": 819,
        "eraZh": "元和十四年",
        "coord": [
          116.623,
          23.657
        ],
        "labelPos": "top",
        "ancientZh": "潮州",
        "modernZh": "广东潮州",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "贬潮州刺史",
        "titleEn": "",
        "descZh": "因上表谏迎佛骨，贬潮州刺史。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "hanyu"
        ],
        "source": "CBDB 3332（州刺史，潮州，819）"
      },
      {
        "year": 820,
        "eraZh": "元和十五年",
        "coord": [
          114.39,
          27.8
        ],
        "labelPos": "top",
        "ancientZh": "袁州",
        "modernZh": "江西宜春",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "袁州刺史",
        "titleEn": "",
        "descZh": "量移袁州刺史，治所在宜春。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "hanyu"
        ],
        "source": "CBDB 3332（州刺史，宜春／袁州，819—820）"
      },
      {
        "year": 821,
        "eraZh": "长庆元年",
        "coord": [
          108.941,
          34.341
        ],
        "labelPos": "top",
        "ancientZh": "长安",
        "modernZh": "陕西西安",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "兵部侍郎",
        "titleEn": "",
        "descZh": "还朝为兵部侍郎，后转吏部。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "hanyu"
        ],
        "source": "CBDB 3332（兵部侍郎，821、823）"
      },
      {
        "year": 823,
        "eraZh": "长庆三年",
        "coord": [
          108.9374,
          34.3179
        ],
        "labelPos": "top",
        "ancientZh": "京兆府",
        "modernZh": "陕西西安",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "京兆尹",
        "titleEn": "",
        "descZh": "为京兆尹兼御史大夫，治京畿。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "hanyu"
        ],
        "source": "CBDB 3332（京兆府尹、御史大夫，823）"
      },
      {
        "year": 824,
        "eraZh": "长庆四年",
        "coord": [
          108.941,
          34.341
        ],
        "labelPos": "top",
        "ancientZh": "长安",
        "modernZh": "陕西西安",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "卒于长安",
        "titleEn": "",
        "descZh": "长庆四年卒于长安，年五十七。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "hanyu"
        ],
        "source": "CBDB 3332（c_deathyear=824）"
      }
    ]
  });

  pushJourney({
    "key": "jiangjie",
    "dynastyKey": "nansong",
    "color": "#7a5c3e",
    "shortZh": "蒋捷：宋亡之后的竹山",
    "shortEn": "",
    "titleZh": "蒋捷：宋亡之后的竹山",
    "titleEn": "Jiang Jie: A Song Loyalist at Zhushan",
    "spanZh": "约1245年 — 1314年之后（生卒年无确考）",
    "spanEn": "",
    "stops": [
      {
        "year": 1245,
        "eraZh": "约 淳祐五年",
        "coord": [
          119.823,
          31.36
        ],
        "labelPos": "top",
        "ancientZh": "宜兴",
        "modernZh": "江苏宜兴",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "生于阳羡",
        "titleEn": "",
        "descZh": "蒋捷字胜欲，号竹山，常州宜兴人。生年无确考，约在淳祐五年（1245）前后。宜兴蒋氏为当地大族，有《竹山词》传世。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "jiangjie"
        ],
        "source": "杨景龙校注《蒋捷词校注》（中华书局，2010）；《词林纪事》"
      },
      {
        "year": 1274,
        "eraZh": "咸淳十年",
        "coord": [
          120.155,
          30.274
        ],
        "labelPos": "top",
        "ancientZh": "临安",
        "modernZh": "浙江杭州",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "咸淳十年进士",
        "titleEn": "",
        "descZh": "咸淳十年登进士第。时襄樊已失，宋室危殆，距临安开城不过二年。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "jiangjie"
        ],
        "source": "杨景龙校注《蒋捷词校注》（中华书局，2010）；《词林纪事》"
      },
      {
        "year": 1276,
        "eraZh": "德祐二年",
        "coord": [
          120.155,
          30.274
        ],
        "labelPos": "top",
        "ancientZh": "临安",
        "modernZh": "浙江杭州",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "宋亡不仕",
        "titleEn": "",
        "descZh": "德祐二年，元军入临安，宋室南奔。蒋捷义不仕元，此后以遗民自居。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "jiangjie"
        ],
        "source": "《宋史》卷四七《瀛国公纪》；杨景龙校注《蒋捷词校注》（中华书局，2010）；《词林纪事》"
      },
      {
        "year": 1277,
        "eraZh": "约 至元间",
        "coord": [
          120.585,
          31.298
        ],
        "labelPos": "top",
        "ancientZh": "苏州",
        "modernZh": "江苏苏州",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "兵后寓吴",
        "titleEn": "",
        "descZh": "宋亡后漂泊吴中，寓居吴门，作《贺新郎·兵后寓吴》。「兵后」二字，是他给自己的时间标记。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "jiangjie"
        ],
        "source": "《竹山词》词题《贺新郎·兵后寓吴》"
      },
      {
        "year": 1278,
        "eraZh": "约 至元间",
        "coord": [
          120.641,
          31.16
        ],
        "labelPos": "top",
        "ancientZh": "吴江",
        "modernZh": "江苏苏州吴江",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "舟过吴江",
        "titleEn": "",
        "descZh": "舟过吴江而作《一剪梅》。「何日归家洗客袍」是羁旅之问，「流光容易把人抛」是亡国之叹，一句里两层。",
        "descEn": "",
        "quoteZh": "蒋捷《一剪梅·舟过吴江》：“一片春愁待酒浇。江上舟摇，楼上帘招。”",
        "quoteEn": "",
        "persons": [
          "jiangjie"
        ],
        "source": "《竹山词》词题《一剪梅·舟过吴江》"
      },
      {
        "year": 1280,
        "eraZh": "约 至元间",
        "coord": [
          120.286,
          31.921
        ],
        "labelPos": "top",
        "ancientZh": "江阴",
        "modernZh": "江苏江阴",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "江阴道中",
        "titleEn": "",
        "descZh": "行经江阴，作《高阳台·江阴道中有怀》。词题即纪行，是他漂泊路线的一处坐标。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "jiangjie"
        ],
        "source": "《竹山词》词题《高阳台·江阴道中有怀》"
      },
      {
        "year": 1285,
        "eraZh": "约 至元间",
        "coord": [
          119.172,
          29.031
        ],
        "labelPos": "top",
        "ancientZh": "龙游",
        "modernZh": "浙江衢州龙游",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "宿龙游朱氏楼",
        "titleEn": "",
        "descZh": "南行至衢州龙游，宿于朱氏楼，作《一剪梅·宿龙游朱氏楼》。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "jiangjie"
        ],
        "source": "《竹山词》词题《一剪梅·宿龙游朱氏楼》"
      },
      {
        "year": 1300,
        "eraZh": "约 大德间",
        "coord": [
          119.942,
          31.783
        ],
        "labelPos": "top",
        "ancientZh": "武进",
        "modernZh": "江苏常州武进",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "迁居武进",
        "titleEn": "",
        "descZh": "晚年迁居武进，教书授徒度其余生。元大德间有荐其才者，不就。",
        "descEn": "",
        "quoteZh": "蒋捷《虞美人·听雨》：“少年听雨歌楼上，红烛昏罗帐。”",
        "quoteEn": "",
        "persons": [
          "jiangjie"
        ],
        "source": "《新华日报》2024-07-19（引杨景龙说）；《竹山词》词题《虞美人·听雨》"
      },
      {
        "year": 1314,
        "eraZh": "约 延祐初",
        "coord": [
          119.823,
          31.36
        ],
        "labelPos": "top",
        "ancientZh": "宜兴",
        "modernZh": "江苏宜兴",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "归葬竹山",
        "titleEn": "",
        "descZh": "约 1314 年之后卒，葬于宜兴竹山福善寺。今宜兴周铁镇竺山有蒋捷墓。旧说卒于约 1305 年，与此不同。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "jiangjie"
        ],
        "source": "《新华日报》2024-07-19（引杨景龙说）；杨景龙校注《蒋捷词校注》（中华书局，2010）；《词林纪事》"
      }
    ]
  });

  pushJourney({
    "key": "liuyuxi",
    "dynastyKey": "tang",
    "color": "#7a5c3e",
    "shortZh": "刘禹锡：二十三年弃置身",
    "shortEn": "",
    "titleZh": "刘禹锡：二十三年弃置身",
    "titleEn": "Liu Yuxi: Twenty-three Years in Exile",
    "spanZh": "772年 — 842年",
    "spanEn": "",
    "stops": [
      {
        "year": 795,
        "eraZh": "贞元十一年",
        "coord": [
          108.941,
          34.341
        ],
        "labelPos": "top",
        "ancientZh": "长安",
        "modernZh": "陕西西安",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "太子校书郎",
        "titleEn": "",
        "descZh": "登进士第后为太子校书郎，在长安。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "liuyuxi"
        ],
        "source": "CBDB 33606（太子校書郎，長安，795—796）"
      },
      {
        "year": 800,
        "eraZh": "贞元十六年",
        "coord": [
          119.411,
          32.391
        ],
        "labelPos": "top",
        "ancientZh": "扬州",
        "modernZh": "江苏扬州",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "淮南节度掌书记",
        "titleEn": "",
        "descZh": "入淮南节度使杜佑幕为掌书记，居扬州。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "liuyuxi"
        ],
        "source": "CBDB 33606（節度使掌書記，淮南道，800—802）"
      },
      {
        "year": 802,
        "eraZh": "贞元十八年",
        "coord": [
          109.511,
          34.501
        ],
        "labelPos": "top",
        "ancientZh": "渭南",
        "modernZh": "陕西渭南",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "渭南县主簿",
        "titleEn": "",
        "descZh": "调渭南县主簿，次年入朝为监察御史。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "liuyuxi"
        ],
        "source": "CBDB 33606（縣主簿，渭南，802—803）"
      },
      {
        "year": 805,
        "eraZh": "永贞元年",
        "coord": [
          111.698,
          29.032
        ],
        "labelPos": "top",
        "ancientZh": "朗州",
        "modernZh": "湖南常德",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "贬朗州司马",
        "titleEn": "",
        "descZh": "永贞革新失败，贬朗州司马，在朗州近十年。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "liuyuxi"
        ],
        "source": "CBDB 33606（司馬，朗州，805—814）"
      },
      {
        "year": 815,
        "eraZh": "元和十年",
        "coord": [
          112.38,
          24.78
        ],
        "labelPos": "top",
        "ancientZh": "连州",
        "modernZh": "广东连州",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "连州刺史",
        "titleEn": "",
        "descZh": "出为连州刺史（初授播州，因母老改连州），在连州五年。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "liuyuxi"
        ],
        "source": "CBDB 33606（州刺史，連州，815—819；播州 815 未赴）"
      },
      {
        "year": 822,
        "eraZh": "长庆二年",
        "coord": [
          109.5712,
          31.0415
        ],
        "labelPos": "top",
        "ancientZh": "夔州",
        "modernZh": "重庆奉节",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "夔州刺史",
        "titleEn": "",
        "descZh": "转夔州刺史，在巴东。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "liuyuxi"
        ],
        "source": "CBDB 33606（州刺史，夔州，822—824）"
      },
      {
        "year": 824,
        "eraZh": "长庆四年",
        "coord": [
          118.36,
          31.72
        ],
        "labelPos": "top",
        "ancientZh": "和州",
        "modernZh": "安徽和县",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "和州刺史",
        "titleEn": "",
        "descZh": "转和州刺史，在淮南。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "liuyuxi"
        ],
        "source": "CBDB 33606（州刺史，和州，824—828）"
      },
      {
        "year": 828,
        "eraZh": "大和二年",
        "coord": [
          112.451,
          34.621
        ],
        "labelPos": "top",
        "ancientZh": "洛阳",
        "modernZh": "河南洛阳",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "主客郎中分司东都",
        "titleEn": "",
        "descZh": "回朝为主客郎中，分司东都洛阳；同年入长安为集贤殿直学士。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "liuyuxi"
        ],
        "source": "CBDB 33606（主客郎中分司東都，洛陽，828；集賢殿直學士，長安，828—829）"
      },
      {
        "year": 831,
        "eraZh": "大和五年",
        "coord": [
          120.581,
          31.301
        ],
        "labelPos": "top",
        "ancientZh": "苏州",
        "modernZh": "江苏苏州",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "苏州刺史",
        "titleEn": "",
        "descZh": "出为苏州刺史，有政声。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "liuyuxi"
        ],
        "source": "CBDB 33606（州刺史，蘇州，831—834）"
      },
      {
        "year": 834,
        "eraZh": "大和八年",
        "coord": [
          112.8769,
          34.1653
        ],
        "labelPos": "top",
        "ancientZh": "汝州",
        "modernZh": "河南汝州",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "汝州刺史",
        "titleEn": "",
        "descZh": "转汝州刺史，后又为同州刺史。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "liuyuxi"
        ],
        "source": "CBDB 33606（州刺史，汝州 834—835；同州 835—836）"
      },
      {
        "year": 836,
        "eraZh": "开成元年",
        "coord": [
          112.451,
          34.621
        ],
        "labelPos": "top",
        "ancientZh": "洛阳",
        "modernZh": "河南洛阳",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "太子宾客分司东都",
        "titleEn": "",
        "descZh": "以太子宾客分司东都，此后长居洛阳，官至礼部尚书。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "liuyuxi"
        ],
        "source": "CBDB 33606（太子賓客分司東都，洛陽，836—842）"
      },
      {
        "year": 842,
        "eraZh": "会昌二年",
        "coord": [
          112.451,
          34.621
        ],
        "labelPos": "top",
        "ancientZh": "洛阳",
        "modernZh": "河南洛阳",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "卒于洛阳",
        "titleEn": "",
        "descZh": "会昌二年卒于洛阳，年七十一。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "liuyuxi"
        ],
        "source": "CBDB 33606（c_deathyear=842）"
      }
    ]
  });

  pushJourney({
    "key": "ouyangxiu",
    "dynastyKey": "beisong",
    "color": "#7a5c3e",
    "shortZh": "欧阳修：从绵州到颍州",
    "shortEn": "",
    "titleZh": "欧阳修：从绵州到颍州",
    "titleEn": "Ouyang Xiu: From Mianzhou to Yingzhou",
    "spanZh": "1007年 — 1072年",
    "spanEn": "",
    "stops": [
      {
        "year": 1007,
        "eraZh": "景德四年",
        "coord": [
          104.7447,
          31.4674
        ],
        "labelPos": "top",
        "ancientZh": "绵州",
        "modernZh": "四川绵阳",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "生于绵州",
        "titleEn": "",
        "descZh": "其父欧阳观时任绵州推官，欧阳修生于绵州。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "ouyangxiu"
        ],
        "source": "CBDB 1384（c_birthyear=1007）；《宋史》卷三一九《欧阳修传》"
      },
      {
        "year": 1036,
        "eraZh": "景祐三年",
        "coord": [
          111.29,
          30.69
        ],
        "labelPos": "top",
        "ancientZh": "夷陵",
        "modernZh": "湖北宜昌",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "贬夷陵县令",
        "titleEn": "",
        "descZh": "因言范仲淹事忤权贵，贬峡州夷陵县令。CBDB 记其任「县令，夷陵」，未记年；年份据本传。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "ouyangxiu"
        ],
        "source": "CBDB 1384（縣令，夷陵，年份缺）；《宋史》卷三一九《欧阳修传》"
      },
      {
        "year": 1044,
        "eraZh": "庆历四年",
        "coord": [
          115.15,
          36.28
        ],
        "labelPos": "top",
        "ancientZh": "大名府",
        "modernZh": "河北邯郸大名",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "河北路转运使",
        "titleEn": "",
        "descZh": "任河北路转运使；河北路治所在大名府。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "ouyangxiu"
        ],
        "source": "CBDB 1384（轉運使，河北路，1044）"
      },
      {
        "year": 1045,
        "eraZh": "庆历五年",
        "coord": [
          118.317,
          32.301
        ],
        "labelPos": "top",
        "ancientZh": "滁州",
        "modernZh": "安徽滁州",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "知滁州",
        "titleEn": "",
        "descZh": "贬知滁州，在任三年；《醉翁亭记》即作于此。",
        "descEn": "",
        "quoteZh": "欧阳修《醉翁亭记》：“醉翁之意不在酒，在乎山水之间也。”",
        "quoteEn": "",
        "persons": [
          "ouyangxiu"
        ],
        "source": "CBDB 1384（知某州軍州事，滁州，1045—1048）"
      },
      {
        "year": 1048,
        "eraZh": "庆历八年",
        "coord": [
          119.411,
          32.391
        ],
        "labelPos": "top",
        "ancientZh": "扬州",
        "modernZh": "江苏扬州",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "知扬州",
        "titleEn": "",
        "descZh": "移知扬州，并兼堤堰桥道劝农使。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "ouyangxiu"
        ],
        "source": "CBDB 1384（知某州軍州事，揚州，1048—1049）"
      },
      {
        "year": 1060,
        "eraZh": "嘉祐五年",
        "coord": [
          114.311,
          34.801
        ],
        "labelPos": "top",
        "ancientZh": "开封",
        "modernZh": "河南开封",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "同知枢密院事",
        "titleEn": "",
        "descZh": "由地方入朝，任同知枢密院事。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "ouyangxiu"
        ],
        "source": "CBDB 1384（同知樞密院事，1060）"
      },
      {
        "year": 1061,
        "eraZh": "嘉祐六年",
        "coord": [
          114.311,
          34.801
        ],
        "labelPos": "top",
        "ancientZh": "开封",
        "modernZh": "河南开封",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "参知政事",
        "titleEn": "",
        "descZh": "拜参知政事，居执政之位。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "ouyangxiu"
        ],
        "source": "CBDB 1384（參知政事，1061）"
      },
      {
        "year": 1067,
        "eraZh": "治平四年",
        "coord": [
          115.78,
          33.87
        ],
        "labelPos": "top",
        "ancientZh": "亳州",
        "modernZh": "安徽亳州",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "知亳州",
        "titleEn": "",
        "descZh": "罢政出知亳州，带观文殿学士、刑部尚书衔。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "ouyangxiu"
        ],
        "source": "CBDB 1384（知某州軍州事，亳州，1067—1068；觀文殿學士、刑部尚書亦系此年）"
      },
      {
        "year": 1072,
        "eraZh": "熙宁五年",
        "coord": [
          115.81,
          32.89
        ],
        "labelPos": "top",
        "ancientZh": "颍州",
        "modernZh": "安徽阜阳",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "卒于颍州",
        "titleEn": "",
        "descZh": "晚年致仕居颍州，熙宁五年卒，年六十六。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "ouyangxiu"
        ],
        "source": "CBDB 1384（c_deathyear=1072）；《宋史》卷三一九《欧阳修传》"
      }
    ]
  });

  pushJourney({
    "key": "weiyingwu",
    "dynastyKey": "tang",
    "color": "#7a5c3e",
    "shortZh": "韦应物：从京兆到江州",
    "shortEn": "",
    "titleZh": "韦应物：从京兆到江州",
    "titleEn": "Wei Yingwu: From Chang'an to Jiangzhou",
    "spanZh": "737年 — 约792年",
    "spanEn": "",
    "stops": [
      {
        "year": 737,
        "eraZh": "开元二十五年",
        "coord": [
          108.941,
          34.341
        ],
        "labelPos": "top",
        "ancientZh": "长安",
        "modernZh": "陕西西安",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "生于京兆",
        "titleEn": "",
        "descZh": "韦应物生于京兆长安，出身关中望族京兆韦氏。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "weiyingwu"
        ],
        "source": "CBDB 32822（c_birthyear=737）"
      },
      {
        "year": 774,
        "eraZh": "大历九年",
        "coord": [
          108.941,
          34.341
        ],
        "labelPos": "top",
        "ancientZh": "京兆府",
        "modernZh": "陕西西安",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "京兆府功曹参军",
        "titleEn": "",
        "descZh": "任京兆府功曹参军。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "weiyingwu"
        ],
        "source": "CBDB 32822（功曹參軍，京兆府，774）"
      },
      {
        "year": 778,
        "eraZh": "大历十三年",
        "coord": [
          108.6039,
          34.1118
        ],
        "labelPos": "top",
        "ancientZh": "鄠县",
        "modernZh": "陕西户县",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "鄠县令",
        "titleEn": "",
        "descZh": "出为鄠县令。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "weiyingwu"
        ],
        "source": "CBDB 32822（縣令，鄠縣，778）"
      },
      {
        "year": 779,
        "eraZh": "大历十四年",
        "coord": [
          109.25,
          34.66
        ],
        "labelPos": "top",
        "ancientZh": "栎阳",
        "modernZh": "陕西西安临潼栎阳",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "栎阳县令",
        "titleEn": "",
        "descZh": "转栎阳县令，次年入朝为比部员外郎。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "weiyingwu"
        ],
        "source": "CBDB 32822（縣令，櫟陽，779；比部員外郎 781）"
      },
      {
        "year": 783,
        "eraZh": "建中四年",
        "coord": [
          118.317,
          32.301
        ],
        "labelPos": "top",
        "ancientZh": "滁州",
        "modernZh": "安徽滁州",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "滁州刺史",
        "titleEn": "",
        "descZh": "出为滁州刺史，在滁州两年。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "weiyingwu"
        ],
        "source": "CBDB 32822（州刺史，滁州／永陽，783—784）"
      },
      {
        "year": 785,
        "eraZh": "贞元元年",
        "coord": [
          115.99,
          29.71
        ],
        "labelPos": "top",
        "ancientZh": "江州",
        "modernZh": "江西九江",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "江州刺史",
        "titleEn": "",
        "descZh": "转江州刺史，在任三年。此后事迹史载渐略。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "weiyingwu"
        ],
        "source": "CBDB 32822（州刺史，江州／潯陽，785—787）"
      }
    ]
  });

  pushJourney({
    "key": "xueneng",
    "dynastyKey": "tang",
    "color": "#7a5c3e",
    "shortZh": "薛能：从盩厔到许州",
    "shortEn": "",
    "titleZh": "薛能：从盩厔到许州",
    "titleEn": "Xue Neng: From Zhouzhi to Xuzhou",
    "spanZh": "? — 880年",
    "spanEn": "",
    "stops": [
      {
        "year": 854,
        "eraZh": "大中八年",
        "coord": [
          108.22,
          34.16
        ],
        "labelPos": "top",
        "ancientZh": "盩厔",
        "modernZh": "陕西周至",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "盩厔县尉",
        "titleEn": "",
        "descZh": "初仕为盩厔县尉，在京畿。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "xueneng"
        ],
        "source": "CBDB 95071（縣尉，盩厔，854）"
      },
      {
        "year": 868,
        "eraZh": "咸通九年",
        "coord": [
          103.77,
          29.55
        ],
        "labelPos": "top",
        "ancientZh": "嘉州",
        "modernZh": "四川乐山",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "嘉州刺史",
        "titleEn": "",
        "descZh": "出为嘉州刺史，治所在犍为。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "xueneng"
        ],
        "source": "CBDB 95071（州刺史，犍為／嘉州，868）"
      },
      {
        "year": 868,
        "eraZh": "咸通九年",
        "coord": [
          115.99,
          29.71
        ],
        "labelPos": "top",
        "ancientZh": "江州",
        "modernZh": "江西九江",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "江州刺史",
        "titleEn": "",
        "descZh": "同年转江州刺史，治所在浔阳。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "xueneng"
        ],
        "source": "CBDB 95071（州刺史，潯陽／江州，868）"
      },
      {
        "year": 869,
        "eraZh": "咸通十年",
        "coord": [
          109.9393,
          34.7972
        ],
        "labelPos": "top",
        "ancientZh": "同州",
        "modernZh": "陕西大荔",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "同州刺史",
        "titleEn": "",
        "descZh": "转同州刺史，治所在冯翊。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "xueneng"
        ],
        "source": "CBDB 95071（州刺史，馮翊／同州，869）"
      },
      {
        "year": 870,
        "eraZh": "咸通十一年",
        "coord": [
          108.941,
          34.341
        ],
        "labelPos": "top",
        "ancientZh": "京兆府",
        "modernZh": "陕西西安",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "京兆府尹",
        "titleEn": "",
        "descZh": "入为京兆府尹，治京畿。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "xueneng"
        ],
        "source": "CBDB 95071（府尹，京兆府，870）"
      },
      {
        "year": 873,
        "eraZh": "咸通十四年",
        "coord": [
          117.181,
          34.261
        ],
        "labelPos": "top",
        "ancientZh": "彭城",
        "modernZh": "江苏徐州",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "徐州刺史、感化军节度使",
        "titleEn": "",
        "descZh": "出为徐州刺史，领感化军，在徐州数年。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "xueneng"
        ],
        "source": "CBDB 95071（州刺史，彭城，873—875、876—878）"
      },
      {
        "year": 878,
        "eraZh": "乾符五年",
        "coord": [
          113.85,
          34.03
        ],
        "labelPos": "top",
        "ancientZh": "许州",
        "modernZh": "河南许昌",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "许州刺史、忠武军节度使",
        "titleEn": "",
        "descZh": "移镇许州，领忠武军。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "xueneng"
        ],
        "source": "CBDB 95071（州刺史，許州，878—880）"
      },
      {
        "year": 880,
        "eraZh": "广明元年",
        "coord": [
          113.85,
          34.03
        ],
        "labelPos": "top",
        "ancientZh": "许州",
        "modernZh": "河南许昌",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "死于许州",
        "titleEn": "",
        "descZh": "广明元年，许州军乱，薛能遇害。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "xueneng"
        ],
        "source": "CBDB 95071（c_deathyear=880）；死事据两《唐书》本传"
      }
    ]
  });

  pushJourney({
    "key": "yuanzhen",
    "dynastyKey": "tang",
    "color": "#7a5c3e",
    "shortZh": "元稹：从通州到越州",
    "shortEn": "",
    "titleZh": "元稹：从通州到越州",
    "titleEn": "Yuan Zhen: From Tongzhou to Yuezhou",
    "spanZh": "779年 — 831年",
    "spanEn": "",
    "stops": [
      {
        "year": 779,
        "eraZh": "大历十四年",
        "coord": [
          108.941,
          34.341
        ],
        "labelPos": "top",
        "ancientZh": "长安",
        "modernZh": "陕西西安",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "生于长安",
        "titleEn": "",
        "descZh": "元稹生于京兆长安，北魏宗室后裔。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "yuanzhen"
        ],
        "source": "CBDB 32248（c_birthyear=779）"
      },
      {
        "year": 809,
        "eraZh": "元和四年",
        "coord": [
          108.941,
          34.341
        ],
        "labelPos": "top",
        "ancientZh": "长安",
        "modernZh": "陕西西安",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "监察御史",
        "titleEn": "",
        "descZh": "拜监察御史，分司东都，弹劾不避权贵。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "yuanzhen"
        ],
        "source": "CBDB 32248（監察御史，809）"
      },
      {
        "year": 815,
        "eraZh": "元和十年",
        "coord": [
          107.5,
          31.21
        ],
        "labelPos": "top",
        "ancientZh": "通州",
        "modernZh": "四川达州",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "通州司马",
        "titleEn": "",
        "descZh": "贬通州司马。白居易同时贬江州，两人有通江唱和。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "yuanzhen"
        ],
        "source": "CBDB 32248（司馬，通州，815）"
      },
      {
        "year": 819,
        "eraZh": "元和十四年",
        "coord": [
          108.941,
          34.341
        ],
        "labelPos": "top",
        "ancientZh": "长安",
        "modernZh": "陕西西安",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "膳部员外郎",
        "titleEn": "",
        "descZh": "量移回朝，为膳部员外郎，次年转祠部郎中。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "yuanzhen"
        ],
        "source": "CBDB 32248（膳部員外郎 819；祠部郎中 820）"
      },
      {
        "year": 821,
        "eraZh": "长庆元年",
        "coord": [
          108.941,
          34.341
        ],
        "labelPos": "top",
        "ancientZh": "长安",
        "modernZh": "陕西西安",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "翰林承旨学士、中书舍人",
        "titleEn": "",
        "descZh": "入翰林为承旨学士，兼中书舍人，掌内外制。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "yuanzhen"
        ],
        "source": "CBDB 32248（翰林承旨學士、中書舍人，821）"
      },
      {
        "year": 822,
        "eraZh": "长庆二年",
        "coord": [
          108.941,
          34.341
        ],
        "labelPos": "top",
        "ancientZh": "长安",
        "modernZh": "陕西西安",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "拜相",
        "titleEn": "",
        "descZh": "以工部侍郎同中书门下平章事，居相位。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "yuanzhen"
        ],
        "source": "CBDB 32248（宰相，822）"
      },
      {
        "year": 822,
        "eraZh": "长庆二年",
        "coord": [
          109.9393,
          34.7972
        ],
        "labelPos": "top",
        "ancientZh": "同州",
        "modernZh": "陕西大荔",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "同州刺史",
        "titleEn": "",
        "descZh": "罢相，出为同州刺史。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "yuanzhen"
        ],
        "source": "CBDB 32248（州刺史，馮翊／同州，822—823）"
      },
      {
        "year": 823,
        "eraZh": "长庆三年",
        "coord": [
          120.581,
          30.001
        ],
        "labelPos": "top",
        "ancientZh": "越州",
        "modernZh": "浙江绍兴",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "越州刺史、浙东观察使",
        "titleEn": "",
        "descZh": "转越州刺史，兼浙东观察使，在越州六年。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "yuanzhen"
        ],
        "source": "CBDB 32248（州刺史，越州／會稽，823—829）"
      },
      {
        "year": 829,
        "eraZh": "大和三年",
        "coord": [
          108.941,
          34.341
        ],
        "labelPos": "top",
        "ancientZh": "长安",
        "modernZh": "陕西西安",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "尚书左丞",
        "titleEn": "",
        "descZh": "入朝为尚书左丞。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "yuanzhen"
        ],
        "source": "CBDB 32248（尚書左丞相，829）"
      },
      {
        "year": 830,
        "eraZh": "大和四年",
        "coord": [
          114.311,
          30.591
        ],
        "labelPos": "top",
        "ancientZh": "鄂州",
        "modernZh": "湖北武汉",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "武昌军节度使",
        "titleEn": "",
        "descZh": "出为武昌军节度使，驻鄂州，次年卒于任。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "yuanzhen"
        ],
        "source": "CBDB 32248（節度使，武昌軍節度，830—831）"
      }
    ]
  });

  addStops("libai", [
    {
      "year": 753,
      "eraZh": "天宝十二载",
      "coord": [
        118.76,
        30.95
      ],
      "labelPos": "top",
      "ancientZh": "宣城",
      "modernZh": "安徽宣城",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "宣城登楼",
      "titleEn": "",
      "descZh": "游宣城，登谢朓楼、上敬亭山。李白一生服膺谢朓，此地最称其心。",
      "descEn": "",
      "quoteZh": "李白《独坐敬亭山》：“相看两不厌，只有敬亭山。”",
      "quoteEn": "",
      "persons": [
        "libai"
      ],
      "source": "李白年谱；诗题《独坐敬亭山》"
    },
    {
      "year": 754,
      "eraZh": "天宝十三载",
      "coord": [
        117.49,
        30.66
      ],
      "labelPos": "top",
      "ancientZh": "秋浦",
      "modernZh": "安徽池州",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "秋浦歌",
      "titleEn": "",
      "descZh": "往来秋浦，作《秋浦歌》十七首。「白发三千丈」即出于此。",
      "descEn": "",
      "quoteZh": "李白《秋浦歌》：“白发三千丈，缘愁似个长。”",
      "quoteEn": "",
      "persons": [
        "libai"
      ],
      "source": "李白年谱；诗题《秋浦歌十七首》"
    },
    {
      "year": 755,
      "eraZh": "天宝十四载",
      "coord": [
        118.42,
        30.69
      ],
      "labelPos": "top",
      "ancientZh": "泾县",
      "modernZh": "安徽泾县",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "桃花潭别汪伦",
      "titleEn": "",
      "descZh": "游泾县桃花潭，村人汪伦以酒相送，作《赠汪伦》。此后一年安史乱起。",
      "descEn": "",
      "quoteZh": "李白《赠汪伦》：“桃花潭水深千尺，不及汪伦送我情。”",
      "quoteEn": "",
      "persons": [
        "libai"
      ],
      "source": "李白年谱；诗题《赠汪伦》"
    },
    {
      "year": 756,
      "eraZh": "至德元年",
      "coord": [
        115.98,
        29.55
      ],
      "labelPos": "top",
      "ancientZh": "庐山",
      "modernZh": "江西九江",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "屏风叠隐居",
      "titleEn": "",
      "descZh": "安史乱起，李白携妻隐于庐山屏风叠；同年冬永王李璘遣使征召，遂入幕府。",
      "descEn": "",
      "quoteZh": "",
      "quoteEn": "",
      "persons": [
        "libai"
      ],
      "source": "李白年谱；《旧唐书》卷一九〇《李白传》"
    }
  ]);
})();
