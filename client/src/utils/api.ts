import axios from "axios";

const api = axios.create({
  baseURL: "https://dspl-server-288823573837.asia-south2.run.app/api",
  withCredentials: true, // send cookies
});

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
        await api.post("users/auth/refresh");
        return api(originalRequest);
      } catch (refreshError) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
