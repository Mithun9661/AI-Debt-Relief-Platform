from fastapi import APIRouter, Depends, HTTPException 
from sqlalchemy.orm import Session
from app.models import User, Loan, AIHistory
from app.auth import get_current_user
from app.schemas import (
    NegotiationRequest,
    ProfileUpdate,
    LoanCreate
)
from app.database import get_db
from app.database import SessionLocal
from app.financial_engine import calculate_financial_health
from app.ai_negotiation_engine import generate_negotiation_strategy
from app.settlement_engine import calculate_settlement_probability

router = APIRouter()


# ========================
# AI NEGOTIATION STRATEGY
# ========================
@router.get("/ai-negotiation-strategy")
def get_ai_negotiation_strategy(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    try:
        # Fetch current user
        user = db.query(User).filter(
            User.id == current_user.id
        ).first()
        if not user:
            raise HTTPException(
                status_code=404,
                detail="User not found"
            )
        # Fetch all loans
        loans = db.query(Loan).filter(
            Loan.user_id == user.id
        ).all()
        if not loans:
            return {
                "strategy": "Please add at least one loan to generate an AI negotiation strategy."
            }
        # Calculate financial metrics
        financial_health = calculate_financial_health(user, loans)
        settlement_data = calculate_settlement_probability(user, loans)
        # Generate AI strategy
        strategy = generate_negotiation_strategy(
            user,
            loans,
            financial_health,
            settlement_data
        )
        # Save AI history
        try:
            history = AIHistory(
                user_id=user.id,
                query_type="Negotiation Strategy",
                response=strategy
            )
            db.add(history)
            db.commit()
        except Exception:
            db.rollback()

        return {
            "message": "AI Negotiation Strategy Generated Successfully",
            "strategy": strategy
        }
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate AI negotiation strategy: {str(e)}"
        )


# ========================
# LOAN SETTLEMENT
# ========================
@router.post("/loan-settlement")
def loan_settlement(request: NegotiationRequest):
    result = calculate_settlement_probability(
        request.overdue_months,
        "personal"
    )

    # FIX: no generate_negotiation_letter needed
    letter = (
        f"Dear {request.lender_name}, "
        f"we would like to propose a settlement of "
        f"{result['settlement_percentage']}% due to overdue status. "
        f"Please consider this offer for closure of the loan account."
    )

    return {
        "settlement_percentage": result["settlement_percentage"],
        "priority": result["priority"],
        "letter": letter
    }


# ========================
# DB SESSION
# ========================
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ========================
# UPDATE PROFILE
# ========================
@router.put("/update-profile")
def update_profile(
    profile: ProfileUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    try:
        user = db.query(User).filter(
            User.id == current_user.id
        ).first()

        user.monthly_income = profile.monthly_income
        user.monthly_expenses = profile.monthly_expenses
        user.lump_sum_available = profile.lump_sum_available

        db.commit()

        return {
            "message": "Profile updated successfully"
        }

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Failed to update profile: {str(e)}"
        )



# ADD LOAN
# ========================
@router.post("/add-loan")
def add_loan(
    loan: LoanCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    try:
        new_loan = Loan(
            user_id=current_user.id,
            lender_name=loan.lender_name,
            outstanding_amount=loan.outstanding_amount,
            interest_rate=loan.interest_rate,
            emi=loan.emi,
            overdue_months=loan.overdue_months,
            loan_type=loan.loan_type
        )

        db.add(new_loan)
        db.commit()
        db.refresh(new_loan)

        return {
            "message": "Loan added successfully",
            "loan_id": new_loan.id
        }

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Failed to add loan: {str(e)}"
        )
