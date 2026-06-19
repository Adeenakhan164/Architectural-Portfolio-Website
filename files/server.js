/**
 * ArchVision Studio — Node.js / Express Backend
 * Run:  npm install express cors nodemailer && node server.js
 * API:  http://localhost:5000
 */

const express = require("express");
const cors    = require("cors");
const app     = express();

app.use(cors());
app.use(express.json());

// ─── IN-MEMORY DATA STORE ─────────────────────────────────────────────────────

const projects = [
  { id: 1,  title: "The Meridian Tower",    category: "Commercial",  location: "Dubai, UAE",        year: 2023 },
  { id: 2,  title: "Mosaic Residence",      category: "Residential", location: "Barcelona, Spain",  year: 2022 },
  { id: 3,  title: "Verdant Cultural Hub",  category: "Cultural",    location: "Singapore",         year: 2023 },
  { id: 4,  title: "Solstice Villa",        category: "Residential", location: "Santorini, Greece", year: 2021 },
  { id: 5,  title: "The Lattice Pavilion",  category: "Cultural",    location: "Tokyo, Japan",      year: 2022 },
  { id: 6,  title: "Harbor Quay Office",    category: "Commercial",  location: "Sydney, Australia", year: 2023 },
  { id: 7,  title: "Amber Courtyard",       category: "Interior",    location: "Marrakech, Morocco",year: 2021 },
  { id: 8,  title: "Nordic Retreat",        category: "Residential", location: "Oslo, Norway",      year: 2022 },
  { id: 9,  title: "Sky Garden Towers",     category: "Commercial",  location: "Kuala Lumpur, MY",  year: 2023 },
  { id: 10, title: "Monolith Museum",       category: "Cultural",    location: "Berlin, Germany",   year: 2022 },
  { id: 11, title: "Terrace House Milan",   category: "Interior",    location: "Milan, Italy",      year: 2023 },
  { id: 12, title: "The Vault Library",     category: "Cultural",    location: "London, UK",        year: 2021 },
  { id: 13, title: "Cascades Spa",          category: "Interior",    location: "Bali, Indonesia",   year: 2022 },
];

const enquiries = []; // stores submitted contact forms

// ─── ROUTES ───────────────────────────────────────────────────────────────────

// Health check
app.get("/", (_req, res) => {
  res.json({ status: "ArchVision Studio API running", version: "1.0.0" });
});

// GET all projects (with optional ?category= filter)
app.get("/api/projects", (req, res) => {
  const { category } = req.query;
  const result = category
    ? projects.filter(p => p.category.toLowerCase() === category.toLowerCase())
    : projects;
  res.json({ success: true, count: result.length, data: result });
});

// GET single project by ID
app.get("/api/projects/:id", (req, res) => {
  const project = projects.find(p => p.id === parseInt(req.params.id));
  if (!project) return res.status(404).json({ success: false, message: "Project not found" });
  res.json({ success: true, data: project });
});

// POST contact/enquiry form
app.post("/api/contact", (req, res) => {
  const { name, email, phone, service, message } = req.body;

  // Basic validation
  if (!name || !email || !service || !message) {
    return res.status(400).json({
      success: false,
      message: "Fields name, email, service, and message are required.",
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: "Invalid email address." });
  }

  const enquiry = {
    id: enquiries.length + 1,
    name, email, phone: phone || null, service, message,
    createdAt: new Date().toISOString(),
    status: "pending",
  };

  enquiries.push(enquiry);

  console.log(`📩 New enquiry #${enquiry.id} from ${name} <${email}>`);

  res.status(201).json({
    success: true,
    message: "Enquiry received. We'll be in touch within two working days.",
    data: { id: enquiry.id, createdAt: enquiry.createdAt },
  });
});

// GET all enquiries (admin endpoint — protect in production!)
app.get("/api/enquiries", (_req, res) => {
  res.json({ success: true, count: enquiries.length, data: enquiries });
});

// ─── START SERVER ─────────────────────────────────────────────────────────────

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🏛  ArchVision Studio API`);
  console.log(`   Listening on http://localhost:${PORT}\n`);
  console.log(`   GET  /api/projects`);
  console.log(`   GET  /api/projects/:id`);
  console.log(`   POST /api/contact`);
  console.log(`   GET  /api/enquiries\n`);
});
