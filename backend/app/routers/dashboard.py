"""Admin dashboard analytics API."""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import get_db
from app import models, schemas
from app.deps import get_current_admin

router = APIRouter(prefix="/api/dashboard", tags=["Dashboard"])


@router.get("/stats", response_model=schemas.DashboardStats)
def get_stats(
    db: Session = Depends(get_db),
    _admin: models.AdminUser = Depends(get_current_admin),
):
    total_products = db.query(func.count(models.Product.id)).scalar()
    total_gallery_images = db.query(func.count(models.GalleryImage.id)).scalar()
    total_messages = db.query(func.count(models.ContactMessage.id)).scalar()
    unread_messages = db.query(func.count(models.ContactMessage.id)).filter(
        models.ContactMessage.is_read.is_(False)
    ).scalar()
    total_enquiries = db.query(func.count(models.Enquiry.id)).scalar()
    open_enquiries = db.query(func.count(models.Enquiry.id)).filter(
        models.Enquiry.status != "Closed"
    ).scalar()

    return schemas.DashboardStats(
        total_products=total_products or 0,
        total_gallery_images=total_gallery_images or 0,
        total_messages=total_messages or 0,
        unread_messages=unread_messages or 0,
        open_enquiries=open_enquiries or 0,
        total_enquiries=total_enquiries or 0,
    )
