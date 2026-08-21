import API from "../api/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await API.post("/register", formData);
      setMessage(response.data?.message || "Registration successful");
      setTimeout(() => navigate("/"), 700);
    } catch (error) {
      setMessage(
        error.response?.data?.detail ||
        error.response?.data?.message ||
        "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="right-panel" style={{ margin: "0 auto" }}>
        <div className="login-card">
          <h2>Create Account</h2>
          <p>Register for FinRelief AI</p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />

            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              minLength={6}
            />

            <button className="login-btn" type="submit" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          {message && <p style={{ marginTop: "12px" }}>{message}</p>}

          <button
            type="button"
            onClick={() => navigate("/")}
            style={{ marginTop: "10px" }}
          >
            Back to Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
