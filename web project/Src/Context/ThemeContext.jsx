/**
 * ThemeContext.jsx
 * Demonstrates: useContext (provider), useState (theme state), useEffect (persist to localStorage)
 */

import React, { createContext, useContext, useState, useEffect } from 'react'

// 1. Create the context
const ThemeContext = createContext(null)

// 2. Provider component — wraps the whole app
export function ThemeProvider({ children }) {
  // useState: manage current theme
  const [theme, setTheme] = useState(() => {
    // Lazy initializer — read from localStorage on first render
    return localStorage.getItem('archvision-theme') || 'light'
  })

  // useEffect: sync theme to <html> attribute + localStorage whenever it changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('archvision-theme', theme)
  }, [theme])

  const toggleTheme = () =>
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// 3. Custom hook for easy consumption
export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>')
  return ctx
}