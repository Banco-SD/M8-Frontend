import axios from "axios";

const GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL || "http://localhost:8080";

export const api = axios.create({
  baseURL: GATEWAY_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const authDataString = localStorage.getItem("authData");
      if (authDataString) {
        const authData = JSON.parse(authDataString);
        
        if (authData?.accessToken && config.headers) {
          config.headers.Authorization = `Bearer ${authData.accessToken}`;
        }
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        console.log("🔄 Token expirado. Tentando renovar com a API Java...");
        const authDataString = localStorage.getItem("authData");
        const authData = authDataString ? JSON.parse(authDataString) : null;

        if (!authData?.refreshToken) {
          throw new Error("Sem Refresh Token disponível.");
        }

    
        const response = await axios.post(`${GATEWAY_URL}/auth/refresh`, {
          refreshToken: authData.refreshToken
        });

        const novaSessao = response.data;
        localStorage.setItem("authData", JSON.stringify(novaSessao));

        originalRequest.headers.Authorization = `Bearer ${novaSessao.accessToken}`;
        return api(originalRequest);

      } catch (refreshError) {
        console.error("❌ Sessão expirada permanentemente. Faça login novamente.");
        if (typeof window !== "undefined") {
          localStorage.removeItem("authData");
          window.location.href = "/login"; 
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
