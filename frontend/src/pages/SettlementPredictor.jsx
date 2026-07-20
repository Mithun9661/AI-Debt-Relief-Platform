import "./../App.css";

function SettlementPredictor() {
  return (
    <div className="page">
      <h1>Settlement Predictor</h1>

      <div className="card-grid">
        <div className="card">
          <h3>Outstanding Amount</h3>
          <p>₹ 2,50,000</p>
        </div>

        <div className="card">
          <h3>Predicted Settlement</h3>
          <p>₹ 1,60,000</p>
        </div>

        <div className="card">
          <h3>Settlement %</h3>
          <p>64%</p>
        </div>

        <div className="card">
          <h3>Savings</h3>
          <p>₹ 90,000</p>
        </div>
      </div>
    </div>
  );
}

export default SettlementPredictor;