'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import SectionLabel from '../ui/SectionLabel'
import { education, certifications } from '../../data/education'
import { useAnalytics } from '../../hooks/useAnalytics'

export default function Education() {
  const sectionRef = useAnalytics('education')
  const headerRef = useRef(null)
  const inView = useInView(headerRef, { once: true, margin: '-100px' })

  return (
    <section id="education" ref={sectionRef} className="py-32 px-6 md:px-12 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div ref={headerRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <SectionLabel index="05" label="Education & Certs" />
            <h2 className="font-display text-5xl md:text-6xl font-black tracking-tighter">
              The Foundation<br />
              <span className="text-acid">Behind the Work.</span>
            </h2>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Education */}
          <div className="space-y-6">
            {education.map((edu, i) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="glass p-8 relative overflow-hidden group hover:border-acid/15 transition-all duration-300"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-acid/5 pointer-events-none" />

                <div className="mb-6">
                  <span className="font-mono text-xs text-acid tracking-widest uppercase mb-3 block">
                    {edu.period}
                  </span>
                  <h3 className="font-display text-2xl font-black tracking-tight mb-1">
                    {edu.degree}
                  </h3>
                  <p className="font-display text-lg font-bold text-white/60">{edu.field}</p>
                </div>

                <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/5">
                  <div>
                    <p className="font-mono text-sm text-white tracking-wide">{edu.institution}</p>
                    <p className="font-mono text-xs text-white/30 mt-1">{edu.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-2xl font-black text-acid">{edu.gpa.split('/')[0]}</p>
                    <p className="font-mono text-xs text-white/30">/ {edu.gpa.split('/')[1]} GPA</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {edu.highlights.map((h, hi) => (
                    <div key={hi} className="flex items-start gap-2">
                      <span className="text-acid text-xs mt-1 shrink-0">▸</span>
                      <span className="font-body text-sm text-white/55">{h}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-mono text-xs text-white/30 tracking-widest uppercase mb-4">
              Certifications
            </p>
            <div className="space-y-3">
              {certifications.map((cert, i) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.07 }}
                  className="glass p-5 flex items-center gap-4 hover:border-acid/20 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 bg-acid/10 border border-acid/20 flex items-center justify-center shrink-0 group-hover:bg-acid/20 transition-colors duration-300">
                    <span className="text-acid text-sm">🏅</span>
                  </div>
                  <div>
                    <p className="font-body text-sm font-medium text-white/80">{cert.title}</p>
                    <p className="font-mono text-xs text-white/30 tracking-wide mt-0.5">{cert.issuer}</p>
                  </div>
                  <span className="ml-auto text-acid/40 group-hover:text-acid transition-colors duration-300 text-lg">✓</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="mt-8 glass p-6 text-center"
            >
              <p className="font-display text-5xl font-black text-acid mb-2">4</p>
              <p className="font-mono text-xs text-white/30 tracking-widest uppercase">Industry Certifications</p>
              <p className="font-mono text-xs text-white/20 tracking-wider mt-1">Deloitte × NPTEL</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
