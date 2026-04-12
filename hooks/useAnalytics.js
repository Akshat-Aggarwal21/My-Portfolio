'use client'

import { useEffect, useRef } from 'react'
import { trackSectionView } from '../utils/analytics'

/**
 * useAnalytics
 * ─────────────────────────────────────────────────────────────────────────────
 * Hook that fires trackSectionView once when the ref element enters viewport.
 * Pass the section's id string (matches localStorage key).
 *
 * Usage:
 *   const ref = useAnalytics('projects')
 *   <section ref={ref}>...</section>
 * ─────────────────────────────────────────────────────────────────────────────
 */
export function useAnalytics(sectionId) {
  const ref = useRef(null)
  const tracked = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !tracked.current) {
          tracked.current = true
          trackSectionView(sectionId)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [sectionId])

  return ref
}
