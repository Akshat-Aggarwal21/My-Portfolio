'use client'

export default function SectionLabel({ index, label }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="font-mono text-xs text-acid tracking-widest">{index}</span>
      <div className="w-8 h-px bg-acid/40" />
      <span className="font-mono text-xs tracking-widest uppercase text-white/40">{label}</span>
    </div>
  )
}
