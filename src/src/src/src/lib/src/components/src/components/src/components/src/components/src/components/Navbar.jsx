import { motion, useScroll, useTransform } from 'framer-motion'

export default function Navbar({ onApply }) {
  const { scrollY } = useScroll()
  const bg = useTransform(scrollY, [0, 80], ['rgba(10,10,10,0)', 'rgba(10,10,10,0.88)'])
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 1])

  return (
    <motion.nav
      style={{ background: bg }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        style={{ opacity: borderOpacity }}
        className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.05]"
      />
      <div className="max-w-6xl mx-auto px-6 sm:px-10 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <polygon points="12,2 22,20 2,20" stroke="#FBBF24" strokeWidth="1.5"
              fill="none" strokeLinejoin="round"/>
          </svg>
          <span className="font-mono text-[0.72rem] tracking-[0.28em] text-white/70 uppercase">
            Angiras
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 border border-amber-400/20 rounded-sm">
            <span className="live-dot w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
            <span className="font-mono text-[0.58rem] tracking-[0.14em] text-amber-400/80 uppercase">
              16 spots left
            </span>
          </div>
          <motion.button
            onClick={onApply}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="relative overflow-hidden px-5 py-2 bg-amber-400 text-[#0a0a0a] font-mono text-[0.65rem] tracking-[0.14em] uppercase font-medium rounded-sm btn-shimmer"
          >
            Apply
          </motion.button>
        </div>
      </div>
    </motion.nav>
  )
}
