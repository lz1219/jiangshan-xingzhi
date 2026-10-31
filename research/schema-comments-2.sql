-- ── 注释（续）：补齐全部字段 ──────────────────────────
COMMENT ON COLUMN book.id IS '主键';
COMMENT ON COLUMN book.title IS '书名（含书名号，如《宋史》）；与 work.source 里的写法对齐';
COMMENT ON COLUMN book.license IS '许可状态；用于标注可用范围';
COMMENT ON COLUMN book.source_url IS '电子来源地址（GitHub 仓库或网站）';

COMMENT ON COLUMN claim.id IS '主键';
COMMENT ON COLUMN claim.note IS '备注：为何 disputed、异说要点';
COMMENT ON COLUMN claim.predicate IS '谓词：born|died|year|place|loyalist…；同一主体可有多个谓词';
COMMENT ON COLUMN claim.subject_key IS '主体键：person.key / stop.id / work.key';
COMMENT ON COLUMN claim.subject_type IS '主体类型：person|stop|work';

COMMENT ON COLUMN evidence.claim_id IS '所属断言';
COMMENT ON COLUMN evidence.id IS '主键';
COMMENT ON COLUMN evidence.note IS '备注：该证据与断言的关系说明';
COMMENT ON COLUMN evidence.paragraph_id IS '精确到段的定位；原文入库后填，可直接回看上下文';
COMMENT ON COLUMN evidence.quote IS '证据原文片段；引文校验时与 text_unit 比对';
COMMENT ON COLUMN evidence.source_text IS '出处字符串（书+卷次）；原文未入库时这是唯一线索';
COMMENT ON COLUMN evidence.unit_id IS '所属原文卷（text_unit）';

COMMENT ON COLUMN journey.id IS '主键';
COMMENT ON COLUMN journey.key IS '行迹键；与上游 journey.key 或补录键一致';
COMMENT ON COLUMN journey.person_id IS '对应人物（person.id）';
COMMENT ON COLUMN journey.short_zh IS '简称，人物切换器与地图标签用';
COMMENT ON COLUMN journey.title_en IS '英文标题';
COMMENT ON COLUMN journey.title_zh IS '中文标题';

COMMENT ON COLUMN office.id IS '主键';
COMMENT ON COLUMN office.note IS '备注（如「贬」「起复」等性质）';
COMMENT ON COLUMN office.person_id IS '任职者';
COMMENT ON COLUMN office.source IS '出处（CBDB 记录来源编号或史传卷次）';
COMMENT ON COLUMN office.title IS '官职名（CBDB OFFICE_CODES.c_office_chn）';
COMMENT ON COLUMN office.year IS '始任年（负数为公元前；0 视为未详）';
COMMENT ON COLUMN office.year_end IS '去任年；与 year 构成任期区间';

COMMENT ON COLUMN paragraph.body IS '段正文（原文，繁体）；引文定位的比对对象';
COMMENT ON COLUMN paragraph.id IS '主键';
COMMENT ON COLUMN paragraph.unit_id IS '所属卷（text_unit）';

COMMENT ON COLUMN person.died IS '卒年；精度见 died_precision，有异说时看 span_note 与 claim';
COMMENT ON COLUMN person.died_precision IS '卒年精度：year|reign|range|decade|approx|unknown';
COMMENT ON COLUMN person.dynasty_key IS '朝代键，对应上游 DYNASTIES 表；影响地图配色与筛选';
COMMENT ON COLUMN person.en IS '英文名（双语展示）';
COMMENT ON COLUMN person.id IS '主键';
COMMENT ON COLUMN person.meta IS '附加元数据（别名、是否有行迹等 JSON）；不参与核心查询';

COMMENT ON COLUMN person_name.id IS '主键';
COMMENT ON COLUMN person_name.name IS '异名文本（字、号、别名、英文名）';
COMMENT ON COLUMN person_name.person_id IS '所属人物';
COMMENT ON COLUMN person_name.source IS '来源：仓库 JS 数据 / Wikidata / CBDB';

COMMENT ON COLUMN person_source.id IS '主键';
COMMENT ON COLUMN person_source.note IS '圈定说明：命中几段、用了几个名字';
COMMENT ON COLUMN person_source.para_end IS '相关段落结束序号';
COMMENT ON COLUMN person_source.person_key IS '人物键（person.key）';
COMMENT ON COLUMN person_source.unit_id IS '卷（text_unit.id）';

COMMENT ON COLUMN place.admin IS '隶属建置（州/路/府），用于判断层级与归属';
COMMENT ON COLUMN place.ancient IS '古地名（当时写法）';
COMMENT ON COLUMN place.id IS '主键';
COMMENT ON COLUMN place.lat IS '纬度（治所）';
COMMENT ON COLUMN place.lng IS '经度（治所）';
COMMENT ON COLUMN place.modern IS '今地名';
COMMENT ON COLUMN place.source IS '出处（CHGIS / 地名库）';
COMMENT ON COLUMN place.valid_to IS '该建置的结束年；与 valid_from 构成有效区间';

COMMENT ON COLUMN relation.id IS '主键';
COMMENT ON COLUMN relation.person_id IS '主体人物';
COMMENT ON COLUMN relation.related_key IS '关联人物的站内键（若库里也有此人）';
COMMENT ON COLUMN relation.related_name IS '关联人名（史料原样）';
COMMENT ON COLUMN relation.source IS '出处';

COMMENT ON COLUMN research_note.body IS '线索内容：候选、理由、被否决的原因';
COMMENT ON COLUMN research_note.created_at IS '记录时间';
COMMENT ON COLUMN research_note.id IS '主键';
COMMENT ON COLUMN research_note.subject_key IS '线索主体（人物键或书卷）';
COMMENT ON COLUMN research_note.topic IS '主题（如「卒年三说」「Wikidata 同名误绑」）';

COMMENT ON COLUMN stop.desc_zh IS '本站叙述：那年在此发生了什么（补录站须有据）';
COMMENT ON COLUMN stop.era_zh IS '纪年文本（年号或「约」），供界面显示';
COMMENT ON COLUMN stop.id IS '主键';
COMMENT ON COLUMN stop.journey_id IS '所属行迹';
COMMENT ON COLUMN stop.lat IS '纬度';
COMMENT ON COLUMN stop.lng IS '经度';
COMMENT ON COLUMN stop.place_ancient IS '当时地名';
COMMENT ON COLUMN stop.place_modern IS '今地名';
COMMENT ON COLUMN stop.seq IS '站序，从 1 起；读本承接语按此定位';
COMMENT ON COLUMN stop.title_zh IS '站题（四字概括，如「贬谪黄州」）';
COMMENT ON COLUMN stop.year IS '年份（负数为公元前）；精确度见 year_note';

COMMENT ON COLUMN text_unit.book_id IS '所属书目';
COMMENT ON COLUMN text_unit.fetched_at IS '抓取时间；重新抓取时用于判断是否过期';
COMMENT ON COLUMN text_unit.id IS '主键';
COMMENT ON COLUMN text_unit.juan IS '卷次（如「卷三百三十八」）；与 book_id、edition 组成唯一键';
COMMENT ON COLUMN text_unit.source_url IS '来源地址（Kanripo 仓库等）';
COMMENT ON COLUMN text_unit.title IS '篇题（如「苏轼传」）';

COMMENT ON COLUMN text_variant.created_at IS '记录时间';
COMMENT ON COLUMN text_variant.id IS '主键';
COMMENT ON COLUMN text_variant.our_text IS '我们的文本（来自 work.body）';
COMMENT ON COLUMN text_variant.src_text IS '原文对应窗口（来自 text_unit）';
COMMENT ON COLUMN text_variant.unit_id IS '所在卷';
COMMENT ON COLUMN text_variant.work_key IS '作品键';

COMMENT ON COLUMN variant_char.from_char IS '异体字（四库本等古籍用字）';
COMMENT ON COLUMN variant_char.to_char IS '归一后的通行字';

COMMENT ON COLUMN work.author_en IS '作者英文名';
COMMENT ON COLUMN work.author_zh IS '作者中文名；与 person.zh 对应以做生卒校验';
COMMENT ON COLUMN work.background IS '写作背景（自撰，须有据）';
COMMENT ON COLUMN work.body IS '正文；段落以换行分隔，校验时按句切分';
COMMENT ON COLUMN work.certainty IS '系年可信度：confirmed|probable|disputed|unknown';
COMMENT ON COLUMN work.genre IS '文体：shi|ci|fu|wen|history；决定渲染器与「摘录」标记';
COMMENT ON COLUMN work.id IS '主键';
COMMENT ON COLUMN work.key IS '作品键（引文里的《书名》原样）；摘句成链按此匹配';
COMMENT ON COLUMN work.meaning IS '大意：写「说什么、怎么转、落在哪」，不做逐句对译';
COMMENT ON COLUMN work.place_zh IS '作地；与行迹站点互证';
COMMENT ON COLUMN work.title_en IS '英文标题；缺失时回落中文（搜索评分需要字符串）';
COMMENT ON COLUMN work.title_zh IS '标题（含副题）';
COMMENT ON COLUMN work.year IS '年份；作年还是所述之年，看 year_kind';
