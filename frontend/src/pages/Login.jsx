import API from "../services/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../App.css";

const DEMO_EMAIL = "demo@finrelief.com";
const DEMO_PASSWORD = "demo123";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    // Temporary demo access so the deployed app can be opened without registration.
    if (email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD) {
      localStorage.setItem("token", "demo-token");
      localStorage.setItem("demo_user", "true");
      navigate("/dashboard");
      return;
    }

    try {
      setLoading(true);
      const res = await API.post("/login", { email, password });
      localStorage.setItem("token", res.data.access_token);
      localStorage.removeItem("demo_user");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.detail || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="left-panel">
        <h1 className="logo">FinRelief AI</h1>
        <h2>Take Control of Your Financial Future</h2>
        <p>AI-powered debt management that helps you negotiate smarter, settle faster, and live debt-free sooner.</p>
        <div className="features">
          <div className="feature-card"><h3>40-75%</h3><p>Settlement Success</p></div>
          <div className="feature-card"><h3>AI</h3><p>Negotiation Engine</p></div>
          <div className="feature-card"><h3>Free</h3><p>Financial Analysis</p></div>
        </div>
      </div>
      <div className="right-panel">
        <div className="login-card">
          <h2>Welcome Back</h2>
          <p>Sign in to your dashboard</p>
          <div className="tabs">
            <button className="active" type="button">Sign In</button>
            <button type="button" onClick={() => navigate("/register")}>Register</button>
          </div>
          <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="login-btn" type="button" onClick={handleLogin} disabled={loading}>{loading ? "Signing in..." : "Sign In"}</button>
          <p style={{ marginTop: "12px", fontSize: "13px" }}>
            Demo access: {DEMO_EMAIL} / {DEMO_PASSWORD}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
