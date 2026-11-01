/**
 * 人物与行迹（生成物）
 * ⚠ 本文件由 poem-data/scripts/emit-atlas.mjs 生成，请勿手动编辑。
 *   内容源头：poem-data/data/*.json
 * 人物 20 位；新建行迹 13 条；补站 7 组 */

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

  // 仅在运行时修订；上游文件保持原样。同年同地存在多站时拒绝歧义覆盖。
  function addStops(key, stops) {
    var j = D.HISTORICAL_JOURNEYS.find(function (x) { return x.key === key; });
    if (!j) return;
    var merged = (j.stops || []).slice();
    stops.forEach(function (s) {
      var matches = merged.filter(function (x) { return x.year === s.year && x.ancientZh === s.ancientZh; });
      if (matches.length > 1) throw new Error('行迹修订有歧义：' + key + ' ' + s.ancientZh);
      if (!matches.length) merged.push(s);
      else for (var prop in s) {
        if (/En$/.test(prop) && !s[prop]) continue;
        matches[0][prop] = s[prop];
      }
    });
    merged.sort(function (a, b) { return a.year - b.year; });
    j.stops = merged;
  }

  mergePerson({
    "key": "baijuyi",
    "zh": "白居易",
    "en": "Bai Juyi",
    "courtesyZh": "字乐天 · 号香山居士 · 醉吟先生",
    "courtesyEn": "Layman of Fragrant Mountain",
    "spanNote": "",
    "dynastyKey": "tang",
    "span": [
      772,
      846
    ],
    "journeyKey": "baijuyi",
    "aliases": [
      "乐天",
      "白乐天",
      "香山居士",
      "醉吟先生",
      "Bai Juyi"
    ],
    "tokens": [
      "白居易",
      "乐天",
      "白乐天",
      "香山居士",
      "醉吟先生",
      "Bai Juyi"
    ]
  });

  pushPerson({
    "key": "censhen",
    "zh": "岑参",
    "en": "Cen Shen",
    "courtesyZh": "世称岑嘉州",
    "courtesyEn": "",
    "spanNote": "生年有 715 前后数说",
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
    "courtesyEn": "Poet Sage",
    "spanNote": "",
    "dynastyKey": "tang",
    "span": [
      712,
      770
    ],
    "journeyKey": "dufu",
    "aliases": [
      "子美",
      "杜子美",
      "杜工部",
      "杜少陵",
      "少陵野老",
      "诗圣",
      "Tu Fu",
      "Zimei",
      "Du Fu"
    ],
    "tokens": [
      "杜甫",
      "子美",
      "杜子美",
      "杜工部",
      "杜少陵",
      "少陵野老",
      "诗圣",
      "Tu Fu",
      "Zimei",
      "Du Fu"
    ]
  });

  pushPerson({
    "key": "dumu",
    "zh": "杜牧",
    "en": "",
    "courtesyZh": "",
    "courtesyEn": "",
    "spanNote": "",
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
    "courtesyEn": "Master Changli",
    "spanNote": "",
    "dynastyKey": "tang",
    "span": [
      768,
      824
    ],
    "journeyKey": "hanyu",
    "aliases": [
      "退之",
      "韩退之",
      "韩昌黎",
      "韩文公",
      "昌黎先生"
    ],
    "tokens": [
      "韩愈",
      "退之",
      "韩退之",
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
    "spanNote": "字胜欲 · 号竹山 · 生卒年无确考（约1245—1314 之后，卒年有异说）",
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
    "courtesyEn": "Poet Immortal",
    "spanNote": "",
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
    "courtesyEn": "Poet Hero of Mid-Tang",
    "spanNote": "",
    "dynastyKey": "tang",
    "span": [
      772,
      842
    ],
    "journeyKey": "liuyuxi",
    "aliases": [
      "梦得",
      "刘梦得",
      "诗豪"
    ],
    "tokens": [
      "刘禹锡",
      "梦得",
      "刘梦得",
      "诗豪"
    ]
  });

  mergePerson({
    "key": "ouyangxiu",
    "zh": "欧阳修",
    "en": "Ouyang Xiu",
    "courtesyZh": "醉翁 · 六一居士 · 字永叔",
    "courtesyEn": "Old Drunkard & Historian",
    "spanNote": "",
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
    "courtesyEn": "First Emperor of China",
    "spanNote": "",
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
      "始皇",
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
    "courtesyEn": "Su Dongpo",
    "spanNote": "",
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
      "苏东坡",
      "东坡",
      "子瞻",
      "苏子瞻",
      "东坡居士",
      "Su Dongpo",
      "Dongpo"
    ]
  });

  mergePerson({
    "key": "wangwei",
    "zh": "王维",
    "en": "Wang Wei",
    "courtesyZh": "字摩诘 · 世称王右丞",
    "courtesyEn": "Poet Buddha",
    "spanNote": "",
    "dynastyKey": "tang",
    "span": [
      701,
      761
    ],
    "journeyKey": "wangwei",
    "aliases": [
      "摩诘",
      "王摩诘",
      "王右丞",
      "诗佛"
    ],
    "tokens": [
      "王维",
      "摩诘",
      "王摩诘",
      "王右丞",
      "诗佛"
    ]
  });

  mergePerson({
    "key": "wangyangming",
    "zh": "王阳明",
    "en": "Wang Yangming",
    "courtesyZh": "王守仁 · 阳明心学宗师 · 知行合一",
    "courtesyEn": "Master of Mind-Heart Neo-Confucianism",
    "spanNote": "",
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
    "spanNote": "卒年史无确载，约 792 前后",
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

  pushPerson({
    "key": "weizhuang",
    "zh": "韦庄",
    "en": "Wei Zhuang",
    "courtesyZh": "字端己 · 韦应物四世孙",
    "courtesyEn": "",
    "spanNote": "",
    "dynastyKey": "tang",
    "span": [
      836,
      910
    ],
    "journeyKey": "weizhuang",
    "aliases": [
      "端己",
      "韦端己"
    ],
    "tokens": [
      "韦庄",
      "端己",
      "韦端己"
    ]
  });

  mergePerson({
    "key": "xuanzang",
    "zh": "玄奘",
    "en": "Xuanzang",
    "courtesyZh": "三藏法师 · 西行求法",
    "courtesyEn": "Master Tripitaka",
    "spanNote": "",
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
    "spanNote": "生年不详",
    "dynastyKey": "tang",
    "span": [
      null,
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
    "spanNote": "",
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
    "courtesyEn": "Marquis of Bowang",
    "spanNote": "",
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
    "courtesyEn": "Kongming, Chancellor of Shu",
    "spanNote": "",
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
    "key": "wangwei",
    "dynastyKey": "tang",
    "color": "#7a5c3e",
    "shortZh": "王维：从蒲州到长安",
    "shortEn": "",
    "titleZh": "王维：从蒲州到长安",
    "titleEn": "Wang Wei: From Puzhou to Chang'an",
    "spanZh": "701年 — 761年",
    "spanEn": "",
    "stops": [
      {
        "year": 701,
        "eraZh": "长安元年",
        "coord": [
          110.32,
          34.84
        ],
        "labelPos": "top",
        "ancientZh": "蒲州",
        "modernZh": "山西永济",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "生于蒲州",
        "titleEn": "",
        "descZh": "王维生于蒲州（今山西永济），祖籍太原祁县。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "wangwei"
        ],
        "source": "CBDB 32174（c_birthyear=701）；籍贯据《旧唐书》卷一九〇下《王维传》"
      },
      {
        "year": 721,
        "eraZh": "开元九年",
        "coord": [
          108.941,
          34.341
        ],
        "labelPos": "top",
        "ancientZh": "长安",
        "modernZh": "陕西西安",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "太乐丞",
        "titleEn": "",
        "descZh": "登进士第，为大乐丞；同年因伶人舞黄狮子事获罪，出为济州司仓参军。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "wangwei"
        ],
        "source": "CBDB 32174（太樂丞，長安，721）；贬济州据《旧唐书》本传"
      },
      {
        "year": 721,
        "eraZh": "开元九年",
        "coord": [
          116.2077,
          36.3784
        ],
        "labelPos": "top",
        "ancientZh": "济州",
        "modernZh": "山东茌平",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "济州司仓参军",
        "titleEn": "",
        "descZh": "贬济州司仓参军，在济州约五年。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "wangwei"
        ],
        "source": "CBDB 32174（州司倉參軍，濟州，721—726）"
      },
      {
        "year": 735,
        "eraZh": "开元二十三年",
        "coord": [
          108.941,
          34.341
        ],
        "labelPos": "top",
        "ancientZh": "长安",
        "modernZh": "陕西西安",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "右拾遗",
        "titleEn": "",
        "descZh": "得张九龄擢用，回朝为右拾遗，此后历监察御史、右补阙。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "wangwei"
        ],
        "source": "CBDB 32174（右拾遺 735；監察御史 737；右補闕 742）"
      },
      {
        "year": 752,
        "eraZh": "天宝十一载",
        "coord": [
          108.941,
          34.341
        ],
        "labelPos": "top",
        "ancientZh": "长安",
        "modernZh": "陕西西安",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "吏部郎中",
        "titleEn": "",
        "descZh": "历库部员外郎、吏部郎中，在朝掌选事。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "wangwei"
        ],
        "source": "CBDB 32174（郎中 746—750；庫部員外郎 746；吏部郎中 752）"
      },
      {
        "year": 756,
        "eraZh": "至德元载",
        "coord": [
          112.451,
          34.621
        ],
        "labelPos": "top",
        "ancientZh": "洛阳",
        "modernZh": "河南洛阳",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "陷贼，受伪署",
        "titleEn": "",
        "descZh": "安禄山陷两京，王维被拘，送至洛阳，迫受给事中伪职；曾服药取痢以免，仍不免。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "wangwei"
        ],
        "source": "《旧唐书》卷一九〇下《王维传》；CBDB 32174（給事中 755、756）"
      },
      {
        "year": 758,
        "eraZh": "乾元元年",
        "coord": [
          108.941,
          34.341
        ],
        "labelPos": "top",
        "ancientZh": "长安",
        "modernZh": "陕西西安",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "太子中允",
        "titleEn": "",
        "descZh": "两京收复后，以陷贼官论罪，因《凝碧池》诗与弟王缙请赎，责授太子中允。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "wangwei"
        ],
        "source": "CBDB 32174（太子中允，758）；责授缘由据《旧唐书》本传"
      },
      {
        "year": 761,
        "eraZh": "上元二年",
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
        "descZh": "官终尚书右丞，世称「王右丞」；上元二年卒，年六十一。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "wangwei"
        ],
        "source": "CBDB 32174（尚書右丞相 760；c_deathyear=761）"
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
    "key": "weizhuang",
    "dynastyKey": "tang",
    "color": "#7a5c3e",
    "shortZh": "韦庄：从长安到成都",
    "shortEn": "",
    "titleZh": "韦庄：从长安到成都",
    "titleEn": "Wei Zhuang: From Chang'an to Chengdu",
    "spanZh": "836年 — 910年",
    "spanEn": "",
    "stops": [
      {
        "year": 836,
        "eraZh": "开成元年",
        "coord": [
          108.941,
          34.341
        ],
        "labelPos": "top",
        "ancientZh": "长安",
        "modernZh": "陕西西安",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "生于京兆杜陵",
        "titleEn": "",
        "descZh": "韦庄生于京兆杜陵，为韦应物四世孙。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "weizhuang"
        ],
        "source": "CBDB 92161（c_birthyear=836）；籍贯据《十国春秋》卷四十《韦庄传》"
      },
      {
        "year": 883,
        "eraZh": "中和三年",
        "coord": [
          108.941,
          34.341
        ],
        "labelPos": "top",
        "ancientZh": "长安",
        "modernZh": "陕西西安",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "困居长安，作《秦妇吟》",
        "titleEn": "",
        "descZh": "黄巢据长安，韦庄困于城中，后以此经历作长篇《秦妇吟》；这一联写的正是长安城破后的景象。",
        "descEn": "",
        "quoteZh": "韦庄《秦妇吟》：“内库烧为锦绣灰，天街踏尽公卿骨。”",
        "quoteEn": "",
        "persons": [
          "weizhuang"
        ],
        "source": "《秦妇吟》开篇自述（中和癸卯＝883）；地点据诗中所述与《十国春秋》本传"
      },
      {
        "year": 894,
        "eraZh": "乾宁元年",
        "coord": [
          108.941,
          34.341
        ],
        "labelPos": "top",
        "ancientZh": "长安",
        "modernZh": "陕西西安",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "进士及第",
        "titleEn": "",
        "descZh": "年近六十始登进士第，释褐为校书郎。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "weizhuang"
        ],
        "source": "《十国春秋》卷四十《韦庄传》（乾宁元年登进士第）"
      },
      {
        "year": 900,
        "eraZh": "光化三年",
        "coord": [
          108.941,
          34.341
        ],
        "labelPos": "top",
        "ancientZh": "长安",
        "modernZh": "陕西西安",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "左补阙",
        "titleEn": "",
        "descZh": "在朝为左补阙。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "weizhuang"
        ],
        "source": "CBDB 92161（左補闕，900）；在朝据本传"
      },
      {
        "year": 901,
        "eraZh": "天复元年",
        "coord": [
          104.071,
          30.571
        ],
        "labelPos": "top",
        "ancientZh": "成都",
        "modernZh": "四川成都",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "入蜀，王建辟为掌书记",
        "titleEn": "",
        "descZh": "入蜀依王建，为节度掌书记，此后长居成都。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "weizhuang"
        ],
        "source": "CBDB 92161（節度使掌書記，901，无任职地）；入蜀据《十国春秋》本传"
      },
      {
        "year": 907,
        "eraZh": "开平元年",
        "coord": [
          104.071,
          30.571
        ],
        "labelPos": "top",
        "ancientZh": "成都",
        "modernZh": "四川成都",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "前蜀左散骑常侍",
        "titleEn": "",
        "descZh": "王建称帝，国号蜀，韦庄为左散骑常侍，参与开国制度。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "weizhuang"
        ],
        "source": "CBDB 92161（左散騎常侍，907）；前蜀开国据《十国春秋》本传"
      },
      {
        "year": 908,
        "eraZh": "开平二年",
        "coord": [
          104.071,
          30.571
        ],
        "labelPos": "top",
        "ancientZh": "成都",
        "modernZh": "四川成都",
        "ancientEn": "",
        "modernEn": "",
        "titleZh": "同中书门下平章事",
        "titleEn": "",
        "descZh": "拜同中书门下平章事，为前蜀宰相。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "weizhuang"
        ],
        "source": "CBDB 92161（同中書門下平章事、門下侍郎，908）"
      },
      {
        "year": 910,
        "eraZh": "开平四年",
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
        "descZh": "开平四年卒于成都，年七十五。",
        "descEn": "",
        "quoteZh": "",
        "quoteEn": "",
        "persons": [
          "weizhuang"
        ],
        "source": "CBDB 92161（c_deathyear=910）；卒地据《十国春秋》本传"
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
      "year": 701,
      "eraZh": "长安元年",
      "coord": [
        75.29,
        42.83
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "碎叶城",
      "modernZh": "吉尔吉斯斯坦托克马克",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "诞于西域·安西碎叶",
      "titleEn": "",
      "descZh": "长安元年（701年），李白诞于唐安西都护府碎叶城（今楚河流域托克马克附近），幼承丝路胡汉交融之风，五岁随父李客东迁入蜀。",
      "descEn": "",
      "quoteZh": "范传正《唐左拾遗翰林学士李公新墓碑》：“隋末多难，一房被窜于碎叶，流离散落，隐易姓名。”",
      "quoteEn": "",
      "persons": [
        "libai"
      ],
      "source": "（上游数据）"
    },
    {
      "year": 705,
      "eraZh": "神龙元年",
      "coord": [
        104.74,
        31.78
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "绵州青莲",
      "modernZh": "四川江油青莲镇",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "卜居青莲·大匡山读书",
      "titleEn": "",
      "descZh": "随父客居剑南道绵州昌隆县青莲乡（自号“青莲居士”）。少时博学广览、好剑术任侠，隐大匡山读书，后游成都、登峨眉，受道士司马承祯赞为“有仙风道骨，可与神游八极之表”，作《大鹏遇希有鸟赋》。",
      "descEn": "",
      "quoteZh": "李白《上安州裴长史书》：“五岁诵六甲，十岁观百家……十五观奇书，作赋凌相如。”",
      "quoteEn": "",
      "persons": [
        "libai"
      ],
      "source": "（上游数据）"
    },
    {
      "year": 724,
      "eraZh": "开元十二年",
      "coord": [
        106.55,
        29.56
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "渝州",
      "modernZh": "重庆",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "夜发清溪·思君下渝州",
      "titleEn": "",
      "descZh": "年二十四的李白自蜀中启程远游，登峨眉山辞别蜀中山水，乘舟自清溪顺平羌江（青衣江）、岷江东下渝州，写下清丽绝伦的《峨眉山月歌》。",
      "descEn": "",
      "quoteZh": "李白《峨眉山月歌》：“峨眉山月半轮秋，影入平羌江水流。夜发清溪向三峡，思君不见下渝州。”",
      "quoteEn": "",
      "persons": [
        "libai"
      ],
      "source": "（上游数据）"
    },
    {
      "year": 725,
      "eraZh": "开元十三年",
      "coord": [
        111.45,
        30.69
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "荆门",
      "modernZh": "湖北宜都",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "仗剑去国·辞亲出三峡",
      "titleEn": "",
      "descZh": "怀济世远志“仗剑去国，辞亲远游”，自渝州穿瞿塘、巫峡、西陵三峡，出荆门山初见江汉平原天地壮阔，写下《渡荆门送别》。",
      "descEn": "",
      "quoteZh": "李白《渡荆门送别》：“山随平野尽，江入大荒流。月下飞天镜，云生结海楼。”",
      "quoteEn": "",
      "persons": [
        "libai"
      ],
      "source": "（上游数据）"
    },
    {
      "year": 726,
      "eraZh": "开元十四年",
      "coord": [
        119.41,
        32.39
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "扬州",
      "modernZh": "江苏扬州",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "漫游吴越·散金三十万",
      "titleEn": "",
      "descZh": "顺江东下，登庐山望瀑布、游金陵怀古，转赴繁华甲天下的淮南都会扬州与吴越诸郡，豪爽济困，“不逾一年，散金三十余万”，写就《望庐山瀑布》《静夜思》等千古绝唱。",
      "descEn": "",
      "quoteZh": "李白《上安州裴长史书》：“曩昔东游维扬，不逾一年，散金三十余万，有落魄公子，悉皆济之。”",
      "quoteEn": "",
      "persons": [
        "libai"
      ],
      "source": "（上游数据）"
    },
    {
      "year": 727,
      "eraZh": "开元十五年",
      "coord": [
        113.69,
        31.26
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "安陆",
      "modernZh": "湖北安陆",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "酒隐安陆·登临黄鹤楼",
      "titleEn": "",
      "descZh": "西归荆楚，赘于安陆故相许圉师孙女家，隐居白兆山桃花岩所谓“酒隐安陆，蹉跎十年”；其间频游江夏与襄阳，结交孟浩然，于黄鹤楼赋诗送其东下广陵。",
      "descEn": "",
      "quoteZh": "李白《黄鹤楼送孟浩然之广陵》：“故人西辞黄鹤楼，烟花三月下扬州。孤帆远影碧空尽，唯见长江天际流。”",
      "quoteEn": "",
      "persons": [
        "libai"
      ],
      "source": "（上游数据）"
    },
    {
      "year": 742,
      "eraZh": "天宝元年",
      "coord": [
        108.94,
        34.26
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "长安",
      "modernZh": "陕西西安",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "奉诏入京·翰林待诏",
      "titleEn": "",
      "descZh": "因道士吴筠及玉真公主举荐，唐玄宗降诏征召入京。李白高歌“仰天大笑出门去，我辈岂是蓬蒿人”西入长安，贺知章读《蜀道难》惊呼“谪仙人”，玄宗降辇步迎、供奉翰林，赋《清平调》三章。",
      "descEn": "",
      "quoteZh": "李白《南陵别儿童入京》：“仰天大笑出门去，我辈岂是蓬蒿人！”",
      "quoteEn": "",
      "persons": [
        "libai"
      ],
      "source": "（上游数据）"
    },
    {
      "year": 744,
      "eraZh": "天宝三载春",
      "coord": [
        112.45,
        34.62
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "洛阳",
      "modernZh": "河南洛阳",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "赐金放还·洛阳逢杜甫",
      "titleEn": "",
      "descZh": "因傲岸不羁遭权贵谗毁，玄宗“赐金放还”。李白东出长安至东都洛阳，与年三十三的杜甫初遇定交，中国诗史双子星于此风云际会。",
      "descEn": "",
      "quoteZh": "杜甫《寄李十二白二十韵》：“乞归优诏许，遇我宿心亲。醉舞梁园夜，行歌泗水春。”",
      "quoteEn": "",
      "persons": [
        "libai"
      ],
      "source": "（上游数据）"
    },
    {
      "year": 744,
      "eraZh": "天宝三载秋",
      "coord": [
        115.65,
        34.44
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "睢阳",
      "modernZh": "河南商丘",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "梁园豪游·偕杜甫高适猎孟诸",
      "titleEn": "",
      "descZh": "秋与杜甫、高适同游梁宋（汴州开封、宋州商丘），登梁王吹台怀古、纵猎孟诸泽，饮酒赋诗，在睢阳梁园挥毫题壁作《梁园吟》。",
      "descEn": "",
      "quoteZh": "李白《梁园吟》：“我浮黄河去京阙，挂席欲进波连山。天长水阔厌远涉，访古始及平台间。”",
      "quoteEn": "",
      "persons": [
        "libai"
      ],
      "source": "（上游数据）"
    },
    {
      "year": 745,
      "eraZh": "天宝四载",
      "coord": [
        116.59,
        35.41
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "任城",
      "modernZh": "山东济宁",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "东游齐鲁·梦游天姥",
      "titleEn": "",
      "descZh": "寄家山东兖州任城，与杜甫携手同游齐鲁，访范十隐居、登泰山徂徕，于紫极宫受道箓；临别东鲁南游越中时赋《梦游天姥吟留别》，喊出“安能摧眉折腰事权贵，使我不得开心颜”之千古强音。",
      "descEn": "",
      "quoteZh": "李白《梦游天姥吟留别》：“安能摧眉折腰事权贵，使我不得开心颜！”",
      "quoteEn": "",
      "persons": [
        "libai"
      ],
      "source": "（上游数据）"
    },
    {
      "year": 753,
      "eraZh": "天宝十二载",
      "coord": [
        118.76,
        30.95
      ],
      "labelPos": "top",
      "kind": "office",
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
      "kind": "office",
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
      "kind": "office",
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
      "kind": "office",
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
    },
    {
      "year": 759,
      "eraZh": "乾元二年",
      "coord": [
        109.57,
        31.04
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "白帝城",
      "modernZh": "重庆奉节",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "长流夜郎·白帝遇赦还江陵",
      "titleEn": "",
      "descZh": "安史之乱起，李白怀平胡复国之志入永王李璘幕府，兵败后系浔阳狱，坐长流夜郎（黔中）；乾元二年春溯江行至巫山白帝城，忽逢关内大旱朝廷大赦天下，惊喜放舟东下江陵，写下《早发白帝城》。",
      "descEn": "",
      "quoteZh": "李白《早发白帝城》：“朝辞白帝彩云间，千里江陵一日还。两岸猿声啼不住，轻舟已过万重山。”",
      "quoteEn": "",
      "persons": [
        "libai"
      ],
      "source": "（上游数据）"
    },
    {
      "year": 762,
      "eraZh": "宝应元年",
      "coord": [
        118.49,
        31.55
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "当涂",
      "modernZh": "安徽马鞍山·当涂",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "赋临路歌·终老当涂青山",
      "titleEn": "",
      "descZh": "晚年漂泊金陵、宣城、秋浦之间，闻太尉李光弼统军讨史朝义，六十一岁仍请缨从军，行至金陵因病折返，依族叔当涂令李阳冰；宝应元年十一月赋《临路歌》绝笔，病逝于当涂，终葬谢朓曾游之青山。",
      "descEn": "",
      "quoteZh": "李白《临路歌》：“大鹏飞兮振八裔，中天摧兮力不济。馀风激兮万世，游扶桑兮挂石袂。”",
      "quoteEn": "",
      "persons": [
        "libai"
      ],
      "source": "（上游数据）"
    }
  ]);

  addStops("qinshihuang", [
    {
      "year": -238,
      "eraZh": "秦王政九年",
      "coord": [
        108.71,
        34.33
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "咸阳",
      "modernZh": "陕西咸阳",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "亲政平乱·蓄势东出",
      "titleEn": "",
      "descZh": "二十二岁的秦王政在故都雍城蕲年宫行冠礼亲政，旋即发兵平定长信侯嫪毐之乱，次年罢免相邦吕不韦。随后采纳大梁人尉缭、楚人李斯“远交近攻、先弱后强、各个击破”之策，倾关中与巴蜀之力，蓄势东出函谷关。",
      "descEn": "",
      "quoteZh": "《史记·秦始皇本纪》引尉缭语：“秦王为人，蜂准，长目，挚鸟膺，豺声，少恩而虎狼之心……诚得志于天下，天下皆为虏矣。”",
      "quoteEn": "",
      "persons": [
        "qinshihuang"
      ],
      "source": "（上游数据）"
    },
    {
      "year": -236,
      "eraZh": "秦王政十一年",
      "coord": [
        114.35,
        36.32
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "邺城",
      "modernZh": "河北临漳西南",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "攻赵取邺·灭国序幕",
      "titleEn": "",
      "descZh": "趁赵燕交兵、赵军主力北上攻燕之际，秦王政命王翦、桓齮、杨端和三路大军东出伐赵，连拔邺城、阏与等九城。此役夺取赵国南部漳水门户，正式拉开秦灭六国十年统一战争的序幕。",
      "descEn": "",
      "quoteZh": "《史记·秦始皇本纪》：“十一年，王翦、桓齮、杨端和攻邺，取九城。”",
      "quoteEn": "",
      "persons": [
        "qinshihuang"
      ],
      "source": "（上游数据）"
    },
    {
      "year": -230,
      "eraZh": "秦王政十七年",
      "coord": [
        113.74,
        34.4
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "新郑",
      "modernZh": "河南新郑",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "内史腾灭韩·六国首灭",
      "titleEn": "",
      "descZh": "韩国扼守函谷关外，为秦东进首冲。秦内史腾率军渡河急袭韩都新郑，一举俘虏韩王安，尽收其地设立颍川郡（治阳翟）。韩国成为战国七雄中第一个覆灭的诸侯国，秦军由此牢牢扼住中原腹心。",
      "descEn": "",
      "quoteZh": "《史记·秦始皇本纪》：“十七年，内史腾攻韩，得韩王安，尽纳其地，以其地为郡，命曰颍川。”",
      "quoteEn": "",
      "persons": [
        "qinshihuang"
      ],
      "source": "（上游数据）"
    },
    {
      "year": -228,
      "eraZh": "秦王政十九年",
      "coord": [
        114.48,
        36.61
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "邯郸",
      "modernZh": "河北邯郸",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "王翦克邯郸·破灭赵国",
      "titleEn": "",
      "descZh": "赵国名将李牧屡挫秦军。秦军重金行反间计于赵王宠臣郭开，赵王迁自毁长城冤杀李牧、废司马尚。王翦遂猛攻大破赵军，于前228年攻克赵都邯郸，俘赵王迁；秦王政亲赴邯郸尽坑昔日母家仇人。赵公子嘉率宗族北奔代郡称代王。",
      "descEn": "",
      "quoteZh": "《战国策》及《史记》：“赵葱死，颜聚亡，后三月，王翦因急击，大破赵，杀赵葱，虏赵王迁及其将颜聚，遂灭赵。”",
      "quoteEn": "",
      "persons": [
        "qinshihuang"
      ],
      "source": "（上游数据）"
    },
    {
      "year": -226,
      "eraZh": "秦王政二十一年",
      "coord": [
        116.32,
        39.9
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "蓟城",
      "modernZh": "北京西南",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "图穷匕见与易水破燕·攻拔蓟城",
      "titleEn": "",
      "descZh": "秦军饮马易水，燕太子丹于前227年遣荆轲歌“风萧萧兮易水寒”入咸阳献督亢地图刺秦，图穷匕见未果。秦王政震怒，命王翦、辛胜率主力北伐，于易水之西大破燕代联军，前226年十月攻拔燕都蓟城。燕王喜斩太子丹首级献秦求和未果，退保辽东襄平。",
      "descEn": "",
      "quoteZh": "《战国策·燕策三》：“风萧萧兮易水寒，壮士一去兮不复还！”",
      "quoteEn": "",
      "persons": [
        "qinshihuang"
      ],
      "source": "（上游数据）"
    },
    {
      "year": -225,
      "eraZh": "秦王政二十二年",
      "coord": [
        114.35,
        34.79
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "大梁",
      "modernZh": "河南开封",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "王贲水灌大梁·荡平魏国",
      "titleEn": "",
      "descZh": "魏都大梁城垣坚厚、护城河深广，易守难攻。王翦之子王贲率军南下攻魏，掘开黄河与鸿沟水渠引水灌城。浸灌三月，大梁城墙崩坏，魏王假出降被杀，秦尽收魏地设砀郡，三晋至此尽入于秦。",
      "descEn": "",
      "quoteZh": "《史记·秦始皇本纪》：“二十二年，王贲攻魏，引河沟灌大梁，大梁城坏，其王请降，尽取其地。”",
      "quoteEn": "",
      "persons": [
        "qinshihuang"
      ],
      "source": "（上游数据）"
    },
    {
      "year": -223,
      "eraZh": "秦王政二十四年",
      "coord": [
        116.78,
        32.58
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "寿春",
      "modernZh": "安徽寿县",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "王翦六十万破楚·攻克寿春",
      "titleEn": "",
      "descZh": "李信率二十万秦军伐楚先胜后败，为项燕所乘。秦王政亲赴频阳向老将王翦谢过，倾全国六十万大军托付王翦、蒙武。王翦坚壁不出以老楚师，待楚军东撤之际大举追击，于蕲南击杀项燕，攻克楚都寿春，俘楚王负刍，广袤楚地尽归于秦。",
      "descEn": "",
      "quoteZh": "《史记·白起王翦列传》：“王翦果代李信击荆……荆数挑战而秦不出。乃引而东。翦因举兵追之，令壮士击，大破荆军。”",
      "quoteEn": "",
      "persons": [
        "qinshihuang"
      ],
      "source": "（上游数据）"
    },
    {
      "year": -222,
      "eraZh": "秦王政二十五年",
      "coord": [
        123.17,
        41.27
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "襄平",
      "modernZh": "辽宁辽阳",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "远征辽东·灭燕平代定江南",
      "titleEn": "",
      "descZh": "王贲、李信挥师东北远征辽东，攻破襄平，俘燕王喜，燕国彻底灭亡；旋即回师北击代郡，俘代王嘉，赵氏余脉亦绝。同年南线王翦大军渡江平定楚国江南旧地，降服越君，置会稽郡。天下六国仅余东海之滨的齐国孤悬。",
      "descEn": "",
      "quoteZh": "《史记·秦始皇本纪》：“二十五年，大兴兵，使王贲将，攻燕辽东，得燕王喜。还攻代，虏代王嘉。王翦遂定荆江南地。”",
      "quoteEn": "",
      "persons": [
        "qinshihuang"
      ],
      "source": "（上游数据）"
    },
    {
      "year": -221,
      "eraZh": "秦始皇二十六年",
      "coord": [
        118.35,
        36.82
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "临淄",
      "modernZh": "山东淄博临淄",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "六王毕·四海一（齐降天下一统）",
      "titleEn": "",
      "descZh": "齐相后胜受秦重金贿赂，劝齐王建不修战备、不援五国，仅于西界屯兵防秦。前221年，王贲、李信、蒙恬自燕地南下避开齐军西境主力，径直突入齐都临淄，齐王建不战出降。秦王政遂完成统一大业，定尊号“始皇帝”，废分封、设三十六郡，开创中国两千年大一统格局。",
      "descEn": "",
      "quoteZh": "杜牧《阿房宫赋》：“六王毕，四海一。” · 《史记·秦始皇本纪》：“秦初并天下……法令由一统。”",
      "quoteEn": "",
      "persons": [
        "qinshihuang"
      ],
      "source": "（上游数据）"
    }
  ]);

  addStops("sushi", [
    {
      "year": 1056,
      "eraZh": "嘉祐元年",
      "coord": [
        103.85,
        30.05
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "眉州",
      "modernZh": "四川眉山",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "弱冠出蜀·仗剑远游",
      "titleEn": "",
      "descZh": "年二十一的苏轼与弟苏辙随父苏洵自蜀中眉州启程，乘舟循岷江入长江，复由褒斜道越秦岭赴东京汴梁应试。",
      "descEn": "",
      "quoteZh": "苏轼《初发嘉州》：“朝发鼓阗阗，西风猎画旃。故乡飘已远，往意浩无边。”",
      "quoteEn": "",
      "persons": [
        "sushi"
      ],
      "source": "（上游数据）"
    },
    {
      "year": 1057,
      "eraZh": "嘉祐二年",
      "coord": [
        114.35,
        34.79
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "东京开封府",
      "modernZh": "河南开封",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "金榜题名·名动京师",
      "titleEn": "",
      "descZh": "嘉祐二年春闱，主考官欧阳修读苏轼《刑赏忠厚之至论》惊喜击节，苏氏兄弟同科进士及第，文名震动汴京。",
      "descEn": "",
      "quoteZh": "欧阳修《与梅圣俞书》：“读轼书，不觉汗出，快哉快哉！老夫当避路，放他出一头地也。”",
      "quoteEn": "",
      "persons": [
        "sushi"
      ],
      "source": "（上游数据）"
    },
    {
      "year": 1061,
      "eraZh": "嘉祐六年",
      "coord": [
        107.39,
        34.52
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "凤翔府",
      "modernZh": "陕西凤翔",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "初仕关中·签判凤翔",
      "titleEn": "",
      "descZh": "制科入第三等，授大理评事、签书凤翔府判官。初历地方吏治，兴修东湖、革除衙前弊政，作《喜雨亭记》《石鼓歌》。",
      "descEn": "",
      "quoteZh": "苏轼《喜雨亭记》：“使天而雨珠，寒者不得以为襦；使天而雨玉，饥者不得以为粟。”",
      "quoteEn": "",
      "persons": [
        "sushi"
      ],
      "source": "（上游数据）"
    },
    {
      "year": 1071,
      "eraZh": "熙宁四年",
      "coord": [
        120.15,
        30.28
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "杭州",
      "modernZh": "浙江杭州",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "外放通判·寄情西湖",
      "titleEn": "",
      "descZh": "因上书直陈王安石新法之弊，自请外放任杭州通判（后于元祐四年再知杭州浚湖筑苏堤），巡行属县、赈济灾荒，留下无数西湖诗篇。",
      "descEn": "",
      "quoteZh": "苏轼《饮湖上初晴后雨》：“欲把西湖比西子，淡妆浓抹总相宜。”",
      "quoteEn": "",
      "persons": [
        "sushi"
      ],
      "source": "（上游数据）"
    },
    {
      "year": 1075,
      "eraZh": "熙宁八年",
      "coord": [
        119.4,
        35.99
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "密州",
      "modernZh": "山东诸城",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "知密州·超然豪放",
      "titleEn": "",
      "descZh": "主动求调密州知州，抗旱捕蝗、收养弃婴；于超然台思念胞弟苏辙，写就《水调歌头·明月几时有》与《江城子·密州出猎》，开宋词豪放一派。",
      "descEn": "",
      "quoteZh": "苏轼《水调歌头》：“人有悲欢离合，月有阴晴圆缺，此事古难全。但愿人长久，千里共婵娟。”",
      "quoteEn": "",
      "persons": [
        "sushi"
      ],
      "source": "（上游数据）"
    },
    {
      "year": 1077,
      "eraZh": "熙宁十年",
      "coord": [
        117.18,
        34.26
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "徐州",
      "modernZh": "江苏徐州",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "知徐州·抗洪筑黄楼",
      "titleEn": "",
      "descZh": "知徐州时黄河决口于澶州曹村，洪峰直逼徐州城下。苏轼布衣草履庐于城上，亲率禁军与民夫筑长堤死守七十余日保住全城，水退后于东门筑黄楼以镇水患。",
      "descEn": "",
      "quoteZh": "苏轼《答范淳甫》：“吾在徐州，与民同患难，水退而筑黄楼以镇之。”",
      "quoteEn": "",
      "persons": [
        "sushi"
      ],
      "source": "（上游数据）"
    },
    {
      "year": 1079,
      "eraZh": "元丰二年",
      "coord": [
        120.09,
        30.89
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "湖州",
      "modernZh": "浙江湖州",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "移知湖州·乌台诗案",
      "titleEn": "",
      "descZh": "元丰二年春自徐州移知湖州，上《湖州谢上表》因“知其愚不适时，难以追陪新进”等语遭御史台李定、舒亶等摘句弹劾“讪谤新法”，七月于湖州州衙被皇甫遵逮捕押赴汴京御史台诏狱，史称“乌台诗案”。",
      "descEn": "",
      "quoteZh": "苏轼《狱中寄子由》：“是处青山可埋骨，他年夜雨独伤神。与君世世为兄弟，更结来生未了因。”",
      "quoteEn": "",
      "persons": [
        "sushi"
      ],
      "source": "（上游数据）"
    },
    {
      "year": 1080,
      "eraZh": "元丰三年",
      "coord": [
        114.87,
        30.45
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "黄州",
      "modernZh": "湖北黄冈",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "贬谪黄州·东坡赤壁",
      "titleEn": "",
      "descZh": "出狱后责授检校水部员外郎、黄州团练副使。躬耕城东荒坡自号“东坡居士”，于困顿中完成了精神蜕变，写出《定风波》《念奴娇·赤壁怀古》、前后《赤壁赋》与《寒食帖》。",
      "descEn": "",
      "quoteZh": "苏轼《定风波》：“竹杖芒鞋轻胜马，谁怕？一蓑烟雨任平生。”",
      "quoteEn": "",
      "persons": [
        "sushi"
      ],
      "source": "（上游数据）"
    },
    {
      "year": 1094,
      "eraZh": "绍圣元年",
      "coord": [
        114.41,
        23.11
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "惠州",
      "modernZh": "广东惠州",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "再贬岭南·寓居惠州",
      "titleEn": "",
      "descZh": "元祐更化曾召还翰林学士、知杭州颍州扬州定州；绍圣元年哲宗亲政后新党复起，年近六旬的苏轼远贬岭南惠州安置，捐犀带助修东新桥、西新桥。",
      "descEn": "",
      "quoteZh": "苏轼《食荔枝》：“日啖荔枝三百颗，不辞长作岭南人。”",
      "quoteEn": "",
      "persons": [
        "sushi"
      ],
      "source": "（上游数据）"
    },
    {
      "year": 1097,
      "eraZh": "绍圣四年",
      "coord": [
        109.58,
        19.52
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "儋州",
      "modernZh": "海南儋州",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "渡海琼州·敷文儋耳",
      "titleEn": "",
      "descZh": "六十二岁再贬琼州别驾、昌化军（儋州）安置。跨海抵天涯绝岛，居桄榔庵、食芋饮水、讲学授徒，开启琼州文教之风，培养出海南首位举人姜唐佐。",
      "descEn": "",
      "quoteZh": "苏轼《六月二十日夜渡海》：“九死南荒吾不恨，兹游奇绝冠平生。”",
      "quoteEn": "",
      "persons": [
        "sushi"
      ],
      "source": "（上游数据）"
    },
    {
      "year": 1101,
      "eraZh": "建中靖国元年",
      "coord": [
        119.97,
        31.81
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "常州",
      "modernZh": "江苏常州",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "遇赦北归·终老毗陵",
      "titleEn": "",
      "descZh": "元符三年徽宗即位大赦北归，渡海经廉州、永州沿赣江北上；建中靖国元年七月廿八日病逝于常州顾塘桥孙氏馆，享年六十六岁。",
      "descEn": "",
      "quoteZh": "苏轼《自题金山画像》：“心似已灰之木，身如不系之舟。问汝平生功业，黄州惠州儋州。”",
      "quoteEn": "",
      "persons": [
        "sushi"
      ],
      "source": "（上游数据）"
    }
  ]);

  addStops("wangyangming", [
    {
      "year": 1472,
      "eraZh": "成化八年",
      "coord": [
        121.15,
        30.04
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "余姚",
      "modernZh": "浙江宁波余姚",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "降生瑞云·志在圣贤",
      "titleEn": "",
      "descZh": "王守仁诞生于浙江绍兴府余姚县瑞云楼，父王华次年高中状元。十一岁随祖父北上京师塾读，问塾师“何为第一等事”，师答“惟读书登第耳”，守仁昂然对曰：“登第恐未为第一等事，或读书学圣贤耳。”自幼立下成圣之志。",
      "descEn": "",
      "quoteZh": "《王阳明先生年谱》引少时语：“登第恐未为第一等事，或读书学圣贤耳。”",
      "quoteEn": "",
      "persons": [
        "wangyangming"
      ],
      "source": "（上游数据）"
    },
    {
      "year": 1489,
      "eraZh": "弘治二年",
      "coord": [
        117.97,
        28.45
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "广信",
      "modernZh": "江西上饶",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "谒娄一斋·始闻格物",
      "titleEn": "",
      "descZh": "十八岁自南昌迎妇归余姚，舟次江西广信（今上饶），特往拜谒崇仁学派大儒娄谅（娄一斋）。娄谅向其阐发宋儒格物穷理之旨，语以“圣人必可学而至”，守仁深相契合，自此笃志圣学，归后遍读考亭朱子遗书。",
      "descEn": "",
      "quoteZh": "《明史·王守仁传》：“过广信，谒娄谅，语以圣人可学而至，遂深契之。”",
      "quoteEn": "",
      "persons": [
        "wangyangming"
      ],
      "source": "（上游数据）"
    },
    {
      "year": 1492,
      "eraZh": "弘治五年",
      "coord": [
        116.4,
        39.9
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "京师",
      "modernZh": "北京",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "格竹致疾·进士及第",
      "titleEn": "",
      "descZh": "在京师欲依朱熹“即物穷理”之法穷究草木之理，与钱友同坐亭前面竹“格竹”七日七夜，理未得而劳神成疾，始疑外求之弊。弘治十二年（1499）赐进士及第，历任工部、刑部主事，究心兵法韬略与经世之学。",
      "descEn": "",
      "quoteZh": "《传习录》：“众人只说格物要依晦翁，何曾把他的说去用？我着实曾用来。”",
      "quoteEn": "",
      "persons": [
        "wangyangming"
      ],
      "source": "（上游数据）"
    },
    {
      "year": 1506,
      "eraZh": "正德元年",
      "coord": [
        120.2,
        30.22
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "钱塘江",
      "modernZh": "浙江杭州钱塘江口",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "廷杖下狱·投江脱险",
      "titleEn": "",
      "descZh": "正德元年，司礼监权宦刘瑾擅权，逮捕南京给事中戴铣等二十余人。守仁抗疏力救，触怒刘瑾，被廷杖四十下诏狱，谪贵州龙场驿丞。南下途经杭州钱塘江，刘瑾遣刺客尾随欲加害，守仁夜掷衣冠于江中留绝命诗诈死，乘海舟脱险。",
      "descEn": "",
      "quoteZh": "王阳明《泛海》：“险夷原不滞胸中，何异浮云过太空！夜静海涛三万里，月明飞锡下天风。”",
      "quoteEn": "",
      "persons": [
        "wangyangming"
      ],
      "source": "（上游数据）"
    },
    {
      "year": 1508,
      "eraZh": "正德三年",
      "coord": [
        106.59,
        26.84
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "龙场",
      "modernZh": "贵州贵阳修文",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "龙场大悟·创立心学",
      "titleEn": "",
      "descZh": "抵达贵州万山丛棘、瘴疠横行之龙场驿。居东洞石棺之中，日夜端居澄默，自问“圣人处此更有何道”。正德三年中夜忽然大悟格物致知之旨，彻见“圣人之道，吾性自足，向之求理于事物者误也”，继而倡“知行合一”，开五百年阳明心学。",
      "descEn": "",
      "quoteZh": "《王阳明年谱》：“圣人之道，吾性自足，向之求理于事物者误也。”",
      "quoteEn": "",
      "persons": [
        "wangyangming"
      ],
      "source": "（上游数据）"
    },
    {
      "year": 1510,
      "eraZh": "正德五年",
      "coord": [
        114.98,
        27.11
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "庐陵",
      "modernZh": "江西吉安",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "知县庐陵·兴教善政",
      "titleEn": "",
      "descZh": "刘瑾伏诛前夕，守仁升任江西吉安府庐陵县知县。视事七月，不以威刑而重告谕，均徭役、息词讼、立十家牌保甲法，选里老敦厚者劝诫乡民，庐陵风俗翕然丕变，为日后经略江西奠定深厚民心。",
      "descEn": "",
      "quoteZh": "王阳明《告谕庐陵父老》：“一念之善，即吉神佑之；一念之恶，即厉鬼随之。”",
      "quoteEn": "",
      "persons": [
        "wangyangming"
      ],
      "source": "（上游数据）"
    },
    {
      "year": 1517,
      "eraZh": "正德十二年",
      "coord": [
        114.93,
        25.83
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "赣州",
      "modernZh": "江西赣州",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "巡抚南赣·破山中贼",
      "titleEn": "",
      "descZh": "受兵部尚书王琼力荐，以左佥都御史巡抚南赣汀漳。自编选练民兵，严明赏罚，两年内连破詹师富、大帽山、横水、桶冈、浰头诸巢，荡平盘踞赣闽粤湘边界数十年之巨寇；继而颁《南赣乡约》、设崇义县，兴立社学教化百姓。",
      "descEn": "",
      "quoteZh": "王阳明《与杨仕德薛尚谦书》：“破山中贼易，破心中贼难。”",
      "quoteEn": "",
      "persons": [
        "wangyangming"
      ],
      "source": "（上游数据）"
    },
    {
      "year": 1519,
      "eraZh": "正德十四年",
      "coord": [
        115.89,
        28.68
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "南昌",
      "modernZh": "江西南昌·鄱阳湖",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "平宁王乱·奇兵定难",
      "titleEn": "",
      "descZh": "六月，宁王朱宸濠于南昌起兵十万反叛，顺江东下围安庆、逼南京。守仁在丰城闻变，退保吉安特征集义军，施反间疑兵计迟滞叛军，随即乘虚直捣南昌老巢。宁王回救，两军决战于鄱阳湖黄家渡，守仁火攻大破叛军，仅三十五日生擒朱宸濠。",
      "descEn": "",
      "quoteZh": "王阳明《擒获宸濠捷音疏》：“臣等仰仗天威，一鼓而克其巢穴，再战而擒其渠魁。”",
      "quoteEn": "",
      "persons": [
        "wangyangming"
      ],
      "source": "（上游数据）"
    },
    {
      "year": 1521,
      "eraZh": "正德十六年",
      "coord": [
        120.58,
        30
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "绍兴",
      "modernZh": "浙江绍兴",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "致良知教·天泉证道",
      "titleEn": "",
      "descZh": "明世宗即位，封守仁新建伯，守仁归越城绍兴，于稽山书院、阳明洞聚徒讲学，正式揭出“致良知”三字教法，四方学者云集。嘉靖六年（1527）奉诏出征两广前夕，于天泉桥与大弟子钱德洪、王畿印证心学“四句教”，成心学传世纲领。",
      "descEn": "",
      "quoteZh": "《天泉证道·四句教》：“无善无恶心之体，有善有恶意之动。知善知恶是良知，为善去恶是格物。”",
      "quoteEn": "",
      "persons": [
        "wangyangming"
      ],
      "source": "（上游数据）"
    },
    {
      "year": 1529,
      "eraZh": "嘉靖七年冬",
      "coord": [
        114.36,
        25.4
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "南安",
      "modernZh": "江西赣州大余",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "此心光明·亦复何言",
      "titleEn": "",
      "descZh": "嘉靖六年总督两广，不费一兵一卒招抚思恩、田州卢苏王受七万众，继以奇兵荡平断藤峡八寨瑶乱。次年冬肺疾加剧上疏乞归，十一月二十九日（公历1529年1月）舟次江西南安府大余县青龙铺。门人周积问遗言，先生微笑曰：“此心光明，亦复何言！”遂瞑目而逝。",
      "descEn": "",
      "quoteZh": "《王阳明先生年谱》载临终遗言：“此心光明，亦复何言！”",
      "quoteEn": "",
      "persons": [
        "wangyangming"
      ],
      "source": "（上游数据）"
    }
  ]);

  addStops("xuanzang", [
    {
      "year": 627,
      "eraZh": "贞观元年",
      "coord": [
        108.94,
        34.26
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "长安",
      "modernZh": "陕西西安",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "发足长安·孤身西迈",
      "titleEn": "",
      "descZh": "为求《瑜伽师地论》梵本真义以释诸家纷歧，年二十八的玄奘大师自长安混迹灾民西出秦陇，立誓“不至天竺，终不东归一步”。",
      "descEn": "",
      "quoteZh": "《大慈恩寺三藏法师传》：“遂发足西行，自尔孑然孤游。”",
      "quoteEn": "",
      "persons": [
        "xuanzang"
      ],
      "source": "（上游数据）"
    },
    {
      "year": 627,
      "eraZh": "贞观元年",
      "coord": [
        102.64,
        37.93
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "凉州",
      "modernZh": "甘肃武威",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "凉州开讲·昼伏夜行",
      "titleEn": "",
      "descZh": "抵河西都会凉州，受众僧礼请开讲《涅槃》《摄大乘论》月余，名震葱岭以东；因朝廷严禁私度边关，由慧威法师遣徒护送昼伏夜行西赴瓜州。",
      "descEn": "",
      "quoteZh": "《大慈恩寺三藏法师传》：“凉州为河西都会，僧徒既多，请留开讲。”",
      "quoteEn": "",
      "persons": [
        "xuanzang"
      ],
      "source": "（上游数据）"
    },
    {
      "year": 627,
      "eraZh": "贞观元年",
      "coord": [
        95.78,
        40.52
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "瓜州",
      "modernZh": "甘肃瓜州",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "夜渡葫芦河·闯莫贺延碛",
      "titleEn": "",
      "descZh": "州吏李昌感其诚而暗撕通缉牒文。玄奘夜渡葫芦河、独闯五烽，于八百里莫贺延碛失手覆水，四夜五日滴水未进，绝处逢生终抵伊吾。",
      "descEn": "",
      "quoteZh": "《大慈恩寺三藏法师传》：“莫贺延碛长八百余里，古曰沙河，上无飞鸟，下无走兽。”",
      "quoteEn": "",
      "persons": [
        "xuanzang"
      ],
      "source": "（上游数据）"
    },
    {
      "year": 628,
      "eraZh": "贞观二年",
      "coord": [
        89.53,
        42.85
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "高昌王城",
      "modernZh": "新疆吐鲁番",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "高昌结义·修书通西域",
      "titleEn": "",
      "descZh": "高昌王麴文泰虔礼挽留，玄奘水浆不涉三日以明西求大法之志；麴文泰感泣结为兄弟，修二十四封国书、备黄金百两与三十匹马护送西行。",
      "descEn": "",
      "quoteZh": "《大慈恩寺三藏法师传》：“任师西迈，乞垂早食……遂共结为兄弟。”",
      "quoteEn": "",
      "persons": [
        "xuanzang"
      ],
      "source": "（上游数据）"
    },
    {
      "year": 628,
      "eraZh": "贞观二年",
      "coord": [
        82.96,
        41.72
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "龟兹",
      "modernZh": "新疆库车",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "驻锡龟兹·翻越凌山雪岭",
      "titleEn": "",
      "descZh": "在龟兹与高僧木叉毱多论辩经义，因大雪封山逗留六十余日；开春后翻越积雪千尺的凌山（天山木扎尔特达坂），历经雪崩严寒出天山北麓。",
      "descEn": "",
      "quoteZh": "《大唐西域记》：“山谷积雪，春夏合冻，虽时消泮，寻复结冰。”",
      "quoteEn": "",
      "persons": [
        "xuanzang"
      ],
      "source": "（上游数据）"
    },
    {
      "year": 628,
      "eraZh": "贞观二年",
      "coord": [
        75.29,
        42.83
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "碎叶城",
      "modernZh": "吉尔吉斯斯坦托克马克",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "过大清池·会西突厥叶护可汗",
      "titleEn": "",
      "descZh": "循大清池（伊塞克湖）西北行至碎叶城，恰逢西突厥统叶护可汗游猎。可汗设宴礼敬，命通解汉言及诸国语的摩咄达官率骑护送至迦毕试国境。",
      "descEn": "",
      "quoteZh": "《大唐西域记》：“清池西北行五百余里至素叶水城，逢突厥叶护可汗方事畋游。”",
      "quoteEn": "",
      "persons": [
        "xuanzang"
      ],
      "source": "（上游数据）"
    },
    {
      "year": 628,
      "eraZh": "贞观二年",
      "coord": [
        66.9,
        36.76
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "缚喝",
      "modernZh": "阿富汗巴尔赫",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "过铁门关·参礼小王舍城",
      "titleEn": "",
      "descZh": "经赭时（塔什干）、飒秣建（撒马尔罕），穿险峻铁门关，渡缚刍河（阿姆河）抵号称“小王舍城”的缚喝国，与般若羯罗法师切磋毗婆沙论。",
      "descEn": "",
      "quoteZh": "《大唐西域记》：“缚喝国，伽蓝百有余所，僧徒三千余人。”",
      "quoteEn": "",
      "persons": [
        "xuanzang"
      ],
      "source": "（上游数据）"
    },
    {
      "year": 629,
      "eraZh": "贞观三年",
      "coord": [
        71.52,
        34.01
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "健驮逻",
      "modernZh": "巴基斯坦白沙瓦",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "越雪山礼大佛·入天竺求法",
      "titleEn": "",
      "descZh": "翻越大雪山（兴都库什山）、瞻礼梵衍那（巴米扬）石佛，入北天竺健驮逻故地；此后经迦湿弥罗驻锡两年研习经论，由此深游五印十余载。",
      "descEn": "",
      "quoteZh": "《大唐西域记》：“自古大圣贤，多生此国，作论诸师，亦多出此。”",
      "quoteEn": "",
      "persons": [
        "xuanzang"
      ],
      "source": "（上游数据）"
    },
    {
      "year": 631,
      "eraZh": "贞观五年",
      "coord": [
        85.44,
        25.14
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "那烂陀寺",
      "modernZh": "印度比哈尔邦那烂陀",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "那烂陀寺·师从戒贤学《瑜伽》",
      "titleEn": "",
      "descZh": "抵中天竺摩揭陀国那烂陀寺，礼百余岁的住持戒贤论师为师，从受《瑜伽师地论》前后五年——正是当年立誓西行所求之法；其间兼习《顺正理》《中论》《百论》等诸部经论。",
      "descEn": "",
      "quoteZh": "《大唐西域记》：“僧徒数千，并俊才高学也，德重当时，声驰异域者，数百余矣。”",
      "quoteEn": "",
      "persons": [
        "xuanzang"
      ],
      "source": "（上游数据）"
    },
    {
      "year": 642,
      "eraZh": "贞观十六年",
      "coord": [
        79.92,
        27.05
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "曲女城",
      "modernZh": "印度北方邦卡瑙季",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "曲女城大会·十八日无人能难",
      "titleEn": "",
      "descZh": "戒日王于曲女城设无遮大会，五印十八国王与僧俗数千人与会。玄奘为论主，悬所著论于会场门外，十八日间无一人能难，大乘尊为“大乘天”，小乘尊为“解脱天”。",
      "descEn": "",
      "quoteZh": "《大慈恩寺三藏法师传》：“若其间有一字无理能难破者，请斩首相谢。”",
      "quoteEn": "",
      "persons": [
        "xuanzang"
      ],
      "source": "（上游数据）"
    },
    {
      "year": 644,
      "eraZh": "贞观十八年",
      "coord": [
        79.92,
        37.11
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "于阗",
      "modernZh": "新疆和田",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "越葱岭载经东归·奉表唐廷",
      "titleEn": "",
      "descZh": "载梵本经论越帕米尔高原东归至于阗，遣使向唐太宗奉表陈情；此时大唐已平定高昌、设安西都护府，太宗降敕欣慰迎归，命沿途州县护送。",
      "descEn": "",
      "quoteZh": "《进西域记表》：“冒越宪章，私往天竺……历览周游，一十七载。”",
      "quoteEn": "",
      "persons": [
        "xuanzang"
      ],
      "source": "（上游数据）"
    },
    {
      "year": 645,
      "eraZh": "贞观十九年",
      "coord": [
        109.35,
        34.05
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "长安",
      "modernZh": "陕西西安",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "归至京师·开场译经撰记",
      "titleEn": "",
      "descZh": "贞观十九年正月返抵长安，朱雀街数十万人瞻礼迎奉六百五十七部梵经；后于弘福寺、大慈恩寺主持译场十九载，译经七十五部，撰成《大唐西域记》十二卷。",
      "descEn": "",
      "quoteZh": "《旧唐书·玄奘传》：“贞观十九年，归至京师，太宗见之大悦，与之谈论。”",
      "quoteEn": "",
      "persons": [
        "xuanzang"
      ],
      "source": "（上游数据）"
    }
  ]);

  addStops("zhangqian", [
    {
      "year": -138,
      "eraZh": "建元三年",
      "coord": [
        108.94,
        34.26
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "长安",
      "modernZh": "陕西西安",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "奉诏募使·发自长安",
      "titleEn": "",
      "descZh": "汉武帝欲联合大月氏共击匈奴，张骞以郎应募，与堂邑氏胡奴甘父率百余人自长安出发西行。",
      "descEn": "",
      "quoteZh": "《史记·大宛列传》：“骞以郎应募，使月氏，与堂邑氏胡奴甘父俱出陇西。”",
      "quoteEn": "",
      "persons": [
        "zhangqian"
      ],
      "source": "（上游数据）"
    },
    {
      "year": -138,
      "eraZh": "建元三年",
      "coord": [
        103.86,
        35.38
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "陇西",
      "modernZh": "甘肃临洮",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "出陇西塞·踏入绝域",
      "titleEn": "",
      "descZh": "自陇西郡出塞西渡黄河，踏入匈奴右贤王与浑邪王控扼的河西之地，由此西去万里皆属未知绝域。",
      "descEn": "",
      "quoteZh": "《汉书·张骞传》：“出陇西，径匈奴，匈奴得之。”",
      "quoteEn": "",
      "persons": [
        "zhangqian"
      ],
      "source": "（上游数据）"
    },
    {
      "year": -138,
      "eraZh": "建元三年",
      "coord": [
        102.64,
        37.93
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "姑臧",
      "modernZh": "甘肃武威",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "羁留匈奴·持节十载",
      "titleEn": "",
      "descZh": "途经河西走廊为匈奴骑兵截获，押送单于王庭。单于予妻生子，然张骞始终“持汉节不失”，羁留十余载待机西奔。",
      "descEn": "",
      "quoteZh": "《史记·大宛列传》：“留骞十余岁，予妻，有子，然骞持汉节不失。”",
      "quoteEn": "",
      "persons": [
        "zhangqian"
      ],
      "source": "（上游数据）"
    },
    {
      "year": -129,
      "eraZh": "元光六年",
      "coord": [
        86.57,
        42.06
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "焉耆",
      "modernZh": "新疆焉耆",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "乘隙脱走·疾驰西域北道",
      "titleEn": "",
      "descZh": "匈奴监管渐宽，张骞与甘父乘隙逃脱，循天山南麓绿洲昼夜西驰数十日，穿越车师、焉耆、龟兹诸国。",
      "descEn": "",
      "quoteZh": "《史记·大宛列传》：“居匈奴中，益宽，骞因与其属亡乡月氏，西走数十日。”",
      "quoteEn": "",
      "persons": [
        "zhangqian"
      ],
      "source": "（上游数据）"
    },
    {
      "year": -129,
      "eraZh": "元光六年",
      "coord": [
        71.78,
        40.38
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "大宛贰师城",
      "modernZh": "费尔干纳盆地",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "越葱岭抵大宛·得发导译",
      "titleEn": "",
      "descZh": "翻越帕米尔高原（葱岭）抵达盛产汗血宝马的大宛国。大宛王久闻汉朝饶财欲通而不得，见张骞大喜，特派向导译员护送赴康居。",
      "descEn": "",
      "quoteZh": "《史记·大宛列传》：“大宛闻汉之饶财，欲通不得，见骞，喜……为发导驿抵康居。”",
      "quoteEn": "",
      "persons": [
        "zhangqian"
      ],
      "source": "（上游数据）"
    },
    {
      "year": -129,
      "eraZh": "元光六年",
      "coord": [
        68.78,
        40.85
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "康居",
      "modernZh": "锡尔河中游",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "取道康居·传致大月氏",
      "titleEn": "",
      "descZh": "由大宛导驿护送至康居国，再由康居王庭遣骑护送南下妫水（阿姆河）流域的大月氏王庭。",
      "descEn": "",
      "quoteZh": "《史记·大宛列传》：“抵康居，康居传致大月氏。”",
      "quoteEn": "",
      "persons": [
        "zhangqian"
      ],
      "source": "（上游数据）"
    },
    {
      "year": -128,
      "eraZh": "元朔元年",
      "coord": [
        66.9,
        36.76
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "大月氏蓝氏城",
      "modernZh": "阿富汗巴尔赫",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "驻节大月氏与大夏·考索诸国",
      "titleEn": "",
      "descZh": "抵阿姆河流域，大月氏已臣服大夏（巴克特里亚），土地肥美安乐，无意东还复仇。张骞驻留岁余，详考大夏、安息、身毒及蜀布竹杖商路。",
      "descEn": "",
      "quoteZh": "《史记·大宛列传》：“留岁余，还，并南山，欲从羌中归。”",
      "quoteEn": "",
      "persons": [
        "zhangqian"
      ],
      "source": "（上游数据）"
    },
    {
      "year": -127,
      "eraZh": "元朔二年",
      "coord": [
        79.92,
        37.11
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "于阗",
      "modernZh": "新疆和田",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "循昆仑南道东归·复陷匈奴",
      "titleEn": "",
      "descZh": "为避匈奴控制的天山北道，返程改循昆仑山北麓西域南道，经莎车、于阗、楼兰，欲从羌中归汉，不意复为匈奴游骑所得。",
      "descEn": "",
      "quoteZh": "《史记·大宛列传》：“并南山，欲从羌中归，复为匈奴所得。”",
      "quoteEn": "",
      "persons": [
        "zhangqian"
      ],
      "source": "（上游数据）"
    },
    {
      "year": -126,
      "eraZh": "元朔三年",
      "coord": [
        109.35,
        34.05
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "长安",
      "modernZh": "陕西西安",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "持节归朝·丝路凿空",
      "titleEn": "",
      "descZh": "元朔三年军臣单于死、匈奴内乱，张骞与胡妻及甘父逃归长安。出使十三载，百余人唯二人得还，封博望侯，史称“凿空”。",
      "descEn": "",
      "quoteZh": "《史记·大宛列传》：“初行时百余人，去十三岁，唯二人得还。”",
      "quoteEn": "",
      "persons": [
        "zhangqian"
      ],
      "source": "（上游数据）"
    }
  ]);

  addStops("zhugeliang", [
    {
      "year": 207,
      "eraZh": "建安十二年",
      "coord": [
        112.04,
        32
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "隆中",
      "modernZh": "湖北襄阳",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "三顾茅庐·隆中决策",
      "titleEn": "",
      "descZh": "刘备驻新野，三诣襄阳城西二十里隆中草庐访诸葛亮。年二十七的孔明纵论天下大势，提出跨有荆益、保其岩阻、西和诸戎、南抚夷越、内修政理、待天下有变则命一上将将荆州之军向宛洛而身率益州之众出秦川的“隆中对”宏图。",
      "descEn": "",
      "quoteZh": "诸葛亮《出师表》：“臣本布衣，躬耕于南阳，苟全性命于乱世，不求闻达于诸侯。先帝不以臣卑鄙，猥自枉屈，三顾臣于草庐之中。”",
      "quoteEn": "",
      "persons": [
        "zhugeliang"
      ],
      "source": "（上游数据）"
    },
    {
      "year": 208,
      "eraZh": "建安十三年秋",
      "coord": [
        115.98,
        29.71
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "柴桑",
      "modernZh": "江西九江",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "奉使柴桑·舌战联吴",
      "titleEn": "",
      "descZh": "曹操南下荆州、刘备败走当阳长坂，诸葛亮临危请命顺江东下柴桑说孙权，剖析曹军远来疲弊、北人不习水战之弊，促成孙刘同盟共抗曹军。",
      "descEn": "",
      "quoteZh": "《三国志·诸葛亮传》：“权大悦，即遣周瑜、程普、鲁肃等水军三万，随亮诣先主，并力拒曹公。”",
      "quoteEn": "",
      "persons": [
        "zhugeliang"
      ],
      "source": "（上游数据）"
    },
    {
      "year": 208,
      "eraZh": "建安十三年冬",
      "coord": [
        113.94,
        29.85
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "赤壁",
      "modernZh": "湖北赤壁",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "赤壁鏖兵·三分奠基",
      "titleEn": "",
      "descZh": "孙刘联军溯江西上，与曹军决战于赤壁乌林。周瑜、黄盖借东南风施火攻焚曹军连环战船，刘备、诸葛亮水陆并进追击至南郡，奠定三分天下之基。",
      "descEn": "",
      "quoteZh": "《三国志·诸葛亮传》：“曹公败于赤壁，引军归邺。先主遂收江南，以亮为军师中郎将。”",
      "quoteEn": "",
      "persons": [
        "zhugeliang"
      ],
      "source": "（上游数据）"
    },
    {
      "year": 214,
      "eraZh": "建安十九年",
      "coord": [
        104.07,
        30.67
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "成都",
      "modernZh": "四川成都",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "溯江入蜀·会师成都",
      "titleEn": "",
      "descZh": "刘备入蜀受阻于雒城，诸葛亮与张飞、赵云自荆州率军溯长江西上，分定江州、江阳、犍为诸郡，与刘备合围成都；刘璋出降，亮署左将军府事，修订《蜀科》，宽严相济治理巴蜀。",
      "descEn": "",
      "quoteZh": "《三国志·诸葛亮传》：“亮与张飞、赵云等率众泝江，分定郡县，与先主共围成都。成都平，以亮为军师将军。”",
      "quoteEn": "",
      "persons": [
        "zhugeliang"
      ],
      "source": "（上游数据）"
    },
    {
      "year": 221,
      "eraZh": "章武元年",
      "coord": [
        104.07,
        30.67
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "成都",
      "modernZh": "四川成都",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "劝进昭烈·开府拜相",
      "titleEn": "",
      "descZh": "曹丕篡汉自立，诸葛亮与群臣劝进刘备于成都武担山之南即皇帝位，延续汉室正统；诸葛亮拜丞相、录尚书事、假节，总摄蜀汉朝政与盐铁锦官经济。",
      "descEn": "",
      "quoteZh": "册丞相诏：“朕遭家不造，奉承大统，兢兢业业，不敢康宁，思靖百姓，惧未能绥。於戏！丞相亮其悉朕意。”",
      "quoteEn": "",
      "persons": [
        "zhugeliang"
      ],
      "source": "（上游数据）"
    },
    {
      "year": 223,
      "eraZh": "章武三年",
      "coord": [
        109.57,
        31.04
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "白帝城",
      "modernZh": "重庆奉节",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "白帝托孤·受命危难",
      "titleEn": "",
      "descZh": "夷陵之战后刘备病笃永安白帝城，自成都召诸葛亮赴行宫托孤，嘱以“嗣子可辅，辅之；如其不才，君可自取”。亮涕泣死节，回朝后开府治事、遣邓芝修好东吴，稳固危局。",
      "descEn": "",
      "quoteZh": "诸葛亮《出师表》：“受任于败军之际，奉命于危难之间，尔来二十有一年矣。”",
      "quoteEn": "",
      "persons": [
        "zhugeliang"
      ],
      "source": "（上游数据）"
    },
    {
      "year": 225,
      "eraZh": "建兴三年",
      "coord": [
        102.71,
        25.04
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "滇池",
      "modernZh": "云南昆明",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "渡泸南征·七擒孟获",
      "titleEn": "",
      "descZh": "为解除北伐后顾之忧，诸葛亮率军自安上水路入越巂，五月渡泸水（金沙江），采马谡“攻心为上”之策，七擒七纵孟获，平定益州、永昌、牂牁、越巂四郡，皆即其渠帅而用之，终亮之世南方不复反。",
      "descEn": "",
      "quoteZh": "《汉晋春秋》：“亮笑，纵使更战，七纵七禽，而亮犹遣获。获止不去，曰：‘公，天威也，南人不复反矣。’”",
      "quoteEn": "",
      "persons": [
        "zhugeliang"
      ],
      "source": "（上游数据）"
    },
    {
      "year": 227,
      "eraZh": "建兴五年",
      "coord": [
        107.02,
        33.07
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "汉中",
      "modernZh": "陕西汉中",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "进驻汉中·上出师表",
      "titleEn": "",
      "descZh": "南中既定，诸葛亮率诸军北驻汉中沔阳，临发向后主刘禅奏呈千古名篇《出师表》，勉以亲贤臣远小人、兴复汉室还于旧都，以汉中为北伐大本营经略关陇。",
      "descEn": "",
      "quoteZh": "诸葛亮《出师表》：“今南方已定，兵甲已足，当奖率三军，北定中原，庶竭驽钝，攘除奸凶，兴复汉室，还于旧都。”",
      "quoteEn": "",
      "persons": [
        "zhugeliang"
      ],
      "source": "（上游数据）"
    },
    {
      "year": 228,
      "eraZh": "建兴六年",
      "coord": [
        105.32,
        34.33
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "祁山",
      "modernZh": "甘肃礼县",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "一出祁山·收姜维失街亭",
      "titleEn": "",
      "descZh": "声东击西由箕谷设疑兵、亲率大军攻祁山，戎阵整齐，南安、天水、安定三郡叛魏应亮，关中震响，收天水俊杰姜维；惜马谡违亮节度于街亭依山不下城，为张郃绝水道所破，亮拔西县千余家还汉中并自贬三等。",
      "descEn": "",
      "quoteZh": "《三国志·诸葛亮传》：“亮身率诸军攻祁山，戎阵整齐，赏罚肃而号令明，南安、天水、安定三郡叛魏应亮，关中响震。”",
      "quoteEn": "",
      "persons": [
        "zhugeliang"
      ],
      "source": "（上游数据）"
    },
    {
      "year": 231,
      "eraZh": "建兴九年",
      "coord": [
        105.38,
        34.22
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "木门道",
      "modernZh": "甘肃天水西南",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "木牛流马·木门道射杀张郃",
      "titleEn": "",
      "descZh": "始以木牛运粮四出祁山，于卤城大破司马懿主力，获甲首三千级、玄铠五千领；夏六月粮尽退军，司马懿遣名将张郃追至木门道，亮乘高布伏万弩齐发，射杀张郃。",
      "descEn": "",
      "quoteZh": "《三国志·诸葛亮传》：“亮粮尽退军，司马宣王遣张郃追之，郃进至木门，与亮军交战，飞矢中郃右膝，薨。”",
      "quoteEn": "",
      "persons": [
        "zhugeliang"
      ],
      "source": "（上游数据）"
    },
    {
      "year": 234,
      "eraZh": "建兴十二年",
      "coord": [
        107.63,
        34.34
      ],
      "labelPos": "top",
      "kind": "office",
      "ancientZh": "五丈原",
      "modernZh": "陕西宝鸡岐山",
      "ancientEn": "",
      "modernEn": "",
      "titleZh": "出斜谷屯五丈原·秋风星落",
      "titleEn": "",
      "descZh": "春二月悉大众十万由褒斜道出斜谷，以流马运粮，据武功五丈原与司马懿对峙于渭水之南，分兵屯田久驻之基，百姓安堵军无私焉；相持百余日，八月积劳病逝于军中，年五十四，杨仪、姜维整军从容退入斜谷，留“死诸葛走生仲达”之谚。",
      "descEn": "",
      "quoteZh": "杜甫《蜀相》：“三顾频烦天下计，两朝开济老臣心。出师未捷身先死，长使英雄泪满襟。”",
      "quoteEn": "",
      "persons": [
        "zhugeliang"
      ],
      "source": "（上游数据）"
    }
  ]);
})();
