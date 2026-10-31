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
仓库 JS 数据  ──pg-load.cjs──▶  person / journey / stop / work / book
外部史料原文  ──待做──▶          text_unit / paragraph
考据结论      ──手工 SQL 或脚本──▶ claim / evidence
```

装载器**幂等**：按自然键 upsert，可反复执行。

## 6. 一条已知的建模坑（库里抓出来的）

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
