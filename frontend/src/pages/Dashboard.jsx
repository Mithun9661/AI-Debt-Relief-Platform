import "./../App.css";

function Dashboard() {
  return (
    <div>
      <h1>Financial Dashboard</h1>

      <div className="card-grid">

        <div className="card">
          <h3>💰 Monthly Surplus</h3>
          <p>₹ 25,000</p>
        </div>

        <div className="card">
          <h3>🏦 Total Outstanding</h3>
          <p>₹ 2,50,000</p>
        </div>

        <div className="card">
          <h3>📊 EMI Ratio</h3>
          <p>35%</p>
        </div>

        <div className="card">
          <h3>⚠️ Debt Stress</h3>
          <p>Medium</p>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;