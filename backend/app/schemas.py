"""Pydantic request/response schemas."""
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, ConfigDict, Field


# ---------- Auth ----------
class LoginRequest(BaseModel):
    username: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int


class AdminUserOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    username: str
    is_active: bool


# ---------- Products ----------
class ProductBase(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    emoji: str = "🥬"
    badge: str = "Fresh Quality"
    avail: str = "Available"
    desc: str = ""


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    emoji: Optional[str] = None
    badge: Optional[str] = None
    avail: Optional[str] = None
    desc: Optional[str] = None


class ProductOut(ProductBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
    image_path: Optional[str] = None
    created_at: datetime


# ---------- Gallery ----------
class GalleryImageOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    name: str
    path: str
    caption: str
    created_at: datetime


# ---------- Contact ----------
class ContactMessageCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    phone: str = Field(min_length=1, max_length=32)
    email: Optional[EmailStr] = None
    message: str = Field(min_length=1)


class ContactMessageOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    name: str
    phone: str
    email: Optional[str] = None
    message: str
    is_read: bool
    created_at: datetime


# ---------- Enquiries ----------
class EnquiryCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    phone: Optional[str] = None
    product: str = Field(min_length=1, max_length=120)
    quantity: str = ""


class EnquiryUpdate(BaseModel):
    status: str


class EnquiryOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    name: str
    phone: Optional[str] = None
    product: str
    quantity: str
    status: str
    created_at: datetime


# ---------- Dashboard ----------
class DashboardStats(BaseModel):
    total_products: int
    total_gallery_images: int
    total_messages: int
    unread_messages: int
    open_enquiries: int
    total_enquiries: int
