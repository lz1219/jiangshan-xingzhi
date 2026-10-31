-- ── CBDB 核心表注释（原样导入，只加注释不改结构）──────
COMMENT ON TABLE cbdb."BIOG_MAIN" IS 'CBDB 人物主表（66 万条）：生卒、籍贯、朝代、索引年';
COMMENT ON COLUMN cbdb."BIOG_MAIN".c_personid IS 'CBDB 人物 ID，全库主键，也是跨库对接键';
COMMENT ON COLUMN cbdb."BIOG_MAIN".c_name_chn IS '中文姓名（繁体）——查询必须用繁体，简体查不到';
COMMENT ON COLUMN cbdb."BIOG_MAIN".c_birthyear IS '生年（负数表示公元前；0 多为未详）';
COMMENT ON COLUMN cbdb."BIOG_MAIN".c_deathyear IS '卒年';
COMMENT ON COLUMN cbdb."BIOG_MAIN".c_dy IS '朝代编码，对应 cbdb."DYNASTIES".c_dy';
COMMENT ON COLUMN cbdb."BIOG_MAIN".c_index_year IS '索引年（用于大致定位时代）';
COMMENT ON COLUMN cbdb."BIOG_MAIN".c_index_year_type_code IS '索引年类型（生年/卒年/中举年等）';

COMMENT ON TABLE cbdb."POSTED_TO_OFFICE_DATA" IS '仕宦履历（59 万条）：某人某年任何职——行迹骨架的来源';
COMMENT ON COLUMN cbdb."POSTED_TO_OFFICE_DATA".c_personid IS '任职者人物 ID';
COMMENT ON COLUMN cbdb."POSTED_TO_OFFICE_DATA".c_office_id IS '官职编码，对应 OFFICE_CODES';
COMMENT ON COLUMN cbdb."POSTED_TO_OFFICE_DATA".c_firstyear IS '始任年（0 视为未详）';
COMMENT ON COLUMN cbdb."POSTED_TO_OFFICE_DATA".c_lastyear IS '去任年';
COMMENT ON COLUMN cbdb."POSTED_TO_OFFICE_DATA".c_posting_id IS '任所编码（部分记录为「某州」占位，需配合地址表）';

COMMENT ON TABLE cbdb."OFFICE_CODES" IS '官职编码表（3.4 万条）：官职名的权威写法';
COMMENT ON COLUMN cbdb."OFFICE_CODES".c_office_chn IS '官职中文名（繁体）';

COMMENT ON TABLE cbdb."KIN_DATA" IS '亲属关系（56 万条）';
COMMENT ON COLUMN cbdb."KIN_DATA".c_personid IS '主体人物 ID';
COMMENT ON COLUMN cbdb."KIN_DATA".c_kin_id IS '亲属的人物 ID';
COMMENT ON COLUMN cbdb."KIN_DATA".c_kin_code IS '亲属关系编码（父/子/兄/弟…），见 KINSHIP_CODES';

COMMENT ON TABLE cbdb."ASSOC_DATA" IS '社会关系（19 万条）：交游、师承、举荐等';
COMMENT ON COLUMN cbdb."ASSOC_DATA".c_personid IS '主体人物 ID';
COMMENT ON COLUMN cbdb."ASSOC_DATA".c_assoc_id IS '关联人物的 ID';
COMMENT ON COLUMN cbdb."ASSOC_DATA".c_assoc_code IS '关系类型编码，见 ASSOC_CODES';

COMMENT ON TABLE cbdb."ALTNAME_DATA" IS '异名表（20 万条）：字、号、别名——检索与消歧的关键';
COMMENT ON COLUMN cbdb."ALTNAME_DATA".c_personid IS '人物 ID';
COMMENT ON COLUMN cbdb."ALTNAME_DATA".c_alt_name_chn IS '异名（繁体）；用于把"子瞻""东坡"对回苏轼';

COMMENT ON TABLE cbdb."BIOG_ADDR_DATA" IS '人物地址（46 万条）：籍贯、任职地、寓居地、葬地';
COMMENT ON COLUMN cbdb."BIOG_ADDR_DATA".c_personid IS '人物 ID';
COMMENT ON COLUMN cbdb."BIOG_ADDR_DATA".c_addr_id IS '地址编码，对应 ADDR_CODES';
COMMENT ON COLUMN cbdb."BIOG_ADDR_DATA".c_addr_type IS '地址类型（籍贯/任职/葬地…），见 BIOG_ADDR_CODES';

COMMENT ON TABLE cbdb."ADDR_CODES" IS '历史地名编码表（3 万条）：CBDB 的地址主数据';
COMMENT ON COLUMN cbdb."ADDR_CODES".c_name_chn IS '地名（繁体、当时写法）';
COMMENT ON COLUMN cbdb."ADDR_CODES".c_name IS '地名（拼音/英文）';

COMMENT ON TABLE cbdb."ENTRY_DATA" IS '入仕记录（26 万条）：科举名次、举荐等';
COMMENT ON COLUMN cbdb."ENTRY_DATA".c_personid IS '人物 ID';
COMMENT ON COLUMN cbdb."ENTRY_DATA".c_year IS '入仕年';
COMMENT ON COLUMN cbdb."ENTRY_DATA".c_entry_code IS '入仕方式编码（进士/明经/荐举…）';

COMMENT ON TABLE cbdb."DYNASTIES" IS '朝代编码表：c_dy 与朝代名的对应';
COMMENT ON TABLE cbdb."KINSHIP_CODES" IS '亲属关系类型编码';
COMMENT ON TABLE cbdb."ASSOC_CODES" IS '社会关系类型编码';
COMMENT ON TABLE cbdb."ALTNAME_CODES" IS '异名类型编码（字/号/别名…）';
COMMENT ON TABLE cbdb."ENTRY_CODES" IS '入仕方式编码';

-- ── CBDB 任所表（仕宦地点，行迹定地的依据）──────────
COMMENT ON TABLE cbdb."POSTED_TO_ADDR_DATA" IS '仕宦任所（46.5 万条）：把「知某州」落到具体州名，行迹的定地依据';
COMMENT ON COLUMN cbdb."POSTED_TO_ADDR_DATA".c_posting_id IS '任所记录 ID，与 POSTED_TO_OFFICE_DATA.c_posting_id 关联';
COMMENT ON COLUMN cbdb."POSTED_TO_ADDR_DATA".c_personid IS '任职者人物 ID';
COMMENT ON COLUMN cbdb."POSTED_TO_ADDR_DATA".c_addr_id IS '任所地址编码，对应 ADDR_CODES.c_addr_id';
