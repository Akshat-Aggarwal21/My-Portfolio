'use client'

import { useEffect, useRef } from 'react'
import { getCursorLabel, getMagneticOffset, initGlowFollower, updateGlow } from '../../utils/cursor'

/**
 * Cursor
 * ─────────────────────────────────────────────────────────────────────────────
 * Renders the custom dual-ring cursor.
 * Upgrades over v1:
 *   - Context-aware label (VIEW / OPEN / CLICK) inside follower ring
 *   - Magnetic pull on [data-magnetic] elements
 *   - Background glow element that loosely follows cursor
 *   - requestAnimationFrame loop — always 60fps
 * ─────────────────────────────────────────────────────────────────────────────
 */
export default function Cursor() {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)
  const labelRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current
    const label = labelRef.current
    if (!cursor || !follower || !label) return

    // Init background glow
    const glow = initGlowFollower()

    let mouseX = 0, mouseY = 0
    let followerX = 0, followerY = 0
    let isHovering = false
    let currentLabel = ''
    let magnetEl = null

    // ── Mouse move ──────────────────────────────────────────────────────────
    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      updateGlow(glow, mouseX, mouseY)
    }

    // ── RAF loop ────────────────────────────────────────────────────────────
    let rafId
    const tick = () => {
      // Dot: snaps to cursor directly
      cursor.style.left = (mouseX - 6) + 'px'
      cursor.style.top  = (mouseY - 6) + 'px'

      // Follower: smooth lag
      followerX += (mouseX - followerX - 20) * 0.1
      followerY += (mouseY - followerY - 20) * 0.1
      follower.style.left = followerX + 'px'
      follower.style.top  = followerY + 'px'

      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    // ── Hover detection ─────────────────────────────────────────────────────
    const onEnter = (e) => {
      isHovering = true
      const el = e.currentTarget
      currentLabel = getCursorLabel(el)
      label.textContent = currentLabel
      label.style.opacity = '1'

      cursor.style.transform = 'scale(2)'
      follower.style.transform = 'scale(1.5)'
      follower.style.borderColor = 'rgba(200,255,0,0.8)'
      follower.style.background = 'rgba(200,255,0,0.04)'

      // Check magnetic
      if (el.dataset.magnetic !== undefined) magnetEl = el
    }

    const onLeave = () => {
      isHovering = false
      currentLabel = ''
      label.textContent = ''
      label.style.opacity = '0'

      cursor.style.transform = 'scale(1)'
      follower.style.transform = 'scale(1)'
      follower.style.borderColor = 'rgba(200,255,0,0.4)'
      follower.style.background = 'transparent'

      // Reset magnetic element
      if (magnetEl) {
        magnetEl.style.transform = ''
        magnetEl = null
      }
    }

    // Magnetic effect on mousemove (debounced via RAF)
    const onMoveForMagnetic = (e) => {
      if (!magnetEl) return
      const { x, y } = getMagneticOffset(magnetEl, e.clientX, e.clientY, 0.3)
      magnetEl.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`
      magnetEl.style.transition = 'transform 0.2s cubic-bezier(0.23,1,0.32,1)'
    }

    // ── Attach listeners ─────────────────────────────────────────────────────
    const interactiveEls = () =>
      document.querySelectorAll('a, button, [data-hover], [data-cursor], [data-magnetic]')

    const attach = () => {
      interactiveEls().forEach((el) => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mousemove', onMoveForMagnetic)
    attach()

    // Re-attach after potential DOM changes (e.g. modal open)
    const observer = new MutationObserver(attach)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mousemove', onMoveForMagnetic)
      observer.disconnect()
      interactiveEls().forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={followerRef} className="cursor-follower">
        <span
          ref={labelRef}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontFamily: 'var(--font-mono)',
            fontSize: '8px',
            letterSpacing: '1.5px',
            color: 'rgba(200,255,0,0.9)',
            opacity: 0,
            transition: 'opacity 0.2s',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        />
      </div>
    </>
  )
}
