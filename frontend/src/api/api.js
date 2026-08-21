import axios from "axios";

const api = axios.create({
  baseURL: "https://ai-debt-relief-platform-1-flex.onrender.com",
});

api.interceptors.request.use((config) => {
  const publicPaths = ["/register", "/login"];
  const isPublicRequest = publicPaths.includes(config.url);

  if (!isPublicRequest) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default api;
export const getDashboardData = () => api.get("/dashboard_data");
export const getFinancialHealth = () => api.get("/financial_health");
export const getSettlementPrediction = () => api.get("/settlement_predictor");
export const getAINegotiation = () => api.get("/ai_negotiation_strategy");
