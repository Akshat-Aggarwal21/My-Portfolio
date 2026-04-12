'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import SectionLabel from '../ui/SectionLabel'
import { getAIResponse, QUICK_QUESTIONS } from '../../utils/aiAssistant'
import { trackEvent } from '../../utils/analytics'
import { useAnalytics } from '../../hooks/useAnalytics'

// ─── AI Chat Widget ───────────────────────────────────────────────────────────

function AIChatWidget() {
  const [messages, setMessages] = useState([
    {
      from: 'ai',
      text: "Hi! I'm Akshat's AI assistant. Ask me anything about his projects, skills, or availability — or tap a quick question below.",
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef(null)

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const sendMessage = useCallback((text) => {
    if (!text.trim() || typing) return
    trackEvent('ai_query', { query: text })
    setMessages(prev => [...prev, { from: 'user', text }])
    setInputValue('')
    setTyping(true)

    // Simulate thinking delay (600–1400ms)
    const delay = 600 + Math.random() * 800
    setTimeout(() => {
      const response = getAIResponse(text)
      setMessages(prev => [...prev, { from: 'ai', text: response }])
      setTyping(false)
    }, delay)
  }, [typing])

  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage(inputValue)
  }

  return (
    <div className="glass flex flex-col overflow-hidden" style={{ height: '420px' }}>
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-white/5 shrink-0">
        <div className="w-2 h-2 rounded-full bg-acid animate-pulse" />
        <span className="font-mono text-xs tracking-widest text-white/60 uppercase">Akshat.AI — Ask Me Anything</span>
        <span className="ml-auto font-mono text-xs text-white/20">↵ to send</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ scrollbarWidth: 'thin' }}>
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] px-4 py-2.5 text-sm font-body leading-relaxed ${
                  msg.from === 'user'
                    ? 'bg-acid text-ink font-medium'
                    : 'glass text-white/75 border border-white/5'
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        <AnimatePresence>
          {typing && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex justify-start"
            >
              <div className="glass border border-white/5 px-4 py-3 flex gap-1.5 items-center">
                {[0, 0.18, 0.36].map((d, i) => (
                  <motion.span
                    key={i}
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 0.55, repeat: Infinity, delay: d }}
                    className="w-1.5 h-1.5 bg-acid rounded-full"
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* Quick questions */}
      <div className="px-3 pt-2 pb-1 border-t border-white/5 flex flex-wrap gap-1.5 shrink-0">
        {QUICK_QUESTIONS.map((q) => (
          <button
            key={q}
            onClick={() => sendMessage(q)}
            disabled={typing}
            className="font-mono text-xs text-white/35 border border-white/8 px-2.5 py-1 hover:border-acid/40 hover:text-acid transition-all duration-200 disabled:opacity-30 tracking-wide"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Text input */}
      <form onSubmit={handleSubmit} className="flex gap-2 p-3 border-t border-white/5 shrink-0">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask anything..."
          disabled={typing}
          className="flex-1 bg-transparent glass border border-white/8 px-3 py-2 font-mono text-xs text-white/70 placeholder:text-white/20 focus:outline-none focus:border-acid/40 transition-colors duration-300"
        />
        <button
          type="submit"
          disabled={typing || !inputValue.trim()}
          data-magnetic
          className="bg-acid text-ink font-mono text-xs font-bold px-4 py-2 hover:bg-white transition-colors duration-300 disabled:opacity-30 tracking-widest"
        >
          ↵
        </button>
      </form>
    </div>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function Contact() {
  const sectionRef = useAnalytics('contact')
  const headerRef = useRef(null)
  const inView = useInView(headerRef, { once: true, margin: '-100px' })

  const contacts = [
    { label: 'Email', value: '212004akshat@gmail.com', href: 'mailto:212004akshat@gmail.com', icon: '✉' },
    { label: 'GitHub', value: 'Akshat-Aggarwal21', href: 'https://github.com/Akshat-Aggarwal21', icon: '⌥' },
    { label: 'Phone', value: '+91 8813028966', href: 'tel:+918813028966', icon: '◎' },
    { label: 'Location', value: 'Chandigarh, India', href: null, icon: '◉' },
  ]

  return (
    <section id="contact" ref={sectionRef} className="py-32 px-6 md:px-12 relative overflow-hidden">
      <div className="absolute inset-0 radial-glow pointer-events-none opacity-50" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-20"
          >
            <SectionLabel index="06" label="Let's Connect" />
            <h2 className="font-display text-6xl md:text-8xl font-black tracking-tighter">
              Let's Build<br />
              <span className="text-acid glow-text-acid">Something.</span>
            </h2>
            <p className="font-body text-white/40 mt-6 max-w-lg mx-auto leading-relaxed">
              Whether you have an opportunity, a project idea, or just want to talk ML —
              I'm always up for a conversation.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* AI widget */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="font-mono text-xs text-white/30 tracking-widest uppercase mb-4">
              Interactive Assistant
            </p>
            <AIChatWidget />
          </motion.div>

          {/* Contact details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-4"
          >
            <p className="font-mono text-xs text-white/30 tracking-widest uppercase mb-4">
              Direct Contact
            </p>
            {contacts.map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.08 }}
              >
                {c.href ? (
                  <a
                    href={c.href}
                    target={c.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    data-cursor="OPEN"
                    className="glass p-5 flex items-center gap-5 hover:border-acid/20 transition-all duration-300 group block"
                    onClick={() => trackEvent('contact_click', { type: c.label })}
                  >
                    <span className="text-xl text-acid/60 group-hover:text-acid transition-colors duration-200">{c.icon}</span>
                    <div>
                      <p className="font-mono text-xs text-white/30 tracking-widest uppercase">{c.label}</p>
                      <p className="font-body text-sm text-white/75 group-hover:text-white transition-colors duration-200 mt-0.5">{c.value}</p>
                    </div>
                    <span className="ml-auto text-white/20 group-hover:text-acid transition-colors duration-200">↗</span>
                  </a>
                ) : (
                  <div className="glass p-5 flex items-center gap-5">
                    <span className="text-xl text-acid/60">{c.icon}</span>
                    <div>
                      <p className="font-mono text-xs text-white/30 tracking-widest uppercase">{c.label}</p>
                      <p className="font-body text-sm text-white/75 mt-0.5">{c.value}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}

            {/* Big CTA — with urgency pulse */}
            <motion.a
              href="mailto:212004akshat@gmail.com"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
              data-magnetic
              className="relative mt-6 block text-center bg-acid text-ink font-display text-lg font-black tracking-tight py-5 hover:bg-white transition-colors duration-300 overflow-hidden group"
              onClick={() => trackEvent('cta_hire_click')}
            >
              {/* Pulse ring on hover */}
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="absolute inset-0 animate-ping bg-acid/20 rounded-none" style={{ animationDuration: '1.5s' }} />
              </span>
              <span className="relative z-10">START A CONVERSATION →</span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
