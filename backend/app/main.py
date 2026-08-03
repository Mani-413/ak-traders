"""AK Traders — FastAPI application entrypoint."""
import os
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from fastapi.staticfiles import StaticFiles

from app.config import settings
from app.database import Base, engine, SessionLocal
from app import models
from app.security import hash_password
from app.routers import auth, products, gallery, contact, enquiries, dashboard

# Create tables (use Alembic migrations in production instead of create_all)
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.app_name,
    description="Backend API for AK Traders — agricultural produce procurement & distribution.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app_dir = Path(__file__).resolve().parent
static_dir = app_dir / "static"
project_root = Path(__file__).resolve().parents[2]

os.makedirs(settings.upload_dir, exist_ok=True)
app.mount("/static", StaticFiles(directory=str(static_dir)), name="static")
# Serve all other static assets (css, js, assets) from the project root
app.mount("/", StaticFiles(directory=str(project_root), html=True), name="static_root")

app.include_router(auth.router)
app.include_router(products.router)
app.include_router(gallery.router)
app.include_router(contact.router)
app.include_router(enquiries.router)
app.include_router(dashboard.router)


@app.on_event("startup")
def seed_default_admin():
    """Create the default admin account on first run, if none exists."""
    db = SessionLocal()
    try:
        has_admin = db.query(models.AdminUser).first()
        if not has_admin:
            admin = models.AdminUser(
                username=settings.default_admin_username,
                hashed_password=hash_password(settings.default_admin_password),
            )
            db.add(admin)
            db.commit()
    finally:
        db.close()


@app.get("/", include_in_schema=False)
def root():
    # Redirect to the main index page located at the project root
    return RedirectResponse(url="/index.html")


@app.get("/api/health", tags=["Health"])
def health():
    return {"status": "healthy"}
