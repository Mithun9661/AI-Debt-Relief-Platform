import API from "../services/api";
import { useEffect } from "react";
import "./../App.css";
import {useState} from "react";
import Dashboard from "./Dashboard"

function Login() {
  const [loggedIn, setLoggedIn]= useState(false);
  if (loggedIn){
    return <Dashboard />;
  }
  useEffect(() => {
    API.get("/dashboard_data")
      .then((res) => {
        console.log("Backend Connected ✔");
      })
      .catch((err) => {
        console.log("Backend Error ❌", err);
      });
}, []);
    
  return (
    <div className="login-page">
      <div className="left-panel">
        <h1 className="logo">FinRelief AI</h1>

        <h2>Take Control of Your Financial Future</h2>

        <p>
          AI-powered debt management that helps you negotiate smarter,
          settle faster, and live debt-free sooner.
        </p>

        <div className="features">
          <div className="feature-card">
            <h3>40-75%</h3>
            <p>Settlement Success</p>
          </div>

          <div className="feature-card">
            <h3>AI</h3>
            <p>Negotiation Engine</p>
          </div>

          <div className="feature-card">
            <h3>Free</h3>
            <p>Financial Analysis</p>
          </div>
        </div>
      </div>

      <div className="right-panel">
        <div className="login-card">

          <h2>Welcome Back</h2>

          <p>Sign in to your dashboard</p>

          <div className="tabs">
            <button className="active">Sign In</button>
            <button>Register</button>
          </div>

          <input
            type="email"
            placeholder="Email Address"
          />

          <input
            type="password"
            placeholder="Password"
          />

          <button className="login-btn"
            onClick={()=> window.location.href = "/dashboard"}>
          </button>

        </div>
      </div>
    </div>
  );
}

export default Login;