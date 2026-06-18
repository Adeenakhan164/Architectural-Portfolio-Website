/**
 * useIntersectionObserver.js
 * Custom hook — demonstrates: useRef (DOM reference), useEffect (observer lifecycle), useState
 * Triggers scroll-reveal animations when elements enter the viewport.
 */

import { useRef, useEffect, useState } from 'react'

/**
 * @param {IntersectionObserverInit} options  - threshold, rootMargin, etc.
 * @returns {{ ref, isVisible }}
 */
export function useIntersectionObserver(options = {}) {
  // useRef: attach to a DOM element without causing re-renders
  const ref = useRef(null)

  // useState: track whether the element is in the viewport
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Once visible, stop observing (one-shot animation)
          observer.unobserve(element)
        }
      },
      { threshold: 0.15, ...options }
    )

    observer.observe(element)

    // Cleanup
    return () => observer.disconnect()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return { ref, isVisible }
}