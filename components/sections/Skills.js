'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import SectionLabel from '../ui/SectionLabel'
import { skills } from '../../data/skills'
import { useTilt } from '../../utils/parallax'
import { useAnalytics } from '../../hooks/useAnalytics'

const iconMap = {
  Brain: '🧠',
  Code2: '💻',
  BarChart2: '📊',
  Wrench: '🔧',
  Cpu: '🖥️',
}

const MARQUEE_ITEMS = [
  'Python', 'TensorFlow', 'Scikit-learn', 'Pandas', 'NumPy', 'SQL', 'Power BI',
  'OpenCV', 'Git', 'REST APIs', 'Deep Learning', 'Feature Engineering',
  'Data Visualization', 'Model Evaluation', 'C++',
]

function SkillCard({ category, icon, color, items, index }) {
  const ref = useRef(null)
  const cardRef = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  useTilt(cardRef, { maxTilt: 5, scale: 1.015, speed: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        ref={cardRef}
        className="glass p-6 hover:border-white/15 transition-colors duration-300 group h-full"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">{iconMap[icon]}</span>
          <h3 className="font-display font-bold text-sm tracking-wide">{category}</h3>
        </div>
        <div className="space-y-4">
          {items.map(({ name, level }) => (
            <div key={name}>
              <div className="flex justify-between mb-1.5">
                <span className="font-mono text-xs text-white/60 tracking-wide">{name}</span>
                <span className="font-mono text-xs" style={{ color }}>{level}%</span>
              </div>
              <div className="skill-bar">
                <motion.div
                  className="skill-bar-fill"
                  style={{ background: `linear-gradient(90deg, ${color}80, ${color})` }}
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: level / 100 } : { scaleX: 0 }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const sectionRef = useAnalytics('skills')
  const headerRef = useRef(null)
  const inView = useInView(headerRef, { once: true, margin: '-100px' })

  return (
    <section id="skills" ref={sectionRef} className="py-32 relative overflow-hidden">
      {/* Marquee strip */}
      <div className="border-y border-white/5 py-4 mb-20 overflow-hidden">
        <div className="marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="font-mono text-xs tracking-widest text-white/20 uppercase px-6">
              {item} <span className="text-acid/40 mx-2">×</span>
            </span>
          ))}
        </div>
      </div>

      <div className="px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div ref={headerRef}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <SectionLabel index="02" label="Technical Skills" />
              <h2 className="font-display text-5xl md:text-6xl font-black tracking-tighter">
                Tools of the<br />
                <span className="text-acid">Trade.</span>
              </h2>
            </motion.div>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {skills.map((skill, i) => (
              <SkillCard key={skill.category} {...skill} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
