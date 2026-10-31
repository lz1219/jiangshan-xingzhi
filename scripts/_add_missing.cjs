#!/usr/bin/env node
/**
 * 补充缺失作品（R-3）
 *
 * 原文一律从 lore_data.js 的 quoteZh 里逐字提取，不手抄；
 * 本脚本只负责为每个作品补 genre / author / source / background / notes。
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const TARGET = path.join(ROOT, 'js', 'atlas_poems.js');

global.window = {};
require(path.join(ROOT, 'js', 'lore_data.js'));
require(TARGET);

const JOURNEYS = window.ATLAS_LORE_DATA.HISTORICAL_JOURNEYS || [];
const POEMS = window.ATLAS_POEMS || {};

const META = {
  '史记·秦始皇本纪': {
    genre: 'history',
    authorZh: '司马迁',
    source: '《史记》卷六',
    background:
      '《史记》中记秦始皇一朝事迹的编年。所摘五段分别是：尉缭评秦王为人、攻邺取九城、灭韩置颍川郡、引河沟灌大梁亡魏、破燕辽东与代。',
    notes: [
      { term: '蜂准', explain: '鼻梁高如蜂。准，鼻。' },
      { term: '挚鸟膺', explain: '胸骨突出如鹰。挚，通「鸷」。' },
      { term: '豺声', explain: '说话声如豺。三者都是尉缭对秦王相貌的贬评。' },
    ],
  },
  '大慈恩寺三藏法师传': {
    genre: 'history',
    authorZh: '慧立、彦悰',
    source: '慧立撰、彦悰笺《大慈恩寺三藏法师传》',
    background:
      '玄奘弟子慧立所撰、彦悰续成的传记，记其西行求法与归国译经始末。所摘五段自长安发足至曲女城论辩。',
    notes: [
      { term: '莫贺延碛', explain: '今甘肃瓜州至新疆哈密间的戈壁，古称沙河。' },
      { term: '曲女城', explain: '今印度北方邦卡瑙季，戒日王在此设无遮大会。' },
      { term: '斩首相谢', explain: '立誓语：若有一字被难倒，愿斩首谢罪。' },
    ],
  },
  大唐西域记: {
    genre: 'history',
    authorZh: '玄奘述、辩机编',
    source: '玄奘述、辩机编《大唐西域记》',
    background:
      '玄奘口述、辩机编次的西域见闻录，记一百三十八国地理、物产、风俗与佛教遗迹。所摘五段自龟兹凌山至健驮逻。',
    notes: [
      { term: '素叶水城', explain: '即碎叶城，今吉尔吉斯斯坦托克马克附近。' },
      { term: '叶护可汗', explain: '西突厥最高首领的称号。' },
      { term: '伽蓝', explain: '梵语僧园，指佛寺。' },
    ],
  },
  上安州裴长史书: {
    genre: 'wen',
    authorZh: '李白',
    source: '《李太白全集》卷二十六',
    background: '李白青年时上书安州裴长史的自荐书，自述家世、师承与交游，是了解其早年最直接的材料。',
    notes: [
      { term: '六甲', explain: '指童子启蒙所习的干支之书，代指幼学。' },
      { term: '相如', explain: '司马相如，汉代辞赋大家。' },
    ],
  },
  王阳明先生年谱: {
    genre: 'history',
    authorZh: '门人编',
    source: '《王阳明全集》年谱',
    background: '门人所编王守仁年谱，逐年记其学思转折与事功。所摘两段：少年立志学圣贤、龙场悟道。',
    notes: [{ term: '登第', explain: '科举及第。少年阳明认为登第并非第一等事。' }],
  },
  战国策: {
    genre: 'history',
    source: '《战国策·赵策》',
    background: '记战国策士游说与列国攻守。此段记秦将王翦急击赵军、虏赵王迁。',
    notes: [{ term: '颜聚', explain: '赵国将领，与赵葱同御秦军。' }],
  },
  '战国策·燕策三': {
    genre: 'history',
    source: '《战国策·燕策三》',
    background: '荆轲刺秦王一段。易水送别时高渐离击筑、荆轲和歌，即出于此。',
    notes: [{ term: '易水', explain: '在今河北易县，燕太子丹送荆轲处。' }],
  },
  '史记·白起王翦列传': {
    genre: 'history',
    authorZh: '司马迁',
    source: '《史记》卷七十三',
    background:
      '白起、王翦两位秦将的合传。此段记王翦代李信击楚，坚壁不战，待楚军东退而纵兵击之。',
    notes: [{ term: '荆', explain: '楚国。秦人称楚为荆，避庄襄王子楚之讳。' }],
  },
  阿房宫赋: {
    genre: 'fu',
    authorZh: '杜牧',
    source: '《樊川文集》卷一',
    background: '杜牧借秦宫奢靡以警当世的赋作。开篇「六王毕，四海一」六字写尽秦并天下。',
    notes: [{ term: '六王', explain: '齐、楚、燕、韩、赵、魏六国之王。' }],
  },
  进西域记表: {
    genre: 'wen',
    authorZh: '玄奘',
    source: '《大唐西域记》卷首',
    background: '玄奘归国后进呈《西域记》的表文，自陈违禁私往天竺、历十七年而还。',
    notes: [{ term: '冒越宪章', explain: '触犯禁令。唐初禁百姓私自出境。' }],
  },
  '旧唐书·玄奘传': {
    genre: 'history',
    source: '《旧唐书》卷一九一',
    background: '后晋刘昫等修《旧唐书》为玄奘立传，记其贞观十九年归京、太宗召见问西域事。',
    notes: [{ term: '贞观十九年', explain: '645 年。玄奘于是年正月还至长安。' }],
  },
  唐左拾遗翰林学士李公新墓碑: {
    genre: 'wen',
    authorZh: '范传正',
    source: '范传正《唐左拾遗翰林学士李公新墓碑》',
    background: '唐范传正所撰李白墓碑，记其先世谪居碎叶、而后归蜀。「李白出生于碎叶」一说本此。',
    notes: [{ term: '一房', explain: '家族中的一支。' }],
  },
  寄李十二白二十韵: {
    genre: 'shi',
    authorZh: '杜甫',
    source: '《杜诗详注》卷一',
    background: '杜甫寄赠李白之作，二十韵追述二人同游梁宋、醉舞行歌的旧事，兼叙其才名与遭遇。',
    notes: [
      { term: '李十二', explain: '李白在同族兄弟中排行十二，唐人常以行第称人。' },
      { term: '梁园', explain: '在今河南商丘，汉梁孝王所筑兔园，李白、杜甫、高适曾同游。' },
    ],
  },
  梁园吟: {
    genre: 'shi',
    authorZh: '李白',
    source: '《李太白全集》卷七',
    background: '李白东游梁宋时作。访古平台，感怀信陵君，末以「东山高卧时起来」自许。',
    notes: [{ term: '平台', explain: '梁园中的台名，在今河南商丘。' }],
  },
  梦游天姥吟留别: {
    genre: 'shi',
    authorZh: '李白',
    source: '《李太白全集》卷十五',
    background: '天宝年间李白将离东鲁南游吴越，以梦游天姥为题留别友人。',
    notes: [{ term: '摧眉折腰', explain: '低眉弯腰，指屈身事人。' }],
  },
  临路歌: {
    genre: 'shi',
    authorZh: '李白',
    source: '《李太白全集》卷八',
    background: '李白临终前所作，以大鹏自况：飞振八裔而中天摧折，余风犹可激扬万世。',
    notes: [
      { term: '八裔', explain: '八方边远之地。' },
      { term: '扶桑', explain: '神话中的东方神木，日出之处。' },
    ],
  },
  初发嘉州: {
    genre: 'shi',
    authorZh: '苏轼',
    source: '《苏轼诗集》卷一',
    background: '嘉祐四年苏轼服母丧期满，与父弟自眉山赴京，舟发嘉州时作。',
    notes: [{ term: '阗阗', explain: '鼓声。一说形容鼓声盛大。' }],
  },
  与梅圣俞书: {
    genre: 'wen',
    authorZh: '欧阳修',
    source: '《欧阳文忠公集》卷一百四十九',
    background: '欧阳修与梅尧臣的信。嘉祐二年知贡举，读苏轼文而惊喜，此信即写当时之感。',
    notes: [
      { term: '梅圣俞', explain: '梅尧臣，字圣俞，北宋诗人，欧阳修挚友。' },
      { term: '避路', explain: '让路。谓自己应当退让，让苏轼出头。' },
    ],
  },
  喜雨亭记: {
    genre: 'wen',
    authorZh: '苏轼',
    source: '《苏轼文集》卷十一',
    background: '苏轼签判凤翔时建亭，适逢久旱得雨，遂名「喜雨」并作记。',
    notes: [{ term: '襦', explain: '短衣。' }],
  },
  答范淳甫: {
    genre: 'wen',
    authorZh: '苏轼',
    source: '《苏轼文集》卷五十',
    background: '苏轼知徐州时与范淳甫书。熙宁十年黄河决口，徐州城下水深数丈，苏轼亲率军民守城七十余日。',
    notes: [{ term: '黄楼', explain: '徐州城东门上的楼，苏轼筑以镇水，取土能克水之义。' }],
  },
  狱中寄子由: {
    genre: 'shi',
    authorZh: '苏轼',
    source: '《苏轼诗集》卷十九',
    background:
      '元丰二年乌台诗案，苏轼系御史台狱，自度必死，作诗二首寄弟苏辙，托以后事。',
    notes: [
      { term: '是处青山', explain: '到处青山。谓死无处不可埋。' },
      { term: '夜雨', explain: '用韦应物「宁知风雨夜，复此对床眠」意，指兄弟旧约。' },
    ],
  },
  '明史·王守仁传': {
    genre: 'history',
    source: '《明史》卷一九五',
    background: '清张廷玉等修《明史》为王守仁立传。此段记其过广信谒娄谅，闻「圣人可学而至」而深契。',
    notes: [{ term: '娄谅', explain: '明代学者，吴与弼弟子，以「圣人可学而至」教人。' }],
  },
  传习录: {
    genre: 'wen',
    authorZh: '王守仁',
    source: '《传习录》上',
    background: '王守仁门人徐爱等所录的语录与论学书信，阳明学的主要文本。',
    notes: [{ term: '晦翁', explain: '朱熹，字元晦，号晦庵，世称晦翁。' }],
  },
  泛海: {
    genre: 'shi',
    authorZh: '王守仁',
    source: '《王阳明全集·静心录》',
    background: '正德元年王守仁因忤刘瑾被贬贵州龙场，赴谪途中渡海而作。',
    notes: [{ term: '飞锡', explain: '僧人云游。锡，锡杖。' }],
  },
  王阳明年谱: {
    genre: 'history',
    authorZh: '门人编',
    source: '《王阳明全集》年谱',
    background: '记正德三年王守仁谪居贵州龙场，中夜大悟格物致知之旨，史称「龙场悟道」。',
    notes: [{ term: '吾性自足', explain: '谓理具于本心，不必外求。此为阳明学的起点。' }],
  },
  告谕庐陵父老: {
    genre: 'wen',
    authorZh: '王守仁',
    source: '《王阳明全集·知行录》',
    background: '正德五年王守仁知庐陵县，出示告谕父老，以善恶一念劝谕乡里。',
    notes: [],
  },
  与杨仕德薛尚谦书: {
    genre: 'wen',
    authorZh: '王守仁',
    source: '《王阳明全集·静心录》',
    background: '王守仁与门人论学之书。「破山中贼易，破心中贼难」即出于此。',
    notes: [{ term: '仕德、尚谦', explain: '杨骥、薛侃，皆王门弟子。' }],
  },
  擒获宸濠捷音疏: {
    genre: 'wen',
    authorZh: '王守仁',
    source: '《王阳明全集·顺生录》',
    background: '正德十四年宁王朱宸濠举兵反，王守仁以三十五日平之，此疏即报捷之文。',
    notes: [
      { term: '宸濠', explain: '宁王朱宸濠，明宗室，正德十四年叛乱。' },
      { term: '渠魁', explain: '首领。' },
    ],
  },
  '天泉证道·四句教': {
    genre: 'wen',
    authorZh: '王守仁',
    source: '《传习录》下',
    background: '嘉靖六年王守仁出征思田前，于天泉桥与钱德洪、王汝中论学，提出四句教，史称「天泉证道」。',
    notes: [
      { term: '四句教', explain: '无善无恶心之体，有善有恶意之动，知善知恶是良知，为善去恶是格物。' },
      { term: '格物', explain: '阳明释为「正其不正以归于正」，与朱熹「即物穷理」不同。' },
    ],
  },
};

// ---------- 收集原文 ----------
const collected = {};
for (const j of JOURNEYS) {
  (j.stops || []).forEach((st) => {
    const q = st.quoteZh || '';
    const m = /《([^》]+)》/.exec(q);
    if (!m) return;
    const title = m[1];
    if (!META[title]) return;
    if (!collected[title]) {
      collected[title] = { passages: [], year: st.year, place: st.ancientZh, seg: j.shortZh };
    }
    const inner = /[「“]([^」”]+)[」”]/.exec(q);
    collected[title].passages.push((inner ? inner[1] : q).trim());
  });
}

// ---------- 组装 ----------
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

let added = 0;
for (const [title, info] of Object.entries(collected)) {
  if (POEMS[title]) continue;
  const meta = META[title];
  const entry = {};
  entry.alias = [title];
  entry.titleZh = title;
  if (meta.authorZh) entry.authorZh = meta.authorZh;
  entry.year = info.year;
  entry.placeZh = info.place;
  entry.genre = meta.genre;
  entry.certainty = 'confirmed';
  entry.text = [...new Set(info.passages)];
  entry.notes = meta.notes || [];
  entry.background = meta.background;
  entry.source = meta.source;
  const ordered = {};
  FIELD_ORDER.forEach((k) => {
    if (k in entry) ordered[k] = entry[k];
  });
  POEMS[title] = ordered;
  added++;
}

// ---------- 序列化 ----------
const header = fs
  .readFileSync(TARGET, 'utf8')
  .split('window.ATLAS_POEMS =')[0];
fs.writeFileSync(TARGET, header + 'window.ATLAS_POEMS = ' + JSON.stringify(POEMS, null, 2) + ';\n');

console.log(JSON.stringify({ 新增: added, 总条目: Object.keys(POEMS).length }, null, 2));
