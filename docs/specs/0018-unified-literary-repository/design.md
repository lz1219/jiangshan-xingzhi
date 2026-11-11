# 架构设计 · 统一文献库与作品典籍整合 (Spec 0018)

## 一、四层实体关系设计

```
                    ┌────────────────────────┐
                    │      统一人物 (Person)  │
                    │   cbdb_id / 生卒 / 行迹  │
                    └───────────┬────────────┘
                                │ 创作 / 涉及
                                ▼
                    ┌────────────────────────┐
                    │      统一作品 (Work)    │◄── 稳定全局标识 (work_key)
                    │ 题名 / 别名 / 体裁 / 作者 │
                    └─────┬──────────────┬───┘
                          │              │
       ┌──────────────────┘              └──────────────────┐
       ▼                                                    ▼
┌───────────────────────────┐                    ┌─────────────────────────┐
│   文本见证 (WorkWitness)    │                    │    研读译注 (WorkReading)│
│ • 所属底本 / 典籍卷篇       │                    │ • 逐段忠实译文           │
│ • 关联语料 poem_id 或      │                    │ • 词句定位注释           │
│   text_unit / paragraph ID│                    │ • 背景与分节赏析         │
│ • 摘录标记与省略范围       │                    │ • 审校状态与 AI 标识     │
│ • 异文说明 (如卜算子末句)   │                    └─────────────────────────┘
│ • 正文快照 (繁简) 与 SHA256│                                 ▲
└─────────────┬─────────────┘                                 │
              │                                                │
              ▼                                                │
┌───────────────────────────┐                                  │
│   行迹引用 (WorkStopLink)  │────────────────────────────────┘
│ • journey_key + stop_seq  │  (以原文为锚点展开时空入口)
│ • 关系：引用 / 创作 / 提及  │
│ • 史料依据 (source + basis)│
└───────────────────────────┘
```

## 二、数据契约与关键字段

1. **`Work`（作品本体）**：
   - `work_key`（如 `sushi-shuidiaogetou`）
   - `title_zh` / `title_en` / `aliases`（别名、词牌异称）
   - `genre`（`shi` / `ci` / `fu` / `wen` / `history` / `qu`）
   - `author_key`（外键关联 Person）
   - `composed`（`year`, `year_kind`, `place_zh`, `place_key`）
2. **`WorkWitness`（文本见证）**：
   - `witness_key`（全局标识）
   - `is_primary`（布尔值，是否为主读本见证）
   - `edition_name`（版本底本名，如《全宋词》中华书局本）
   - `corpus_target`（`type: "poem" | "text_unit" | "paragraph"`, `id: integer`）
   - `is_excerpt`（是否摘录）
   - `excerpt_range`（摘录行号、截取范围、省略内容说明）
   - `variant_notes`（版本异文说明）
   - `text_paragraphs` / `text_paragraphs_simp` / `text_sha256`
3. **`WorkReading`（研读译注）**：
   - `meaning`（总体大意）
   - `paragraphs_reading`（逐段译文、定位词注 `term` + `explain`）
   - `background`（写作历史背景，带出处）
   - `appreciation`（自撰赏析、分节、推测 `inference` + `basis`）
   - `provenance`（`original` / `ai_generated`）
   - `review_status`（`unreviewed` / `verified`）
4. **`WorkStopLink`（行迹引用）**：
   - `journey_key` + `stop_seq`
   - `relation`（`stop-quotes-work` / `composed_at` / `mentioned`）
   - `matching_text`（重合引文片段）
   - `basis`（说明依据与局限性，不强加亲历假定）

## 三、线上双库演进与迁移路径

1. **当前现状**：
   - 线上 `jiangshan_web`（应用至 `0006_stop_kind`，69篇作品，缺 `place_key`, `stable_id`）；
   - 线上 `jiangshan`（语料库，32张表，8.8万首诗词，含候选表与研究表）。
2. **渐进迁移步骤**：
   - **阶段一（已落地）**：
     - 前端打通作品详情至语料见证跳转入口；
     - 人物页接入全量诗词语料（362首可查可读）；
     - `export_json` 增加对旧库缺少 `place_key`、`stable_id` 的自动兼容保护。
   - **阶段二（数据库结构平滑升级）**：
     - 在业务库 `jiangshan_web` 中分步应用 `0007_research` 与 `0008_researchartifact` 迁移，补齐 `place_key` 与研究表；
     - 严格写前备份、事务执行与回滚演练。
   - **阶段三（统一作品模型落库）**：
     - 将现有 69 篇精选作品转化为统一作品实体，正文作为主见证；
     - 通过关联表/视图批量挂载唐宋诗词语料见证。
   - **阶段四（旧数据与冗余脚本退场）**：
     - 在备份回读和引用校验完全通过后，废弃本地 SQLite，统一使用 PostgreSQL 导出驱动地图生成。

## 四、前端统一阅读器交互设计

1. **统一四入口导航**：
   - 「作品」：精选研读篇目置顶/带徽章，全文库诗词统一检索，点击进入统一作品阅读器；
   - 「人物」：生平、生卒、仕历、精选研读、全量传世诗词、时空行迹入口一览无余；
   - 「典籍」：按书目卷篇浏览，点击篇目进入统一见证阅读；
   - 「行迹」：时空地图与站点文献入口。
2. **统一作品研读器（Unified Work Reader）**：
   - 顶部：题名、作者、文体、系年，提供「版本见证切换器」；
   - 文本区：主见证正文，点击分句展开忠实译文与定位词注；
   - 对照区：对比不同版本见证，高亮异文与中间省略标记；
   - 时空区：展示引用该作品的行迹站点与历史地图入口。
