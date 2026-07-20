from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from app.database import get_db
from app.database import SessionLocal
from app.models import User
from app.auth_utils import verify_password, create_token
import logging

router = APIRouter()
logger = logging.getLogger(__name__)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    try:
        email = form_data.username.strip().lower()
        password = form_data.password
        user = db.query(User).filter(User.email == email).first()
        if not user:
            raise HTTPException(
                status_code=401,
                detail="Invalid email or password"
            )
        if not verify_password(password, user.password):
            raise HTTPException(
                status_code=401,
                detail="Invalid email or password"
            )
        access_token = create_token({"sub": user.email})
        return {
            "access_token": access_token,
            "token_type": "bearer"
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Login failed: {str(e)}"
        )


def get_current_user(
    db: Session = Depends(get_db)
):
    user = db.query(User).first()

    if not user:
        raise HTTPException(
            status_code=401,
            detail="User not found"
        )

    return user