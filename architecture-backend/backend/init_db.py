"""
init_db.py – Run once to create the SQLite database and seed it with
             the 13 projects already shown in the React frontend.

Usage:
    python init_db.py
"""

import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "database.db")

PROJECTS = [
    ("Modern Villa",       "Residential", "A sleek contemporary villa with open-plan living spaces.", "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500&auto=format&fit=crop&q=60"),
    ("Corporate Office",   "Commercial",  "A dynamic workspace designed to inspire productivity.",    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=500&auto=format&fit=crop&q=60"),
    ("Art Gallery",        "Public",      "A luminous gallery space celebrating modern art.",         "https://images.unsplash.com/photo-1606819717115-9159c900370b?w=500&auto=format&fit=crop&q=60"),
    ("Luxury Apartment",   "Residential", "High-end urban living with panoramic city views.",         "https://images.unsplash.com/photo-1686056040370-b5e5c06c4273?w=500&auto=format&fit=crop&q=60"),
    ("Shopping Center",    "Commercial",  "A vibrant retail hub serving the local community.",        "https://images.unsplash.com/photo-1533481405265-e9ce0c044abb?w=500&auto=format&fit=crop&q=60"),
    ("University Building","Educational", "An inspiring campus building fostering learning.",         "https://images.unsplash.com/20/cambridge.JPG?w=500&auto=format&fit=crop&q=60"),
    ("Boutique Hotel",     "Commercial",  "An intimate luxury hotel with bespoke design details.",   "https://plus.unsplash.com/premium_photo-1661964071015-d97428970584?w=500&auto=format&fit=crop&q=60"),
    ("Eco House",          "Residential", "A sustainable home powered by renewable energy.",          "https://plus.unsplash.com/premium_photo-1713935397769-ba7babcc3928?w=500&auto=format&fit=crop&q=60"),
    ("Museum Extension",   "Public",      "A bold addition that doubles the museum's gallery space.", "https://images.unsplash.com/photo-1544213456-bc37cb97df74?w=500&auto=format&fit=crop&q=60"),
    ("Skyscraper",         "Commercial",  "An iconic 60-storey mixed-use tower in the city centre.", "https://plus.unsplash.com/premium_photo-1672423154405-5fd922c11af2?w=500&auto=format&fit=crop&q=60"),
    ("Waterfront House",   "Residential", "A serene retreat perched on the water's edge.",           "https://images.unsplash.com/photo-1759020623226-73ec7a068b11?w=500&auto=format&fit=crop&q=60"),
    ("Conference Center",  "Public",      "A state-of-the-art venue for international events.",      "https://images.unsplash.com/photo-1624800873328-129498d2847a?w=500&auto=format&fit=crop&q=60"),
    ("Private Residence",  "Residential", "A timeless family home with refined interior details.",   "https://images.unsplash.com/photo-1569660072562-48a035e65c30?w=500&auto=format&fit=crop&q=60"),
]


def init():
    conn = sqlite3.connect(DB_PATH)
    cur  = conn.cursor()

    # ── Tables ───────────────────────────────────────────────────────────────
    cur.executescript("""
        CREATE TABLE IF NOT EXISTS contacts (
            id         INTEGER PRIMARY KEY AUTOINCREMENT,
            name       TEXT    NOT NULL,
            email      TEXT    NOT NULL,
            phone      TEXT,
            message    TEXT    NOT NULL,
            status     TEXT    NOT NULL DEFAULT 'new',
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

    # ── Seed projects (skip if already present) ───────────────────────────────
    existing = cur.execute("SELECT COUNT(*) FROM projects").fetchone()[0]
    if existing == 0:
        cur.executemany(
            "INSERT INTO projects (title, category, description, image_url) VALUES (?, ?, ?, ?)",
            PROJECTS,
        )
        print(f"✅  Seeded {len(PROJECTS)} projects.")
    else:
        print(f"ℹ️   Projects table already has {existing} rows – skipping seed.")

    conn.commit()
    conn.close()
    print(f"✅  Database ready at: {DB_PATH}")


if __name__ == "__main__":
    init()
