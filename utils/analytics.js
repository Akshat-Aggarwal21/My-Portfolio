/**
 * Analytics Utility
 * ─────────────────────────────────────────────────────────────────────────────
 * Lightweight client-side analytics stored in localStorage.
 * No external services — fully private.
 *
 * Usage:
 *   import { trackEvent, trackSectionView, getAnalytics } from '@/utils/analytics'
 *   trackEvent('project_click', { projectId: 1, title: 'Weather AI' })
 *   trackSectionView('projects')
 * ─────────────────────────────────────────────────────────────────────────────
 */

const STORAGE_KEY = 'aa_portfolio_analytics'
const SESSION_KEY = 'aa_session_start'

// ─── Initialise / Read ────────────────────────────────────────────────────────

function readStore() {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : createEmptyStore()
  } catch {
    return createEmptyStore()
  }
}

function writeStore(data) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {}
}

function createEmptyStore() {
  return {
    sessions: 0,
    totalTime: 0,          // seconds
    sectionViews: {},      // { sectionId: count }
    projectClicks: {},     // { projectId: count }
    events: [],            // [{ type, payload, ts }] — capped at 200
    firstVisit: Date.now(),
    lastVisit: Date.now(),
  }
}

// ─── Session ──────────────────────────────────────────────────────────────────

export function initSession() {
  if (typeof window === 'undefined') return
  const store = readStore()
  store.sessions += 1
  store.lastVisit = Date.now()
  writeStore(store)
  sessionStorage.setItem(SESSION_KEY, Date.now().toString())

  // Track total time on unload
  window.addEventListener('beforeunload', () => {
    const start = parseInt(sessionStorage.getItem(SESSION_KEY) || '0', 10)
    if (!start) return
    const elapsed = Math.round((Date.now() - start) / 1000)
    const s = readStore()
    s.totalTime += elapsed
    writeStore(s)
  })
}

// ─── Section Views ────────────────────────────────────────────────────────────

export function trackSectionView(sectionId) {
  if (typeof window === 'undefined') return
  const store = readStore()
  store.sectionViews[sectionId] = (store.sectionViews[sectionId] || 0) + 1
  pushEvent(store, 'section_view', { sectionId })
  writeStore(store)
}

// ─── Project Clicks ───────────────────────────────────────────────────────────

export function trackProjectClick(projectId, title) {
  if (typeof window === 'undefined') return
  const store = readStore()
  store.projectClicks[projectId] = (store.projectClicks[projectId] || 0) + 1
  pushEvent(store, 'project_click', { projectId, title })
  writeStore(store)
}

// ─── Generic Event ────────────────────────────────────────────────────────────

export function trackEvent(type, payload = {}) {
  if (typeof window === 'undefined') return
  const store = readStore()
  pushEvent(store, type, payload)
  writeStore(store)
}

function pushEvent(store, type, payload) {
  store.events.push({ type, payload, ts: Date.now() })
  if (store.events.length > 200) store.events = store.events.slice(-200)
}

// ─── Read Analytics ───────────────────────────────────────────────────────────

export function getAnalytics() {
  return readStore()
}

export function clearAnalytics() {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
}
