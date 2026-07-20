from sqlalchemy.orm import Session
from fastapi import HTTPException
from . import models, schemas
from sqlalchemy import func

def create_user(db: Session, user: schemas.UserCreate):

    # Check if email already exists
    existing_user = db.query(models.User).filter(
        models.User.email == user.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    db_user = models.User(
        name=user.name,
        email=user.email,
        monthly_income=user.monthly_income
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user
def create_loan(db: Session, loan: schemas.LoanCreate):
    db_loan = models.Loan(
        loan_type=loan.loan_type,
        lender_name=loan.lender_name,
        loan_amount=loan.loan_amount,
        outstanding_amount=loan.outstanding_amount,
        emi_amount=loan.emi_amount,
        interest_rate=loan.interest_rate,
        overdue_months=loan.overdue_months,
        user_id=loan.user_id
    )

    db.add(db_loan)
    db.commit()
    db.refresh(db_loan)

    return db_loan

def get_dashboard_data(db: Session, user_id: int):

    loans = db.query(models.Loan).filter(
        models.Loan.user_id == user_id
    ).all()

    if not loans:
        return {
            "total_loans": 0,
            "total_outstanding": 0,
            "total_emi": 0,
            "average_interest_rate": 0
        }

    total_outstanding = sum(
        loan.outstanding_amount for loan in loans
    )

    total_emi = sum(
        loan.emi_amount for loan in loans
    )

    average_interest_rate = (
        sum(loan.interest_rate for loan in loans)
        / len(loans)
    )

    return {
        "total_loans": len(loans),
        "total_outstanding": total_outstanding,
        "total_emi": total_emi,
        "average_interest_rate": round(
            average_interest_rate,
            2
        )
    }