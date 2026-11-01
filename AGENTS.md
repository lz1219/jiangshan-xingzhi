# AGENTS.md · 江山行止

> 本文件是**执行者契约**：给在本仓库里动手的人和 AI。
> 每次会话自动加载，只写「看完就能动手」的东西。深读在 [docs/dev-guide.md](docs/dev-guide.md)。
>
> **本仓库是 [江山时序](https://github.com/DeanChensj/jiangshan-map) 的改造分支（GPL-3.0）**，
> 改造名「江山行止」：**行**为位移，**止**为驻足 —— 在行迹停下的地方，把一句摘引展开成完整作品。

## 0. 三十秒上手

```bash
node scripts/_serve.cjs          # http://127.0.0.1:5199/  （纯静态，无需安装依赖）
node scripts/check-docs.mjs      # 文档体检
node scripts/_gap_report.cjs     # 作品覆盖率
```

深链：`/?person=sushi`、`/?year=1082&place=黄州`

## 0.5 每次会话的起手式与收尾式

**起手**：`git status` → 读 `docs/progress.md` 的「当前焦点」→ 从 `docs/backlog.md` 的「下一步」挑一件，记下 ID。

**收尾**：改 `progress.md` 的焦点与最近完成 → 把 `backlog.md` 对应行改成「进行中」或「完成」→ 大改动补规格（见下）。

**大改动阈值**（满足任一即建 `docs/specs/NNNN-slug/`）：触及 >3 文件 · 改数据契约 · 改用户可见交互 · 新增文体/渲染器 · 跨阶段。
低于阈值的，`backlog` 一行 + `progress` 更新即可。

## 1. 事实优先级（冲突时按此裁决）

**运行中的代码 > `js/atlas_works.js`（数据）> `docs/design.md` > `README.md` > 本文件。**

发现上游写错了，**当次就修好**，不要绕过它继续写。已知漂移全表见 `docs/backlog.md`。

## 2. 命令与何时必须跑

| 命令 | 做什么 | 何时必须跑 |
|---|---|---|
| `node scripts/_serve.cjs` | 本地静态服务（5199） | 改任何 UI / 交互 |
| `node scripts/check-docs.mjs` | 文档体检：看板 / 状态 / 文档地图 / 僵尸引用 | **每次提交前** |
| `node scripts/_gap_report.cjs` | 引文作品覆盖率 | 改 `atlas_works.js` 后 |
| `node scripts/_validate_data.cjs` | 数据校验：出处 / 枚举 / 推测依据 / 读本站序号 | 改 `atlas_works.js` 或 `atlas_journeys.js` 后 |
| `node scripts/sync_version.js` | 重算 `?v=` 缓存戳 | 改 `js/` 下任何文件后 |
| `node scripts/_merge_works.cjs` | 数据文件结构归一（合并/重排字段） | 数据被脚本批量改写后 |
| `pwsh scripts/_wikidata.ps1 -Name 苏轼` | 查 Wikidata：QID / CBDB ID / 生卒 / 籍贯（需代理） | 新增人物考据的第一步 |

> 本仓库**没有构建、没有 npm 依赖**——这是上游的卖点，不要引入打包器。

## 2.5 发布纪律：推送即发布

`git push origin main` 会**同时触发两条自动流程**：

1. **Atlas Integrity CI** — `.github/workflows/ci.yml` 跑 `node scripts/validate_atlas.js`
2. **GitHub Pages 构建** — 线上 `https://lz1219.github.io/jiangshan-xingzhi/` 立即更新

所以**推送等于发布**。规则：

| 允许，无需确认 | 必须先与用户确认 |
|---|---|
| 本地改代码 / 改数据 / 改文档 | `git push`（任何推到 main 的推送） |
| 本地 `git commit` | `npm run deploy`（博客，会推 `lz1219.github.io`） |
| 本地 `node scripts/_serve.cjs` 目视 | 改 `.github/workflows/**` 或 Pages 设置 |
| 本地 `check-docs` / `_gap_report` 试跑 | 合并、强制推送、改远端设置 |

**理由**：改一点推一次，会把构建历史与线上版本打碎，也让「哪个版本在线」不可追溯。

### 按批次发布

**批次 = 一个看板任务**（`R-x` / `D-x`），或一组必须同时生效的改动。批次内可以多次 commit，但**只在批次收尾时发布一次**。

```
开工 → 改 → 本地验（serve / check-docs / _gap_report）→ commit（可多次）
     → 写进 progress.md 的「待发布」→ 通知用户可发布
     → 用户确认 → ALLOW_PUSH=1 git push → 等 CI 绿 → 抽验线上 → 清空「待发布」
```

| 做 | 不做 |
|---|---|
| 一个任务一个批次 | 边改边推 |
| 批次内多次 commit | 为一行文档单独发布 |
| 发布前在「待发布」列清单 | 攒到自己也说不清改了什么再推 |

**机械闸门**：装了 `pre-push` 钩子（由 `node scripts/_install_hooks.cjs` 生成，不进版本库）。
不带放行变量时推送会被拦下；确认发布后：

```powershell
$env:ALLOW_PUSH='1'; git push
```

```bash
ALLOW_PUSH=1 git push
```

> 换机器或重新克隆后，先跑一次 `node scripts/_install_hooks.cjs` 把闸门装回去。

## 3. 六条不可妥协

1. **只加不改。** 笺注层通过 `window.__ATLAS_MIXINS` 挂载；对 `js/app.js` 的改动只允许极小（目前仅两处：搜索标签登记、空朝代回退）。改主逻辑前先问：能不能用 mixin 包？
2. **原文逐字取自基线。** 新取得的版本先作为独立见证，不自动覆盖基线。 诗词与史传正文一律从 `js/lore_data.js` 的 `quoteZh` 提取，**不手抄**；我们只写 `meaning` / `notes` / `background` / `appreciation`。
3. **赏析只收自撰，推测必须标注。** `appreciation.by` 恒为「本站自撰」；结合史事的推演放进 `inference` 并给 `basis`，界面用「推测」朱砂虚线呈现。不引用点校本。
4. **文与史传标「摘录」。** 我们给的是被引用的段落，不是全本，界面上必须让读者知道。
5. **不改上游数据与地图形制。** `lore_data.js` / `map_data.js` / `atlas_snapshots.js` / `geojson/` 一律不动。
6. **一切叙述必须有据。** 导语、站间承接语、大意、赏析、推测的正文，**每一条都要能指到 source**（史料或原文），并尽量写出卷次。
   - 不写史料未载的**年龄、时长、因果、评价**——推算出来的东西不写。
   - 拿不准就改成不改写：宁可只陈述年份与地名。
   - `_validate_data.cjs` 会把「缺 source」判为错误，不是提示。

## 4. 改动类型 → 必做动作

| 你要改 | 必须同步 | 必须跑 |
|---|---|---|
| `js/atlas_works.js`（加/改作品） | `alias` 与引文《书名》对齐；`genre` 取值合法 | `_gap_report.cjs` + `sync_version.js` |
| 新增文体 | `ATLAS_READER_RENDERERS` 注册渲染器 + `GENRE_KIND` 登记映射 | 本地点开看效果 |
| `js/atlas_reader.js` | 搜索条目三字段（`keywords` / `aliases` / `dynasty`，见 dev-guide 的坑） | `sync_version.js` + 目视 |
| `docs/**` | 看板状态与进度 | `check-docs.mjs` |
| `js/app.js` | **先问能不能不改**；必须改则只做最小分支 | 全量目视 + `sync_version.js` |

## 5. 禁区

- 不要 `git add -A`：`_config*.yml`、截图、临时产物会混进来。
- 不要提交 CRLF（Windows 下尤其注意）。
- 不要把 `lore_data.js` 的 74 条引文改成我们的写法——那是上游数据。
- 不要在 `atlas_works.js` 里放没有 `source` 的条目。
- 不要让 `appreciation` 缺少 `by` / `license`。
- 引用了 `D-xx` / `R-xx` 就必须真的存在于 `docs/backlog.md`（闸门会拦）。

## 6. DoD（提交前逐条打勾）

- [ ] `node scripts/check-docs.mjs` 通过
- [ ] 改过 `js/**`：跑过 `sync_version.js`，本地刷新目视
- [ ] 改过数据：`_gap_report.cjs` 覆盖率未下降
- [ ] 推测有 `basis`，且依据落在该条 `background` / `source` 里
- [ ] `git status` 只含预期文件
- [ ] **没有擅自发布**：`git push` / `npm run deploy` 前已获用户确认（pre-push 闸门会拦）
- [ ] 提交信息形如 `feat(reader): 新增「文」渲染器` / `data: 补《史记·秦始皇本纪》`

## 7. 已知欠账（不要把下面这些当成已实现）

全表在 `docs/backlog.md`。最容易误认的两条：

- **R-6** 搜索不索引正文，搜「莫听」命中不了
- **D-2** 已完成：外部字体已移除，现使用系统字体栈。

## 8. 文件地图

| 路径 | 职责 |
|---|---|
| `js/atlas_works.js` | **作品数据层**（50 条）：正文、大意、注释、背景、赏析、出处 |
| `js/atlas_journeys.js` | **行迹读本数据**：7 段导语 + 22 条站间承接语，每条带 source |
| `js/atlas_chronicle.js` | 行迹读本渲染：包装 `_renderPersonChronicleCard`，插入导语与承接语 |
| `js/atlas_reader.js` | 笺注交互：摘句成链、浮层阅读器、搜索注入、渲染器注册表 |
| `js/app.js` | 上游主控（15k 行）：投影、时间轴、行迹、`__ATLAS_MIXINS` 扩展点 |
| `js/lore_data.js` | 上游数据：7 条行迹 / 74 站的引文与叙述 |
| `js/atlas_snapshots.js` | 上游疆域快照（1.9 MB，懒加载） |
| `scripts/check-docs.mjs` | 文档闸门 |
| `scripts/_serve.cjs` | 本地静态服务 |
| `docs/design.md` | 宪法：定位 / 词汇 / 不可逆决策 / 里程碑 |

## 学术研究增补（R-11）

来源优先。研究发布真相在 poem-data JSON；反推繁体和系年占位保留待核。AI有据推测可在独立考据笺公开，明确「AI推测·未经人工审校」，附原句定位、生成记录、反证与审校历史；不得进入古人评点、确定事实或默认地图路线。已核须具名审校与证据，机器命中不等于学术确证。公开过的修订保留引用；撤回用新rejected修订，不能追溯保密。
