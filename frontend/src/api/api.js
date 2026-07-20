import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8001",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
export const getDashboardData = () => api.get("/dashboard_data");

export const getFinancialHealth = () => api.get("/financial_health");

export const getSettlementPrediction = () => api.get("/settlement_predictor");

export const getAINegotiation = () => api.get("/ai_negotiation_strategy");