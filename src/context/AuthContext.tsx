import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { IUser } from "..//types/user";
import type { LoginDTO, RegisterDTO } from "../types/auth";
import {
  AuthService,
  isApiValidationError,
} from "..//db/services/auth.service";
import { clearToken, getToken } from "../common/storage";

// Qué expone el contexto
type AuthContextType = {
  user: IUser | null;
  loading: boolean; // carga global (hidratar perfil, etc.)
  busy: boolean; // acción en curso (login/register)
  login: (data: LoginDTO) => Promise<void>;
  register: (data: RegisterDTO) => Promise<void>;
  firstUser: (data: RegisterDTO) => Promise<void>;
  refreshProfile: () => Promise<void>;
  logout: () => void;
  error: string; // último error legible para UI
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  // hidrata el perfil si hay token
  useEffect(() => {
    (async () => {
      try {
        if (!getToken()) return;
        const profile = await AuthService.profile();
        setUser(profile);
      } catch {
        // token inválido/caducado
        clearToken();
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "auth:token") window.location.reload(); // o volver a hidratar perfil
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleAuthCall = async <T extends RegisterDTO | LoginDTO>(
    fn: (p: T) => Promise<{ token: string; user: IUser }>,
    payload: T
  ) => {
    setBusy(true);
    setError("");
    try {
      const res = await fn(payload);
      setUser(res.user);
    } catch (e) {
      if (isApiValidationError(e)) {
        // junta mensajes de express-validator o message general
        const msg =
          e.errors?.map((x) => `${x.param}: ${x.msg}`).join(" · ") ||
          e.message ||
          "Error de autenticación";
        setError(msg);
      } else {
        setError("Error inesperado. Intenta de nuevo.");
      }
      throw e;
    } finally {
      setBusy(false);
    }
  };

  const login = (data: LoginDTO) => handleAuthCall(AuthService.login, data);
  const register = (data: RegisterDTO) =>
    handleAuthCall(AuthService.register, data);
  const firstUser = (data: RegisterDTO) =>
    handleAuthCall(AuthService.firstUser, data);

  const refreshProfile = async () => {
    setLoading(true);
    setError("");
    try {
      const profile = await AuthService.profile();
      setUser(profile);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    clearToken();
    setUser(null);
  };

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      loading,
      busy,
      login,
      register,
      firstUser,
      refreshProfile,
      logout,
      error,
    }),
    [user, loading, busy, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
};
