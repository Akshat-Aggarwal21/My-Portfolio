'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useMouseParallax } from '../../utils/parallax'
import { useAnalytics } from '../../hooks/useAnalytics'

const ROLES = ['Machine Learning Engineer', 'Data Analyst', 'AI Systems Builder']

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
}
const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}

export default function Hero() {
  const sectionRef = useAnalytics('hero')
  // Mouse parallax offset
  const mouse = useMouseParallax(0.06)

  return (
    <section id="hero" ref={sectionRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden px-6 md:px-12">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-100 pointer-events-none" />
      <div className="absolute inset-0 radial-glow pointer-events-none" />

      {/* Parallax orbs — different depths */}
      <motion.div
        className="absolute rounded-full blur-3xl pointer-events-none w-[600px] h-[600px] bg-acid/10 -top-32 -right-40"
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transform: `translate(${mouse.x * -18}px, ${mouse.y * -18}px)` }}
      />
      <motion.div
        className="absolute rounded-full blur-3xl pointer-events-none w-[400px] h-[400px] bg-coral/8 bottom-0 -left-20"
        animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 7, repeat: Infinity, delay: 2, ease: 'easeInOut' }}
        style={{ transform: `translate(${mouse.x * 12}px, ${mouse.y * 12}px)` }}
      />

      {/* Rotating rings — parallax layer */}
      <div
        className="absolute right-12 top-1/2 hidden lg:block"
        style={{
          transform: `translate(${mouse.x * -25}px, calc(-50% + ${mouse.y * -25}px))`,
          transition: 'transform 0.1s linear',
        }}
      >
        <motion.div
          className="w-64 h-64 border border-acid/10 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-0 m-12 border border-acid/20 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <div className="absolute inset-0 m-28 flex items-center justify-center">
          <div className="w-4 h-4 bg-acid rounded-full" />
        </div>
      </div>

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-5xl pt-28 pb-16"
      >
        {/* Status badge */}
        <motion.div variants={item} className="inline-flex items-center gap-2 mb-8">
          <span className="w-2 h-2 rounded-full bg-acid animate-pulse" />
          <span className="font-mono text-xs tracking-widest text-acid uppercase">Available for Opportunities</span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={item}
          className="font-display font-black leading-none tracking-tighter mb-2"
          style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)' }}
        >
          AKSHAT
          <span className="block text-acid glow-text-acid">AGGARWAL</span>
        </motion.h1>

        {/* Role pills */}
        <motion.div variants={item} className="flex flex-wrap gap-3 mb-8 mt-6">
          {ROLES.map((role) => (
            <span
              key={role}
              className="font-mono text-sm tracking-widest border border-white/10 px-4 py-1.5 text-white/60 uppercase"
            >
              {role}
            </span>
          ))}
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={item}
          className="font-body text-lg md:text-xl text-white/50 max-w-2xl leading-relaxed mb-10"
        >
          Building intelligent systems that scale — from raw datasets to production-ready AI
          that solves real problems and delivers measurable impact.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={item} className="flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            data-magnetic
            className="group relative bg-acid text-ink font-mono text-sm font-bold uppercase tracking-widest px-8 py-4 overflow-hidden transition-all duration-300 hover:bg-white"
          >
            <span className="relative z-10">View My Work</span>
          </a>
          <a
            href="#contact"
            data-magnetic
            className="font-mono text-sm uppercase tracking-widest text-white/60 border border-white/10 px-8 py-4 hover:border-acid/50 hover:text-acid transition-all duration-300"
          >
            Get In Touch
          </a>
          <a
            href="https://github.com/Akshat-Aggarwal21"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm uppercase tracking-widest text-white/30 hover:text-acid transition-colors duration-300 px-2 py-4"
          >
            GitHub ↗
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={item}
          className="flex flex-wrap gap-12 mt-16 pt-10 border-t border-white/5"
        >
          {[
            { num: '3+', label: 'ML Projects Shipped' },
            { num: '98%', label: 'Model Accuracy (Sign Lang.)' },
            { num: '15+', label: 'Years of Data Analyzed' },
            { num: '5+', label: 'CRM Platforms Evaluated' },
          ].map(({ num, label }) => (
            <div key={label}>
              <p className="font-display text-3xl font-black text-acid">{num}</p>
              <p className="font-mono text-xs text-white/30 tracking-widest mt-1">{label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-px h-12 bg-gradient-to-b from-acid/60 to-transparent"
        />
        <span className="font-mono text-xs text-white/20 tracking-widest">SCROLL</span>
      </motion.div>
    </section>
  )
}
