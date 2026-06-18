/**
 * Home.jsx
 * Demonstrates: useState (counter animation), useEffect (mount animation),
 *               useRef (hero element), useContext (theme via Navbar)
 */

import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import RevealOnScroll from '../Components/Revealonscroll'
import './Home.css'

// ---- Data ----
const FEATURED_PROJECTS = [
  {
    id: 1,
    title: 'The Marble Residence',
    category: 'Residential',
    year: '2024',
    color: '#C8B8A2',
    description: 'A serene family home balancing open light wells with carved stone privacy screens.',
  },
  {
    id: 2,
    title: 'Verdant Office Tower',
    category: 'Commercial',
    year: '2023',
    color: '#8FA68E',
    description: 'Biophilic high-rise integrating vertical gardens throughout each floor plate.',
  },
  {
    id: 3,
    title: 'Horizon Cultural Centre',
    category: 'Public',
    year: '2023',
    color: '#A89F94',
    description: 'A civic landmark whose cantilevered form frames views of the old city skyline.',
  },
]

const STATS = [
  { end: 48,  suffix: '+', label: 'Projects Delivered'   },
  { end: 12,  suffix: '+', label: 'Years of Practice'    },
  { end: 97,  suffix: '%', label: 'Client Satisfaction'  },
  { end: 6,   suffix: '',  label: 'Design Awards'        },
]

// ---- Animated counter ----
function AnimatedCounter({ end, suffix, duration = 1800 }) {
  // useState: current displayed number
  const [count, setCount] = useState(0)
  // useRef: store animation frame id
  const frameRef = useRef(null)

  // useEffect: start counting animation when component mounts
  useEffect(() => {
    let start = 0
    const startTime = performance.now()

    const step = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out quad
      const eased = 1 - (1 - progress) ** 2
      setCount(Math.floor(eased * end))
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step)
      } else {
        setCount(end)
      }
    }

    frameRef.current = requestAnimationFrame(step)

    // Cleanup: cancel animation if component unmounts mid-count
    return () => cancelAnimationFrame(frameRef.current)
  }, [end, duration])

  return <span>{count}{suffix}</span>
}

export default function Home() {
  // useRef: reference to hero section for parallax
  const heroRef = useRef(null)

  // useState: hero has been entered (for staggered animation)
  const [heroReady, setHeroReady] = useState(false)

  // useEffect: trigger hero animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setHeroReady(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="home page-enter">
      {/* ===== HERO ===== */}
      <section className="hero" ref={heroRef}>
        <div className="hero__bg-grid" aria-hidden="true" />
        <div className="container hero__content">
          <div className={`hero__text ${heroReady ? 'hero__text--ready' : ''}`}>
            <span className="section-eyebrow">Award-winning Architecture</span>
            <h1 className="display-xl hero__headline">
              Space as <br />
              <em className="hero__headline-em">Expression</em>
            </h1>
            <p className="body-lg text-muted hero__sub">
              We design buildings that honour their surroundings, serve their
              occupants, and outlast their era.
            </p>
            <div className="hero__ctas">
              <Link to="/projects" className="btn btn-primary">
                View Our Work <i className="fa-solid fa-arrow-right" />
              </Link>
              <Link to="/about" className="btn btn-ghost">
                Our Story
              </Link>
            </div>
          </div>

          {/* Hero visual — abstract architectural lines */}
          <div className={`hero__visual ${heroReady ? 'hero__visual--ready' : ''}`} aria-hidden="true">
            <div className="hero__sketch">
              <svg viewBox="0 0 480 520" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Building silhouette */}
                <rect x="80" y="120" width="160" height="380" fill="var(--color-border)" rx="2"/>
                <rect x="250" y="200" width="150" height="300" fill="var(--color-border)" opacity="0.7" rx="2"/>
                <rect x="100" y="140" width="120" height="340" fill="var(--color-surface)" stroke="var(--color-accent)" strokeWidth="1.5" rx="1"/>
                <rect x="265" y="220" width="115" height="260" fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="1" rx="1"/>
                {/* Windows */}
                {[0,1,2,3,4,5].map(r =>
                  [0,1,2].map(c => (
                    <rect key={`${r}-${c}`} x={112 + c*35} y={160 + r*52} width="22" height="30"
                      fill="var(--color-accent)" opacity="0.15" rx="1"/>
                  ))
                )}
                {[0,1,2,3].map(r =>
                  [0,1].map(c => (
                    <rect key={`w${r}-${c}`} x={278 + c*40} y={240 + r*52} width="25" height="30"
                      fill="var(--color-border)" opacity="0.6" rx="1"/>
                  ))
                )}
                {/* Ground line */}
                <line x1="60" y1="500" x2="440" y2="500" stroke="var(--color-accent)" strokeWidth="1"/>
                {/* Accent detail */}
                <rect x="80" y="115" width="180" height="8" fill="var(--color-accent)" rx="1"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero__scroll-hint" aria-hidden="true">
          <span className="body-sm text-muted">Scroll</span>
          <div className="hero__scroll-line" />
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="stats section-sm">
        <div className="container">
          <RevealOnScroll>
            <div className="stats__grid">
              {STATS.map((s, i) => (
                <div key={i} className="stat">
                  <p className="stat__number display-md">
                    <AnimatedCounter end={s.end} suffix={s.suffix} />
                  </p>
                  <p className="stat__label body-sm text-muted">{s.label}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ===== FEATURED PROJECTS ===== */}
      <section className="section">
        <div className="container">
          <RevealOnScroll>
            <div className="section-header">
              <span className="section-eyebrow">Selected Work</span>
              <h2 className="display-lg">Recent Projects</h2>
              <div className="section-divider" />
              <p className="body-lg text-muted" style={{ maxWidth: '55ch' }}>
                A curated selection of our most celebrated commissions —
                from private residences to landmark civic structures.
              </p>
            </div>
          </RevealOnScroll>

          <div className="featured-grid">
            {FEATURED_PROJECTS.map((p, i) => (
              <RevealOnScroll key={p.id} delay={i * 120}>
                <div className="featured-card card">
                  <div
                    className="featured-card__image img-placeholder"
                    style={{ height: '260px', background: p.color, opacity: 0.85 }}
                  >
                    <span style={{ color: '#fff', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      {p.category}
                    </span>
                  </div>
                  <div className="featured-card__body">
                    <div className="featured-card__meta">
                      <span className="section-eyebrow">{p.category}</span>
                      <span className="body-sm text-muted">{p.year}</span>
                    </div>
                    <h3 className="display-md featured-card__title">{p.title}</h3>
                    <p className="body-md text-muted">{p.description}</p>
                    <Link to="/projects" className="btn btn-outline" style={{ marginTop: '1rem' }}>
                      View Case Study
                    </Link>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll>
            <div style={{ textAlign: 'center', marginTop: 'var(--space-2xl)' }}>
              <Link to="/projects" className="btn btn-primary">
                See All Projects <i className="fa-solid fa-arrow-right" />
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ===== SERVICES TEASER ===== */}
      <section className="section home-services">
        <div className="container">
          <div className="home-services__layout">
            <RevealOnScroll className="home-services__copy">
              <span className="section-eyebrow">What We Do</span>
              <h2 className="display-lg">Architecture.<br/>Interior.<br/>Vision.</h2>
              <div className="section-divider" />
              <p className="body-lg text-muted" style={{ marginBottom: 'var(--space-xl)' }}>
                From the first sketch to the final fixture, we guide every project
                with precision, curiosity, and craft.
              </p>
              <Link to="/services" className="btn btn-outline">Explore Services</Link>
            </RevealOnScroll>

            <div className="home-services__list">
              {[
                { icon: 'fa-drafting-compass', title: 'Architectural Planning',  desc: 'Master plans, site analysis, and building design from concept to construction documents.' },
                { icon: 'fa-couch',            title: 'Interior Design',         desc: 'Spatial layouts, materials, lighting, and furniture — every detail considered.' },
                { icon: 'fa-hammer',           title: 'Renovation',              desc: 'Sensitive transformations that respect a building\'s history while meeting modern needs.' },
              ].map((s, i) => (
                <RevealOnScroll key={i} delay={i * 100}>
                  <div className="service-item">
                    <div className="service-item__icon">
                      <i className={`fa-solid ${s.icon}`} />
                    </div>
                    <div>
                      <h3 className="service-item__title">{s.title}</h3>
                      <p className="body-sm text-muted">{s.desc}</p>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA BAND ===== */}
      <RevealOnScroll>
        <section className="cta-band">
          <div className="container cta-band__inner">
            <div>
              <h2 className="display-md">Have a project in mind?</h2>
              <p className="body-lg text-muted">
                Let's talk about how we can bring your vision to life.
              </p>
            </div>
            <Link to="/contact" className="btn btn-primary">
              Start a Conversation <i className="fa-solid fa-arrow-right" />
            </Link>
          </div>
        </section>
      </RevealOnScroll>
    </main>
  )
}