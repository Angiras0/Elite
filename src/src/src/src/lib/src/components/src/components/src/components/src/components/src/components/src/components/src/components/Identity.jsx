import { motion } from 'framer-motion'
import Reveal from './Reveal'
import Divider from './Divider'

const criteria = [
  'Founders shipping in public',
  'Operators with commercial conviction',
  'Technical builders with business instinct',
  'Pre-seed and seed-stage CEOs',
  'Repeat founders rebuilding from scratch',
]

export default function Identity() {
  return (
    <section className="relative z-10 py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6 sm:px-12">
        <Divider label="The Filter" />
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <Reveal>
              <span className="font-mono text-[0.6rem] tracking-[0.22em] text-amber-400/55 uppercase">
                Who gets in
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                className="font-display font-semibold italic text-white/88 leading-[1.12] tracking-[-0.015em] mt-4 mb-6"
                style={{ fontSize: 'clamp(2rem, 3.5vw, 3.5rem)' }}
              >
                Built for founders who execute,<br />not those who ideate.
              </h2>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="font-body font-light text-white/32 text-[0.9rem] leading-[1.85]">
                Every member is manually reviewed. We don't care about your
                LinkedIn headline. We care about what you're building right now,
                the problems you're solving, and whether you show up when it matters.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-8 flex items-center gap-3">
                <div className="w-8 h-px bg-amber-400/35" />
                <span className="font-mono text-[0.58rem] tracking-[0.16em] text-white/22 uppercase">
                  Applications reviewed in 48h
                </span>
              </div>
            </Reveal>
          </div>
          <div className="flex flex-col">
            {criteria.map((c, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <motion.div
                  whileHover={{ x: 10, color: 'rgba(255,255,255,0.8)' }}
                  className="flex items-center gap-4 py-5 border-b border-white/[0.05] text-white/32 font-body text-[0.88rem] font-light transition-colors duration-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400/50 flex-shrink-0" />
                  {c}
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
