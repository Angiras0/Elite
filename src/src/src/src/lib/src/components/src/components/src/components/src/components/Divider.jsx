import Reveal from './Reveal'

export default function Divider({ label }) {
  return (
    <Reveal>
      <div className="flex items-center gap-6 py-2">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/[0.05]" />
        {label && (
          <span className="font-mono text-[0.58rem] tracking-[0.22em] text-white/20 uppercase whitespace-nowrap">
            {label}
          </span>
        )}
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/[0.05]" />
      </div>
    </Reveal>
  )
}
