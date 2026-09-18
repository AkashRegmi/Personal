import axios from "axios";
import { getRefreshToken } from "../helper/getAccessToken";
const API_URL = import.meta.env.VITE_PRODUCT;
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && accessToken !== "undefined" && accessToken !== "null") {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const originalRequest = error.config;
    // If refresh request itself fails with 401,
    // the refresh token is invalid/expired.
    if (
      error.response?.status === 401 &&
      originalRequest?.url?.includes("/api/auth/refresh")
    ) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      window.location.href = "/login";

      return Promise.reject(error);
    }
    // No response at all (network error) or not a 401 → just reject
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite loop
      try {
        // Attempt to refresh the access token
        const token = getRefreshToken();
       
        const response = await axios.post(
          `${API_URL}api/auth/refresh`,
          {
            oldRefreshToken: token,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const newAccessToken = response?.data?.accessToken;
        localStorage.setItem("accessToken", newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        // Retry the original request with the new token
        return axios(originalRequest);
      } catch (error) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");

        window.location.href = "/login";
        return Promise.reject(error);
      }
    }
  },
);
export default api;
