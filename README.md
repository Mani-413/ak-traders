# AK TRADERS — "Growing Together" (updated)

Full-stack website + admin dashboard for **AK Traders**, an agricultural produce
procurement and distribution company based in Veeraganur, Tamil Nadu.

```
ak-traders/
  frontend/     Static, responsive multi-page website + admin panel (HTML/CSS/JS)
  backend/      FastAPI + PostgreSQL REST API powering the site and admin panel
  README.md     This file
```

## Quick start

### 1. Backend

```bash
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000
```

Full instructions: [`backend/README.md`](backend/README.md).

### 2. Frontend

The frontend is plain HTML/CSS/JS — no build step required.

```bash
cd frontend
python -m http.server 5500
# open http://localhost:5500
```

Or open `frontend/index.html` directly in a browser. The contact form and admin panel
call `http://localhost:8000/api` by default — change `AK_API_BASE` at the top of
`frontend/js/main.js` (and `API` in `frontend/js/admin.js`) if your backend runs elsewhere.

### 3. Docker Deployment

A container-ready configuration is included so you can deploy the backend and frontend together.

```bash
docker build -t ak-traders .
docker run --rm -p 8000:8000 ak-traders
```

Or with Docker Compose:

```bash
docker compose up --build
```

The app will be available at `http://localhost:8000/` and the API at `/api`.

> The container uses the default SQLite fallback unless you set `DATABASE_URL`.

> For production, set a strong `JWT_SECRET_KEY` and use a proper database URL.

> If Docker is unavailable, you can still run the frontend with `python -m http.server 5500`.

## Pages

| Page | File | Covers |
|---|---|---|
| Home | `index.html` | Hero, stats, why-choose-us, mission, testimonials, newsletter |
| About | `about.html` | Company intro, mission, founder & executives, FAQ |
| Products | `products.html` | Onion, Potato, Tomato, Garlic, Ginger — searchable cards |
| Procurement | `procurement.html` | Sourcing states: AP, Karnataka, MP, Tamil Nadu, Kerala |
| Distribution | `distribution.html` | Direct daily / hotel & restaurant / wholesale / retail supply |
| Growth | `turnover.html` | Animated revenue chart 2026–2032, ₹2 Crore ultimate goal |
| Roadmap | `roadmap.html` | Own manufacturing → import/export → retail MART |
| Contact | `contact.html` | Branch addresses, contact form, map, call/WhatsApp/email |
| Admin | `admin.html` | JWT-secured dashboard — products, gallery, messages, enquiries |

## Design system

- **Palette:** deep forest green `#123317` / brand green `#2E7D32` / warm cream `#FAF7EE` / muted harvest gold `#C9A227`
- **Type:** Fraunces (display) + Manrope (body) + JetBrains Mono (data/labels)
- **Signature motif:** "furrow lines" — thin repeating rules echoing plowed field rows, used as section dividers and background texture instead of stock photography
- Fully responsive, keyboard-focus-visible, `prefers-reduced-motion` respected, dark mode toggle, scroll-reveal animations

## Notes on production readiness

- Set a strong `JWT_SECRET_KEY` and change the default admin password before deploying.
- Point `DATABASE_URL` at a real PostgreSQL instance; `create_all` is used for convenience
  here — introduce Alembic migrations for schema changes in production.
- Restrict `CORS_ORIGINS` in `.env` to your actual frontend domain(s).
- Serve the frontend behind HTTPS and update `AK_API_BASE` / `API` to the deployed API URL.
