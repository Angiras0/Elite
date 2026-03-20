import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { submitApplication } from '../lib/api'

const STAGES = ['Idea', 'MVP', 'Revenue', 'Scaling']

const initialState = {
  email: '',
  building: '',
  stage: '',
  problem: '',
  whyAccept: '',
}

const validate = (fields) => {
  const errors = {}
  if (!fields.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
    errors.email = 'Valid email required'
  if (!fields.building || fields.building.trim().length < 10)
    errors.building = 'Min 10 characters'
  if (!fields.stage)
    errors.stage = 'Select your stage'
  if (!fields.problem || fields.problem.trim().length < 15)
    errors.problem = 'Min 15 characters'
  if (!fields.whyAccept || fields.whyAccept.trim().length < 20)
    errors.whyAccept = 'Min 20 characters'
  return errors
}

function Field({ label, id, required, error, hint, children }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="font-mono text-[0.58rem] tracking-[0.18em] text-white/40 uppercase">
          {label}{required && <span className="text-amber-400/60 ml-1">*</span>}
        </label>
        <AnimatePresence mode="wait">
          {error ? (
            <motion.span key="err"
              initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
              className="font-mono text-[0.5rem] text-red-400/65">
              {error}
            </motion.span>
          ) : hint ? (
            <span className="font-mono text-[0.5rem] text-white/18">{hint}</span>
          ) : null}
        </AnimatePresence>
      </div>
      {children}
    </div>
  )
}

const baseInputStyle = {
  width: '100%',
  padding: '12px 15px',
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '2px',
  color: 'rgba(255,255,255,0.82)',
  fontFamily: "'DM Mono', monospace",
  fontSize: '0.8rem',
  outline: 'none',
  transition: 'border-color 0.25s ease, background 0.25s ease',
}

function getInputStyle(key, errors, touched) {
  return {
    ...baseInputStyle,
    borderColor:
      errors[key] && touched[key] ? 'rgba(248,113,113,0.3)' :
      touched[key] && !errors[key] ? 'rgba(251,191,36,0.22)' :
      'rgba(255,255,255,0.08)',
  }
}

function PostSuccess() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="text-center py-8"
    >
      <div className="flex justify-center mb-7">
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
          <polygon points="26,4 48,46 4,46"
            stroke="rgba(251,191,36,0.55)" strokeWidth="1.5"
            fill="rgba(251,191,36,0.04)" strokeLinejoin="round"/>
        </svg>
      </div>
      <h3 className="font-display font-semibold italic text-white/88 mb-2 tracking-tight"
        style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
        You're on the list.
      </h3>
      <p className="font-body font-light text-white/35 text-[0.85rem] leading-relaxed mb-1">
        We review every founder carefully.
      </p>
      <p className="font-mono text-[0.55rem] tracking-[0.12em] text-white/20 mb-10">
        Response within 48 hours.
      </p>
      <div className="border-t border-white/[0.06] pt-8">
        <p className="font-mono text-[0.56rem] tracking-[0.18em] text-amber-400/50 uppercase mb-5">
          While you wait
        </p>
        <motion.a
          href="https://discord.gg/angiras"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          style={{ display: 'flex', textDecoration: 'none' }}
          className="w-full items-center justify-center gap-3 py-3.5 px-6 border border-[#5865F2]/25 rounded-sm bg-[#5865F2]/06 text-[#5865F2]/70 hover:text-[#5865F2] hover:bg-[#5865F2]/10 transition-all duration-300"
        >
          <svg width="20" height="15" viewBox="0 0 71 55" fill="currentColor">
            <path d="M60.1 4.9A58.5 58.5 0 0 0 45.4.5a40.7 40.7 0 0 0-1.8 3.7 54.2 54.2 0 0 0-16.2 0A38.6 38.6 0 0 0 25.6.5 58.4 58.4 0 0 0 10.9 5C1.6 19.1-1 32.8.3 46.4a58.8 58.8 0 0 0 17.9 9.1 44.2 44.2 0 0 0 3.8-6.3 38.3 38.3 0 0 1-6-2.9l1.4-1.1a41.9 41.9 0 0 0 36.2 0l1.5 1.1a38.5 38.5 0 0 1-6 2.9 44 44 0 0 0 3.8 6.3 58.6 58.6 0 0 0 17.9-9A55.7 55.7 0 0 0 60 4.9ZM23.7 38a6.7 6.7 0 0 1-6.2-7 6.7 6.7 0 0 1 6.2-7 6.7 6.7 0 0 1 6.2 7 6.7 6.7 0 0 1-6.2 7Zm23.6 0a6.7 6.7 0 0 1-6.2-7 6.7 6.7 0 0 1 6.2-7 6.7 6.7 0 0 1 6.2 7 6.7 6.7 0 0 1-6.2 7Z"/>
          </svg>
          <span className="font-mono text-[0.65rem] tracking-[0.12em] uppercase">
            Request Early Discord Access
          </span>
        </motion.a>
      </div>
    </motion.div>
  )
}

export default function ApplicationForm({ isModal = false, onClose }) {
  const [fields, setFields] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const submitLock = useRef(false)

  const update = (key, value) => {
    setFields(f => ({ ...f, [key]: value }))
    if (touched[key]) {
      const errs = validate({ ...fields, [key]: value })
      setErrors(e => ({ ...e, [key]: errs[key] }))
    }
  }

  const blur = (key) => {
    setTouched(t => ({ ...t, [key]: true }))
    const errs = validate(fields)
    setErrors(e => ({ ...e, [key]: errs[key] }))
  }

  const isValid = Object.keys(validate(fields)).length === 0

  const submit = useCallback(async () => {
    if (submitLock.current || status === 'loading') return
    const allTouched = Object.fromEntries(Object.keys(initialState).map(k => [k, true]))
    setTouched(allTouched)
    const errs = validate(fields)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    submitLock.current = true
    setStatus('loading')
    setErrorMsg('')
    try {
      await submitApplication(fields)
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message || 'Submission failed. Please try again.')
    } finally {
      submitLock.current = false
    }
  }, [fields, status])

  return (
    <div className="w-full max-w-[520px] mx-auto">
      <div className="relative mb-7">
        <div className="absolute top-0 left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-amber-400/45 to-transparent" />
        {isModal && onClose && (
          <button onClick={onClose}
            className="absolute top-5 right-0 font-mono text-[0.6rem] text-white/22 hover:text-white/50 transition-colors uppercase tracking-widest">
            ✕
          </button>
        )}
        <div className="pt-6">
          <span className="font-mono text-[0.56rem] tracking-[0.22em] text-amber-400/55 uppercase">
            Beta Application
          </span>
          <h2 className="font-display font-semibold italic text-white/90 mt-2 mb-2 tracking-tight leading-tight"
            style={{ fontSize: 'clamp(1.6rem, 3vw, 2.1rem)' }}>
            Apply for Access
          </h2>
          <p className="font-body font-light text-white/26 text-[0.8rem] leading-relaxed">
            16 spots remaining. Reviewed manually.
          </p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <PostSuccess key="success" />
        ) : (
          <motion.div key="form"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -8 }}
            className="flex flex-col gap-5">

            <Field label="Email" id="email" required error={touched.email && errors.email}>
              <input id="email" type="email" value={fields.email}
                placeholder="you@startup.com"
                onChange={e => update('email', e.target.value)}
                onBlur={() => blur('email')}
                style={getInputStyle('email', errors, touched)}
                onFocus={e => { e.target.style.borderColor = 'rgba(251,191,36,0.3)'; e.target.style.background = 'rgba(255,255,255,0.05)' }}
              />
            </Field>

            <Field label="What are you building?" id="building" required
              error={touched.building && errors.building} hint="Be specific">
              <textarea id="building" value={fields.building} rows={3}
                placeholder="Your product, who it serves, current traction..."
                onChange={e => update('building', e.target.value)}
                onBlur={() => blur('building')}
                style={{ ...getInputStyle('building', errors, touched), resize: 'none' }}
                onFocus={e => { e.target.style.borderColor = 'rgba(251,191,36,0.3)'; e.target.style.background = 'rgba(255,255,255,0.05)' }}
              />
            </Field>

            <Field label="Stage" id="stage" required error={touched.stage && errors.stage}>
              <div className="grid grid-cols-4 gap-2">
                {STAGES.map(s => (
                  <button key={s} type="button"
                    onClick={() => { update('stage', s); setTouched(t => ({ ...t, stage: true })) }}
                    style={{
                      padding: '10px 0',
                      border: `1px solid ${fields.stage === s ? 'rgba(251,191,36,0.42)' : 'rgba(255,255,255,0.07)'}`,
                      borderRadius: '2px',
                      background: fields.stage === s ? 'rgba(251,191,36,0.07)' : 'rgba(255,255,255,0.02)',
                      color: fields.stage === s ? 'rgba(251,191,36,0.88)' : 'rgba(255,255,255,0.32)',
                      fontFamily: "'DM Mono', monospace",
                      fontSize: '0.62rem',
                      letterSpacing: '0.1em',
                      transition: 'all 0.2s ease',
                    }}>
                    {s}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Biggest problem right now" id="problem" required
              error={touched.problem && errors.problem} hint="Be brutal">
              <textarea id="problem" value={fields.problem} rows={3}
                placeholder="Distribution, hiring, fundraising, PMF? Be direct."
                onChange={e => update('problem', e.target.value)}
                onBlur={() => blur('problem')}
                style={{ ...getInputStyle('problem', errors, touched), resize: 'none' }}
                onFocus={e => { e.target.style.borderColor = 'rgba(251,191,36,0.3)'; e.target.style.background = 'rgba(255,255,255,0.05)' }}
              />
            </Field>

            <Field label="Why should we accept you?" id="whyAccept" required
              error={touched.whyAccept && errors.whyAccept}>
              <textarea id="whyAccept" value={fields.whyAccept} rows={3}
                placeholder="What have you shipped, closed, or built that proves you belong here?"
                onChange={e => update('whyAccept', e.target.value)}
                onBlur={() => blur('whyAccept')}
                style={{ ...getInputStyle('whyAccept', errors, touched), resize: 'none' }}
                onFocus={e => { e.target.style.borderColor = 'rgba(251,191,36,0.3)'; e.target.style.background = 'rgba(255,255,255,0.05)' }}
              />
            </Field>

            <AnimatePresence>
              {status === 'error' && (
                <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="px-4 py-3 border border-red-400/18 bg-red-400/[0.03] rounded-sm">
                  <p className="font-mono text-[0.6rem] text-red-400/65">{errorMsg}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              onClick={submit}
              disabled={status === 'loading'}
              whileHover={isValid && status !== 'loading' ? { scale: 1.01 } : {}}
              whileTap={isValid && status !== 'loading' ? { scale: 0.98 } : {}}
              style={{
                padding: '14px',
                background: isValid ? '#FBBF24' : 'rgba(255,255,255,0.05)',
                border: 'none',
                borderRadius: '2px',
                color: isValid ? '#0a0a0a' : 'rgba(255,255,255,0.2)',
                fontFamily: "'DM Mono', monospace",
                fontSize: '0.68rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                fontWeight: 500,
                marginTop: 2,
                transition: 'all 0.3s ease',
              }}
            >
              {status === 'loading' ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <motion.span animate={{ rotate: 360 }}
                    transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                    style={{ display: 'inline-block', width: 11, height: 11,
                      border: '1.5px solid rgba(10,10,10,0.25)',
                      borderTopColor: '#0a0a0a', borderRadius: '50%' }}
                  />
                  Applying…
                </span>
              ) : 'Submit Application'}
            </motion.button>

            <p className="font-mono text-[0.5rem] tracking-[0.08em] text-white/15 text-center">
              No spam · Reviewed personally in 48h
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
          }
