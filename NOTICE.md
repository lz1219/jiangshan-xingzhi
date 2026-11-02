# NOTICE · 改造声明

本仓库是 **[江山时序 (Chronicles of the Realm)](https://github.com/DeanChensj/jiangshan-map)** 的**改造分支（fork）**，
不是原创项目。上游作者：**DeanChensj (Shangjie Chen)**。

## 许可证

- 上游与本仓库均以 **GNU GPL v3.0** 发布（见 [LICENSE](LICENSE)）。
- 依 GPL-3.0，本仓库继续以 GPL-3.0 授权；分发时须保留本声明与上游署名。
- 诗文本体为公有领域；本项目自撰的**大意、赏析、推测**以 **CC BY-SA 4.0** 授权（数据文件内以 `license` 字段标注）。
- **未收录任何点校本的注释或赏析**，所有赏析均为本站自撰。

## 上游出处

| 项 | 值 |
|---|---|
| 仓库 | https://github.com/DeanChensj/jiangshan-map |
| 在线站点 | https://deanchen.me/jiangshan-map/ |
| 本分支的基线提交 | `be430927a05509636631df3015d98a4e60d78a7f`（`main`，克隆于 2026-10-31） |

## 本项目所做的修改

### 新增文件

| 文件 | 作用 |
|---|---|
| `js/atlas_works.js` | 作品数据层：诗词赋史 50 条，含正文、大意、注释、写作背景、赏析（含推测与依据）、出处 |
| `js/atlas_reader.js` | 诗歌层交互：把人物行迹里的摘句变成可点链接，弹出阅读器；并把作品注入主搜索索引 |
| `scripts/_serve.cjs` | 本地静态服务 |
| `scripts/_gap_report.cjs` | 作品覆盖率盘点 |
| `scripts/_dump_missing.cjs` | 从基线数据导出未收录作品的原文引句 |

早期直接改写作品数据的一次性补录及合并脚本已删除，历史实现保留于Git。现有作品、人物、行迹均以poem-data JSON为源，由其emit-atlas工具生成。

### 修改文件

| 文件 | 改动 |
|---|---|
| `index.html` | 追加两个 `<script>` 引入诗歌层（带版本戳） |
| `js/app.js` | 仅两处：搜索标签表增加 `work: '作品'`；结果标签在朝代为空时不再渲染 `undefined · ` |
| `scripts/sync_version.js` | 把两个新文件登记进缓存戳清单 |

### 未改动的部分

地图渲染、疆域快照、地名沿革、人物行迹数据（`js/lore_data.js`、`js/map_data.js`、`js/atlas_snapshots.js`）**均未改动**，
诗歌层通过 `window.__ATLAS_MIXINS` 扩展点挂载。

## 数据来源

- 作品原文：公有领域的诗词原文；史传引文**逐字取自上游 `lore_data.js` 的 `quoteZh`**，未做转写。
- 大意 / 注释 / 写作背景 / 赏析：本项目自撰（CC BY-SA 4.0）。
- 底图与疆域数据沿用上游。
