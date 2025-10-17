import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: "Inicio", href: "/" },
  { name: "Foro", href: "/forum" },
  { name: "Explorar", href: "/explorar" },
];

export default function Header() {
  const { user, logout } = useAuth(); // obtenemos el usuario real

  console.log(user);

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      logout();
      setIsOpen(false);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  // Si el usuario está autenticado, añadimos Dashboard
  const finalNavItems = user
    ? [...navItems, { name: "Dashboard", href: "/dashboard" }]
    : navItems;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* LOGO */}
          <div className="flex-shrink-0">
            <a
              href="/"
              className="flex items-center space-x-2 hover:scale-[1.02] transition-transform"
            >
              <span className="text-2xl font-extrabold text-gray-900">
                <span className="text-primary-600">Formo</span>Foro
              </span>
            </a>
          </div>

          {/* NAV Desktop */}
          <nav className="hidden md:flex space-x-8">
            {finalNavItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-primary-600 font-semibold transition duration-150 ease-in-out py-1 border-b-2 border-transparent hover:border-indigo-500"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* BOTONES ACCIÓN Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <>
                <a
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-xl hover:bg-primary-700 transition"
                >
                  Iniciar Sesión
                </a>
                <a
                  href="/register"
                  className="px-4 py-2 text-sm font-medium text-primary-600 border border-primary-600 rounded-xl hover:bg-indigo-50 transition"
                >
                  Registrarse
                </a>
              </>
            ) : (
              <>
                {/* PERFIL */}
                <div className="relative group">
                  <button className="flex items-center space-x-2 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
                    <svg
                      className="h-6 w-6 text-primary-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="text-sm font-medium text-gray-700 hidden lg:inline">
                      {user.data.name || "Usuario"}
                    </span>
                  </button>

                  {/* Dropdown */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden opacity-0 group-hover:opacity-100 transition pointer-events-none group-hover:pointer-events-auto">
                    <a
                      href="/perfil"
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50"
                    >
                      Mi Perfil
                    </a>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 border-t border-gray-100"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* MENÚ MÓVIL */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            >
              {isOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MENÚ MÓVIL RESPONSIVO */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-3 space-y-2">
          {finalNavItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="block text-gray-700 hover:bg-indigo-50 hover:text-primary-700 px-3 py-2 rounded-md font-medium"
            >
              {item.name}
            </a>
          ))}

          {!user ? (
            <>
              <a
                href="/login"
                className="block text-white bg-primary-600 rounded-md px-3 py-2 text-center font-medium hover:bg-primary-700"
              >
                Iniciar Sesión
              </a>
              <a
                href="/register"
                className="block text-primary-600 border border-primary-600 rounded-md px-3 py-2 text-center font-medium hover:bg-indigo-50"
              >
                Registrarse
              </a>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50 rounded-md mt-2"
            >
              Cerrar Sesión ({user.data.name || "Usuario"})
            </button>
          )}
        </div>
      )}
    </header>
  );
}
