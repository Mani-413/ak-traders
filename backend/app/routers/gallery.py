"""Gallery API — image upload/list/delete (admin-only for writes)."""
import os
import uuid

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session

from app.database import get_db
from app.config import settings
from app import models, schemas
from app.deps import get_current_admin

router = APIRouter(prefix="/api/gallery", tags=["Gallery"])

ALLOWED_EXT = {".jpg", ".jpeg", ".png", ".webp", ".gif"}


@router.get("/", response_model=list[schemas.GalleryImageOut])
def list_images(db: Session = Depends(get_db)):
    return db.query(models.GalleryImage).order_by(models.GalleryImage.id.desc()).all()


@router.post("/upload", response_model=schemas.GalleryImageOut, status_code=201)
def upload_image(
    file: UploadFile = File(...),
    caption: str = Form(""),
    db: Session = Depends(get_db),
    _admin: models.AdminUser = Depends(get_current_admin),
):
    ext = os.path.splitext(file.filename or "")[1].lower()
    if ext not in ALLOWED_EXT:
        raise HTTPException(400, "Unsupported image type")

    contents = file.file.read()
    if len(contents) > settings.max_upload_mb * 1024 * 1024:
        raise HTTPException(400, f"Image exceeds {settings.max_upload_mb}MB limit")

    os.makedirs(settings.upload_dir, exist_ok=True)
    stored_name = f"{uuid.uuid4().hex}{ext}"
    stored_path = os.path.join(settings.upload_dir, stored_name)
    with open(stored_path, "wb") as f:
        f.write(contents)

    image = models.GalleryImage(
        name=file.filename or stored_name,
        path=f"/static/uploads/{stored_name}",
        caption=caption,
    )
    db.add(image)
    db.commit()
    db.refresh(image)
    return image


@router.delete("/{image_id}", status_code=204)
def delete_image(
    image_id: int,
    db: Session = Depends(get_db),
    _admin: models.AdminUser = Depends(get_current_admin),
):
    image = db.get(models.GalleryImage, image_id)
    if not image:
        raise HTTPException(404, "Image not found")
    file_path = image.path.replace("/static/uploads/", "")
    full_path = os.path.join(settings.upload_dir, file_path)
    if os.path.exists(full_path):
        os.remove(full_path)
    db.delete(image)
    db.commit()
