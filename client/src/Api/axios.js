import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Only attach token for protected routes
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (
    token &&
    !config.url.includes("forgot-password") &&
    !config.url.includes("reset-password")
  ) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
