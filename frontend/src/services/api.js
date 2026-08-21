import axios from "axios";

const API = axios.create({
  baseURL: "/api",
});

API.interceptors.request.use((req) => {
  const publicPaths = ["/register", "/login"];
  const isPublicRequest = publicPaths.includes(req.url);

  if (!isPublicRequest) {
    const token = localStorage.getItem("token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
  }

  return req;
});

export default API;
