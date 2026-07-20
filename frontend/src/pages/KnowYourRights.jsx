import "./../App.css";

function KnowYourRights() {
  return (
    <div className="page">
      <h1>Know Your Rights</h1>

      <div className="card-grid">
        <div className="card">
          <h3>RBI Guidelines</h3>
          <p>You have the right to fair loan restructuring.</p>
        </div>

        <div className="card">
          <h3>Debt Protection</h3>
          <p>Lenders cannot harass borrowers illegally.</p>
        </div>

        <div className="card">
          <h3>Settlement Option</h3>
          <p>You can negotiate reduced settlement amounts.</p>
        </div>
      </div>
    </div>
  );
}

export default KnowYourRights;