import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
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
        await api.post("/auth/refresh");
        return api(originalRequest); // retry original request
      } catch (refreshError) {
        // refresh failed -> logout
        window.location.href = "/DSPL-ORDERS/#/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
