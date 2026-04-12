/**
 * Cursor Utility
 * ─────────────────────────────────────────────────────────────────────────────
 * Handles all advanced cursor behaviour:
 *   - Context-aware labels (VIEW / OPEN / CLICK / READ)
 *   - Magnetic pull on [data-magnetic] elements
 *   - Background glow that follows the cursor
 *
 * Used by components/ui/Cursor.js
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** Returns the context label for an element based on data-cursor attribute or tag */
export function getCursorLabel(el) {
  if (!el) return ''
  if (el.dataset.cursor) return el.dataset.cursor
  const tag = el.tagName.toLowerCase()
  const type = el.getAttribute('type')
  if (tag === 'a') return 'OPEN'
  if (tag === 'button' && type !== 'submit') return 'CLICK'
  if (tag === 'button' && type === 'submit') return 'SEND'
  return 'VIEW'
}

/** Compute magnetic offset for a target element given mouse position */
export function getMagneticOffset(el, mouseX, mouseY, strength = 0.35) {
  const rect = el.getBoundingClientRect()
  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2
  const dx = mouseX - cx
  const dy = mouseY - cy
  return { x: dx * strength, y: dy * strength }
}

/** Initialise the background glow element that follows the cursor */
export function initGlowFollower() {
  if (typeof document === 'undefined') return null
  const existing = document.getElementById('cursor-glow')
  if (existing) return existing

  const glow = document.createElement('div')
  glow.id = 'cursor-glow'
  Object.assign(glow.style, {
    position: 'fixed',
    width: '600px',
    height: '600px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(200,255,0,0.04) 0%, transparent 70%)',
    pointerEvents: 'none',
    zIndex: '0',
    transform: 'translate(-50%, -50%)',
    transition: 'left 0.8s cubic-bezier(0.23,1,0.32,1), top 0.8s cubic-bezier(0.23,1,0.32,1)',
    willChange: 'left, top',
  })
  document.body.appendChild(glow)
  return glow
}

export function updateGlow(glow, x, y) {
  if (!glow) return
  glow.style.left = x + 'px'
  glow.style.top = y + 'px'
}
