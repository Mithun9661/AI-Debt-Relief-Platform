from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..services.settlement_engine import analyze_financial_health
from ..database import SessionLocal
from .. import models


router = APIRouter(
    prefix="/analytics",
    tags=["Financial Analytics"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Financial Health Analysis
@router.get("/financial-health")
def financial_analysis(
    monthly_income: float,
    total_emi: float,
    outstanding_amount: float
):
    return analyze_financial_health(
        monthly_income,
        total_emi,
        outstanding_amount
    )


# Loan Distribution Analytics
@router.get("/loan-distribution")
def analytics(db: Session = Depends(get_db)):
    loans = db.query(models.Loan).all()

    result = []

    for loan in loans:
        result.append({
            "loan_type": loan.loan_type,
            "amount": loan.outstanding_amount
        })

    return {
        "loan_distribution": result
    }