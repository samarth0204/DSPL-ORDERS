import axios from "axios";

const api = axios.create({
  baseURL: "https://dspl-server-288823573837.asia-south2.run.app/api",
  withCredentials: true, // send cookies
});

// Interceptor to handle expired tokens
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // attempt token refresh
        await api.post("users/auth/refresh");
        return api(originalRequest); // retry original request
      } catch (refreshError) {
        // refresh failed -> logout
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
