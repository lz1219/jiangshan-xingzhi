/**
 * 人物与行迹（生成物）
 * ⚠ 本文件由 poem-data/scripts/emit-atlas.mjs 生成，请勿手动编辑。
 *   内容源头：poem-data/data/*.json
 * 人物 10 位；新建行迹 3 条；补站 1 组 */

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
