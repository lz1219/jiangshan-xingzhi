// 文档体系闸门：让「总纲 / 看板 / 状态 / 规格」不至于写完成死文件。
// 与 validate-data.mjs 一样保持零依赖：clone 下来不装包也能跑。
import fs from 'node:fs/promises'
import path from 'node:path'

const ROOT = process.cwd()
const errors = []
const warn = []
const fail = (msg) => errors.push(msg)
const note = (msg) => warn.push(msg)

const readText = (p) => fs.readFile(path.join(ROOT, p), 'utf8')
const exists = async (p) => {
  try {
    await fs.access(path.join(ROOT, p))
    return true
  } catch {
    return false
  }
}

const BACKLOG = 'docs/backlog.md'
const DESIGN = 'docs/design.md'
const PROGRESS = 'docs/progress.md'
const SPECS_DIR = 'docs/specs'

const BACKLOG_COLUMNS = ['ID', '类型', '标题', '阶段', '状态', '验收', '关联']
const TYPE_OF_PREFIX = { D: '欠账', R: '需求', T: '重构' }
const STAGES = new Set(['P0', 'P1', 'P2', 'P3', '—'])
const STATES = new Set(['待办', '进行中', '搁置', '完成'])
const DESIGN_SECTIONS = [
  '## 1. 定位与非目标',
  '## 2. 领域词汇表',
  '## 3. 不可逆决策',
  '## 4. 里程碑与验收',
  '## 5. 文档地图',
]
const PROGRESS_SECTIONS = ['## 当前焦点', '## 最近完成']
const SPEC_FILES = ['requirements.md', 'design.md', 'tasks.md']
const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', '.vite'])

const splitRow = (line) =>
  line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((s) => s.trim())

// ---------- 1. backlog 表规格 ----------
const backlogText = await readText(BACKLOG)
const ids = new Map()

for (const [i, line] of backlogText.split('\n').entries()) {
  const where = `${BACKLOG}:${i + 1}`
  if (!line.trimStart().startsWith('|')) continue
  if (/^\|[\s:|-]+\|$/.test(line.trim())) continue
  const cells = splitRow(line)
  if (cells[0] === 'ID') continue
  if (cells.length !== BACKLOG_COLUMNS.length) {
    fail(`${where}: 列数应为 ${BACKLOG_COLUMNS.length}，实际 ${cells.length}（${line.trim()}）`)
    continue
  }
  const [id, type, title, stage, state, acceptance, refs] = cells
  const m = /^([DRT])-(\d+)$/.exec(id)
  if (!m) {
    fail(`${where}: ID 须形如 D-1 / R-12 / T-3，实际 ${id || '(空)'}`)
    continue
  }
  if (ids.has(id)) fail(`${where}: ID 重复 → ${id}`)
  ids.set(id, { line: i + 1, state })
  if (TYPE_OF_PREFIX[m[1]] !== type)
    fail(`${where}: ${id} 的类型应为「${TYPE_OF_PREFIX[m[1]]}」，实际「${type}」`)
  if (!title) fail(`${where}: ${id} 标题为空`)
  if (!STAGES.has(stage)) fail(`${where}: ${id} 阶段非法 → ${stage}`)
  if (!STATES.has(state)) fail(`${where}: ${id} 状态非法 → ${state}`)
  if (!acceptance) fail(`${where}: ${id} 缺少验收标准`)
  if (!refs) fail(`${where}: ${id} 缺少关联路径`)
  for (const raw of refs.split(/[,、]/)) {
    const ref = raw.trim().replace(/:\d+(-\d+)?$/, '')
    if (!ref) continue
    if (!(await exists(ref))) fail(`${where}: ${id} 关联路径不存在 → ${ref}`)
  }
}

const done = [...ids.values()].filter((x) => x.state === '完成').length
if (done > 10) note(`backlog 已完成 ${done} 条，建议把「完成」行移到归档区`)

// ---------- 2. ID 交叉引用（僵尸引用检测） ----------
async function* walk(dir) {
  let entries
  try {
    entries = await fs.readdir(path.join(ROOT, dir), { withFileTypes: true })
  } catch {
    return // 目录不存在（例如没有 src/）时静默跳过，不当作错误
  }
  for (const e of entries) {
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue
      yield* walk(path.posix.join(dir, e.name))
    } else if (e.isFile()) {
      yield path.posix.join(dir, e.name)
    }
  }
}

const SCAN_EXT = new Set(['.ts', '.tsx', '.mjs', '.cjs', '.js', '.md', '.json'])
// 本仓库是江山时序的改造分支：代码在 js/，没有 src/
const roots = ['js', 'scripts', 'docs', 'AGENTS.md', 'README.md']
for (const root of roots) {
  const isDir = !root.includes('.')
  const files = isDir ? walk(root) : [root]
  for await (const file of files) {
    if (file === BACKLOG) continue
    if (file === 'scripts/check-docs.mjs') continue
    if (!isDir && !SCAN_EXT.has(path.extname(file))) continue
    if (isDir && !SCAN_EXT.has(path.extname(file))) continue
    const text = await readText(file)
    for (const [i, line] of text.split('\n').entries()) {
      for (const m of line.matchAll(/\b([DRT]-\d+)\b/g)) {
        if (!ids.has(m[1])) fail(`${file}:${i + 1}: 引用了不存在的 ${m[1]}`)
      }
    }
  }
}

// ---------- 3. progress.md 三节 + 焦点唯一 ----------
const progressText = await readText(PROGRESS)
for (const h of PROGRESS_SECTIONS) {
  if (!progressText.includes(h)) fail(`${PROGRESS}: 缺少小节「${h}」`)
}
const focusBlock = progressText.split('## 当前焦点')[1]?.split('\n## ')[0] ?? ''
const focusItems = focusBlock
  .split('\n')
  .filter((l) => /^\s*[-*]\s+\S/.test(l))
if (focusItems.length !== 1)
  fail(`${PROGRESS}: 「当前焦点」须恰好 1 条，实际 ${focusItems.length} 条（没有焦点时请写「暂无，见 backlog」）`)

// 「下一步」只在 backlog 里维护；progress 的焦点必须是它的第 1 条，防止两处清单分叉
const idOf = (text) => [...text.matchAll(/\b([DRT]-\d+)\b/g)].map((m) => m[1])
const focusIds = focusItems.flatMap(idOf)
const nextBlock = backlogText.split('## 下一步')[1]?.split('\n## ')[0] ?? ''
const nextIds = idOf(nextBlock)
if (nextIds.length === 0) {
  fail(`${BACKLOG}: 缺少「## 下一步」清单`)
} else if (focusIds.length === 1 && nextIds[0] !== focusIds[0]) {
  fail(
    `${PROGRESS}: 「当前焦点」应是 ${BACKLOG}「下一步」的第 1 条（${nextIds[0]}），实际是 ${focusIds[0]}`,
  )
}
// 只校验焦点指向的那一条（第 1 个 ID）；句子后半段引用已完成的条目作背景是允许的
if (focusIds.length && ids.get(focusIds[0])?.state === '完成')
  fail(`${PROGRESS}: 当前焦点 ${focusIds[0]} 在 backlog 里已是「完成」`)

// ---------- 4. design.md 五节 ----------
const designText = await readText(DESIGN)
for (const h of DESIGN_SECTIONS) {
  if (!designText.includes(h)) fail(`${DESIGN}: 缺少小节「${h}」`)
}

// ---------- 5. specs/ 目录完整性 ----------
const specDirs = []
try {
  for (const e of await fs.readdir(path.join(ROOT, SPECS_DIR), { withFileTypes: true })) {
    if (e.isDirectory()) specDirs.push(e.name)
  }
} catch {
  fail(`${SPECS_DIR}: 目录不存在`)
}
for (const dir of specDirs) {
  const base = `${SPECS_DIR}/${dir}`
  if (!/^\d{4}-[a-z0-9-]+$/.test(dir)) fail(`${base}: 目录名须形如 0001-slug（小写英文与连字符）`)
  for (const f of SPEC_FILES) {
    if (!(await exists(`${base}/${f}`))) fail(`${base}: 缺少 ${f}`)
  }
  if (await exists(`${base}/tasks.md`)) {
    const tasks = await readText(`${base}/tasks.md`)
    if (!/^\s*- \[[ x]\]/m.test(tasks)) fail(`${base}/tasks.md: 至少需要一条「- [ ]」任务`)
  }
}

// ---------- 6. 文档地图完整性（锁死文件数量） ----------
const docFiles = []
for await (const file of walk('docs')) {
  if (path.extname(file) !== '.md') continue
  if (file.startsWith(`${SPECS_DIR}/`)) continue
  docFiles.push(file)
}
for (const file of docFiles) {
  const name = path.posix.basename(file)
  if (!designText.includes(name)) fail(`${file}: 未在 ${DESIGN} §5 文档地图登记（新增文档必须先回答「它解决什么」）`)
}

// ---------- 汇总 ----------
const report = {
  看板条目: ids.size,
  已完成: done,
  规格目录: specDirs.length,
  受检文档: docFiles.length,
}
console.log('\n《江山行止》文档体检')
console.table(report)

if (warn.length) {
  console.log('\n提示（不影响构建）：')
  for (const w of warn) console.log('  · ' + w)
}
if (errors.length) {
  console.error('\n错误：')
  for (const e of errors) console.error('  ✕ ' + e)
  process.exit(1)
}
console.log('\n✓ 文档校验通过\n')
