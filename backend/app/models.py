from sqlalchemy import Column, Integer, String, Float, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    # Authentication
    email = Column(String(255), unique=True, index=True, nullable=False)
    password = Column(String(255), nullable=False)
    # Profile
    name = Column(String(255), nullable=True)
    # Financial Profile
    monthly_income = Column(Float, default=0.0)
    monthly_expenses = Column(Float, default=0.0)
    lump_sum_available = Column(Float, default=0.0)
    loans = relationship("Loan", back_populates="user")


class Loan(Base):
    __tablename__ = "loans"

    id = Column(Integer, primary_key=True, index=True)

    outstanding_amount = Column(Float)
    interest_rate = Column(Float)
    emi = Column(Float)
    overdue_months = Column(Integer)
    loan_type = Column(String)
    lender_name = Column(String)

    user_id = Column(Integer, ForeignKey("users.id"))

    user = relationship("User", back_populates="loans")


class AIHistory(Base):
    __tablename__ = "ai_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer)
    query_type = Column(String)
    response = Column(Text)