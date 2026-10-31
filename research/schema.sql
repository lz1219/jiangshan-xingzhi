-- 江山行止 · 考据库 schema
-- 应用方式：psql 或 Node 驱动执行本文件（见 docs/database.md）
--
-- 设计原则：
--   1. 展示层（作品、行迹）与考据层（原文、断言、证据）分开
--   2. 一条断言可挂多条证据，证据可支持或反驳 → 冲突显形
--   3. 原文按「卷/篇 → 段」切分，引文可定位到段
--   4. 作品的 year 必须区分「作年」与「所述之年」

-- ── 人物 ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS person (
  id             serial PRIMARY KEY,
  key            text UNIQUE NOT NULL,
  zh             text NOT NULL,
  en             text,
  courtesy_zh    text,                      -- 字/号/生卒备注
  dynasty_key    text,
  born           int,
  died           int,
  born_precision text DEFAULT 'unknown',    -- year|reign|range|decade|approx|unknown
  died_precision text DEFAULT 'unknown',
  cbdb_id        text,
  wikidata_id    text,
  span_note      text,                      -- 「生卒年无确考（约1245—1314 之后）」
  meta           jsonb DEFAULT '{}'::jsonb
);

-- ── 行迹 ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS journey (
  id           serial PRIMARY KEY,
  key          text UNIQUE NOT NULL,
  person_id    int REFERENCES person(id) ON DELETE SET NULL,
  title_zh     text,
  title_en     text,
  short_zh     text,
  origin       text NOT NULL DEFAULT 'upstream',  -- upstream | overlay
  intro        text,
  intro_source text
);

-- ── 站点 ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS stop (
  id            serial PRIMARY KEY,
  journey_id    int NOT NULL REFERENCES journey(id) ON DELETE CASCADE,
  seq           int NOT NULL,
  year          int,
  era_zh        text,
  year_note     text,                       -- 「约」
  lng           double precision,
  lat           double precision,
  place_ancient text,
  place_modern  text,
  title_zh      text,
  desc_zh       text,
  quote_zh      text,
  source        text,
  UNIQUE (journey_id, seq)
);

-- ── 作品 ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS work (
  id              serial PRIMARY KEY,
  key             text UNIQUE NOT NULL,
  title_zh        text,
  title_en        text,
  author_zh       text,
  author_en       text,
  genre           text,
  certainty       text,
  year            int,
  year_kind       text DEFAULT 'composition',  -- composition=作年 | event=所述之年
  place_zh        text,
  body            text,                        -- 段落以换行分隔
  meaning         text,
  background      text,
  appreciation    text,
  inference       text,
  inference_basis text,
  source          text
);
COMMENT ON COLUMN work.year_kind IS 'composition=作年；event=所述事件之年（史传等）';

-- ── 书目 / 卷篇 / 段 ─────────────────────────────────
CREATE TABLE IF NOT EXISTS book (
  id         serial PRIMARY KEY,
  title      text UNIQUE NOT NULL,           -- 《宋史》
  edition    text,
  license    text,
  source_url text
);

CREATE TABLE IF NOT EXISTS text_unit (
  id      serial PRIMARY KEY,
  book_id int REFERENCES book(id) ON DELETE CASCADE,
  juan    text,
  title   text,
  body    text NOT NULL,
  sha256  text,
  UNIQUE (book_id, juan)
);

CREATE TABLE IF NOT EXISTS paragraph (
  id      serial PRIMARY KEY,
  unit_id int NOT NULL REFERENCES text_unit(id) ON DELETE CASCADE,
  seq     int NOT NULL,
  body    text NOT NULL,
  UNIQUE (unit_id, seq)
);

-- ── 断言与证据（考据核心）────────────────────────────
CREATE TABLE IF NOT EXISTS claim (
  id           serial PRIMARY KEY,
  subject_type text NOT NULL,                -- person|stop|work
  subject_key  text NOT NULL,
  predicate    text NOT NULL,                -- died|born|year|place|...
  value        jsonb,
  status       text NOT NULL DEFAULT 'unknown',  -- settled|disputed|unknown
  note         text,
  UNIQUE (subject_type, subject_key, predicate)
);

CREATE TABLE IF NOT EXISTS evidence (
  id           serial PRIMARY KEY,
  claim_id     int NOT NULL REFERENCES claim(id) ON DELETE CASCADE,
  stance       text NOT NULL DEFAULT 'support',  -- support|contradict
  grade        text,                             -- A|B|C|D
  quote        text,
  source_text  text,                             -- 出处字符串（卷次等）
  unit_id      int REFERENCES text_unit(id) ON DELETE SET NULL,
  paragraph_id int REFERENCES paragraph(id) ON DELETE SET NULL,
  note         text
);

-- ── 索引 ──────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS paragraph_trgm ON paragraph USING gin (body gin_trgm_ops);
CREATE INDEX IF NOT EXISTS work_title_trgm ON work USING gin (title_zh gin_trgm_ops);
CREATE INDEX IF NOT EXISTS stop_place_trgm ON stop USING gin (place_ancient gin_trgm_ops);
CREATE INDEX IF NOT EXISTS evidence_claim ON evidence (claim_id);
CREATE INDEX IF NOT EXISTS claim_subject ON claim (subject_type, subject_key);

-- ── 视图：一条断言的证据全景 ─────────────────────────
CREATE OR REPLACE VIEW claim_evidence_view AS
SELECT c.id AS claim_id,
       c.subject_type,
       c.subject_key,
       c.predicate,
       c.status,
       c.value,
       e.stance,
       e.grade,
       e.source_text,
       e.quote,
       (SELECT p.body FROM paragraph p WHERE p.id = e.paragraph_id) AS paragraph_text
FROM claim c
LEFT JOIN evidence e ON e.claim_id = c.id;
