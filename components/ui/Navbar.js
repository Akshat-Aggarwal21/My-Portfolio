'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { trackEvent } from '../../utils/analytics'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  // Debounced scroll handler
  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 40)
          // Active section detection
          const sections = navLinks.map(l => l.href.replace('#', ''))
          for (const id of [...sections].reverse()) {
            const el = document.getElementById(id)
            if (el && window.scrollY >= el.offsetTop - 200) {
              setActiveSection(id)
              break
            }
          }
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleHireMe = useCallback(() => {
    trackEvent('hire_me_click', { source: 'navbar' })
    const el = document.getElementById('contact')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      // Brief highlight pulse on contact section
      el.style.transition = 'box-shadow 0.4s'
      el.style.boxShadow = '0 0 0 2px rgba(200,255,0,0.3)'
      setTimeout(() => { el.style.boxShadow = '' }, 1200)
    }
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 flex items-center justify-between transition-all duration-500 ${
          scrolled ? 'glass border-b border-white/5' : ''
        }`}
      >
        {/* Logo */}
        <a href="#" className="font-display font-bold text-xl tracking-tight">
          AA<span className="text-acid">.</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const sectionId = link.href.replace('#', '')
            const isActive = activeSection === sectionId
            return (
              <a
                key={link.href}
                href={link.href}
                className={`font-mono text-xs tracking-widest uppercase transition-colors duration-300 relative ${
                  isActive ? 'text-acid' : 'text-white/50 hover:text-acid'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-acid"
                  />
                )}
              </a>
            )
          })}
        </div>

        {/* Hire Me CTA */}
        <button
          onClick={handleHireMe}
          data-magnetic
          className="hidden md:flex items-center gap-2 bg-acid text-ink font-mono text-xs font-bold uppercase tracking-widest px-5 py-2.5 hover:bg-white transition-colors duration-300 relative overflow-hidden group"
        >
          <span className="relative z-10">Hire Me</span>
          {/* Urgency pulse dot */}
          <span className="relative z-10 w-1.5 h-1.5 rounded-full bg-ink/50 group-hover:animate-ping" />
        </button>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
            className="block w-6 h-0.5 bg-paper"
            style={{ transformOrigin: 'center' }}
          />
          <motion.span
            animate={{ opacity: menuOpen ? 0 : 1 }}
            className="block w-6 h-0.5 bg-paper"
          />
          <motion.span
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
            className="block w-6 h-0.5 bg-paper"
            style={{ transformOrigin: 'center' }}
          />
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-ink flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => setMenuOpen(false)}
                className="font-display text-4xl font-black hover:text-acid transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.button
              onClick={() => { setMenuOpen(false); handleHireMe() }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-4 bg-acid text-ink font-mono text-sm font-bold uppercase tracking-widest px-8 py-3"
            >
              Hire Me
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
