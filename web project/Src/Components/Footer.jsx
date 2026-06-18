/**
 * Footer.jsx
 * Demonstrates: useScrollPosition (back-to-top visibility), useRef
 */

import React from 'react'
import { Link } from 'react-router-dom'
import { useScrollPosition } from '../hooks/useScrollposition'
import './Footer.css'

export default function Footer() {
  const scrollY = useScrollPosition()
  const showBackToTop = scrollY > 400

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <>
      {/* Back to Top Button */}
      <button
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <i className="fa-solid fa-arrow-up" />
      </button>

      <footer className="footer">
        <div className="container">
          <div className="footer__grid">
            {/* Brand column */}
            <div className="footer__brand">
              <div className="footer__logo">
                <span className="footer__logo-mark">A</span>
                <span>ArchVision<em>Studio</em></span>
              </div>
              <p className="footer__tagline body-sm text-muted">
                Where structure meets artistry. Designing spaces that inspire,
                endure, and tell a story.
              </p>
              <div className="footer__socials">
                {['instagram', 'linkedin', 'behance', 'pinterest'].map(s => (
                  <a key={s} href="#!" aria-label={s} className="footer__social-link">
                    <i className={`fa-brands fa-${s}`} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div className="footer__col">
              <h4 className="footer__heading">Navigation</h4>
              <ul className="footer__links">
                {['Home', 'About', 'Services', 'Projects', 'Contact'].map(l => (
                  <li key={l}>
                    <Link to={`/${l === 'Home' ? '' : l.toLowerCase()}`}>{l}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="footer__col">
              <h4 className="footer__heading">Services</h4>
              <ul className="footer__links">
                {['Architectural Planning', 'Interior Design', 'Renovation', 'Consultation', '3D Visualization'].map(s => (
                  <li key={s}><a href="/services">{s}</a></li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="footer__col">
              <h4 className="footer__heading">Contact</h4>
              <ul className="footer__contact-list">
                <li><i className="fa-solid fa-location-dot" /> 14 Architect Row, Lahore, PK</li>
                <li><i className="fa-solid fa-phone" /> +92 300 1234567</li>
                <li><i className="fa-solid fa-envelope" /> hello@archvisionstudio.com</li>
              </ul>
            </div>
          </div>

          <div className="footer__bottom">
            <p className="body-sm text-muted">
              © {new Date().getFullYear()} ArchVision Studio. All rights reserved.
            </p>
            <p className="body-sm text-muted">
              Designed by Fatima Asif &amp; Adeena Khan — Advanced Web Technologies
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}