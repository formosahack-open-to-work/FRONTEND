import { Link } from "react-router-dom";
import AppRoutes from "./router/AppRoutes";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="flex items-center justify-between px-4 py-3 bg-primary text-white">
        <Link to="/" className="font-semibold">
          Hackatón Web
        </Link>
        <div className="flex items-center gap-3">
          {user && (
            <span className="text-sm opacity-90">
              {user.name} · {user.role}
            </span>
          )}
          {user ? (
            <button onClick={logout} className="px-3 py-1 rounded bg-black/20">
              Salir
            </button>
          ) : (
            <Link to="/login" className="px-3 py-1 rounded bg-black/20">
              Entrar
            </Link>
          )}
        </div>
      </nav>

      <main className="flex-1 p-6 max-w-5xl mx-auto w-full">
        <AppRoutes />
      </main>
    </div>
  );
}
