import axios from "axios";

const api = axios.create({
  // baseURL: "https://dspl-server-288823573837.asia-south2.run.app/api", GCP api end point
  baseURL: "https://api.divydaminispices.com/api",
  // baseURL: "http://localhost:3001/api",
});

// Attach accessToken from localStorage to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let refreshAttempts = 0;
const MAX_REFRESH_ATTEMPTS = 2;

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (refreshAttempts >= MAX_REFRESH_ATTEMPTS) {
        window.location.href = "/login";
        return Promise.reject(error);
      }

      originalRequest._retry = true;
      refreshAttempts += 1;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("No refresh token");
        // Send refresh token in Authorization header
        const refreshRes = await api.post(
          "users/auth/refresh",
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );
        // Save new accessToken if present
        if (refreshRes.data?.accessToken) {
          localStorage.setItem("accessToken", refreshRes.data.accessToken);
        }
        return api(originalRequest);
      } catch (refreshError) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
