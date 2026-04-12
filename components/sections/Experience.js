'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import SectionLabel from '../ui/SectionLabel'
import { experience } from '../../data/experience'
import { useAnalytics } from '../../hooks/useAnalytics'

export default function Experience() {
  const sectionRef = useAnalytics('experience')
  const headerRef = useRef(null)
  const inView = useInView(headerRef, { once: true, margin: '-100px' })

  return (
    <section id="experience" ref={sectionRef} className="py-32 px-6 md:px-12 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-acid/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div ref={headerRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <SectionLabel index="03" label="Work Experience" />
            <h2 className="font-display text-5xl md:text-6xl font-black tracking-tighter">
              Where I've<br />
              <span className="text-acid">Made Impact.</span>
            </h2>
          </motion.div>
        </div>

        <div className="relative">
          <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-acid/40 via-acid/10 to-transparent hidden md:block" />

          <div className="space-y-12">
            {experience.map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="md:pl-12 relative group"
              >
                <div className="absolute left-0 top-6 w-3 h-3 -translate-x-1 rounded-full bg-acid hidden md:block group-hover:scale-150 transition-transform duration-300" />

                <div className="glass p-8 md:p-10 hover:border-acid/20 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono text-xs bg-acid/10 text-acid px-3 py-1 tracking-widest uppercase">
                          {job.type}
                        </span>
                        <span className="font-mono text-xs text-white/30 tracking-widest">{job.duration}</span>
                      </div>
                      <h3 className="font-display text-2xl md:text-3xl font-black tracking-tight mb-1">
                        {job.role}
                      </h3>
                      <p className="font-mono text-sm text-acid tracking-wide">{job.company}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-xs text-white/30 tracking-widest border border-white/10 px-4 py-2 whitespace-nowrap">
                        {job.period}
                      </span>
                    </div>
                  </div>

                  <p className="font-body text-white/50 leading-relaxed mb-6 max-w-3xl">
                    {job.description}
                  </p>

                  <div className="space-y-3 mb-8">
                    {job.highlights.map((point, pi) => (
                      <motion.div
                        key={pi}
                        initial={{ opacity: 0, x: -10 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: i * 0.15 + pi * 0.07 + 0.3 }}
                        className="flex items-start gap-3 group/point"
                      >
                        <span className="text-acid mt-1.5 text-xs shrink-0">▸</span>
                        <p className="font-body text-sm text-white/65 leading-relaxed group-hover/point:text-white/85 transition-colors duration-200">
                          {point}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill) => (
                      <span
                        key={skill}
                        className="font-mono text-xs border border-white/8 text-white/40 px-3 py-1 tracking-wide hover:border-acid/30 hover:text-acid/70 transition-all duration-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-12 md:pl-12 relative"
        >
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 -translate-x-1 rounded-full border border-acid/40 hidden md:block" />
          <div className="glass p-6 border-dashed border-white/10 text-center">
            <p className="font-mono text-xs text-white/25 tracking-widest">
              MORE EXPERIENCE BEING BUILT — OPEN TO OPPORTUNITIES
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
