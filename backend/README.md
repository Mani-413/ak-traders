# AK Traders — Backend API

FastAPI + PostgreSQL backend powering the AK Traders website and admin panel.

## Stack

- **Framework:** FastAPI
- **Server:** Uvicorn
- **Database:** PostgreSQL (SQLite fallback for local dev)
- **ORM:** SQLAlchemy 2.0
- **Validation:** Pydantic v2
- **Auth:** JWT (python-jose) + bcrypt password hashing (passlib)

## Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

pip install -r requirements.txt
cp .env.example .env            # then edit DATABASE_URL, JWT_SECRET_KEY, etc.
```

### Database

By default the app falls back to a local SQLite file (`ak_traders.db`) if `DATABASE_URL`
is not set — good for quick local testing. For production, set `DATABASE_URL` to your
PostgreSQL connection string in `.env`:

```
DATABASE_URL=postgresql://ak_user:ak_password@localhost:5432/ak_traders
```

Tables are created automatically on startup via `Base.metadata.create_all`. For schema
changes in production, introduce Alembic migrations instead of relying on `create_all`.

### Run

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

API docs: `http://localhost:8000/docs` (Swagger) and `http://localhost:8000/redoc`.

### Default admin login

On first startup, if no admin exists, one is created from `.env`:

```
DEFAULT_ADMIN_USERNAME=admin
DEFAULT_ADMIN_PASSWORD=admin123
```

**Change this password immediately in production** — either update `.env` before first
run, or update the row in `admin_users` directly with a new bcrypt hash.

## API Overview

| Area        | Endpoint                          | Auth     |
|-------------|------------------------------------|----------|
| Auth        | `POST /api/auth/login`             | Public   |
| Auth        | `GET  /api/auth/me`                | Admin    |
| Products    | `GET  /api/products/`              | Public   |
| Products    | `POST /api/products/`              | Admin    |
| Products    | `PUT  /api/products/{id}`          | Admin    |
| Products    | `DELETE /api/products/{id}`        | Admin    |
| Gallery     | `GET  /api/gallery/`               | Public   |
| Gallery     | `POST /api/gallery/upload`         | Admin    |
| Gallery     | `DELETE /api/gallery/{id}`         | Admin    |
| Contact     | `POST /api/contact/`               | Public   |
| Contact     | `GET  /api/contact/`               | Admin    |
| Contact     | `PATCH /api/contact/{id}/read`     | Admin    |
| Contact     | `DELETE /api/contact/{id}`         | Admin    |
| Enquiries   | `POST /api/enquiries/`             | Public   |
| Enquiries   | `GET  /api/enquiries/`             | Admin    |
| Enquiries   | `PATCH /api/enquiries/{id}`        | Admin    |
| Enquiries   | `DELETE /api/enquiries/{id}`       | Admin    |
| Dashboard   | `GET  /api/dashboard/stats`        | Admin    |
| Health      | `GET  /api/health`                 | Public   |

Admin endpoints require an `Authorization: Bearer <token>` header, obtained from
`POST /api/auth/login`.

## Project structure

```
backend/
  app/
    main.py            # FastAPI app, CORS, static mount, admin seeding
    config.py           # Settings (env-driven)
    database.py          # SQLAlchemy engine/session
    models.py            # ORM models
    schemas.py            # Pydantic schemas
    security.py            # JWT + password hashing
    deps.py                  # Auth dependency
    routers/                  # API route modules
    services/                   # (reserved) business logic helpers
    templates/                    # (reserved) server-rendered views
    static/uploads/                 # Uploaded gallery images
  requirements.txt
  .env.example
```
