import { motion } from 'framer-motion'
import Reveal from './Reveal'

export default function Footer({ onApply }) {
  return (
    <footer className="relative z-10 border-t border-white/[0.05]">
      <div className="border-b border-white/[0.04] py-12">
        <div className="max-w-6xl mx-auto px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <Reveal>
            <div>
              <p className="font-display italic text-white/60 text-[1.1rem] mb-1">
                Still reading? You're already thinking about it.
              </p>
              <p className="font-mono text-[0.58rem] tracking-[0.14em] text-white/22 uppercase">
                16 spots left · Applications close soon
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <motion.button
              onClick={onApply}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="relative overflow-hidden px-7 py-3 bg-amber-400 text-[#0a0a0a] font-mono text-[0.65rem] tracking-[0.14em] uppercase font-medium rounded-sm btn-shimmer whitespace-nowrap flex-shrink-0"
            >
              Apply for Beta Access
            </motion.button>
          </Reveal>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 sm:px-12 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <polygon points="12,2 22,20 2,20" stroke="#FBBF24" strokeWidth="1.5"
              fill="none" strokeLinejoin="round"/>
          </svg>
          <span className="font-mono text-[0.6rem] tracking-[0.22em] text-white/25 uppercase">
            © 2026 Angiras. Built by founders, for founders.
          </span>
        </div>
        <div className="flex items-center gap-6">
          {['Twitter/X', 'LinkedIn', 'Terms', 'Privacy'].map((link) => (
            <motion.a
              key={link}
              href="#"
              whileHover={{ color: 'rgba(255,255,255,0.6)' }}
              className="font-mono text-[0.58rem] tracking-[0.12em] text-white/22 uppercase transition-colors duration-300"
              style={{ textDecoration: 'none' }}
            >
              {link}
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  )
}
