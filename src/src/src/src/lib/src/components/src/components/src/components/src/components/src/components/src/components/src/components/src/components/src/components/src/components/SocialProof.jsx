import Reveal from './Reveal'
import Divider from './Divider'

const quotes = [
  {
    text: "Exactly what the Indian startup ecosystem needed — a room where the bar is set by output, not optics.",
    role: "SaaS founder, Delhi",
    initial: "A",
  },
  {
    text: "The feedback I got in 48 hours was more valuable than 6 months of mentor meetings.",
    role: "D2C founder, Bengaluru",
    initial: "R",
  },
  {
    text: "I came for the network. I stayed because this is the only place people talk about real numbers.",
    role: "Fintech founder, Mumbai",
    initial: "S",
  },
]

export default function SocialProof() {
  return (
    <section className="relative z-10 py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6 sm:px-12">
        <Divider label="Founders Speaking" />
        <div className="mt-16 mb-6">
          <Reveal>
            <span className="font-mono text-[0.6rem] tracking-[0.22em] text-amber-400/55 uppercase">
              Early members
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              className="font-display font-semibold italic text-white/85 leading-[1.12] mt-3 max-w-sm"
              style={{ fontSize: 'clamp(1.9rem, 3vw, 2.8rem)' }}
            >
              Founders from top colleges and startups joining.
            </h2>
          </Reveal>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
          {quotes.map((q, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="glass-card rounded-sm p-7 h-full flex flex-col gap-5 hover:border-amber-400/10 transition-all duration-300">
                <div className="text-white/28 font-display italic text-[0.95rem] leading-[1.75] flex-1">
                  "{q.text}"
                </div>
                <div className="flex items-center gap-3 pt-2 border-t border-white/[0.05]">
                  <div className="w-7 h-7 rounded-full bg-amber-400/10 border border-amber-400/20 flex items-center justify-center font-mono text-[0.58rem] text-amber-400/60 flex-shrink-0">
                    {q.initial}
                  </div>
                  <span className="font-mono text-[0.58rem] tracking-[0.1em] text-white/22 uppercase">
                    {q.role}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <div className="mt-8 p-6 border border-dashed border-white/[0.07] rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="font-mono text-[0.58rem] tracking-[0.18em] text-amber-400/50 uppercase mb-1.5">
                Coming Soon
              </div>
              <div className="font-body text-white/40 text-[0.85rem] font-light">
                Premium Access — Private channels, 1:1 introductions, and exclusive playbooks.
                <span className="text-white/25"> ₹499–₹1999/month</span>
              </div>
            </div>
            <div className="flex-shrink-0 px-4 py-2 border border-white/[0.07] rounded-sm font-mono text-[0.6rem] tracking-[0.12em] text-white/22 uppercase whitespace-nowrap">
              Notify Me
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
