'use client'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-white/30 tracking-widest">
          © 2025 AKSHAT AGGARWAL
        </p>
        <p className="font-mono text-xs text-white/20 tracking-widest">
          BUILT WITH NEXT.JS × FRAMER MOTION × TAILWIND
        </p>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-acid animate-pulse-slow" />
          <span className="font-mono text-xs text-white/30 tracking-widest">AVAILABLE FOR WORK</span>
        </div>
      </div>
    </footer>
  )
}
