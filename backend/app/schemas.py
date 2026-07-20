from pydantic import BaseModel

class NegotiationRequest(BaseModel):
    loan_amount: float
    monthly_income: float
    overdue_months: int
    lender_name: str

class ProfileUpdate(BaseModel):
    monthly_income: float
    monthly_expenses: float
    lump_sum_available: float


class LoanCreate(BaseModel):
    lender_name: str
    outstanding_amount: float
    interest_rate: float
    emi: float
    overdue_months: int
    loan_type: str