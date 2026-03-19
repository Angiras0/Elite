import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.5,
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 36, filter: 'blur(10px)' },
  show: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
  }
}

export default function Hero({ onApply }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, -90])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <motion.section
      ref={ref}
      style={{ y, opacity }}
      className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6 pt-28 pb-20"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div style={{
          position: 'absolute', top: '5%', left: '50%',
          transform: 'translateX(-50%)',
          width: '70%', height: '65%',
          background: 'radial-gradient(ellipse, rgba(251,191,36,0.05) 0%, transparent 65%)',
        }} />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center max-w-4xl mx-auto"
      >
        <motion.div variants={item} className="flex items-center gap-4 mb-9">
          <span className="inline-block w-8 h-px bg-amber-400/40" />
          <span className="font-mono text-[0.62rem] tracking-[0.32em] text-amber-400/65 uppercase">
            Introducing Angiras
          </span>
          <span className="inline-block w-8 h-px bg-amber-400/40" />
        </motion.div>

        <motion.h1
          variants={item}
          className="hero-headline font-display font-semibold leading-[1.04] tracking-[-0.025em] text-white/93 mb-7"
          style={{ fontSize: 'clamp(3rem, 6.5vw, 7rem)' }}
        >
          Build Alongside<br />
          <em style={{
            background: 'linear-gradient(140deg, rgba(255,255,255,0.93) 20%, rgba(251,191,36,0.75) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontStyle: 'italic',
          }}>
            the Next Generation
          </em>
          <br />of Founders.
        </motion.h1>

        <motion.p variants={item}
          className="font-body font-light text-white/36 text-[1rem] sm:text-[1.08rem] leading-[1.8] max-w-[500px] mb-3">
          Angiras is an invite-only Discord network for serious entrepreneurs.
          Cut through the noise, connect with vetted builders, and scale your vision.
        </motion.p>

        <motion.div variants={item} className="flex items-center gap-2 mb-11">
          <span className="live-dot w-1.5 h-1.5 rounded-full bg-amber-400 inline-block flex-shrink-0" />
          <span className="font-mono text-[0.6rem] tracking-[0.12em] text-white/28">
            27 founders applied in the last 24 hours
          </span>
        </motion.div>

        <motion.div variants={item} className="flex flex-col sm:flex-row gap-3 items-center">
          <motion.button
            onClick={onApply}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="relative overflow-hidden px-8 py-3.5 bg-amber-400 text-[#0a0a0a] font-mono text-[0.72rem] tracking-[0.14em] uppercase font-medium rounded-sm btn-shimmer"
          >
            Apply for Beta Access
          </motion.button>
          <motion.button
            whileHover={{ borderColor: 'rgba(255,255,255,0.28)', color: 'rgba(255,255,255,0.8)' }}
            className="px-8 py-3.5 border border-white/10 text-white/40 font-mono text-[0.72rem] tracking-[0.14em] uppercase rounded-sm transition-colors duration-300"
          >
            Read the Manifesto
          </motion.button>
        </motion.div>

        <motion.div variants={item}
          className="mt-10 flex items-center gap-2.5 px-5 py-2.5 border border-white/[0.055] rounded-sm bg-white/[0.015]">
          <motion.span
            animate={{ opacity: [1, 0.25, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-amber-400 inline-block flex-shrink-0"
          />
          <span className="font-mono text-[0.58rem] tracking-[0.14em] text-white/28">
            Only <span className="text-amber-400/80">16 spots remaining</span> in the beta cohort
          </span>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-12 bg-gradient-to-b from-transparent to-white/20"
        />
      </motion.div>
    </motion.section>
  )
}
