import "./FinancialHealth.css";

import { useEffect, useState } from "react";

import API from "../services/api";

function FinancialHealth() {
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get("/financial_health")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  if (!data) {
    return <h2>Loading Financial Health...</h2>;
  }

  return (
    <div className="container">
      <h1 className="title">💚 Financial Health Dashboard</h1>
      <p className="subtitle">
        Detailed analysis of your debt stress and repayment capacity
      </p>

      <div className="stress-section">
        <h2>Overall Financial Stress</h2>
        <span className="badge">{data.stress_level}</span>
      </div>

      <h2 className="section-title">Financial Overview</h2>

      <div className="cards">

        <div className="card">
          <h3>Monthly Income</h3>
          <p>₹{data.monthly_income}</p>
        </div>

        <div className="card">
          <h3>Monthly Expenses</h3>
          <p>₹{data.monthly_expenses}</p>
        </div>

        <div className="card">
          <h3>Monthly Surplus</h3>
          <p>₹{data.monthly_surplus}</p>
        </div>

        <div className="card">
          <h3>Lump Sum Available</h3>
          <p>₹{data.lump_sum_available}</p>
        </div>

        <div className="card">
          <h3>EMI Ratio</h3>
          <p>{data.emi_ratio}</p>
        </div>

        <div className="card">
          <h3>Debt Ratio</h3>
          <p>{data.debt_ratio}</p>
        </div>

        <div className="card">
          <h3>Settlement Percentage</h3>
          <p>{data.settlement_percentage}</p>
        </div>

      </div>

      <div className="tips">
        <h2>Improvement Tips</h2>

        <ul>
          {data.tips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FinancialHealth;