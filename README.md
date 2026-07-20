💰 AI-Powered Debt Relief & Financial Recovery Platform (FinRelief AI)

An AI-powered financial assistance platform that helps borrowers analyze their financial health, predict loan settlement possibilities, and generate AI-based negotiation strategies for better debt recovery.

Built using React.js, FastAPI, SQLite, SQLAlchemy, and Google Gemini AI.



📌 Features

- 🔐 Secure User Registration & Login
- 💼 User Financial Profile Management
- 💳 Loan Management System
- 📊 Financial Health Analysis
- 💰 AI-Based Settlement Prediction
- 🤖 AI Negotiation Strategy Generator
- 📈 Dashboard with Financial Insights
- 📝 AI History Tracking
- 🧪 API Testing with Swagger UI

---

🏗️ Project Architecture

User
   ↓
React.js Frontend
   ↓
FastAPI Backend
   ↓
Business Logic Layer
 ├── Authentication
 ├── Financial Health Engine
 ├── Settlement Prediction Engine
 ├── AI Negotiation Engine
 └── Loan Management
   ↓
SQLite Database + Google Gemini API


📂 Project Structure

AI-Powered-Debt-Relief-Financial-Recovery-Platform/
│
├── .git/
├── backend/
│   ├── app/
│   │   ├── AI/
│   │   ├── Auth/
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   └── models.py
│   │   ├── routes/
│   │   │   ├── AI.py
│   │   │   ├── AI_routes.py
│   │   │   ├── debts.py
│   │   │   └── users.py
│   │   ├── services/
│   │   │   └── gemini_service.py
│   │   ├── __init__.py
│   │   ├── ai_negotiation_engine.py
│   │   ├── auth.py
│   │   ├── auth_utils.py
│   │   ├── config.py
│   │   ├── database.py
│   │   ├── financial_engine.py
│   │   ├── main.py
│   │   ├── schemas.py
│   │   └── settlement_engine.py
│   │
│   ├── venv/
│   ├── .env
│   ├── .gitignore
│   ├── dependencies.py
│   ├── finrelief.db
│   ├── package-lock.json
│   └── requirements.txt
│
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   ├── .git/
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   └── vite.config.js
│
├── ER_Diagram/
├── requests/
├── venv/
├── package-lock.json
└── README.md

---

⚙️ Technologies Used

Technology| Purpose
React.js| Frontend UI
FastAPI| Backend API
SQLite| Database
SQLAlchemy| ORM
Google Gemini AI| AI Negotiation Strategy
JWT| Authentication
PyTest| API Testing
Git & GitHub| Version Control

---

🚀 Installation

1. Clone Repository

git clone <repository-url>

2. Create Virtual Environment

python -m venv .venv

Activate Environment

Windows

.venv\Scripts\activate

Linux / macOS

source .venv/bin/activate

3. Install Dependencies

pip install -r requirements.txt

---

▶️ Run Backend

uvicorn app.main:app --reload

Backend URL

http://127.0.0.1:8001

Swagger Documentation

http://127.0.0.1:8001/docs

---

▶️ Run Frontend

npm install
npm run dev

Frontend URL

http://localhost:5173

---

🧪 Running Tests

pytest -v


🌟 Future Enhancements

- Email Notifications
- Multi-bank Integration
- Credit Score Analysis
- PDF Financial Reports
- Cloud Deployment (AWS/Azure)
- Mobile Application

---

👨‍💻 Team Members

Project: AI-Powered Debt Relief & Financial Recovery Platform

- Team Leader: Madhu Thaddi
Github Repository : https://github.com/Mithun9661-commits/AI-Debt-Relief-Platform-.git 
- Member 1: Durga Prasad Gandiboina
- Member 2: Mithun Kumar
- Member 3: Lohitha Gude
- Member 4: Mani Prabha Bhuvanasi

---

📜 License

This project was developed for educational purposes as part of the Skill Wallet Internship Program.-
