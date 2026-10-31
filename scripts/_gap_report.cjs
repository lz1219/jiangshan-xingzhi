// 数据缺口盘点：他的行迹引文里引了哪些作品，我们已有哪些全文
global.window = {}
require('D:/WorkSpace/opencode/jiangshan-map/js/lore_data.js')
require('D:/WorkSpace/opencode/jiangshan-map/js/atlas_poems.js')

const J = (window.ATLAS_LORE_DATA && window.ATLAS_LORE_DATA.HISTORICAL_JOURNEYS) || []
const POEMS = window.ATLAS_POEMS || {}

const works = new Map() // 作品名 -> { count, journeys:Set, sample }
let stops = 0
let quotes = 0

for (const j of J) {
  for (const st of j.stops || []) {
    stops++
    const q = st.quoteZh || ''
    if (q) quotes++
    const m = /《([^》]+)》/.exec(q)
    if (!m) continue
    const title = m[1]
    if (!works.has(title)) works.set(title, { count: 0, journeys: new Set(), sample: q.slice(0, 40) })
    const rec = works.get(title)
    rec.count++
    rec.journeys.add(j.key)
  }
}

const titles = [...works.entries()].sort((a, b) => b[1].count - a[1].count)
const have = new Set(Object.keys(POEMS))
const matched = titles.filter(([t]) => {
  if (have.has(t)) return true
  for (const p of Object.values(POEMS)) if ((p.alias || []).includes(t)) return true
  return false
})

console.log(JSON.stringify({
  journeys: J.length,
  stops,
  quotes,
  distinctWorks: titles.length,
  poemsInLibrary: have.size,
  coveredWorks: matched.length,
  coverage: `${((matched.length / titles.length) * 100).toFixed(1)}%`,
  topWorks: titles.slice(0, 30).map(([t, r]) => `${t} ×${r.count}`),
  covered: matched.map(([t]) => t),
  missingTop: titles.filter(([t]) => !matched.some(([m]) => m === t)).slice(0, 25).map(([t, r]) => t),
}, null, 2))
