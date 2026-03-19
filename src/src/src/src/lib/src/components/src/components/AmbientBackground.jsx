import { useEffect, useRef } from 'react'

export default function AmbientBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let W = window.innerWidth
    let H = window.innerHeight
    canvas.width = W
    canvas.height = H

    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      r: Math.random() * 1.2 + 0.3,
      opacity: Math.random() * 0.35 + 0.05,
      life: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.008 + 0.003,
    }))

    let mouseX = W / 2
    let mouseY = H / 2
    const onMouse = (e) => { mouseX = e.clientX; mouseY = e.clientY }
    window.addEventListener('mousemove', onMouse)

    let raf
    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = '#0a0a0a'
      ctx.fillRect(0, 0, W, H)

      const grad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 380)
      grad.addColorStop(0, 'rgba(251,191,36,0.028)')
      grad.addColorStop(1, 'transparent')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, W, H)

      const heroGrad = ctx.createRadialGradient(W / 2, H * 0.35, 0, W / 2, H * 0.35, W * 0.5)
      heroGrad.addColorStop(0, 'rgba(251,191,36,0.03)')
      heroGrad.addColorStop(0.5, 'rgba(99,102,241,0.015)')
      heroGrad.addColorStop(1, 'transparent')
      ctx.fillStyle = heroGrad
      ctx.fillRect(0, 0, W, H)

      particles.forEach(p => {
        p.life += p.speed
        p.x += p.vx
        p.y += p.vy + Math.sin(p.life) * 0.06
        if (p.x < 0) p.x = W
        if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H
        if (p.y > H) p.y = 0
        const o = p.opacity * (0.6 + Math.sin(p.life) * 0.4)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${o})`
        ctx.fill()
      })

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(255,255,255,${0.025 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      raf = requestAnimationFrame(draw)
    }

    draw()

    const onResize = () => {
      W = window.innerWidth
      H = window.innerHeight
      canvas.width = W
      canvas.height = H
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', inset: 0,
        width: '100%', height: '100%',
        zIndex: 0, pointerEvents: 'none',
      }}
    />
  )
}
