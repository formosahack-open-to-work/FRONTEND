import axios from "axios";
import { getToken } from "../common/storage";

const baseURL = import.meta.env.VITE_API_BASE ?? "http://localhost:4000";

export const http = axios.create({
  baseURL,
  withCredentials: true, // por si el back setea cookies
});

// Agregar Authorization si hay token guardado
http.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Normalizar errores
http.interceptors.response.use(
  (res) => res,
  (err) => {
    // Deja pasar el payload crudo para que el servicio lo interprete
    return Promise.reject(err?.response?.data ?? err);
  }
);
