import { Link, useLocation } from "react-router-dom";
import "./../App.css";

function Sidebar() {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ? "active" : "";

  return (
    <div className="sidebar">

      {/* LOGO */}
      <div className="logo-box">
        <h2>🏦 FinRelief AI</h2>
        <p>Smart Banking Dashboard</p>
      </div>

      <Link className={isActive("/dashboard")} to="/dashboard">
        📊 Dashboard
      </Link>

      <Link className={isActive("/settlement")} to="/settlement">
        💰 Settlement
      </Link>

      <Link className={isActive("/negotiation")} to="/negotiation">
        ✉️ Negotiation
      </Link>

      <Link className={isActive("/rights")} to="/rights">
        📜 Rights
      </Link>

      <Link className={isActive("/history")} to="/history">
        📁 History
      </Link>

      <div
        className="logout"
        onClick={() => (window.location.href = "/")}
      >
        🚪 Logout
      </div>

    </div>
  );
}

export default Sidebar;