from app.models import User
from app.models import Loan


def calculate_settlement_probability(user: User, loans: list[Loan]):

    total_outstanding = sum(
        loan.outstanding_amount for loan in loans
    )

    total_emi = sum(
        loan.emi for loan in loans
    )

    # Calculate EMI-to-Income Ratio
    if user.monthly_income > 0:
        emi_ratio = (
            total_emi / user.monthly_income
        ) * 100
    else:
        emi_ratio = 0

    # Calculate Debt-to-Income Ratio
    if user.monthly_income > 0:
        debt_to_income = (
            total_outstanding / user.monthly_income
        ) * 100
    else:
        debt_to_income = 0

    settlement_results = []

    for loan in loans:

        # Base settlement percentage
        settlement = 50.0
        risk_score = 0

        # Overdue months
        if loan.overdue_months > 0:
            settlement += 5
            risk_score += 20

        # EMI Ratio
        if emi_ratio > 50:
            settlement += 5
            risk_score += 15

        # High Interest Rate
        if loan.interest_rate > 12:
            settlement += 5
            risk_score += 10

        # Debt-to-Income Ratio
        if debt_to_income > 80:
            settlement += 5
            risk_score += 15

        # Settlement Limits
        settlement = max(
            40,
            min(75, settlement)
        )

        # Risk Category
        if risk_score >= 40:
            risk_category = "High"

        elif risk_score >= 20:
            risk_category = "Medium"

        else:
            risk_category = "Low"

        settlement_results.append(
            {
                "loan_id": loan.id,
                "lender_name": loan.lender_name,
                "outstanding_amount": loan.outstanding_amount,
                "interest_rate": loan.interest_rate,
                "emi": loan.emi,
                "emi_ratio": round(emi_ratio, 2),
                "debt_to_income_ratio": round(
                    debt_to_income,
                    2
                ),
                "suggested_settlement_percentage": settlement,
                "risk_score": risk_score,
                "risk_category": risk_category
            }
        )

    return settlement_results