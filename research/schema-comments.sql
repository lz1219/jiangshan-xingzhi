-- ── 注释：每张表、每个字段在考据里干什么 ──────────────
-- 原则：注释回答"为什么需要它"，不是重复列名。

COMMENT ON TABLE person IS '人物身份层：生卒、籍贯、外部权威 ID。考据时先在这里定人';
COMMENT ON COLUMN person.key IS '站内稳定键（如 sushi），与 atlas_overlay.js 的 journey key 对齐';
COMMENT ON COLUMN person.zh IS '姓名（简体，展示用）；CBDB 侧为繁体，跨库比对需转换';
COMMENT ON COLUMN person.courtesy_zh IS '字/号/生卒备注，可直接含「生卒年无确考」这类限定语';
COMMENT ON COLUMN person.born IS '生年（负数为公元前）；仅为锚点，精确度看 born_precision';
COMMENT ON COLUMN person.born_precision IS '年份精度：year|reign|range|decade|approx|unknown；决定界面是否显示「约」';
COMMENT ON COLUMN person.cbdb_id IS 'CBDB c_personid，跨库对接的钥匙（Wikidata P497 同值）';
COMMENT ON COLUMN person.wikidata_id IS 'Wikidata QID，用于取 CC0 结构化事实并交叉校验';
COMMENT ON COLUMN person.span_note IS '生卒存疑时的说明文本；非空即表示该人物的生卒有异说';

COMMENT ON TABLE journey IS '一条行迹：某个人一生的移动轨迹；是我们读本的组织单位';
COMMENT ON COLUMN journey.origin IS 'upstream=来自上游 lore_data.js；overlay=我们补录的人物';
COMMENT ON COLUMN journey.intro IS '读本导语（150–250 字）；叙述必须有据，出处见 intro_source';
COMMENT ON COLUMN journey.intro_source IS '导语的史料依据，须写到卷次或篇名';

COMMENT ON TABLE stop IS '行迹中的一站：年 + 地 + 事 + 引文';
COMMENT ON COLUMN stop.year_note IS '年份限定标记；为「约」时界面必须显示，禁止当确数';
COMMENT ON COLUMN stop.source IS '该站叙述的出处；补录行迹的每一站必填（校验器强制）';
COMMENT ON COLUMN stop.quote_zh IS '该站引用的原文摘句，格式「作者《书名》：『…』」，是摘句成链的锚';

COMMENT ON TABLE work IS '作品（文本单元）：诗词赋文史记皆可是一个 work';
COMMENT ON COLUMN work.year_kind IS 'composition=作年（用于校验作者生卒）；event=所述事件之年（史传多此类）';
COMMENT ON COLUMN work.source IS '出处（书名+卷次）；引文校验时据此定位到 text_unit';
COMMENT ON COLUMN work.appreciation IS '赏析正文，只收自撰；禁止抄录点校本';
COMMENT ON COLUMN work.inference IS '赏析中的推测部分；必须与正文判断分开呈现';
COMMENT ON COLUMN work.inference_basis IS '推测的依据；缺它则推测不成立（校验器报错）';

COMMENT ON TABLE book IS '书目：一部书在某个版本下的记录';
COMMENT ON COLUMN book.edition IS '版本（如「四庫全書文淵閣本」）；同一书不同版本是不同 book 记录';

COMMENT ON TABLE text_unit IS '卷/篇原文：引文校验的比对底本';
COMMENT ON COLUMN text_unit.body IS '原文（繁体/原样），展示与引用用这一列，不参与简化';
COMMENT ON COLUMN text_unit.body_simplified IS 'OpenCC t2s 生成的简体检索列，只用于校验与索引，不下发展示';
COMMENT ON COLUMN text_unit.edition IS '版本标识；与 book_id、juan 组成唯一键，支持同卷多版本并存';
COMMENT ON COLUMN text_unit.sha256 IS '正文哈希；用于判断底本是否变动、校验结果是否需重跑';

COMMENT ON TABLE paragraph IS '段落：引文定位的最小单位（第几段），也是 person_source 的范围单位';
COMMENT ON COLUMN paragraph.seq IS '段内序号，从 1 起；引文命中位置以此为准，不用字符偏移跨段';

COMMENT ON TABLE claim IS '断言：我们对某个事实的主张（人物生卒、某站年份等）';
COMMENT ON COLUMN claim.status IS 'settled=多源一致；disputed=存在异说（必须并列呈现）；unknown=待考';
COMMENT ON COLUMN claim.value IS '断言值（jsonb）；可为数字、字符串或 {from,to} 区间';

COMMENT ON TABLE evidence IS '证据：支持或反驳某条断言的原文片段与出处';
COMMENT ON COLUMN evidence.stance IS 'support=支持；contradict=与断言冲突（冲突必须入库，不许私下裁决）';
COMMENT ON COLUMN evidence.grade IS '证据等级：A 正史/年谱/本人明载；B 作品题名；C 他书/方志；D 今人研究';
COMMENT ON COLUMN evidence.match_kind IS '引文校验结果：exact|normalized|partial|fail';
COMMENT ON COLUMN evidence.match_offset IS '在简体检索列中的字符偏移，用于快速回看命中位置';
COMMENT ON COLUMN evidence.missing_fragments IS 'partial（节引）时未命中的片段，供人工核对';

COMMENT ON TABLE person_name IS '别名/字号/异名：检索与消歧用，也是 person_source 自动圈段的名单来源';
COMMENT ON COLUMN person_name.kind IS 'zi|hao|posthumous|courtesy|alias|en；区分字号与普通别名';

COMMENT ON TABLE office IS '仕宦履历：时间 + 官职 + 任所，是行迹骨架（CBDB POSTED_TO_OFFICE_DATA 的落地）';
COMMENT ON COLUMN office.place IS '任所；CBDB 中官职常为「知某州」，具体地点需从 POSTED_TO_ADDR_DATA 补';

COMMENT ON TABLE relation IS '亲属与交游：交叉验证用（谁为他写墓志、谁与他唱和）';
COMMENT ON COLUMN relation.kind IS 'father|son|spouse|friend|teacher|student';

COMMENT ON TABLE place IS '历史地名：某年叫什么、隶属何处、坐标；同一地不同朝代不同名';
COMMENT ON COLUMN place.valid_from IS '该建置的起始年（负数为公元前）；与 valid_to 构成时间有效区间';

COMMENT ON TABLE research_note IS '研究线索：候选、取舍理由、被否决的绑定；避免下次重做';
COMMENT ON COLUMN research_note.decision IS 'adopted=采纳；rejected=否决（如 Wikidata 同名误绑）；pending=待定';

COMMENT ON TABLE person_source IS '人物 → 卷 的关联：整卷入、按人组织的那条"按人"';
COMMENT ON COLUMN person_source.para_start IS '该人物在卷内相关段落的起止序号（启发式圈定，需人工确认）';
COMMENT ON COLUMN person_source.status IS 'pending=自动圈定待确认；confirmed=人工确认；rejected=误圈';
COMMENT ON COLUMN person_source.method IS 'auto=脚本圈定；manual=人工指定；自动跑不覆盖 manual 记录';

COMMENT ON TABLE variant_char IS '异体字归一表：揺→摇、呌→叫之类，可安全自动替换';
COMMENT ON COLUMN variant_char.source IS '归一依据（如「四库本异体」）；便于追溯为何这样归';

COMMENT ON TABLE text_variant IS '异文记录：不同版本真正不同的字，只记录不修改原文';
COMMENT ON COLUMN text_variant.kind IS '异文=字不同（须人工裁决）；异体已归并，不应出现在此';
COMMENT ON COLUMN text_variant.decision IS 'pending=待裁；ours-right/source-right=判定哪边对；both=并存两说';
COMMENT ON COLUMN text_variant.note IS '差异位置与上下文，供裁定时快速定位';
