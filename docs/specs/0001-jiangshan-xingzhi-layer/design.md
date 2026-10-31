# 方案 · 江山时序「诗歌层」

## 现状

- 行迹数据在 `js/lore_data.js` 的 `ATLAS_LORE_DATA.HISTORICAL_JOURNEYS`：7 条行迹、74 站，每站带 `quoteZh / quoteEn`（一句引文）。
- 渲染在 `js/app.js:6777` 生成 `quoteHtml`，6815 拼进 `li.innerHTML`，类名 `.person-ev-quote`。
- 他的扩展机制：`window.__ATLAS_MIXINS` + `Ctrl._extendPrototype(Mixin)`，`js/atlas_quiz.js` 是样板。

## 方案

两层，都不改 `app.js` / `lore_data.js` / `css/style.css`。

### 1. 数据层 `js/atlas_works.js`

`window.ATLAS_WORKS`，键 = 引文里《书名》的原始写法。

| 字段 | 用途 |
|---|---|
| `alias[]` | 标题异写兜底（如「定风波」与「定风波 · 莫听穿林打叶声」） |
| `titleZh / titleEn` | 阅读器标题 |
| `authorZh / year / placeZh` | 元信息行 |
| `genre` | `shi` 诗 · `ci` 词 · `fu` 赋 · `wen` 文 · `history` 史传 |
| `certainty` | `confirmed / probable / disputed`，与基线「系年存疑不算实」的态度一致 |
| `text[]` | 诗：一句一项；词：一阕一项；文/史：一段一项 |
| `meaning` | **大意**：白话转写，不加原文没有的信息 |
| `appreciation` | **赏析**：`{ text, inference?, by, license }`，只收自撰，`by` 恒为「本站自撰」 |
| `appreciation.inference` | **推测**：`{ text, basis }`，结合史事的推演；界面用朱砂虚线 + 「推测」标签分离，`basis` 必须能落在本条 `background` / `source` 里 |
| `notes[]` | `{ term, explain }` |
| `background / source` | 自撰背景 + 版本出处 |

**收录规则：诗词赋史全覆盖**（2026-10-31 确认）。

- 全部文体统一**横排居中**，按句读断行（竖排方案试过，七绝竖起来只剩四根字柱，已废弃）；
- 文 / 史传另加「摘录」标记（我们给的是**被引用的段落**，不是全本）；
- 史传的引文一律取自基线 `lore_data.js` 里的原句，**零转写**——准确性优先于覆盖率。

### 2. 交互层 `js/atlas_reader.js`

- 注册：`window.__ATLAS_MIXINS.push(install)`，与 `atlas_quiz.js` 同构，加载顺序无关。
- 装饰：`MutationObserver` 监听 `body`，发现新增的 `.person-ev-quote` 节点 → 用 `《([^》]+)》` 取标题 → 在 `ATLAS_WORKS` 里命中则加 `.is-poem-link`、`role=link`、`tabindex=0`、点击与键盘处理。
- 打开：自建浮层（backdrop + panel）。**全部文体统一横排居中**：先按句末标点断句，过长再退到逗号处；阕与阕之间留段距。竖排方案已废弃——七绝竖起来只剩四根字柱，空白比字多。
- 内容顺序：正文 → 大意 → 赏析（带 `本站自撰` 与许可标） → 写作背景 → 注释 → 出处。
- 抬头随文体变：`诗词 · 江山行止` / `文 · 江山行止` / `史传 · 江山行止`。
- 关闭：点遮罩、点 ×、按 Esc。
- 样式：由模块注入 `<style id="atlas-poetry-style">`，不污染他的样式表。

### 3. 检索层（作品可搜）

基线的搜索索引在 `_ensureSearchIndex()`（`app.js:10825`），条目按 `kind` 区分：
`person / city / pass / gazetteer / event / era / dynasty / polity / quiz`。

作品不另造搜索，而是**作为一个新 `kind` 注入同一个索引**：

- 包一层 `_ensureSearchIndex()`，返回值上追加 `kind: 'work'` 的条目（数组上打 `__poemsAppended` 标记保证幂等）；
- 条目字段对齐评分的需要：`titleZh` / `titleEn` / `modernZh`（作者）/ `subZh` / `subEn` / `aliases` / `keywords`（**必须给空数组，否则评分函数 `.includes` 会抛错**）/ `dynasty`（**必须是朝代对象，不是 key**）/ `poem`；
- 包一层 `_selectSearchResult()`：命中 `kind === 'work'` 时直接开阅读器，其余交还原逻辑；
- `app.js` 里加两处最小改动：`kindLabel` 增加 `work: '作品'`；结果标签在 `item.dynasty` 为空时不再渲染 `undefined · `。

**正文检索不做**：会把「赤壁」「黄州」这类地名查询的噪音放大，且需要分词。列为 `R-6`。

### 4. 资源版本

`index.html` 新增两行 `<script>`（带 `?v=`），并把两个文件登记进 `scripts/sync_version.js` 的 `STATIC_TAG_ASSETS`，否则线上会拿到旧缓存。

## 涉及文件（均在基线副本内）

| 文件 | 变更 |
|---|---|
| `js/atlas_works.js` | 新增：作品数据 |
| `js/atlas_reader.js` | 新增：装饰器 + 阅读器 |
| `index.html` | +2 行 script |
| `scripts/sync_version.js` | +2 行登记 |

## 取舍

- **不改 `quoteZh`**：他的摘句仍在原位，链接是叠加物。这样即使阅读器出问题，原页面也不受影响。
- **用 MutationObserver 而非改渲染函数**：行迹列表会重绘，观察者比打补丁更耐改。
- **数据独立成文件**：不塞进 796 KB 的 `lore_data.js`，将来可以按人物懒加载。
- **不做 i18n 全文**：先保证中文完整；英文读者看到标题双语 + 中文正文，比机器翻译的韵文诚实。

## 风险

| 风险 | 处置 |
|---|---|
| `<li>` 自身有点击处理，链接点击会冒泡触发选中 | 链接处理里 `stopPropagation` |
| 列表重绘导致重复绑定 | `dataset.poetryLink` 幂等标记 |
| 标题写法不一致（含副题） | `alias[]` + 包含匹配兜底 |
| 竖排短诗右侧留白过大 | 已知，列入 `tasks.md` 待办 |
