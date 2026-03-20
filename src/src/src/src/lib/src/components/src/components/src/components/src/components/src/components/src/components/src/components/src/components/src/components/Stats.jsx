import { useEffect, useState, useRef } from 'react'
import { useInView } from 'framer-motion'
import Reveal from './Reveal'

function Counter({ to, suffix = '', duration = 1800 }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const steps = 40
    const step = to / steps
    const interval = duration / steps
    const timer = setInterval(() => {
      start += step
      if (start >= to) { setVal(to); clearInterval(timer) }
      else setVal(Math.floor(start))
    }, interval)
    return () => clearInterval(timer)
  }, [inView, to, duration])

  return <span ref={ref}>{val}{suffix}</span>
}

const stats = [
  { value: 100, suffix: '', label: 'Total seats. Ever.', accent: false },
  { value: 84, suffix: '+', label: 'Applications reviewed', accent: false },
  { value: 27, suffix: '', label: 'Applied in last 24h', accent: false },
  { value: 16, suffix: '', label: 'Remaining in beta', accent: true },
]

export default function Stats() {
  return (
    <section className="relative z-10 py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-6 sm:px-12">
        <Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 border border-white/[0.05] rounded-sm overflow-hidden">
            {stats.map((s, i) => (
              <div
                key={i}
                className="relative p-8 sm:p-10 bg-white/[0.01] hover:bg-white/[0.025] transition-colors duration-300"
                style={{
                  borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                }}
              >
                {i === stats.length - 1 && (
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
                )}
                <div
                  className="font-display font-medium leading-none mb-3 tracking-tight"
                  style={{
                    fontSize: 'clamp(2.2rem, 4vw, 3.6rem)',
                    color: s.accent ? 'rgba(251,191,36,0.9)' : 'rgba(255,255,255,0.8)',
                  }}
                >
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="font-mono text-[0.58rem] tracking-[0.14em] text-white/22 uppercase">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
