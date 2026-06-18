/**
 * useScrollPosition.js
 * Custom hook — demonstrates: useState, useEffect (event listener lifecycle)
 * Returns the current window scroll Y position.
 */

import { useState, useEffect } from 'react'

export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)

    // Attach listener
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Cleanup on unmount — prevents memory leaks
    return () => window.removeEventListener('scroll', handleScroll)
  }, []) // Empty deps array = run once on mount

  return scrollY
}