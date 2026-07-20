import os
import importlib
from dotenv import load_dotenv

load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY", "")


def _call_gemini(prompt: str) -> str:
    """Call Google Gemini API if key is available, otherwise use rule-based fallback."""

    if not GOOGLE_API_KEY:
        return None

    try:
        genai = importlib.import_module("google.generativeai")

        genai.configure(api_key=GOOGLE_API_KEY)

        model = genai.GenerativeModel("gemini-1.5-flash")

        response = model.generate_content(prompt)

        return response.text

    except ImportError:
        return None

    except Exception as e:
        print(f"Gemini API error: {e}")
        return None


def generate_negotiation_strategy(request):
    prompt = f"""
    Loan Amount: {request.loan_amount}
    Monthly Income: {request.monthly_income}
    Overdue Months: {request.overdue_months}
    Lender: {request.lender_name}

    Suggest the best negotiation strategy.
    """

    ai_response = _call_gemini(prompt)

    if ai_response:
        return ai_response

    # Rule-based fallback
    if request.overdue_months >= 6:
        return (
            f"Offer a settlement of around 60% of the outstanding loan to "
            f"{request.lender_name}. Explain your financial hardship and "
            f"request a one-time settlement."
        )

    return (
        f"Request EMI restructuring from {request.lender_name} "
        f"and continue regular monthly payments."
    )