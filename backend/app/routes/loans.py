from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import SessionLocal
from .. import schemas, crud

router = APIRouter(
    prefix="/loans",
    tags=["Loans"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.LoanResponse)
def create_loan(
    loan: schemas.LoanCreate,
    db: Session = Depends(get_db)
):
    return crud.create_loan(db, loan)