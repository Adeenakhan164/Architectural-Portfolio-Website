# Architecture Portfolio — Backend

Flask + SQLite REST API for the Architecture Portfolio React frontend.

---

## Quick Start

### 1. Install dependencies
```bash
pip install -r requirements.txt
```

### 2. Initialise the database (run once)
```bash
python init_db.py
```
This creates `database.db` in the same folder and seeds it with the 13
projects shown in the frontend.

### 3. Start the server
```bash
python app.py
```
The API is now available at **http://localhost:5000**.

---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Health check |
| POST | `/api/contact` | Submit a contact form |
| GET | `/api/contacts` | List all contact submissions |
| PATCH | `/api/contacts/:id` | Update a contact's status |
| GET | `/api/projects` | List all projects (optional `?category=`) |
| GET | `/api/projects/:id` | Get a single project |
| POST | `/api/projects` | Create a new project |

### Contact form payload (POST /api/contact)
```json
{
  "name":    "Ahmed Khan",
  "email":   "ahmed@example.com",
  "phone":   "+92 300 0000000",
  "message": "I'd like a consultation."
}
```

### Contact status values (PATCH /api/contacts/:id)
```json
{ "status": "new" }          // default on creation
{ "status": "in_progress" }
{ "status": "replied" }
{ "status": "closed" }
```

---

## Connecting the Frontend

In `src/components/Contact.js` the `BACKEND_URL` constant controls where
form submissions are sent. Update it to match your deployed server URL:

```js
const BACKEND_URL = "http://localhost:5000";   // local dev
// const BACKEND_URL = "https://your-server.com"; // production
```

---

## Database Schema

### contacts
| Column | Type | Notes |
|--------|------|-------|
| id | INTEGER | Primary key, auto-increment |
| name | TEXT | Required |
| email | TEXT | Required, validated |
| phone | TEXT | Optional |
| message | TEXT | Required |
| status | TEXT | new / in_progress / replied / closed |
| created_at | DATETIME | Auto-set on insert |

### projects
| Column | Type | Notes |
|--------|------|-------|
| id | INTEGER | Primary key, auto-increment |
| title | TEXT | Required |
| category | TEXT | Residential / Commercial / Public / Educational |
| description | TEXT | Optional |
| image_url | TEXT | Optional |
| created_at | DATETIME | Auto-set on insert |

---

## Deployment (Render / Railway / VPS)

1. Push the `backend/` folder to a Git repository.
2. Set the environment variable `PORT` to the port your host assigns.
3. Set **Start Command** to `python app.py`.
4. The database file (`database.db`) is stored on the server's disk;
   for production consider a managed PostgreSQL database instead.
