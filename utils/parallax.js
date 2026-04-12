/**
 * Parallax / 3D Tilt Utility
 * ─────────────────────────────────────────────────────────────────────────────
 * Provides:
 *   useTilt(ref, options)  – React hook: adds mouse-tilt effect to a card
 *   useParallax(depth)     – React hook: returns transform string for parallax layers
 *
 * Designed to be lightweight — uses requestAnimationFrame internally.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useEffect, useRef, useState } from 'react'

// ─── Card Tilt Hook ───────────────────────────────────────────────────────────

/**
 * useTilt
 * @param {React.RefObject} ref  – ref attached to the card element
 * @param {object} options
 *   @param {number} options.maxTilt   – max degrees of tilt (default 8)
 *   @param {number} options.scale     – scale on hover (default 1.02)
 *   @param {number} options.speed     – lerp speed 0–1 (default 0.15)
 */
export function useTilt(ref, { maxTilt = 8, scale = 1.02, speed = 0.15 } = {}) {
  useEffect(() => {
    const el = ref.current
    if (!el || typeof window === 'undefined') return

    // Detect reduced-motion preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    let raf = null
    let targetRx = 0, targetRy = 0
    let currentRx = 0, currentRy = 0
    let active = false

    const onEnter = () => { active = true }

    const onMove = (e) => {
      if (!active) return
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const px = (x / rect.width - 0.5) * 2   // -1 to 1
      const py = (y / rect.height - 0.5) * 2   // -1 to 1
      targetRy = px * maxTilt
      targetRx = -py * maxTilt
    }

    const onLeave = () => {
      active = false
      targetRx = 0
      targetRy = 0
    }

    const tick = () => {
      currentRx += (targetRx - currentRx) * speed
      currentRy += (targetRy - currentRy) * speed

      const s = active ? scale : 1 + (scale - 1) * (Math.abs(currentRx) + Math.abs(currentRy)) / (maxTilt * 2)
      el.style.transform = `perspective(800px) rotateX(${currentRx.toFixed(2)}deg) rotateY(${currentRy.toFixed(2)}deg) scale(${s.toFixed(3)})`
      el.style.willChange = 'transform'
      raf = requestAnimationFrame(tick)
    }

    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      el.style.transform = ''
    }
  }, [ref, maxTilt, scale, speed])
}

// ─── Mouse Parallax Hook ──────────────────────────────────────────────────────

/**
 * useMouseParallax
 * Returns { x, y } offset values derived from mouse position.
 * Multiply by depth in your component to layer multiple planes.
 *
 * @param {number} smoothing – lerp factor 0–1 (default 0.08)
 */
export function useMouseParallax(smoothing = 0.08) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const mouse = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2   // -1 to 1
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2  // -1 to 1
    }

    const tick = () => {
      current.current.x += (mouse.current.x - current.current.x) * smoothing
      current.current.y += (mouse.current.y - current.current.y) * smoothing
      setOffset({ x: current.current.x, y: current.current.y })
      rafRef.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove)
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [smoothing])

  return offset
}
