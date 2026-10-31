# 开发深读 · 江山行止

> 给「要改这个项目的人」的第二层文档：讲**扩展点在哪、数据怎么约定、哪里踩过坑**。
> 命令、铁律、DoD 在 [AGENTS.md](../AGENTS.md)；定位与决策在 [design.md](design.md)。

---

## 1. 三层结构

```
上游基座（不改）        我们的笺注层                使用者的动作
lore_data.js 引文  →  atlas_works.js 作品数据  →  点摘句 → 读作品
app.js 行迹渲染     →  atlas_reader.js 交互
```

**上游基座**：`js/app.js`（15k 行）、`js/lore_data.js`（7 条行迹 / 74 站）、`js/map_data.js`、`js/atlas_snapshots.js`、`geojson/`。
**我们的层**：只有两个文件——数据 `js/atlas_works.js`、交互 `js/atlas_reader.js`。

---

## 2. 扩展点：`__ATLAS_MIXINS`

上游在主类就绪后会消费挂起的插件，`js/atlas_quiz.js` 是最早的样板：

```js
// app.js:15128
if (Array.isArray(window.__ATLAS_MIXINS)) {
  for (const install of window.__ATLAS_MIXINS.splice(0)) install(HistoricalAtlasController);
}

// 插件侧（atlas_reader.js 同构）
function install(Ctrl) { /* 装饰原型、注册观察者 */ }
const ready = window.HistoricalAtlasController;
if (ready && typeof ready._extendPrototype === 'function') install(ready);
else (window.__ATLAS_MIXINS = window.__ATLAS_MIXINS || []).push(install);
```

这套机制**加载顺序无关**，所以脚本放在 `app.js` 之后即可，不需要改动主类。

---

## 3. 数据契约：`js/atlas_works.js`

单个对象 `window.ATLAS_WORKS`，键 = 引文里《书名》的原始写法。

| 字段 | 说明 |
|---|---|
| `alias[]` | 标题异写，匹配兜底（「定风波」↔「定风波 · 莫听穿林打叶声」） |
| `titleZh` / `titleEn` | 阅读器标题；`titleEn` 缺省时回落 `titleZh`（搜索评分要用字符串） |
| `authorZh` / `authorEn` | 作者；也作为搜索的 `modernZh` / `modernEn` |
| `year` / `placeZh` | 系年与地点，用于元信息行与朝代标签 |
| `genre` | `shi` 诗 / `ci` 词 / `fu` 赋 / `wen` 文 / `history` 史传 |
| `certainty` | `confirmed` / `probable` / `disputed`，界面显示「系年 …」 |
| `text[]` | 正文。诗：一句一项；词：一阕一项；文/史：一段一项 |
| `meaning` | 大意：写「说什么、怎么转、落在哪」，不做逐句对译 |
| `notes[]` | `{ term, explain }`，解释用法与语境，不给同义词了事 |
| `background` | 写作背景，自撰 |
| `appreciation` | `{ text, inference?, by, license }`；`inference` 为 `{ text, basis }` |
| `source` | 出处，必填 |

**收录规则**：诗词赋史全覆盖；文与史传只收**被引用的段落**，界面标「摘录」。

### 数据规模与拆分时机

当前是**单个 JS 对象、整份随首屏加载**。实测基线（2026-10-31）：50 条 / 77 KB / 人均 1570 bytes / 解析 5 ms。整份首屏 JS 合计约 2.25 MB，作品只占其中 3%，所以现在完全不是瓶颈。

按人均体积外推：

| 条目 | 体积 | 相对首屏 | 判断 |
|---|---|---|---|
| 50 | 77 KB | +3% | 没问题（现状） |
| 300 | 460 KB | +20% | 开始有感，仍可用 |
| 1000 | 1.5 MB | +67% | **必须拆** |
| 5000 | 7.7 MB | +340% | 不可接受 |

除了体积，增长还会压到三处：

1. **搜索索引**——每个作品都会往主索引里加一条，评分是逐条线性扫描，几千条后输入会卡。
2. **装饰匹配**——`findPoem` 现在按标题线性遍历全部条目，条目上万时要换 Map 索引。
3. **git 友好度**——整份 JSON 字面量，任何脚本改写都会产生全文件 diff。

拆分方案（触发时再做，见 `T-1`）：

```
atlas_works_index.js    标题 → { alias, author, year, place, genre }   ← 常驻，够装饰与搜索
atlas_works/<shard>.js  正文全量，按人物（journey）分片，点击时用 _lazyAssetUrl 注入
```

装饰只需要知道「这个书名在不在库里」，不需要正文——所以索引常驻、正文懒加载是天然的切分线。

---

## 4. 阅读器流水线

```
MutationObserver 监听 body
  → 发现 .person-ev-quote
  → 用 《([^》]+)》 取书名
  → ATLAS_WORKS 命中则加 .is-poem-link
  → 点击 → openReader(work)
```

渲染分三步：

1. **抬头**：`笺 · 江山行止` + 标题 + 英文副题 + 元信息（作者 · 年 · 地 · 文体 · 系年 · 摘录）
2. **正文**：交给渲染器
3. **内容块**：大意 → 赏析（正文 + 推测）→ 写作背景 → 注释 → 出处

### 渲染器注册表

```js
window.ATLAS_READER_RENDERERS = {
  verse(p) { /* 按句读断行、居中 */ },
  prose(p) { /* 段落、两端对齐 */ },
};
var GENRE_KIND = { shi:'verse', ci:'verse', fu:'verse', wen:'prose', history:'prose' };
```

**新增一种文体**（例如人物志、碑刻、书画题跋）只需两步：注册一个渲染器函数，再在 `GENRE_KIND` 里登记映射。`app.js` 零改动。

---

## 5. 搜索注入（`kind: 'work'`）

作品不另造搜索，而是作为一个新的 `kind` 注入上游索引：

```js
proto._ensureSearchIndex = function () {
  const index = origEnsureIndex.apply(this, arguments);
  appendWorkEntries(index, this);   // 幂等：数组上打 __poemsAppended 标记
  return index;
};
proto._selectSearchResult = function (item) {
  if (item && item.kind === 'work') { openReader(item.poem); return; }
  return origSelectResult.apply(this, arguments);
};
```

### 三个坑（都踩过）

| 坑 | 症状 | 解法 |
|---|---|---|
| `keywords` 缺失 | 输入任何字都抛 `Cannot read properties of undefined (reading 'includes')` | 条目必须带 `keywords: []` |
| `dynasty` 传字符串 | 结果标签渲染出字面量 `undefined · 作品` | `dynastyBadge(d)` 读的是 `d.badge \|\| d.title`，要传**朝代对象** |
| 空朝代前缀 | 无朝代时标签变成 `undefined · 作品` | `app.js` 的结果模板已改为空朝代不回退前缀 |

---

## 6. 版本戳

上游每个脚本都带 `?v=<8位哈希>`，由 `scripts/sync_version.js` 统一重算：

```bash
node scripts/sync_version.js          # 重算并写回 index.html
node scripts/sync_version.js --check  # 只校验
```

改了 `js/` 下任何文件都要跑一次，否则线上会拿到旧缓存。新增脚本也要登记进 `STATIC_TAG_ASSETS`。

---

## 7. 怎么加一条作品

```js
// js/atlas_works.js
'新书名': {
  alias: ['新书名'],
  titleZh: '新书名 · 副题',
  titleEn: 'English Title',
  authorZh: '作者',
  year: 1082,
  placeZh: '黄州',
  genre: 'shi',
  certainty: 'confirmed',
  text: ['……'],
  meaning: '……',
  notes: [{ term: '词', explain: '……' }],
  background: '……',
  appreciation: { text: '……', inference: { text: '……', basis: '……' }, by: '本站自撰', license: 'CC BY-SA 4.0' },
  source: '《出处》卷次',
}
```

然后 `node scripts/_gap_report.cjs` 看覆盖率是否上升、`node scripts/sync_version.js` 重算缓存戳、本地刷新点开看。

**原文从哪来**：`node scripts/_dump_missing.cjs` 会把未收录作品的引文原句从 `lore_data.js` 里逐字导出——照抄它，不要自己打字。

---

## 8. 验证方式

| 动作 | 命令 |
|---|---|
| 起服务 | `node scripts/_serve.cjs` → http://127.0.0.1:5199/ |
| 看某条行迹 | `/?person=sushi`、`/?person=xuanzang` |
| 覆盖率 | `node scripts/_gap_report.cjs` |
| 文档体检 | `node scripts/check-docs.mjs` |
| 缓存戳 | `node scripts/sync_version.js --check` |

自动化截图与交互验证脚本不在本仓库（它们是开发机上的临时工具），如需复现请手动点开确认。

## 9. 契约与降级（对上游的依赖清单）

上游 `app.js` 会变。我们把「依赖上游哪些东西」集中在 `js/atlas_contract.js`：

```js
window.ATLAS_SELECTORS = { quote, timeline, timelineBody, panelTitle, subtitle };
window.__ATLAS_HEALTH  = { hooks: {...}, warnings: [...] };
window.atlasProbe(name, ok, note)   // 每个依赖点登记一行
```

页面加载后 `<html data-atlas-health="ok">`；任何探测失败会写进属性与 `console`。

### 每个依赖点都有退路

| 依赖 | 主路径 | 退路 | 退路是否验证 |
|---|---|---|---|
| 人物面板渲染 | 包装 `_renderPersonChronicleCard` | **MutationObserver 观察 `#genealogy-body`** | ✅ 实测：冲掉 `.cr-*` 后自动恢复 |
| 当前人物 key | `window.atlasApp.activePerson` | 面板抬头 `#genealogy-heading` 的文本 → 查 `PERSON_PROFILES` | ✅ |
| 摘句类名 | `.person-ev-quote` | **按文本特征认**（含《书名》+「」+ 长度 8–120 的叶子节点） | ✅ 实测：改类名后 5 条链全部恢复 |
| 作品检索 | 包装 `_ensureSearchIndex` | 无（降级：作品不入搜索，摘句成链不受影响） | ⚠️ 仅探测 |
| 行迹补录 | overlay 在 `app.js` 之前注入 | 无 | ⚠️ 仅探测 |

### 幂等标记的坑

`decorateQuote` 用 `data-poetry-link="1"` 防重复挂载。测试退路时必须**同时清掉类名、`data-poetry-link`、`data-atlas-quote`**，否则看起来"没恢复"，其实是幂等挡住了。

### 已知未加固项

| 项 | 影响 | 建议 |
|---|---|---|
| ~~外部字体阻塞 `load`~~ | 已解决（`D-2`）：移除 Google Fonts，`load` 4.6s → 0.64s | — |
| 第三方统计脚本 | 已改为 `load` 之后注入，不再阻塞初始化 | — |
| 全局名 `ATLAS_LORE_DATA` / `ATLAS_WORKS` / `ATLAS_JOURNEYS` | 上游若改全局名，全挂 | 概率极低，暂不做 |
| `?v=` 缓存戳 | 忘记跑 `sync_version.js` 会拿到旧脚本 | 提交前跑 `--check` |
