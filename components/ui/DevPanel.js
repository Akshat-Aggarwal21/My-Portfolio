'use client'

import { useState, useEffect } from 'react'
import { getAnalytics, clearAnalytics } from '../../utils/analytics'

/**
 * DevPanel
 * ─────────────────────────────────────────────────────────────────────────────
 * Hidden dev analytics panel. Activated with: Ctrl + Shift + D
 * Shows session stats, section views, project clicks from localStorage.
 * Invisible to regular users.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export default function DevPanel() {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState(null)

  useEffect(() => {
    const onKey = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        setOpen(prev => !prev)
        setData(getAnalytics())
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  if (!open || !data) return null

  const fmt = (ts) => ts ? new Date(ts).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : '—'
  const mins = Math.round(data.totalTime / 60)

  return (
    <div
      style={{
        position: 'fixed', bottom: 20, right: 20, zIndex: 9999,
        background: '#0a0a0f', border: '1px solid rgba(200,255,0,0.3)',
        padding: '20px 24px', minWidth: 320, maxWidth: 400,
        fontFamily: 'var(--font-mono)', fontSize: '11px',
        color: 'rgba(255,255,255,0.7)', lineHeight: 1.6,
        maxHeight: '80vh', overflowY: 'auto',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <span style={{ color: '#c8ff00', letterSpacing: 2, fontSize: 10 }}>◆ DEV ANALYTICS</span>
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={() => { clearAnalytics(); setData(getAnalytics()) }}
            style={{ background: 'none', border: '1px solid rgba(255,77,77,0.4)', color: 'rgba(255,77,77,0.7)', padding: '2px 8px', cursor: 'pointer', fontFamily: 'inherit', fontSize: 10 }}
          >
            CLEAR
          </button>
          <button
            onClick={() => setOpen(false)}
            style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', fontSize: 16, lineHeight: 1 }}
          >
            ×
          </button>
        </div>
      </div>

      <Row label="Sessions" value={data.sessions} />
      <Row label="Total time" value={`${mins}m ${data.totalTime % 60}s`} />
      <Row label="First visit" value={fmt(data.firstVisit)} />
      <Row label="Last visit" value={fmt(data.lastVisit)} />

      <Divider label="Section Views" />
      {Object.entries(data.sectionViews).length === 0
        ? <p style={{ opacity: 0.3 }}>No section views yet</p>
        : Object.entries(data.sectionViews).map(([k, v]) => <Row key={k} label={k} value={v} />)
      }

      <Divider label="Project Clicks" />
      {Object.entries(data.projectClicks).length === 0
        ? <p style={{ opacity: 0.3 }}>No project clicks yet</p>
        : Object.entries(data.projectClicks).map(([k, v]) => <Row key={k} label={`Project #${k}`} value={v} />)
      }

      <Divider label={`Recent Events (${data.events.length})`} />
      {data.events.slice(-8).reverse().map((ev, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
          <span style={{ color: '#c8ff00', opacity: 0.7 }}>{ev.type}</span>
          <span style={{ opacity: 0.4 }}>{fmt(ev.ts)}</span>
        </div>
      ))}

      <p style={{ marginTop: 12, opacity: 0.25, fontSize: 9, letterSpacing: 1 }}>CTRL+SHIFT+D to toggle</p>
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
      <span style={{ opacity: 0.5, textTransform: 'uppercase', letterSpacing: 1, fontSize: 9 }}>{label}</span>
      <span style={{ color: '#c8ff00' }}>{value}</span>
    </div>
  )
}

function Divider({ label }) {
  return (
    <div style={{ margin: '12px 0 6px', fontSize: 9, letterSpacing: 2, color: 'rgba(200,255,0,0.5)', textTransform: 'uppercase' }}>
      — {label}
    </div>
  )
}
