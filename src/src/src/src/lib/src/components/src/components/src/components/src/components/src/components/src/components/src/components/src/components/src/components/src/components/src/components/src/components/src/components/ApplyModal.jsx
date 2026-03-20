import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApplicationForm from './ApplicationForm'

export default function ApplyModal({ open, onClose }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    if (open) window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
            className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-xl"
          />
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[201] flex items-center justify-center p-4 sm:p-8 pointer-events-none"
          >
            <div
              onClick={e => e.stopPropagation()}
              className="pointer-events-auto w-full max-w-lg max-h-[90vh] overflow-y-auto"
              style={{
                background: '#0e0e0e',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '4px',
                padding: 'clamp(28px, 5vw, 48px)',
                scrollbarWidth: 'thin',
              }}
            >
              <ApplicationForm isModal onClose={onClose} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
