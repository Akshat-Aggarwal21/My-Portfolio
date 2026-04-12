'use client'

import { useState, useRef, useCallback, useDeferredValue } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import SectionLabel from '../ui/SectionLabel'
import ProjectModal from '../ui/ProjectModal'
import { projects } from '../../data/projects'
import { trackProjectClick } from '../../utils/analytics'
import { useTilt } from '../../utils/parallax'
import { useAnalytics } from '../../hooks/useAnalytics'

// Derive unique categories from data — no hardcoding needed
const CATEGORIES = ['All', ...Array.from(new Set(projects.map(p => p.category)))]

// ─── Project Card ─────────────────────────────────────────────────────────────

function ProjectCard({ project, index, onOpen }) {
  const ref = useRef(null)
  const cardRef = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  // 3D tilt — uses the utility hook
  useTilt(cardRef, { maxTilt: 6, scale: 1.02, speed: 0.12 })

  const handleOpen = useCallback(() => {
    trackProjectClick(project.id, project.title)
    onOpen(project)
  }, [project, onOpen])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      layout
    >
      <div
        ref={cardRef}
        onClick={handleOpen}
        data-cursor="VIEW"
        className="group relative glass p-8 hover:border-white/15 transition-colors duration-500 flex flex-col cursor-pointer h-full"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Top accent line — thickens on hover */}
        <div
          className="absolute top-0 left-0 right-0 h-px transition-all duration-500 group-hover:h-[2px]"
          style={{ background: project.color }}
        />

        {/* Hover glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at top, ${project.color}08 0%, transparent 60%)` }}
        />

        {/* Header */}
        <div className="flex items-start justify-between mb-6 relative">
          <div>
            <span
              className="font-mono text-xs tracking-widest uppercase mb-2 block"
              style={{ color: project.color }}
            >
              {project.category} · {project.period}
            </span>
            <h3 className="font-display text-2xl font-black tracking-tight group-hover:text-acid transition-colors duration-300">
              {project.title}
            </h3>
            <p className="font-mono text-xs text-white/30 mt-1 tracking-wide">{project.subtitle}</p>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            {project.featured && (
              <span className="font-mono text-xs bg-acid/10 text-acid border border-acid/20 px-2 py-1 tracking-widest">
                FEATURED
              </span>
            )}
            {/* View indicator */}
            <span
              className="font-mono text-xs border px-2 py-1 tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ color: project.color, borderColor: project.color + '40' }}
            >
              VIEW →
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="font-body text-sm text-white/55 leading-relaxed mb-6 flex-1 relative">
          {project.description}
        </p>

        {/* Highlights */}
        <div className="grid grid-cols-2 gap-2 mb-6 relative">
          {project.highlights.map((h, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-xs mt-0.5 shrink-0" style={{ color: project.color }}>◆</span>
              <span className="font-mono text-xs text-white/40 leading-tight">{h}</span>
            </div>
          ))}
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-6 relative">
          {project.tech.map((t) => (
            <span
              key={t}
              className="font-mono text-xs border border-white/8 text-white/40 px-2.5 py-1 tracking-wide group-hover:border-white/15 transition-colors duration-300"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-4 pt-4 border-t border-white/5 relative">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            data-cursor="OPEN"
            className="font-mono text-xs tracking-widest uppercase text-white/40 hover:text-acid transition-colors duration-300 flex items-center gap-1.5"
          >
            GitHub ↗
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              data-cursor="OPEN"
              className="font-mono text-xs tracking-widest uppercase flex items-center gap-1.5 transition-colors duration-300"
              style={{ color: project.color + '99' }}
            >
              Live Demo ↗
            </a>
          )}
          <span className="ml-auto font-mono text-xs text-white/20 group-hover:text-acid/60 transition-colors duration-300 tracking-widest">
            CLICK TO EXPAND
          </span>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProject, setSelectedProject] = useState(null)
  const sectionRef = useAnalytics('projects')
  const headerRef = useRef(null)
  const inView = useInView(headerRef, { once: true, margin: '-100px' })

  // Deferred value for smooth search (avoids blocking on keystrokes)
  const deferredQuery = useDeferredValue(searchQuery)

  // Filter + search logic
  const filtered = projects.filter((p) => {
    const matchesCategory = activeFilter === 'All' || p.category === activeFilter
    if (!matchesCategory) return false
    if (!deferredQuery.trim()) return true

    const q = deferredQuery.toLowerCase()
    return (
      p.title.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tech.some(t => t.toLowerCase().includes(q)) ||
      p.category.toLowerCase().includes(q)
    )
  })

  const openModal = useCallback((project) => setSelectedProject(project), [])
  const closeModal = useCallback(() => setSelectedProject(null), [])

  return (
    <>
      <section id="projects" ref={sectionRef} className="py-32 px-6 md:px-12 relative overflow-hidden">
        {/* BG decoration */}
        <div className="absolute -left-40 top-1/3 w-[600px] h-[600px] bg-coral/3 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto">

          {/* Header row */}
         <div ref={headerRef}>
  <SectionLabel index="04" label="Projects" />
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6 }}
    className="flex flex-col gap-4 mb-6"
  >
    <div>
      <h2 className="font-display text-5xl md:text-6xl font-black tracking-tighter">
        Things I've<br />
        <span className="text-acid">Built.</span>
      </h2>
    </div>

              {/* Filter pills */}
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    data-magnetic
                    className={`font-mono text-xs tracking-widest uppercase px-5 py-2.5 border transition-all duration-300 ${
                      activeFilter === cat
                        ? 'bg-acid text-ink border-acid'
                        : 'border-white/10 text-white/40 hover:border-acid/40 hover:text-acid/70'
                    }`}
                  >
                    {cat}
                    <span className="ml-2 opacity-50">
                      ({cat === 'All' ? projects.length : projects.filter(p => p.category === cat).length})
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="relative mb-10"
          >
            <div className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-xs text-white/20">⌕</div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, tech, or keyword..."
              className="w-full glass border border-white/8 pl-10 pr-4 py-3 font-mono text-sm text-white/70 placeholder:text-white/20 focus:outline-none focus:border-acid/40 transition-colors duration-300 bg-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-xs text-white/25 hover:text-white/60 transition-colors"
              >
                ✕
              </button>
            )}
          </motion.div>

          {/* Results count */}
          <AnimatePresence>
            {(deferredQuery || activeFilter !== 'All') && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="font-mono text-xs text-white/25 tracking-widest mb-6"
              >
                {filtered.length === 0
                  ? 'No projects match — try a different search'
                  : `${filtered.length} project${filtered.length === 1 ? '' : 's'} found`
                }
              </motion.p>
            )}
          </AnimatePresence>

          {/* Grid */}
          <motion.div layout className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} onOpen={openModal} />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty state */}
          <AnimatePresence>
            {filtered.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20"
              >
                <p className="font-display text-4xl font-black text-white/10 mb-3">¯\_(ツ)_/¯</p>
                <p className="font-mono text-xs text-white/25 tracking-widest">No projects match "{deferredQuery}"</p>
                <button
                  onClick={() => { setSearchQuery(''); setActiveFilter('All') }}
                  className="mt-4 font-mono text-xs text-acid/60 hover:text-acid transition-colors tracking-widest"
                >
                  CLEAR FILTERS
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* GitHub CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="text-center mt-16"
          >
            <a
              href="https://github.com/Akshat-Aggarwal21"
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic
              className="inline-flex items-center gap-3 font-mono text-sm text-white/40 border border-white/10 px-8 py-4 hover:border-acid/40 hover:text-acid transition-all duration-300 tracking-widest uppercase"
            >
              View All on GitHub ↗
            </a>
          </motion.div>
        </div>
      </section>

      {/* Modal — rendered outside section to avoid overflow:hidden clipping */}
      <ProjectModal project={selectedProject} onClose={closeModal} />
    </>
  )
}
