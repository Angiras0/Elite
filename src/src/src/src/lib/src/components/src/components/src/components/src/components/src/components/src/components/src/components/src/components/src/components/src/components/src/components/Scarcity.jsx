import { motion } from 'framer-motion'
import Reveal from './Reveal'

export default function Scarcity({ onApply }) {
  return (
    <section className="relative z-10 py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-6 sm:px-12">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-sm p-12 sm:p-16 text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(251,191,36,0.04) 0%, rgba(255,255,255,0.01) 60%, rgba(99,102,241,0.02) 100%)',
              border: '1px solid rgba(251,191,36,0.1)',
            }}
          >
            <div className="absolute top-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />

            <div className="absolute top-0 left-0 w-5 h-5"
              style={{ borderTop: '1px solid rgba(251,191,36,0.3)', borderLeft: '1px solid rgba(251,191,36,0.3)' }} />
            <div className="absolute top-0 right-0 w-5 h-5"
              style={{ borderTop: '1px solid rgba(251,191,36,0.3)', borderRight: '1px solid rgba(251,191,36,0.3)' }} />
            <div className="absolute bottom-0 left-0 w-5 h-5"
              style={{ borderBottom: '1px solid rgba(251,191,36,0.3)', borderLeft: '1px solid rgba(251,191,36,0.3)' }} />
            <div className="absolute bottom-0 right-0 w-5 h-5"
              style={{ borderBottom: '1px solid rgba(251,191,36,0.3)', borderRight: '1px solid rgba(251,191,36,0.3)' }} />

            <div className="flex items-center justify-center gap-2.5 mb-7">
              <span className="live-dot w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
              <span className="font-mono text-[0.58rem] tracking-[0.2em] text-amber-400/65 uppercase">
                Live Status
              </span>
            </div>

            <h2
              className="font-display font-semibold text-white/90 leading-[1.08] tracking-[-0.02em] mb-5"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)' }}
            >
              The Beta Cohort is<br />Closing Soon.
            </h2>

            <p className="font-body font-light text-white/32 text-[0.95rem] leading-[1.8] max-w-[440px] mx-auto mb-8">
              To ensure quality and intimacy, the initial Angiras Beta launch
              is strictly capped at <strong className="text-white/55 font-normal">100 founders</strong>.
            </p>

            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 mb-9 border border-amber-400/20 bg-amber-400/[0.05] rounded-sm">
              <motion.span
                animate={{ opacity: [1, 0.25, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-amber-400 inline-block flex-shrink-0"
              />
              <span className="font-mono text-[0.62rem] tracking-[0.12em] text-amber-400/80">
                Currently reviewing applications · Only{' '}
                <span className="text-amber-400 font-medium">16 spots remaining</span>
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
              <motion.button
                onClick={onApply}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="relative overflow-hidden px-10 py-4 bg-amber-400 text-[#0a0a0a] font-mono text-[0.72rem] tracking-[0.16em] uppercase font-medium rounded-sm btn-shimmer"
              >
                Apply for Beta Access
              </motion.button>
            </div>

            <p className="font-mono text-[0.52rem] tracking-[0.1em] text-white/18 mt-5">
              Founders from IIT, NIT, and top-tier startups applying daily
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
