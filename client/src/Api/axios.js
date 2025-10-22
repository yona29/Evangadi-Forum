import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_REMOTE_API_BASE_URL,
  // baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Attach token only for protected routes
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
