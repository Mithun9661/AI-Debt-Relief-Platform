from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import User
from app.auth_utils import verify_password, create_token, verify_token

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")


@router.post("/login")
def login(data: dict, db: Session = Depends(get_db)):

    email = data.get("email", "").strip().lower()
    password = data.get("password", "").strip()

    if not email or not password:
        raise HTTPException(
            status_code=400,
            detail="Email and Password are required"
        )

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

    token = create_token({"sub": user.email})

    return {
        "message": "Login Successful",
        "access_token": token,
        "token_type": "bearer"
    }


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):

    try:

        email = verify_token(token)

        if email is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid Token"
            )

        user = db.query(User).filter(User.email == email).first()

        if user is None:
            raise HTTPException(
                status_code=401,
                detail="User not found"
            )

        return user

    except JWTError:

        raise HTTPException(
            status_code=401,
            detail="Invalid Token"
        )