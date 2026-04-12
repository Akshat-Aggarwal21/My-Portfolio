'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import SectionLabel from '../ui/SectionLabel'
import { useAnalytics } from '../../hooks/useAnalytics'

const traits = [
  { emoji: '🧠', label: 'ML-First Thinking' },
  { emoji: '📊', label: 'Data Storyteller' },
  { emoji: '⚡', label: 'Fast Prototype to Production' },
  { emoji: '🎯', label: 'Impact-Driven' },
]

export default function About() {
  const sectionRef = useAnalytics('about')
  const animRef = useRef(null)
  const inView = useInView(animRef, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={sectionRef} className="py-32 px-6 md:px-12 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-acid/20 to-transparent pointer-events-none" />

      <div ref={animRef} className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Left: Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionLabel index="01" label="About Me" />
          <h2 className="font-display text-5xl md:text-6xl font-black tracking-tighter leading-tight mb-8">
            I Build AI That<br />
            <span className="text-acid">Actually Works.</span>
          </h2>
          <div className="space-y-5 text-white/60 font-body leading-relaxed">
            <p>
              I'm a Computer Science graduate from Chandigarh University with a deep focus on
              Machine Learning, Data Analysis, and real-world AI systems. I don't just train
              models — I build end-to-end solutions with clean architecture and measurable outcomes.
            </p>
            <p>
              From achieving <span className="text-white">98% validation accuracy</span> on real-time
              gesture recognition to evaluating deep learning architectures across 15+ years of
              weather data — my work lives at the intersection of rigour and creativity.
            </p>
            <p>
              I'm driven by one question:{' '}
              <span className="text-acid italic">"What's the actual impact?"</span> — whether
              that's better prediction accuracy, faster inference, or clearer insights for a stakeholder.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {traits.map(({ emoji, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 glass px-4 py-2 text-sm font-mono tracking-wide text-white/70"
              >
                <span>{emoji}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: Profile card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="relative border border-white/5 p-10 glass">
            <div className="absolute -top-6 -right-6 font-display text-[10rem] font-black text-acid/5 leading-none select-none pointer-events-none">
              AI
            </div>

            <p className="font-mono text-xs text-acid tracking-widest mb-6">AKSHAT.PROFILE</p>

            <div className="space-y-4">
              {[
                ['Location', 'Chandigarh, India'],
                ['Focus', 'ML Engineering & Data Analysis'],
                ['Degree', 'B.E. Computer Science — 2025'],
                ['Experience', 'R&D Intern @ Nippon Data'],
                ['Status', '🟢 Open to opportunities'],
              ].map(([key, val]) => (
                <div key={key} className="flex items-start justify-between gap-6 border-b border-white/5 pb-4 last:border-0">
                  <span className="font-mono text-xs text-white/30 tracking-widest uppercase min-w-24">{key}</span>
                  <span className="font-body text-sm text-white/80 text-right">{val}</span>
                </div>
              ))}
            </div>

            <a
              href="mailto:212004akshat@gmail.com"
              data-magnetic
              className="mt-8 block text-center bg-acid/10 border border-acid/30 text-acid font-mono text-xs tracking-widest uppercase py-3 hover:bg-acid hover:text-ink transition-all duration-300"
            >
              212004akshat@gmail.com
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
