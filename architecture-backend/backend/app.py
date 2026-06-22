"""
Architecture Portfolio - Backend Server
Flask + SQLite backend for the contact form
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import os
import re
from datetime import datetime

app = Flask(__name__)

# ─── CORS ─────────────────────────────────────────────────────────────────────
# Allow requests from the React dev server and any deployed frontend
CORS(app, resources={r"/api/*": {"origins": "*"}})

# ─── Database ─────────────────────────────────────────────────────────────────
DB_PATH = os.path.join(os.path.dirname(__file__), "database.db")


def get_db():
    """Return a database connection with row_factory set."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    """Create tables if they do not exist yet."""
    with get_db() as conn:
        conn.executescript("""
            CREATE TABLE IF NOT EXISTS contacts (
                id        INTEGER PRIMARY KEY AUTOINCREMENT,
                name      TEXT    NOT NULL,
                email     TEXT    NOT NULL,
                phone     TEXT,
                message   TEXT    NOT NULL,
                status    TEXT    NOT NULL DEFAULT 'new',
                created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS projects (
                id          INTEGER PRIMARY KEY AUTOINCREMENT,
                title       TEXT NOT NULL,
                category    TEXT NOT NULL,
                description TEXT,
                image_url   TEXT,
                created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
            );
        """)
    print(f"✅  Database initialised at: {DB_PATH}")


# ─── Helpers ──────────────────────────────────────────────────────────────────
EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


def validate_contact(data):
    errors = []
    if not data.get("name", "").strip():
        errors.append("Name is required.")
    if not data.get("email", "").strip():
        errors.append("Email is required.")
    elif not EMAIL_RE.match(data["email"].strip()):
        errors.append("Email is not valid.")
    if not data.get("message", "").strip():
        errors.append("Message is required.")
    return errors


# ─── Routes ───────────────────────────────────────────────────────────────────

@app.route("/", methods=["GET"])
def health():
    return jsonify({"status": "ok", "message": "Architecture Portfolio API is running 🚀"})


# ---------- Contact ----------

@app.route("/api/contact", methods=["POST"])
def create_contact():
    """Accept a contact-form submission and save it to the database."""
    data = request.get_json(silent=True) or {}

    errors = validate_contact(data)
    if errors:
        return jsonify({"success": False, "message": " ".join(errors)}), 400

    name    = data["name"].strip()
    email   = data["email"].strip()
    phone   = data.get("phone", "").strip() or None
    message = data["message"].strip()

    with get_db() as conn:
        cursor = conn.execute(
            "INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)",
            (name, email, phone, message),
        )
        contact_id = cursor.lastrowid

    return jsonify({
        "success": True,
        "message": "Thank you! Your message has been received. We'll be in touch soon.",
        "id": contact_id,
    }), 201


@app.route("/api/contacts", methods=["GET"])
def list_contacts():
    """Return all contact submissions (admin use)."""
    with get_db() as conn:
        rows = conn.execute(
            "SELECT * FROM contacts ORDER BY created_at DESC"
        ).fetchall()
    return jsonify([dict(row) for row in rows])


@app.route("/api/contacts/<int:contact_id>", methods=["PATCH"])
def update_contact_status(contact_id):
    """Update the status of a contact (e.g. new → replied)."""
    data   = request.get_json(silent=True) or {}
    status = data.get("status", "").strip()
    valid  = {"new", "in_progress", "replied", "closed"}
    if status not in valid:
        return jsonify({"success": False, "message": f"Status must be one of: {', '.join(valid)}"}), 400

    with get_db() as conn:
        conn.execute(
            "UPDATE contacts SET status = ? WHERE id = ?", (status, contact_id)
        )
    return jsonify({"success": True, "message": "Status updated."})


# ---------- Projects ----------

@app.route("/api/projects", methods=["GET"])
def list_projects():
    """Return all projects, optionally filtered by category."""
    category = request.args.get("category")
    with get_db() as conn:
        if category:
            rows = conn.execute(
                "SELECT * FROM projects WHERE category = ? ORDER BY created_at DESC",
                (category,),
            ).fetchall()
        else:
            rows = conn.execute(
                "SELECT * FROM projects ORDER BY created_at DESC"
            ).fetchall()
    return jsonify([dict(row) for row in rows])


@app.route("/api/projects/<int:project_id>", methods=["GET"])
def get_project(project_id):
    with get_db() as conn:
        row = conn.execute(
            "SELECT * FROM projects WHERE id = ?", (project_id,)
        ).fetchone()
    if not row:
        return jsonify({"success": False, "message": "Project not found."}), 404
    return jsonify(dict(row))


@app.route("/api/projects", methods=["POST"])
def create_project():
    data = request.get_json(silent=True) or {}
    title    = data.get("title", "").strip()
    category = data.get("category", "").strip()
    if not title or not category:
        return jsonify({"success": False, "message": "title and category are required."}), 400

    with get_db() as conn:
        cursor = conn.execute(
            "INSERT INTO projects (title, category, description, image_url) VALUES (?, ?, ?, ?)",
            (title, category, data.get("description"), data.get("image_url")),
        )
    return jsonify({"success": True, "id": cursor.lastrowid}), 201


# ─── Entry Point ──────────────────────────────────────────────────────────────
if __name__ == "__main__":
    init_db()
    port = int(os.environ.get("PORT", 5000))
    print(f"🚀  Server running on http://0.0.0.0:{port}")
    app.run(host="0.0.0.0", port=port, debug=False)
