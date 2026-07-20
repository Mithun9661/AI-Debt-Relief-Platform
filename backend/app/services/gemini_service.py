import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel("gemini-1.5-flash")


def generate_negotiation_letter(
    lender_name,
    outstanding_amount,
    monthly_income,
    overdue_months
):

    prompt = f"""
    Generate a professional debt settlement negotiation letter.

    Lender: {lender_name}
    Outstanding Amount: ₹{outstanding_amount}
    Monthly Income: ₹{monthly_income}
    Overdue Months: {overdue_months}

    The borrower is facing financial hardship and requests a settlement offer.
    Generate a professional email to the lender.
    """

    response = model.generate_content(prompt)

    return response.text