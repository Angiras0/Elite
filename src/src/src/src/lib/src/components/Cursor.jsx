import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const ringRef = useRef(null)
  const dotRef = useRef(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    let rafId
    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px)`
      }
    }

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`
      }
      rafId = requestAnimationFrame(animate)
    }

    const onDown = () => setHovered(true)
    const onUp = () => setHovered(false)

    const addHover = () => {
      document.querySelectorAll('a, button, input, textarea, select, label').forEach(el => {
        el.addEventListener('mouseenter', () => setHovered(true))
        el.addEventListener('mouseleave', () => setHovered(false))
      })
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    addHover()
    rafId = requestAnimationFrame(animate)

    const obs = new MutationObserver(addHover)
    obs.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      cancelAnimationFrame(rafId)
      obs.disconnect()
    }
  }, [])

  return (
    <>
      <div
        ref={ringRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 40, height: 40,
          borderRadius: '50%',
          border: `1px solid ${hovered ? 'rgba(251,191,36,0.7)' : 'rgba(255,255,255,0.18)'}`,
          background: hovered ? 'rgba(251,191,36,0.04)' : 'transparent',
          pointerEvents: 'none',
          zIndex: 99999,
          transition: 'border-color 0.25s ease, background 0.25s ease',
          willChange: 'transform',
        }}
      />
      <div
        ref={dotRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 6, height: 6,
          borderRadius: '50%',
          background: hovered ? '#FBBF24' : 'rgba(255,255,255,0.8)',
          pointerEvents: 'none',
          zIndex: 99999,
          transition: 'background 0.25s ease',
          willChange: 'transform',
        }}
      />
    </>
  )
}
