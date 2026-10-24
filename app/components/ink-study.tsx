'use client'

import { useEffect, useRef, useState } from 'react'

// User-selected generated artwork; provenance is embedded in the PNG.
export function InkStudy() {
  const section = useRef<HTMLElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const replay = useRef<() => void>(() => {})
  const [status, setStatus] = useState('Ready to draw')

  useEffect(() => {
    const target = canvas.current
    if (!target || !section.current) return
    const context = target.getContext('2d')
    if (!context) return
    const image = new Image()
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let disposed = false
    let observer: IntersectionObserver | undefined

    image.onload = () => {
      if (disposed) return
      const width = Math.min(1200, image.naturalWidth)
      const height = Math.round(width * image.naturalHeight / image.naturalWidth)
      target.width = width
      target.height = height
      const mask = document.createElement('canvas')
      mask.width = width
      mask.height = height
      const ink = mask.getContext('2d')
      if (!ink) return
      const tiles: { x: number; y: number; rank: number }[] = []
      const size = 10
      for (let y = 0; y < height; y += size) {
        for (let x = 0; x < width; x += size) {
          const seed = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453
          const random = seed - Math.floor(seed)
          tiles.push({ x, y, rank: random * 0.61 + (1 - y / height) * 0.14 + x / width * 0.10 })
        }
      }
      const finished = () => {
        context.clearRect(0, 0, width, height)
        context.globalCompositeOperation = 'source-over'
        context.drawImage(image, 0, 0, width, height)
        setStatus('Finished drawing')
      }
      replay.current = () => {
        cancelAnimationFrame(frame)
        if (preference.matches) { finished(); return }
        setStatus('Ink is gathering…')
        let started: number | null = null
        let lastPaint = 0
        const draw = (time: number) => {
          if (disposed) return
          if (started === null) started = time
          const progress = Math.min(1, (time - started) / 9000)
          if (time - lastPaint > 32 || progress === 1) {
            lastPaint = time
            ink.clearRect(0, 0, width, height)
            for (const tile of tiles) {
              const value = Math.max(0, Math.min(1, (progress - tile.rank) / 0.15))
              if (value === 0) continue
              ink.globalAlpha = value * value * (3 - 2 * value)
              ink.fillRect(tile.x, tile.y, size + 1, size + 1)
            }
            ink.globalAlpha = 1
            context.globalCompositeOperation = 'source-over'
            context.clearRect(0, 0, width, height)
            context.drawImage(image, 0, 0, width, height)
            context.globalCompositeOperation = 'destination-in'
            context.drawImage(mask, 0, 0)
            context.globalCompositeOperation = 'source-over'
          }
          if (progress < 1) frame = requestAnimationFrame(draw)
          else finished()
        }
        frame = requestAnimationFrame(draw)
      }
      finished()
      if (!preference.matches) {
        observer = new IntersectionObserver((entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            observer?.disconnect()
            replay.current()
          }
        }, { threshold: 0.3 })
        if (section.current) observer.observe(section.current)
      }
    }
    const onPreference = () => {
      if (preference.matches) replay.current()
    }
    preference.addEventListener('change', onPreference)
    image.onerror = () => { if (!disposed) setStatus('The study could not be loaded.') }
    image.src = '/studies/ink-study.png'
    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      observer?.disconnect()
      preference.removeEventListener('change', onPreference)
      replay.current = () => {}
    }
  }, [])

  return (
    <section className="ink-study" ref={section} aria-labelledby="ink-title">
      <div className="ink-study-heading">
        <h2 id="ink-title">A little ink</h2>
        <button className="ink-replay" type="button" onClick={() => replay.current()}>Replay drawing</button>
      </div>
      <canvas ref={canvas} className="ink-canvas" role="img" aria-label="Illustrative cream ink drawing of wildflowers and a small cottage gradually appearing on dark sage green." />
      <p className="ink-caption">An illustrative study of flowers and a little cottage.</p>
      <span className="visually-hidden" role="status">{status}</span>
    </section>
  )
}
