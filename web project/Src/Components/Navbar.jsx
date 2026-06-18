/**
 * Navbar.jsx
 * Demonstrates: useContext (theme), useState (menu open), useRef (nav element),
 *               useEffect (close on outside click + scroll-based style)
 */

import React, { useState, useEffect, useRef } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useTheme } from '../Context/ThemeContext'
import { useScrollPosition } from '../hooks/useScrollposition'
import './Navbar.css'

const NAV_LINKS = [
  { path: '/',        label: 'Home'     },
  { path: '/about',   label: 'About'    },
  { path: '/services',label: 'Services' },
  { path: '/projects',label: 'Projects' },
  { path: '/contact', label: 'Contact'  },
]

export default function Navbar() {
  // useContext: pull theme + toggle from global context
  const { theme, toggleTheme } = useTheme()

  // useState: mobile menu open/close
  const [menuOpen, setMenuOpen] = useState(false)

  // useRef: reference to nav element for outside-click detection
  const navRef = useRef(null)

  // Custom hook (useEffect + useState internally)
  const scrollY = useScrollPosition()

  const isScrolled = scrollY > 60

  // useEffect: close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // useEffect: close menu when route changes (via scroll to top)
  useEffect(() => {
    setMenuOpen(false)
  }, [scrollY])

  return (
    <nav
      ref={navRef}
      className={`navbar ${isScrolled ? 'navbar--scrolled' : ''} ${menuOpen ? 'navbar--open' : ''}`}
      aria-label="Main navigation"
    >
      <div className="navbar__inner container">
        {/* Logo */}
        <Link to="/" className="navbar__logo" onClick={() => setMenuOpen(false)}>
          <span className="navbar__logo-mark">A</span>
          <span className="navbar__logo-text">
            ArchVision<em>Studio</em>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="navbar__links">
          {NAV_LINKS.map(({ path, label }) => (
            <li key={path}>
              <NavLink
                to={path}
                end={path === '/'}
                className={({ isActive }) =>
                  `navbar__link ${isActive ? 'navbar__link--active' : ''}`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="navbar__actions">
          {/* Dark / Light mode toggle */}
          <button
            className="navbar__theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            <i className={`fa-solid ${theme === 'light' ? 'fa-moon' : 'fa-sun'}`} />
          </button>

          {/* CTA */}
          <Link to="/contact" className="btn btn-primary navbar__cta">
            Get in Touch
          </Link>

          {/* Hamburger (mobile) */}
          <button
            className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle mobile menu"
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`navbar__drawer ${menuOpen ? 'navbar__drawer--open' : ''}`}>
        <ul>
          {NAV_LINKS.map(({ path, label }) => (
            <li key={path}>
              <NavLink
                to={path}
                end={path === '/'}
                className={({ isActive }) =>
                  `navbar__drawer-link ${isActive ? 'navbar__drawer-link--active' : ''}`
                }
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}