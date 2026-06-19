import { useState, useEffect, useRef } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    id: 1,
    title: "The Meridian Tower",
    category: "Commercial",
    location: "Dubai, UAE",
    year: 2023,
    desc: "A 54-floor glass and steel icon redefining the Dubai skyline with sustainable biophilic principles.",
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
  },
  {
    id: 2,
    title: "Mosaic Residence",
    category: "Residential",
    location: "Barcelona, Spain",
    year: 2022,
    desc: "A family villa blending Catalan tradition with minimalist modern architecture and terracotta accents.",
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
  },
  {
    id: 3,
    title: "Verdant Cultural Hub",
    category: "Cultural",
    location: "Singapore",
    year: 2023,
    desc: "A lush green civic center where architecture dissolves into garden, housing galleries and public spaces.",
    img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80",
  },
  {
    id: 4,
    title: "Solstice Villa",
    category: "Residential",
    location: "Santorini, Greece",
    year: 2021,
    desc: "Whitewashed geometry suspended over the Aegean, designed around the arc of the Mediterranean sun.",
    img: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&q=80",
  },
  {
    id: 5,
    title: "The Lattice Pavilion",
    category: "Cultural",
    location: "Tokyo, Japan",
    year: 2022,
    desc: "A temporary exhibition hall whose steel lattice casts ever-changing shadow patterns throughout the day.",
    img: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=800&q=80",
  },
  {
    id: 6,
    title: "Harbor Quay Office",
    category: "Commercial",
    location: "Sydney, Australia",
    year: 2023,
    desc: "A waterfront campus that frames the Opera House through strategically placed voids in its facade.",
    img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80",
  },
  {
    id: 7,
    title: "Amber Courtyard",
    category: "Interior",
    location: "Marrakech, Morocco",
    year: 2021,
    desc: "An interior renovation transforming a 19th-century riad into a warm contemporary sanctuary.",
    img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
  },
  {
    id: 8,
    title: "Nordic Retreat",
    category: "Residential",
    location: "Oslo, Norway",
    year: 2022,
    desc: "A cabin-lodge hybrid built from reclaimed timber, designed to hibernate gracefully under Nordic snow.",
    img: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80",
  },
  {
    id: 9,
    title: "Sky Garden Towers",
    category: "Commercial",
    location: "Kuala Lumpur, Malaysia",
    year: 2023,
    desc: "Twin residential towers connected by hanging garden bridges every six floors, creating vertical neighborhoods.",
    img: "https://images.unsplash.com/photo-1460472178825-e5240623afd5?w=800&q=80",
  },
  {
    id: 10,
    title: "Monolith Museum",
    category: "Cultural",
    location: "Berlin, Germany",
    year: 2022,
    desc: "A brutalist concrete form softened by a luminous inner atrium and curated natural light wells.",
    img: "https://images.unsplash.com/photo-1580136579312-94651dfd596d?w=800&q=80",
  },
  {
    id: 11,
    title: "Terrace House Milan",
    category: "Interior",
    location: "Milan, Italy",
    year: 2023,
    desc: "A penthouse interior where raw stone, aged brass, and hand-woven textiles create tactile luxury.",
    img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
  },
  {
    id: 12,
    title: "The Vault Library",
    category: "Cultural",
    location: "London, UK",
    year: 2021,
    desc: "A subterranean library carved beneath a historic building, lit by fiber-optic star ceilings.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
  },
  {
    id: 13,
    title: "Cascades Spa",
    category: "Interior",
    location: "Bali, Indonesia",
    year: 2022,
    desc: "A wellness retreat where water flows through every room, blurring the boundary between inside and jungle.",
    img: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80",
  },
];

const SERVICES = [
  {
    icon: "🏛",
    title: "Architectural Design",
    desc: "From conceptual sketches to construction-ready documentation, we design structures that endure.",
  },
  {
    icon: "🪑",
    title: "Interior Architecture",
    desc: "Spatial narratives built from material, light, and human experience — every detail considered.",
  },
  {
    icon: "🌿",
    title: "Sustainable Planning",
    desc: "LEED-certified design processes that make environmental responsibility a structural feature.",
  },
  {
    icon: "🏙",
    title: "Urban Masterplanning",
    desc: "City-scale visions that balance density, mobility, green space, and community identity.",
  },
  {
    icon: "🔄",
    title: "Renovation & Adaptive Reuse",
    desc: "Breathing new purpose into existing structures while honoring their architectural memory.",
  },
  {
    icon: "📐",
    title: "3D Visualization",
    desc: "Photo-realistic renders and immersive walkthroughs that bring unbuilt ideas to life.",
  },
];

const TEAM = [
  {
    name: "Fatima Asif",
    role: "Principal Architect",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
  },
  {
    name: "Adeena Khan",
    role: "Design Director",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
  },
  {
    name: "Omar Siddiqui",
    role: "Structural Engineer",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
  },
];

const STATS = [
  { value: "12+", label: "Years of Practice" },
  { value: "180", label: "Projects Completed" },
  { value: "34", label: "Awards Won" },
  { value: "22", label: "Countries" },
];

const CATEGORIES = ["All", "Commercial", "Residential", "Cultural", "Interior"];

// ─── STYLES ──────────────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Inter:wght@300;400;500;600&family=Space+Mono:wght@400;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --cream:    #F5F0E8;
    --warm:     #EDE6D6;
    --stone:    #C8B99A;
    --mocha:    #6B5744;
    --espresso: #2C1F14;
    --charcoal: #1A1A1A;
    --gold:     #C49A5A;
    --sage:     #7A8C72;
    --white:    #FDFAF5;
    --ff-display: 'Cormorant Garamond', Georgia, serif;
    --ff-body:    'Inter', system-ui, sans-serif;
    --ff-mono:    'Space Mono', monospace;
    --ease-out:   cubic-bezier(0.22, 1, 0.36, 1);
  }

  html { scroll-behavior: smooth; font-size: 16px; }

  body {
    font-family: var(--ff-body);
    background: var(--cream);
    color: var(--charcoal);
    line-height: 1.6;
    overflow-x: hidden;
  }

  /* ── SCROLLBAR ── */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--warm); }
  ::-webkit-scrollbar-thumb { background: var(--stone); border-radius: 3px; }

  /* ── NAV ── */
  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 4rem; height: 72px;
    transition: background 0.4s, box-shadow 0.4s;
  }
  nav.scrolled {
    background: rgba(245,240,232,0.96);
    backdrop-filter: blur(12px);
    box-shadow: 0 1px 0 var(--stone);
  }
  .nav-logo {
    font-family: var(--ff-display);
    font-size: 1.5rem; font-weight: 600; letter-spacing: 0.02em;
    color: var(--espresso); cursor: pointer; border: none; background: none;
  }
  .nav-logo span { color: var(--gold); }
  .nav-links { display: flex; gap: 2.5rem; list-style: none; }
  .nav-links button {
    background: none; border: none; cursor: pointer;
    font-family: var(--ff-body); font-size: 0.82rem; font-weight: 500;
    letter-spacing: 0.12em; text-transform: uppercase; color: var(--mocha);
    transition: color 0.2s; padding: 0;
  }
  .nav-links button:hover, .nav-links button.active { color: var(--espresso); }
  .nav-cta {
    background: var(--espresso); color: var(--cream);
    border: none; padding: 0.6rem 1.4rem; cursor: pointer;
    font-family: var(--ff-body); font-size: 0.8rem; font-weight: 500;
    letter-spacing: 0.1em; text-transform: uppercase;
    transition: background 0.2s, transform 0.2s;
  }
  .nav-cta:hover { background: var(--mocha); transform: translateY(-1px); }

  /* ── HERO ── */
  #hero {
    height: 100vh; position: relative; overflow: hidden;
    display: flex; align-items: flex-end; padding: 0 4rem 6rem;
  }
  .hero-bg {
    position: absolute; inset: 0;
    background-image: url('https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1800&q=90');
    background-size: cover; background-position: center;
    transition: transform 0.1s linear;
  }
  .hero-bg::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(
      to top,
      rgba(28,15,8,0.85) 0%,
      rgba(28,15,8,0.4) 45%,
      rgba(28,15,8,0.1) 100%
    );
  }
  .hero-content { position: relative; z-index: 1; max-width: 680px; }
  .hero-eyebrow {
    font-family: var(--ff-mono); font-size: 0.72rem; letter-spacing: 0.25em;
    color: var(--gold); text-transform: uppercase; margin-bottom: 1.2rem;
    display: flex; align-items: center; gap: 1rem;
  }
  .hero-eyebrow::before {
    content: ''; display: block; width: 40px; height: 1px; background: var(--gold);
  }
  h1 {
    font-family: var(--ff-display); font-size: clamp(3rem, 6vw, 5.5rem);
    font-weight: 300; line-height: 1.05; color: var(--white);
    margin-bottom: 1.5rem; letter-spacing: -0.01em;
  }
  h1 em { font-style: italic; color: var(--stone); }
  .hero-sub {
    font-size: 0.95rem; color: rgba(255,255,255,0.65); line-height: 1.7;
    max-width: 460px; margin-bottom: 2.5rem;
  }
  .hero-actions { display: flex; gap: 1rem; }
  .btn-primary {
    background: var(--gold); color: var(--espresso);
    border: none; padding: 0.9rem 2.2rem; cursor: pointer;
    font-family: var(--ff-body); font-size: 0.82rem; font-weight: 600;
    letter-spacing: 0.12em; text-transform: uppercase;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(196,154,90,0.4); }
  .btn-outline {
    background: transparent; color: var(--white);
    border: 1px solid rgba(255,255,255,0.4); padding: 0.9rem 2.2rem; cursor: pointer;
    font-family: var(--ff-body); font-size: 0.82rem; font-weight: 500;
    letter-spacing: 0.12em; text-transform: uppercase;
    transition: border-color 0.2s, background 0.2s;
  }
  .btn-outline:hover { border-color: var(--white); background: rgba(255,255,255,0.08); }
  .hero-scroll {
    position: absolute; right: 4rem; bottom: 4rem; z-index: 1;
    writing-mode: vertical-rl; font-family: var(--ff-mono); font-size: 0.65rem;
    letter-spacing: 0.2em; color: rgba(255,255,255,0.4); text-transform: uppercase;
    display: flex; align-items: center; gap: 1rem;
  }
  .hero-scroll::after {
    content: ''; width: 1px; height: 60px; background: rgba(255,255,255,0.25);
  }

  /* ── SECTION SHARED ── */
  section { padding: 7rem 4rem; }
  .section-eyebrow {
    font-family: var(--ff-mono); font-size: 0.68rem; letter-spacing: 0.25em;
    color: var(--gold); text-transform: uppercase; margin-bottom: 1rem;
    display: flex; align-items: center; gap: 1rem;
  }
  .section-eyebrow::before {
    content: ''; display: block; width: 28px; height: 1px; background: var(--gold);
  }
  h2 {
    font-family: var(--ff-display); font-size: clamp(2rem, 4vw, 3.5rem);
    font-weight: 300; line-height: 1.1; color: var(--espresso);
    letter-spacing: -0.01em;
  }
  h2 em { font-style: italic; color: var(--mocha); }
  .section-lead {
    font-size: 0.95rem; color: #666; line-height: 1.8;
    max-width: 520px; margin-top: 1rem;
  }

  /* ── STATS ── */
  #stats {
    background: var(--espresso); padding: 4rem 4rem;
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem;
  }
  .stat { text-align: center; }
  .stat-value {
    font-family: var(--ff-display); font-size: clamp(2.5rem, 4vw, 3.8rem);
    font-weight: 300; color: var(--gold); line-height: 1;
  }
  .stat-label {
    font-family: var(--ff-mono); font-size: 0.65rem; letter-spacing: 0.18em;
    text-transform: uppercase; color: var(--stone); margin-top: 0.5rem;
  }

  /* ── PROJECTS ── */
  #projects { background: var(--white); }
  .projects-header {
    display: flex; justify-content: space-between; align-items: flex-end;
    margin-bottom: 3rem; flex-wrap: wrap; gap: 2rem;
  }
  .filter-bar { display: flex; gap: 0.5rem; flex-wrap: wrap; }
  .filter-btn {
    background: none; border: 1px solid var(--stone); cursor: pointer;
    font-family: var(--ff-body); font-size: 0.75rem; font-weight: 500;
    letter-spacing: 0.1em; text-transform: uppercase; color: var(--mocha);
    padding: 0.4rem 1rem; transition: all 0.2s;
  }
  .filter-btn.active, .filter-btn:hover {
    background: var(--espresso); color: var(--cream); border-color: var(--espresso);
  }
  .projects-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;
  }
  .project-card {
    position: relative; overflow: hidden; cursor: pointer;
    background: var(--warm);
  }
  .project-card img {
    width: 100%; aspect-ratio: 4/3; object-fit: cover; display: block;
    transition: transform 0.6s var(--ease-out);
  }
  .project-card:hover img { transform: scale(1.06); }
  .project-info {
    padding: 1.4rem 1.4rem 1.6rem;
  }
  .project-cat {
    font-family: var(--ff-mono); font-size: 0.6rem; letter-spacing: 0.2em;
    text-transform: uppercase; color: var(--gold); margin-bottom: 0.4rem;
  }
  .project-title {
    font-family: var(--ff-display); font-size: 1.25rem; font-weight: 400;
    color: var(--espresso); line-height: 1.2; margin-bottom: 0.3rem;
  }
  .project-meta {
    font-size: 0.75rem; color: var(--stone);
  }

  /* ── ABOUT ── */
  #about { background: var(--cream); }
  .about-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 6rem; align-items: center;
  }
  .about-image-wrap {
    position: relative;
  }
  .about-image-wrap img {
    width: 100%; height: 580px; object-fit: cover; display: block;
  }
  .about-badge {
    position: absolute; bottom: -1.5rem; right: -1.5rem;
    background: var(--gold); padding: 1.8rem; text-align: center;
    width: 140px;
  }
  .about-badge-num {
    font-family: var(--ff-display); font-size: 2.4rem; font-weight: 300;
    color: var(--espresso); line-height: 1;
  }
  .about-badge-lbl {
    font-family: var(--ff-mono); font-size: 0.6rem; letter-spacing: 0.18em;
    text-transform: uppercase; color: var(--espresso); margin-top: 0.3rem;
  }
  .about-text h2 { margin-bottom: 1.5rem; }
  .about-text p { font-size: 0.95rem; color: #555; line-height: 1.85; margin-bottom: 1.2rem; }
  .about-values {
    display: grid; grid-template-columns: 1fr 1fr; gap: 1.2rem; margin-top: 2rem;
  }
  .value-item { border-left: 2px solid var(--gold); padding-left: 1rem; }
  .value-title {
    font-family: var(--ff-body); font-size: 0.78rem; font-weight: 600;
    letter-spacing: 0.1em; text-transform: uppercase; color: var(--espresso);
    margin-bottom: 0.2rem;
  }
  .value-desc { font-size: 0.8rem; color: #777; line-height: 1.6; }

  /* ── SERVICES ── */
  #services { background: var(--warm); }
  .services-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin-top: 4rem;
  }
  .service-card {
    background: var(--cream); padding: 2.4rem; border-bottom: 2px solid transparent;
    transition: border-color 0.3s, transform 0.3s;
  }
  .service-card:hover { border-color: var(--gold); transform: translateY(-4px); }
  .service-icon { font-size: 2rem; margin-bottom: 1.2rem; }
  .service-title {
    font-family: var(--ff-display); font-size: 1.3rem; font-weight: 400;
    color: var(--espresso); margin-bottom: 0.8rem;
  }
  .service-desc { font-size: 0.85rem; color: #666; line-height: 1.75; }

  /* ── TEAM ── */
  #team { background: var(--white); }
  .team-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 2.5rem; margin-top: 4rem;
  }
  .team-card { text-align: center; }
  .team-img-wrap {
    width: 200px; height: 200px; margin: 0 auto 1.5rem; overflow: hidden;
    border-radius: 50%; border: 3px solid var(--warm);
    transition: border-color 0.3s;
  }
  .team-card:hover .team-img-wrap { border-color: var(--gold); }
  .team-img-wrap img { width: 100%; height: 100%; object-fit: cover; }
  .team-name {
    font-family: var(--ff-display); font-size: 1.3rem; font-weight: 400;
    color: var(--espresso); margin-bottom: 0.3rem;
  }
  .team-role {
    font-family: var(--ff-mono); font-size: 0.65rem; letter-spacing: 0.18em;
    text-transform: uppercase; color: var(--gold);
  }

  /* ── CONTACT ── */
  #contact { background: var(--espresso); }
  #contact .section-eyebrow { color: var(--gold); }
  #contact .section-eyebrow::before { background: var(--gold); }
  #contact h2 { color: var(--cream); }
  #contact .section-lead { color: var(--stone); }
  .contact-grid {
    display: grid; grid-template-columns: 1fr 1.4fr; gap: 6rem; align-items: start; margin-top: 4rem;
  }
  .contact-info h3 {
    font-family: var(--ff-display); font-size: 1.4rem; font-weight: 300;
    color: var(--cream); margin-bottom: 2rem;
  }
  .contact-detail {
    display: flex; flex-direction: column; margin-bottom: 1.6rem;
  }
  .contact-detail label {
    font-family: var(--ff-mono); font-size: 0.6rem; letter-spacing: 0.2em;
    text-transform: uppercase; color: var(--gold); margin-bottom: 0.3rem;
  }
  .contact-detail span { font-size: 0.9rem; color: var(--stone); }
  .contact-form { display: flex; flex-direction: column; gap: 1.2rem; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .form-group { display: flex; flex-direction: column; gap: 0.4rem; }
  .form-group label {
    font-family: var(--ff-mono); font-size: 0.62rem; letter-spacing: 0.18em;
    text-transform: uppercase; color: var(--stone);
  }
  .form-group input, .form-group select, .form-group textarea {
    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.12);
    color: var(--cream); padding: 0.75rem 1rem;
    font-family: var(--ff-body); font-size: 0.88rem;
    transition: border-color 0.2s; outline: none;
    -webkit-appearance: none; appearance: none;
  }
  .form-group input::placeholder, .form-group textarea::placeholder { color: rgba(200,185,154,0.35); }
  .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
    border-color: var(--gold);
  }
  .form-group select option { background: var(--espresso); }
  .form-group textarea { resize: vertical; min-height: 130px; }
  .form-submit {
    background: var(--gold); color: var(--espresso);
    border: none; padding: 1rem 2.5rem; cursor: pointer;
    font-family: var(--ff-body); font-size: 0.82rem; font-weight: 600;
    letter-spacing: 0.12em; text-transform: uppercase; align-self: flex-start;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .form-submit:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(196,154,90,0.3); }
  .form-submit:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
  .form-success {
    background: rgba(122,140,114,0.2); border: 1px solid var(--sage);
    color: var(--sage); padding: 1rem 1.5rem; font-size: 0.88rem;
  }

  /* ── MODAL ── */
  .modal-overlay {
    position: fixed; inset: 0; background: rgba(28,15,8,0.85);
    backdrop-filter: blur(6px); z-index: 200; display: flex;
    align-items: center; justify-content: center; padding: 2rem;
    animation: fadeIn 0.25s ease;
  }
  .modal {
    background: var(--white); max-width: 800px; width: 100%;
    max-height: 90vh; overflow-y: auto;
    animation: slideUp 0.3s var(--ease-out);
  }
  .modal img { width: 100%; height: 380px; object-fit: cover; }
  .modal-body { padding: 2.5rem; }
  .modal-meta {
    display: flex; gap: 2rem; margin-bottom: 1.5rem;
    flex-wrap: wrap;
  }
  .modal-meta span {
    font-family: var(--ff-mono); font-size: 0.65rem; letter-spacing: 0.15em;
    text-transform: uppercase; color: var(--gold);
  }
  .modal h3 {
    font-family: var(--ff-display); font-size: 2rem; font-weight: 300;
    color: var(--espresso); margin-bottom: 1rem;
  }
  .modal p { font-size: 0.9rem; color: #555; line-height: 1.8; }
  .modal-close {
    position: absolute; top: 1rem; right: 1rem; background: var(--espresso);
    border: none; color: var(--cream); width: 40px; height: 40px; cursor: pointer;
    font-size: 1.2rem; display: flex; align-items: center; justify-content: center;
  }

  /* ── FOOTER ── */
  footer {
    background: #160D06; padding: 3rem 4rem;
    display: flex; justify-content: space-between; align-items: center;
    flex-wrap: wrap; gap: 1.5rem;
  }
  footer .logo {
    font-family: var(--ff-display); font-size: 1.3rem; color: var(--cream);
  }
  footer .logo span { color: var(--gold); }
  footer p { font-size: 0.75rem; color: var(--stone); }
  .footer-links { display: flex; gap: 1.5rem; }
  .footer-links button {
    background: none; border: none; cursor: pointer;
    font-size: 0.75rem; color: var(--stone); letter-spacing: 0.08em;
    transition: color 0.2s;
  }
  .footer-links button:hover { color: var(--gold); }

  /* ── BACK TO TOP ── */
  .btt {
    position: fixed; bottom: 2rem; right: 2rem; z-index: 90;
    width: 44px; height: 44px; background: var(--espresso);
    border: 1px solid var(--stone); color: var(--cream);
    cursor: pointer; font-size: 1.1rem; display: flex; align-items: center;
    justify-content: center; transition: background 0.2s, transform 0.2s;
    opacity: 0; pointer-events: none;
  }
  .btt.visible { opacity: 1; pointer-events: all; }
  .btt:hover { background: var(--mocha); transform: translateY(-3px); }

  /* ── ANIMATIONS ── */
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .fade-in { animation: fadeIn 0.7s ease both; }

  /* ── RESPONSIVE ── */
  @media (max-width: 1024px) {
    .projects-grid { grid-template-columns: repeat(2, 1fr); }
    .services-grid { grid-template-columns: repeat(2, 1fr); }
    .about-grid { grid-template-columns: 1fr; gap: 3rem; }
    .about-image-wrap img { height: 380px; }
    .contact-grid { grid-template-columns: 1fr; gap: 3rem; }
  }

  @media (max-width: 768px) {
    nav { padding: 0 1.5rem; }
    .nav-links { display: none; }
    section { padding: 5rem 1.5rem; }
    #hero { padding: 0 1.5rem 4rem; }
    .hero-scroll { display: none; }
    #stats { grid-template-columns: repeat(2, 1fr); padding: 3rem 1.5rem; }
    .projects-grid { grid-template-columns: 1fr; }
    .services-grid { grid-template-columns: 1fr; }
    .team-grid { grid-template-columns: 1fr; }
    footer { flex-direction: column; text-align: center; padding: 2rem 1.5rem; }
    .form-row { grid-template-columns: 1fr; }
  }
`;

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function App() {
  const [activePage, setActivePage] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [showBTT, setShowBTT] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [formState, setFormState] = useState({
    name: "", email: "", phone: "", service: "", message: "", submitted: false, loading: false,
  });
  const heroRef = useRef(null);

  // Scroll events
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      setShowBTT(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    setActivePage(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // Filtered projects
  const filtered =
    activeFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  // Form handlers
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState((prev) => ({ ...prev, loading: true }));
    setTimeout(() => {
      setFormState({
        name: "", email: "", phone: "", service: "", message: "",
        submitted: true, loading: false,
      });
    }, 1200);
  };

  return (
    <>
      <style>{styles}</style>

      {/* ── NAV ── */}
      <nav className={scrolled ? "scrolled" : ""}>
        <button className="nav-logo" onClick={() => scrollTo("hero")}>
          Arch<span>Vision</span>
        </button>
        <ul className="nav-links">
          {["hero", "projects", "about", "services", "team", "contact"].map((page) => (
            <li key={page}>
              <button
                className={activePage === page ? "active" : ""}
                onClick={() => scrollTo(page)}
              >
                {page === "hero" ? "Home" : page.charAt(0).toUpperCase() + page.slice(1)}
              </button>
            </li>
          ))}
        </ul>
        <button className="nav-cta" onClick={() => scrollTo("contact")}>
          Get in Touch
        </button>
      </nav>

      {/* ── HERO ── */}
      <section id="hero" ref={heroRef}>
        <div className="hero-bg" />
        <div className="hero-content">
          <p className="hero-eyebrow">Architecture & Design Studio</p>
          <h1>
            Space as <em>art.</em>
            <br />
            Built to <em>last.</em>
          </h1>
          <p className="hero-sub">
            ArchVision Studio crafts buildings and interiors that speak quietly of permanence —
            from residential sanctuaries to civic landmarks across 22 countries.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => scrollTo("projects")}>
              View Our Work
            </button>
            <button className="btn-outline" onClick={() => scrollTo("about")}>
              Our Story
            </button>
          </div>
        </div>
        <div className="hero-scroll">Scroll to explore</div>
      </section>

      {/* ── STATS ── */}
      <div id="stats">
        {STATS.map((s) => (
          <div className="stat" key={s.label}>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── PROJECTS ── */}
      <section id="projects">
        <div className="projects-header">
          <div>
            <p className="section-eyebrow">Selected Work</p>
            <h2>
              Projects that <em>define</em>
              <br />
              their context
            </h2>
          </div>
          <div className="filter-bar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${activeFilter === cat ? "active" : ""}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div className="projects-grid">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="project-card fade-in"
              onClick={() => setSelectedProject(p)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setSelectedProject(p)}
            >
              <img src={p.img} alt={p.title} loading="lazy" />
              <div className="project-info">
                <p className="project-cat">{p.category}</p>
                <p className="project-title">{p.title}</p>
                <p className="project-meta">{p.location} · {p.year}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about">
        <div className="about-grid">
          <div className="about-image-wrap">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80"
              alt="ArchVision Studio atelier"
            />
            <div className="about-badge">
              <div className="about-badge-num">12</div>
              <div className="about-badge-lbl">Years of Practice</div>
            </div>
          </div>
          <div className="about-text">
            <p className="section-eyebrow">About Us</p>
            <h2>
              Designing with
              <br />
              <em>intention and memory</em>
            </h2>
            <p>
              Founded in 2012 by Fatima Asif and Adeena Khan, ArchVision Studio has grown from
              a two-person atelier into an award-winning firm with studios in Lahore, Dubai, and
              London. We believe that great architecture isn't just built — it is felt.
            </p>
            <p>
              Our work spans residential, commercial, cultural, and interior commissions, united
              by a single conviction: that every structure deserves to belong to its place, its
              time, and its people.
            </p>
            <div className="about-values">
              {[
                { t: "Context First", d: "Every design begins with an honest reading of site, culture, and climate." },
                { t: "Material Honesty", d: "We celebrate what things are made of, never concealing structural truth." },
                { t: "Sustainability", d: "Environmental responsibility is embedded at the first sketch, not retrofitted." },
                { t: "Human Scale", d: "We design for the body's experience before the camera's eye." },
              ].map((v) => (
                <div className="value-item" key={v.t}>
                  <p className="value-title">{v.t}</p>
                  <p className="value-desc">{v.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services">
        <div style={{ maxWidth: 540 }}>
          <p className="section-eyebrow">What We Offer</p>
          <h2>
            Full-spectrum <em>design</em>
            <br />
            services
          </h2>
          <p className="section-lead">
            From a single interior room to an entire city block — our studio brings the same
            rigor and curiosity to every scale of work.
          </p>
        </div>
        <div className="services-grid">
          {SERVICES.map((s) => (
            <div className="service-card" key={s.title}>
              <div className="service-icon">{s.icon}</div>
              <p className="service-title">{s.title}</p>
              <p className="service-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TEAM ── */}
      <section id="team">
        <div style={{ textAlign: "center" }}>
          <p className="section-eyebrow" style={{ justifyContent: "center" }}>
            The Studio
          </p>
          <h2>
            People behind <em>the work</em>
          </h2>
        </div>
        <div className="team-grid">
          {TEAM.map((m) => (
            <div className="team-card" key={m.name}>
              <div className="team-img-wrap">
                <img src={m.img} alt={m.name} />
              </div>
              <p className="team-name">{m.name}</p>
              <p className="team-role">{m.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact">
        <p className="section-eyebrow">Let's Build Together</p>
        <h2>
          Start a <em>conversation</em>
        </h2>
        <p className="section-lead">
          Whether you have a brief ready or just a sketch on a napkin — we'd love to hear from you.
        </p>
        <div className="contact-grid">
          <div className="contact-info">
            <h3>Visit or write to us</h3>
            {[
              { label: "Studio — Lahore", val: "14 Design Quarter, Gulberg III, Lahore, PK" },
              { label: "Studio — Dubai", val: "Level 12, DIFC Gate Avenue, Dubai, UAE" },
              { label: "Email", val: "hello@archvisionstudio.com" },
              { label: "Phone", val: "+92 300 123 4567" },
            ].map((d) => (
              <div className="contact-detail" key={d.label}>
                <label>{d.label}</label>
                <span>{d.val}</span>
              </div>
            ))}
          </div>

          <div>
            {formState.submitted ? (
              <div className="form-success">
                ✓ Thank you. We will be in touch within two working days.
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      name="name" value={formState.name} onChange={handleInput}
                      placeholder="Your full name" required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email" name="email" value={formState.email} onChange={handleInput}
                      placeholder="your@email.com" required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      name="phone" value={formState.phone} onChange={handleInput}
                      placeholder="+1 000 000 0000"
                    />
                  </div>
                  <div className="form-group">
                    <label>Service *</label>
                    <select name="service" value={formState.service} onChange={handleInput} required>
                      <option value="">Select a service</option>
                      {SERVICES.map((s) => (
                        <option key={s.title} value={s.title}>{s.title}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Tell us about your project *</label>
                  <textarea
                    name="message" value={formState.message} onChange={handleInput}
                    placeholder="Brief description, scale, timeline, location…"
                    required
                  />
                </div>
                <button className="form-submit" type="submit" disabled={formState.loading}>
                  {formState.loading ? "Sending…" : "Send Enquiry →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div className="logo">Arch<span>Vision</span> Studio</div>
        <p>© {new Date().getFullYear()} ArchVision Studio. All rights reserved.</p>
        <div className="footer-links">
          {["Privacy Policy", "Terms of Use", "Sitemap"].map((l) => (
            <button key={l}>{l}</button>
          ))}
        </div>
      </footer>

      {/* ── BACK TO TOP ── */}
      <button
        className={`btt ${showBTT ? "visible" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        ↑
      </button>

      {/* ── PROJECT MODAL ── */}
      {selectedProject && (
        <div
          className="modal-overlay"
          onClick={(e) => e.target === e.currentTarget && setSelectedProject(null)}
        >
          <div className="modal" style={{ position: "relative" }}>
            <button
              className="modal-close"
              onClick={() => setSelectedProject(null)}
              aria-label="Close"
            >
              ✕
            </button>
            <img src={selectedProject.img} alt={selectedProject.title} />
            <div className="modal-body">
              <div className="modal-meta">
                <span>{selectedProject.category}</span>
                <span>{selectedProject.location}</span>
                <span>{selectedProject.year}</span>
              </div>
              <h3>{selectedProject.title}</h3>
              <p>{selectedProject.desc}</p>
              <p style={{ marginTop: "1rem", color: "#888", fontSize: "0.82rem" }}>
                This project exemplifies our commitment to contextual design — every material,
                every proportion, every threshold informed by the specifics of its brief and site.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
