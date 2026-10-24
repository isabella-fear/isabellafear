'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

type Point = [number, number, number]
type Stroke = { points: Point[]; length: number }
type Drawing = { width: number; height: number; paths: Stroke[] }

// The mask follows centre lines traced from the user-selected artwork.
// Each pen stroke finishes before the next begins; the PNG itself is unchanged.
export function InkStudy() {
  const figure = useRef<HTMLElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const replay = useRef<() => void>(() => {})
  const [ready, setReady] = useState(false)
  const [status, setStatus] = useState('Finished drawing')

  useEffect(() => {
    const target = canvas.current
    if (!target || !figure.current) return
    const context = target.getContext('2d')
    if (!context) return
    const controller = new AbortController()
    const image = new window.Image()
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let disposed = false
    let observer: IntersectionObserver | undefined
    const imageLoaded = new Promise<HTMLImageElement>((resolve, reject) => {
      image.onload = () => resolve(image)
      image.onerror = reject
      image.src = '/studies/ink-study.png'
    })

    Promise.all([
      imageLoaded,
      fetch('/studies/ink-strokes.json', { signal: controller.signal })
        .then((response) => { if (!response.ok) throw new Error('Drawing unavailable'); return response.json() as Promise<Drawing> }),
    ]).then(([, drawing]) => {
      if (disposed) return
      const { width, height, paths } = drawing
      target.width = width
      target.height = height
      const mask = document.createElement('canvas')
      mask.width = width
      mask.height = height
      const ink = mask.getContext('2d')
      if (!ink) return
      ink.lineCap = 'round'
      ink.lineJoin = 'round'
      ink.strokeStyle = '#fff'
      const paint = () => {
        context.globalCompositeOperation = 'source-over'
        context.clearRect(0, 0, width, height)
        context.drawImage(image, 0, 0, width, height)
        context.globalCompositeOperation = 'destination-in'
        context.drawImage(mask, 0, 0)
        context.globalCompositeOperation = 'source-over'
      }
      const showFinished = () => {
        cancelAnimationFrame(frame)
        context.globalCompositeOperation = 'source-over'
        context.clearRect(0, 0, width, height)
        context.drawImage(image, 0, 0, width, height)
        setStatus('Finished drawing')
      }
      setReady(true)
      showFinished()
      replay.current = () => {
        cancelAnimationFrame(frame)
        if (preference.matches) { showFinished(); return }
        ink.clearRect(0, 0, width, height)
        context.clearRect(0, 0, width, height)
        setStatus('Drawing stroke by stroke…')
        let started: number | null = null
        let lastPaint = 0
        let strokeIndex = 0
        let segmentIndex = 1
        let from: Point = paths[0].points[0]
        let spent = 0
        const penLift = 10
        const total = paths.reduce((sum, path) => sum + path.length + penLift, 0)
        const draw = (time: number) => {
          if (disposed) return
          if (started === null) started = time
          const progress = Math.min(1, (time - started) / 48000)
          if (time - lastPaint >= 32 || progress === 1) {
            lastPaint = time
            const budget = progress === 1 ? Infinity : progress * total
            while (spent < budget && strokeIndex < paths.length) {
              const stroke = paths[strokeIndex]
              if (segmentIndex >= stroke.points.length) {
                spent += penLift
                strokeIndex++
                segmentIndex = 1
                if (strokeIndex < paths.length) from = paths[strokeIndex].points[0]
                continue
              }
              const to = stroke.points[segmentIndex]
              const distance = Math.hypot(to[0] - from[0], to[1] - from[1])
              if (distance < 0.01) { from = to; segmentIndex++; continue }
              const fraction = Math.min(1, (budget - spent) / distance)
              const next: Point = [
                from[0] + (to[0] - from[0]) * fraction,
                from[1] + (to[1] - from[1]) * fraction,
                from[2] + (to[2] - from[2]) * fraction,
              ]
              ink.lineWidth = (from[2] + next[2]) * 1.15
              ink.beginPath()
              ink.moveTo(from[0], from[1])
              ink.lineTo(next[0], next[1])
              ink.stroke()
              spent += distance * fraction
              from = next
              if (fraction === 1) segmentIndex++
            }
            paint()
          }
          if (progress < 1 && strokeIndex < paths.length) frame = requestAnimationFrame(draw)
          else setStatus('Finished drawing')
        }
        frame = requestAnimationFrame(draw)
      }
      if (!preference.matches) {
        observer = new IntersectionObserver((entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            observer?.disconnect()
            replay.current()
          }
        }, { threshold: 0.2 })
        if (figure.current) observer.observe(figure.current)
      }
    }).catch(() => {
      // Keep the normal image visible if geometry or scripting is unavailable.
      if (!disposed) setReady(false)
    })
    const onPreference = () => { if (preference.matches) replay.current() }
    preference.addEventListener('change', onPreference)
    return () => {
      disposed = true
      controller.abort()
      cancelAnimationFrame(frame)
      observer?.disconnect()
      preference.removeEventListener('change', onPreference)
      replay.current = () => {}
    }
  }, [])

  return (
    <figure className={'ink-art' + (ready ? ' is-ready' : '')} id="drawing" ref={figure} aria-label="Flowers and cottage ink drawing">
      <div className="ink-artwork">
        <Image className="ink-source" src="/studies/ink-study.png" width={1774} height={887} alt="Delicate cream ink wildflowers beside a small cottage." unoptimized />
        <canvas ref={canvas} className="ink-canvas" aria-hidden="true" />
      </div>
      <button className="ink-replay" type="button" disabled={!ready} onClick={() => replay.current()}>Replay drawing</button>
      <span className="visually-hidden" role="status">{status}</span>
    </figure>
  )
}
