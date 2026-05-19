"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  phase: number   // individual pulse offset
}

// oklch(0.55 0.25 260) ≈ rgb(88, 105, 228)
const COLOR = "88, 105, 228"

export function SyncBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctxRaw = canvas.getContext("2d")
    if (!ctxRaw) return
    const ctx = ctxRaw   // non-null, safe to close over

    let raf: number
    let W = 0
    let H = 0

    function resize() {
      W = canvas!.offsetWidth
      H = canvas!.offsetHeight
      canvas!.width  = W
      canvas!.height = H
    }

    const PARTICLE_COUNT = window.innerWidth < 768 ? 24 : 44
    const CONNECT_DIST   = 165

    let particles: Particle[] = []

    function spawn() {
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r:  Math.random() * 1.4 + 0.7,
        phase: Math.random() * Math.PI * 2,
      }))
    }

    let t = 0

    function frame() {
      ctx.clearRect(0, 0, W, H)
      t += 0.007

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        // soft wrap
        if (p.x < -30) p.x = W + 30
        if (p.x > W + 30) p.x = -30
        if (p.y < -30) p.y = H + 30
        if (p.y > H + 30) p.y = -30
      }

      // edges
      ctx.lineWidth = 0.5
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x
          const dy   = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECT_DIST) {
            const a = (1 - dist / CONNECT_DIST) * 0.11
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(${COLOR}, ${a})`
            ctx.stroke()
          }
        }
      }

      // nodes
      for (const p of particles) {
        const pulse = 0.5 + 0.5 * Math.sin(t * 1.8 + p.phase)
        const alpha = 0.13 + pulse * 0.10
        const radius = p.r * (1 + pulse * 0.25)
        ctx.beginPath()
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${COLOR}, ${alpha})`
        ctx.fill()
      }

      raf = requestAnimationFrame(frame)
    }

    const ro = new ResizeObserver(() => {
      resize()
      spawn()
    })

    resize()
    spawn()
    frame()
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}
