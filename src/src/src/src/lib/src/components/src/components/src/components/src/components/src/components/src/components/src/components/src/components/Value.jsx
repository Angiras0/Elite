import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Reveal from './Reveal'
import Divider from './Divider'

const cards = [
  {
    num: '01',
    title: 'Signal, Zero Noise',
    body: 'Every member of the Angiras network is vetted. Experience high-signal discussions focused purely on product, growth, and fundraising.',
  },
  {
    num: '02',
    title: 'Proprietary Playbooks',
    body: 'Access a shared library of investor lists, cold email templates, and go-to-market strategies used by successful startups.',
  },
  {
    num: '03',
    title: 'The Unfair Advantage',
    body: 'Get immediate, brutal, and constructive feedback from founders who have successfully navigated the challenges you are facing right now.',
  },
]

function ValueCard({ num, title, body, delay }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-5% 0px' })

  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 48, filter: 'blur(8px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-sm p-8 sm:p-10 glass-card transition-all duration-400"
      style={{
        boxShadow: hovered
          ? '0 0 0 1px rgba(251,191,36,0.1), 0 24px 48px rgba(0,0,0,0.3)'
          : '0 0 0 1px rgba(255,255,255,0.04)',
      }}
    >
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(251,191,36,0.45), transparent)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />
      <div className="font-mono text-[0.6rem] tracking-[0.22em] text-amber-400/50 mb-6">
        {num}
      </div>
      <h3
        className="font-display font-semibold italic text-white/88 leading-[1.18] mb-4 tracking-[-0.01em]"
        style={{ fontSize: 'clamp(1.3rem, 2vw, 1.55rem)' }}
      >
        {title}
      </h3>
      <p className="font-body font-light text-white/32 text-[0.875rem] leading-[1.8]">
        {body}
      </p>
    </motion.div>
  )
}

export default function Value() {
  return (
    <section className="relative z-10 py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-6 sm:px-12">
        <Divider label="Why It Matters" />
        <div className="mt-16 mb-14">
          <Reveal>
            <span className="font-mono text-[0.6rem] tracking-[0.22em] text-amber-400/55 uppercase">
              Three things
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2
              className="font-display font-semibold text-white/85 leading-[1.12] tracking-[-0.015em] mt-3 max-w-md"
              style={{ fontSize: 'clamp(1.9rem, 3vw, 3.1rem)' }}
            >
              Most networks get these wrong.
            </h2>
          </Reveal>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((c, i) => (
            <ValueCard key={i} {...c} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  )
}
