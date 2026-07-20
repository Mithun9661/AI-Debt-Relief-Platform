from fastapi import APIRouter
from ..services.gemini_service import generate_negotiation_letter

router = APIRouter(
    prefix="/ai",
    tags=["AI Services"]
)


@router.get("/negotiation-letter")
def negotiation_letter(
    lender_name: str,
    outstanding_amount: float,
    monthly_income: float,
    overdue_months: int
):

    letter = generate_negotiation_letter(
        lender_name,
        outstanding_amount,
        monthly_income,
        overdue_months
    )

    return {
        "generated_letter": letter
    }