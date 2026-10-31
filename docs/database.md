# 考据库（PostgreSQL）· 江山行止

> 用途：**考据时作为参考**——查人物、查行迹、查作品、查断言与证据。
> 站点仍是纯静态，数据库只是**作业时的工具**，不参与线上运行。

## 1. 它解决什么

| 没有库 | 有库 |
|---|---|
| 想看"蒋捷的卒年有几个说法"要翻文档 | 一条 SQL 出证据全景，含等级与出处 |
| 引文是否逐字，只能人眼比 | 全文索引 + 子串校验 |
| 作品系年是否与作者生卒矛盾 | 一条 JOIN 查出来 |
| 某人一辈子到过哪些地方 | 聚合查询 |

## 2. 连接

**凭据不进仓库。** 用环境变量：

```powershell
$env:PGHOST     = '<host>'
$env:PGPORT     = '5432'
$env:PGUSER     = '<user>'
$env:PGPASSWORD = '<password>'
$env:PGDATABASE = 'jiangshan'
```

查询工具在仓库外（与 Playwright 同处 `_verify/`，避免给站点引入 npm 依赖）：

```bash
cd D:\WorkSpace\opencode\_verify
node pg.cjs "select * from person where zh='蒋捷'"
node pg.cjs --file some.sql
node pg-load.cjs      # 把仓库里的 JS 数据重新装载（幂等）
```

`schema.sql` 在仓库内（`research/schema.sql`），装载器与查询器在仓库外。

## 3. 表结构

**每个表、每个字段都有注释**（`research/schema-comments*.sql`、`research/cbdb-comments.sql`）。
注释回答"为什么需要它"，不是重复列名。

查看注释：

```sql
-- 某张表的所有列注释
SELECT a.attname AS 列, col_description(a.attrelid, a.attnum) AS 注释
FROM pg_attribute a
WHERE a.attrelid = 'person'::regclass AND a.attnum > 0 AND NOT a.attisdropped
ORDER BY a.attnum;

-- 全部表注释
SELECT c.relname, obj_description(c.oid, 'pg_class')
FROM pg_class c WHERE c.relnamespace = 'public'::regnamespace AND c.relkind = 'r';
```

```
person   人物（含 CBDB / Wikidata ID、生卒精度、生卒备注）
  └ journey 行迹（origin: upstream | overlay）
       └ stop 站点（年、年号、坐标、古今地名、引文、出处）

work     作品（正文、大意、背景、赏析、推测与依据、出处）
         ⚠ year_kind: composition=作年 / event=所述之年（史传）

book     书目
  └ text_unit 卷/篇（含 edition、sha256）
       └ paragraph 段（引文定位的最小单位，gin_trgm 索引）

claim    断言（subject + predicate + value + status）
  └ evidence 证据（stance: support|contradict、grade: A–D、可指向 paragraph）
```

核心视图 `claim_evidence_view`：一条断言的证据全景。

## 4. 三条常用查询

**① 某个断言有几个说法、各是什么等级**

```sql
SELECT predicate, status, grade, source_text, quote
FROM claim_evidence_view
WHERE subject_key = 'jiangjie'
ORDER BY predicate, grade;
```

**② 作品作年是否落在作者生卒内**（能抓"卒后作诗"）

```sql
SELECT w.key, w.year, p.zh, p.born, p.died
FROM work w JOIN person p ON p.zh = w.author_zh
WHERE w.year_kind = 'composition'
  AND w.year IS NOT NULL AND p.born IS NOT NULL
  AND (w.year < p.born OR (p.died IS NOT NULL AND w.year > p.died + 2));
```

**③ 某人一生到过哪些地方**

```sql
SELECT p.zh, count(*) AS stops, min(s.year), max(s.year),
       string_agg(DISTINCT s.place_ancient, ' · ' ORDER BY s.place_ancient) AS places
FROM stop s
JOIN journey j ON j.id = s.journey_id
JOIN person p ON p.id = j.person_id
GROUP BY p.zh ORDER BY stops DESC;
```

**④ 引文定位**（待原文入库后可用）

```sql
SELECT b.title, u.juan, p.seq, left(p.body, 80)
FROM paragraph p
JOIN text_unit u ON u.id = p.unit_id
JOIN book b ON b.id = u.book_id
WHERE p.body LIKE '%莫听穿林打叶声%';
```

## 5. 装载流程

```
仓库 JS 数据  ──pg-load.cjs──▶   person / journey / stop / work / book
CBDB SQLite   ──cbdb-import.cjs──▶ cbdb schema（原样，78 表取核心 8 表）
Kanripo 文本   ──text-import.cjs──▶ text_unit / paragraph（原文 + 简体列）
引文校验      ──quote-check.cjs──▶ evidence 的四级匹配结果
考据结论      ──手工 SQL 或脚本──▶ claim / evidence / text_variant
```

装载器**幂等**：按自然键 upsert，可反复执行。

### 原文层：Kanripo → PostgreSQL

```bash
node text-import.cjs --file KR2a0032_338.txt --book 宋史 --juan 卷三百三十八 \
  --edition "Kanripo KR2a0032 / 四庫全書文淵閣本" --url https://github.com/kanripo/KR2a0032
```

- Kanripo 文本**按约 20 字硬换行**，不能按行分段；分段依据是「篇题行」与独占一行的 `¶`
- 原文（繁体）入 `body`，OpenCC `t2s` 生成 `body_simplified`（不下发、只校验）
- 每卷入 `text_unit`，逐段入 `paragraph`，供引文定位

### 引文四级校验

| 级别 | 判据 | 处置 |
|---|---|---|
| `exact` | 原文繁体含此串 | 最可信，记偏移 |
| `normalized` | 去标点空白 + 异体归一后命中 | 不算错 |
| `partial` | 按句切分命中率 ≥0.8 且缺失 ≤1 句 | 节引，记 `missing_fragments` |
| `fail` | 以上都不中 | 报错，人工确认 |

### 异体字 vs 异文（必须分开）

| 类别 | 例 | 处置 |
|---|---|---|
| **异体字** | 揺/摇、呌/叫、堦/阶、㸃/点 | 入 `variant_char`，**自动归一** |
| **异文** | 秋娘**度**/秋娘**渡**、泰娘**嬌**/泰娘**桥** | 入 `text_variant`，**只记录不修改** |

归并异体字是校正用字；归并异文就是篡改史料。这条界线不能混。

### 人物 → 卷：自动圈段 + 人工确认

```bash
node person-annotate.cjs        # 用 787 个别名 + CBDB 异名，把人物相关段标成 pending
```

- 名单来源三层：`person.zh` → `person_name`（仓库别名/字号）→ `cbdb.altname_data`（CBDB 异名）
- 结果落 `person_source`，`status = pending`，`method = auto`
- 人工确认后改 `confirmed`；确认过的不会被下次自动跑覆盖（`method` 区分）

### 异体/异文自动发现

```bash
node variant-discover.cjs --work '一剪梅·舟过吴江'
```

对校验未过句，滑动窗口找原文最相似片段，逐字比对并写入 `text_variant`，
同时可用于发现**新的异体字**（同一对字反复出现即候选）。

## 6. 已知的建模坑（库里抓出来的）

《史记·秦始皇本纪》的 `year` 是**所述之年**（前 238），不是司马迁的**作年**。
第一次跑一致性检查就报了"作年早于作者出生"。

处置：加 `year_kind`（`composition` / `event`），史传类记 `event`。
**这类错误正是把数据放进库里的理由——文件形态下没人会去 JOIN 检查。**

## 7. 与展示层的关系

| 层 | 真相在哪 | 谁改 |
|---|---|---|
| 考据（断言、证据、原文） | 数据库 | 人工 + 脚本 |
| 展示（作品、行迹、读本） | 仓库 JS 文件（git） | 由考据结论**编译**而来 |

**方向只能是"库 → 文件"**：库是工作台，git 是可发布产物。反过来会让站点依赖数据库，破坏静态与离线。

> 注意：目前 `atlas_overlay.js` 等文件仍是**手写**的；等考据稳定后，应改为由库导出，脚本生成为准、人工校订为辅。
