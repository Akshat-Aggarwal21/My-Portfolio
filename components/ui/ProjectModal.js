'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * ProjectModal
 * ─────────────────────────────────────────────────────────────────────────────
 * Full-detail modal for a project. Reuses the exact same design system
 * (glass, font-display, font-mono, acid color) — no new styles introduced.
 *
 * Props:
 *   project  – project object (from data/projects.js) or null
 *   onClose  – function to close the modal
 * ─────────────────────────────────────────────────────────────────────────────
 */
export default function ProjectModal({ project, onClose }) {
  const overlayRef = useRef(null)

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    // Lock body scroll
    document.body.style.overflow = project ? 'hidden' : ''
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            ref={overlayRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-[200] bg-ink/80 backdrop-blur-md"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 top-[5vh] md:top-[6vh] z-[201] w-full md:w-[740px] max-h-[88vh] overflow-y-auto glass border border-white/10"
            style={{ scrollbarWidth: 'thin' }}
          >
            {/* Top accent bar */}
            <div className="h-0.5 w-full" style={{ background: project.color }} />

            <div className="p-8 md:p-10">
              {/* Header row */}
              <div className="flex items-start justify-between gap-6 mb-8">
                <div>
                  <span
                    className="font-mono text-xs tracking-widest uppercase mb-2 block"
                    style={{ color: project.color }}
                  >
                    {project.category} · {project.period}
                  </span>
                  <h2 className="font-display text-3xl md:text-4xl font-black tracking-tight mb-1">
                    {project.title}
                  </h2>
                  <p className="font-mono text-sm text-white/40 tracking-wide">{project.subtitle}</p>
                </div>

                <button
                  onClick={onClose}
                  data-cursor="CLOSE"
                  className="shrink-0 w-10 h-10 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all duration-200 font-mono text-lg"
                  aria-label="Close modal"
                >
                  ×
                </button>
              </div>

              {/* Problem */}
              <ModalSection label="The Problem" color={project.color}>
                <p className="font-body text-white/65 leading-relaxed text-sm">{project.modal.problem}</p>
              </ModalSection>

              {/* Approach */}
              <ModalSection label="The Approach" color={project.color}>
                <p className="font-body text-white/65 leading-relaxed text-sm">{project.modal.approach}</p>
              </ModalSection>

              {/* Architecture */}
              {project.modal.architecture && (
                <ModalSection label="Architecture" color={project.color}>
                  <div className="border-l-2 pl-4" style={{ borderColor: project.color + '40' }}>
                    <p className="font-mono text-xs text-white/50 leading-relaxed">{project.modal.architecture}</p>
                  </div>
                </ModalSection>
              )}

              {/* Results */}
              <ModalSection label="Results & Metrics" color={project.color}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {project.modal.results.map((r, i) => (
                    <div key={i} className="flex items-start gap-3 glass p-3">
                      <span className="text-xs mt-0.5 shrink-0" style={{ color: project.color }}>◆</span>
                      <span className="font-mono text-xs text-white/60 leading-snug">{r}</span>
                    </div>
                  ))}
                </div>
              </ModalSection>

              {/* Learnings */}
              {project.modal.learnings && (
                <ModalSection label="Key Learning" color={project.color}>
                  <p className="font-body text-sm italic text-white/50 leading-relaxed">
                    "{project.modal.learnings}"
                  </p>
                </ModalSection>
              )}

              {/* Tech Stack */}
              <ModalSection label="Tech Stack" color={project.color}>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-xs border border-white/10 text-white/50 px-3 py-1.5 tracking-wide hover:border-acid/40 hover:text-acid/70 transition-all duration-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </ModalSection>

              {/* Footer links */}
              <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-white/5 mt-4">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-magnetic
                    className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-white/40 border border-white/10 px-5 py-2.5 hover:border-acid/40 hover:text-acid transition-all duration-300"
                  >
                    GitHub ↗
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-magnetic
                    className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase px-5 py-2.5 transition-all duration-300"
                    style={{ color: project.color, border: `1px solid ${project.color}40` }}
                  >
                    Live Demo ↗
                  </a>
                )}
                <button
                  onClick={onClose}
                  className="ml-auto font-mono text-xs tracking-widest uppercase text-white/25 hover:text-white/60 transition-colors duration-200"
                >
                  ← Back
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function ModalSection({ label, color, children }) {
  return (
    <div className="mb-7">
      <div className="flex items-center gap-3 mb-3">
        <span className="font-mono text-xs tracking-widest uppercase" style={{ color: color + 'bb' }}>
          {label}
        </span>
        <div className="flex-1 h-px bg-white/5" />
      </div>
      {children}
    </div>
  )
}
