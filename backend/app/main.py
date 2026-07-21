from app.database import engine, Base 
from app.models import User, Loan, AIHistory
from app.routes.ai_routes import router as ai_router
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="FinRelief AI")
app.include_router(ai_router)
#Base.metadata.create_all(bind=engine)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5174", "https://debt-relief-platform-xi.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Welcome to FinRelief AI"}

@app.post("/register")
def register():
    return {"message": "User registered successfully"}

@app.get("/debug_user")
def debug_user():
    return {"message": "Debug user"}

from app.auth import create_token

@app.post("/login")
def login():
    token = create_token({"sub": "user@example.com"})
    return {
        "message": "Login successful",
        "access_token": token,
        "token_type": "bearer"
    }

@app.put("/update_profile")
def update_profile():
    return {"message": "Profile updated"}

@app.post("/add_loan")
def add_loan():
    return {"message": "Loan added"}

@app.get("/loans")
def get_loans():
    return {"message": "Loans retrieved"}

@app.delete("/delete_loan/{loan_id}")
def delete_loan(loan_id: int):
    return {"message": f"Loan {loan_id} deleted"}

@app.get("/dashboard_data")
def dashboard_data():
    return {
        "monthly_surplus": 25000,
        "total_outstanding": 350000,
        "emi_ratio": "35%",
        "debt_stress": "Medium"
    }

@app.get("/settlement_predictor")
def settlement_predictor():
    return {"message": "Settlement prediction"}

@app.get("/ai_negotiation_strategy")
def ai_negotiation_strategy():
    return {"message": "AI negotiation strategy"}

@app.get("/generate_negotiation_email/{loan_id}")
def generate_negotiation_email(loan_id: int):
    return {"message": f"Negotiation email generated for loan {loan_id}"}

@app.get("/ai_history")
def ai_history():
    return {"message": "AI history"}

@app.get("/financial_health")
def financial_health():
    return {
        "monthly_income": 50000,
        "monthly_expenses": 25000,
        "monthly_surplus": 25000,
        "lump_sum_available": 100000,
        "emi_ratio": "35%",
        "debt_ratio": "45%",
        "stress_level": "Low",
        "settlement_percentage": "60%",
        "tips": [
            "Reduce discretionary spending to increase surplus.",
            "Use lump sum to repay high-interest loans first.",
            "Track all monthly expenses carefully.",
            "Contact lenders for restructuring if needed."
        ]
    }

@app.get("/debt_timeline")
def debt_timeline():
    return {"message": "Debt timeline"}

@app.get("/test_db")
def test_db():
    return {"status": "Database connection successful"}