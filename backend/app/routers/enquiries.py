"""Product/bulk-order enquiries API — public submit, admin-only manage."""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app import models, schemas
from app.deps import get_current_admin

router = APIRouter(prefix="/api/enquiries", tags=["Enquiries"])


@router.post("/", response_model=schemas.EnquiryOut, status_code=201)
def submit_enquiry(payload: schemas.EnquiryCreate, db: Session = Depends(get_db)):
    enquiry = models.Enquiry(**payload.model_dump())
    db.add(enquiry)
    db.commit()
    db.refresh(enquiry)
    return enquiry


@router.get("/", response_model=list[schemas.EnquiryOut])
def list_enquiries(
    db: Session = Depends(get_db),
    _admin: models.AdminUser = Depends(get_current_admin),
):
    return db.query(models.Enquiry).order_by(models.Enquiry.created_at.desc()).all()


@router.patch("/{enquiry_id}", response_model=schemas.EnquiryOut)
def update_enquiry_status(
    enquiry_id: int,
    payload: schemas.EnquiryUpdate,
    db: Session = Depends(get_db),
    _admin: models.AdminUser = Depends(get_current_admin),
):
    enquiry = db.get(models.Enquiry, enquiry_id)
    if not enquiry:
        raise HTTPException(404, "Enquiry not found")
    enquiry.status = payload.status
    db.commit()
    db.refresh(enquiry)
    return enquiry


@router.delete("/{enquiry_id}", status_code=204)
def delete_enquiry(
    enquiry_id: int,
    db: Session = Depends(get_db),
    _admin: models.AdminUser = Depends(get_current_admin),
):
    enquiry = db.get(models.Enquiry, enquiry_id)
    if not enquiry:
        raise HTTPException(404, "Enquiry not found")
    db.delete(enquiry)
    db.commit()
