// Derive animation geometry from the existing PNG; never change the source artwork.
// Requires sharp, already supplied by Next.js.
import { createRequire } from 'node:module'
import { writeFile } from 'node:fs/promises'
const require = createRequire(import.meta.url)
const sharp = require(require.resolve('sharp', { paths: [require.resolve('next')] }))
const { data, info } = await sharp('public/studies/ink-study.png')
  .resize({ width: 1200 }).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
const w = info.width, h = info.height, n = w * h
const mask = new Uint8Array(n)
for (let p = 0; p < n; p++) mask[p] = data[p * 4 + 3] > 54 ? 1 : 0
const radius = new Float32Array(n)
for (let p = 0; p < n; p++) radius[p] = mask[p] ? 1e5 : 0
for (let y = 1; y < h - 1; y++) for (let x = 1; x < w - 1; x++) {
  const p = y * w + x
  if (mask[p]) radius[p] = Math.min(radius[p], radius[p - 1] + 1, radius[p - w] + 1, radius[p - w - 1] + 1.414, radius[p - w + 1] + 1.414)
}
for (let y = h - 2; y > 0; y--) for (let x = w - 2; x > 0; x--) {
  const p = y * w + x
  if (mask[p]) radius[p] = Math.min(radius[p], radius[p + 1] + 1, radius[p + w] + 1, radius[p + w + 1] + 1.414, radius[p + w - 1] + 1.414)
}
// Zhang–Suen thinning retains the centre lines of the actual ink.
const offsets = [-w, -w + 1, 1, w + 1, w, w - 1, -1, -w - 1]
let changed = true, passes = 0
while (changed && passes++ < 100) {
  changed = false
  for (let phase = 0; phase < 2; phase++) {
    const remove = []
    for (let y = 1; y < h - 1; y++) for (let x = 1; x < w - 1; x++) {
      const p = y * w + x
      if (!mask[p]) continue
      const v = offsets.map(o => mask[p + o])
      const count = v.reduce((a, b) => a + b, 0)
      if (count < 2 || count > 6) continue
      let transitions = 0
      for (let k = 0; k < 8; k++) if (!v[k] && v[(k + 1) % 8]) transitions++
      if (transitions !== 1) continue
      if (phase === 0 ? v[0] * v[2] * v[4] || v[2] * v[4] * v[6] : v[0] * v[2] * v[6] || v[0] * v[4] * v[6]) continue
      remove.push(p)
    }
    for (const p of remove) mask[p] = 0
    if (remove.length) changed = true
  }
}
const graph = new Map()
for (let y = 1; y < h - 1; y++) for (let x = 1; x < w - 1; x++) {
  const p = y * w + x
  if (!mask[p]) continue
  const neighbors = offsets.map((o, k) => [p + o, k]).filter(([q, k]) => {
    if (!mask[q]) return false
    // Avoid tiny triangular loops where orthogonal connections already exist.
    return !(k % 2 && (mask[p + offsets[(k + 7) % 8]] || mask[p + offsets[(k + 1) % 8]]))
  }).map(([q]) => q)
  graph.set(p, new Set(neighbors))
}
const paths = []
let pen = [170, h - 25]
const remaining = new Set(graph.keys())
while (remaining.size) {
  let best = -1, score = Infinity
  for (const p of remaining) {
    const degree = graph.get(p).size
    if (!degree) { remaining.delete(p); continue }
    const x = p % w, y = Math.floor(p / w)
    const cost = Math.hypot(x - pen[0], y - pen[1]) + (degree === 1 ? 0 : 25)
    if (cost < score) { best = p; score = cost }
  }
  if (best < 0) break
  let p = best, dx = 0, dy = -1
  const points = [], visited = new Set()
  while (true) {
    const x = p % w, y = Math.floor(p / w)
    points.push([x, y, +Math.min(5.5, Math.max(1.8, radius[p] + 1.25)).toFixed(1)])
    const neighbors = [...graph.get(p)]
    if (!neighbors.length) { remaining.delete(p); break }
    let next = neighbors[0], alignment = -Infinity
    for (const q of neighbors) {
      const qx = q % w - x, qy = Math.floor(q / w) - y
      const dot = (qx * dx + qy * dy) / Math.hypot(qx, qy)
      if (dot > alignment) { alignment = dot; next = q }
    }
    graph.get(p).delete(next)
    graph.get(next).delete(p)
    if (!graph.get(p).size) remaining.delete(p)
    dx = next % w - x
    dy = Math.floor(next / w) - y
    p = next
    if (visited.has(p) && !graph.get(p).size) break
    visited.add(p)
  }
  let length = 0
  for (let i = 1; i < points.length; i++) length += Math.hypot(points[i][0] - points[i-1][0], points[i][1] - points[i-1][1])
  if (length >= 3) {
    // Keep corners and one point every ~2px. Width follows the original ink.
    const sampled = points.filter((_, i) => i === 0 || i === points.length - 1 || i % 2 === 0)
    paths.push({ points: sampled, length: +length.toFixed(2) })
    pen = sampled[sampled.length - 1]
  }
}
const result = { width: w, height: h, source: 'ink-study.png', technique: 'alpha-centreline tracing', paths }
await writeFile('public/studies/ink-strokes.json', JSON.stringify(result))
console.log({ width: w, height: h, passes, strokes: paths.length, points: paths.reduce((s, p) => s + p.points.length, 0), length: Math.round(paths.reduce((s, p) => s + p.length, 0)) })
