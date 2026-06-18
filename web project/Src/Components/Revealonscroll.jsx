/**
 * RevealOnScroll.jsx
 * Reusable scroll-reveal wrapper — uses useIntersectionObserver (useRef + useEffect)
 */

import React from 'react'
import { useIntersectionObserver } from '../hooks/Useintersectionobserver'

export default function RevealOnScroll({ children, delay = 0, className = '' }) {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 })

  return (
    <div
      ref={ref}
      style={{
        opacity:    isVisible ? 1 : 0,
        transform:  isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
      className={className}
    >
      {children}
    </div>
  )
}