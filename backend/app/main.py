from fastapi import FastAPI, Depends, Form
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from app.database import Base, engine, get_db
from app.models import User, Loan, AIHistory
from app.auth import router as auth_router
from app.auth_utils import hash_password
from app.routes.ai_routes import router as ai_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="FinRelief AI")

# -----------------------------
# CORS
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "https://debt-relief-platform-xi.vercel.app",
        "https://ai-debt-relief-platform-mu.vercel.app",
        "https://ai-debt-relief-platform-git-main-mithun9661s-projects.vercel.app",
    ],
    allow_origin_regex=r"https://.*\.vercel\.app$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# ROUTERS
# -----------------------------
app.include_router(auth_router)
app.include_router(ai_router)

# -----------------------------
# HEALTH / HOME
# -----------------------------
@app.get("/", tags=["Health"])
def home():
    return {"message": "Welcome to FinRelief AI", "status": "ok"}

@app.get("/health", tags=["Health"])
def health():
    return {"status": "ok"}

# -----------------------------
# REGISTER
# -----------------------------
@app.post("/register")
@app.post("/register/")
def register(
    name: str = Form(""),
    email: str = Form(""),
    password: str = Form(""),
    db: Session = Depends(get_db),
):
    email = email.strip().lower()
    password = password.strip()
    name = name.strip()

    if not email or not password:
        return {
            "success": False,
            "message": "Email and Password required"
        }

    user = db.query(User).filter(User.email == email).first()

    if user:
        return {
            "success": False,
            "message": "User already exists"
        }

    new_user = User(
        email=email,
        password=hash_password(password),
        name=name
    )

    db.add(new_user)
    db.commit()

    return {
        "success": True,
        "message": "Registration Successful"
    }

# -----------------------------
# DASHBOARD
# -----------------------------
@app.get("/dashboard_data")
def dashboard_data():
    return {
        "monthly_surplus": 25000,
        "total_outstanding": 350000,
        "emi_ratio": "35%",
        "debt_stress": "Medium"
    }

# -----------------------------
# FINANCIAL HEALTH
# -----------------------------
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
            "Reduce unnecessary expenses.",
            "Pay high-interest loans first.",
            "Track monthly spending.",
            "Maintain emergency savings."
        ]
    }

@app.get("/settlement_predictor")
def settlement():
    return {"message": "Settlement prediction"}

@app.get("/ai_negotiation_strategy")
def negotiation():
    return {"message": "AI negotiation strategy"}

@app.get("/ai_history")
def history():
    return {"message": "History"}

@app.get("/test_db")
def test_db():
    return {"status": "Database Connected"}
