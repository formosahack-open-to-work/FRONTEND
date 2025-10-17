import type React from "react";

import { useState } from "react";

import {
  AuthService,
  isApiValidationError,
} from "../../db/services/auth.service";
import type { LoginDTO } from "../../types/auth";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

type FieldErrorMap = Partial<Record<keyof LoginDTO, string>>;

export default function Login() {
  const { user } = useAuth();
  if (user) return <Navigate to="/forum" replace />;

  const [form, setForm] = useState<LoginDTO>({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrorMap>({});
  const [globalError, setGlobalError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setFieldErrors((p) => ({ ...p, [e.target.name]: "" }));
    setGlobalError("");
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFieldErrors({});
    setGlobalError("");

    try {
      await AuthService.login(form);
      // TODO: redirigir a Home o Profile
      window.location.href = "/forum";
    } catch (err) {
      if (isApiValidationError(err) && err.errors?.length) {
        const map: FieldErrorMap = {};
        for (const er of err.errors) {
          const k = er.param as keyof LoginDTO;
          map[k] = er.msg;
        }
        setFieldErrors(map);
      } else if (isApiValidationError(err) && err.message) {
        setGlobalError(err.message);
      } else {
        setGlobalError("Credenciales inválidas o error del servidor.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">
          Iniciar sesión
        </h1>

        {globalError && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 font-medium">
            {globalError}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
            {fieldErrors.email && (
              <p className="mt-1.5 text-xs text-red-600 font-medium">
                {fieldErrors.email}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Contraseña
            </label>
            <input
              name="password"
              type="password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
            {fieldErrors.password && (
              <p className="mt-1.5 text-xs text-red-600 font-medium">
                {fieldErrors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 px-4 py-3 rounded-lg font-semibold bg-primary text-white transition-all hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Ingresando..." : "Entrar"}
          </button>
          <p className="text-center text-sm text-gray-600 mt-4">
            ¿No tienes cuenta?{" "}
            <a
              href="/register"
              className="text-primary font-semibold hover:text-secondary transition-colors"
            >
              Regístrate
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}