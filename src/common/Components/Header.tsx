import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext"; 
import { CgProfile } from "react-icons/cg";

interface NavItem {
  name: string;
  href: string;
}

// Solo rutas que requieren autenticación
const privateNavItems: NavItem[] = [
  { name: "Inicio", href: "/" },
  { name: "Foro", href: "/foro" },
  { name: "Explorar", href: "/explorar" },
  { name: "Dashboard", href: "/dashboard" },
];

export default function Header() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  // Cerrar dropdown cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleDropdownMouseEnter = () => {
    setIsDropdownOpen(true);
    // Limpiar timeout cuando el mouse entra
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleDropdownMouseLeave = () => {
    // Esperar 600ms antes de cerrar (tiempo suficiente para mover el mouse)
    timeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 600);
  };

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
    // Limpiar cualquier timeout pendiente al hacer clic
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleLogout = async () => {
    try {
      logout();
      setIsOpen(false);
      setIsDropdownOpen(false);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  // Solo mostrar nav items si hay usuario
  const finalNavItems = user ? privateNavItems : [];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 py-2">
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

          {/* NAV Desktop - Solo se muestra si hay items */}
          {finalNavItems.length > 0 && (
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
          )}

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
                {/* PERFIL CON DROPDOWN MEJORADO */}
                <div 
                  className="relative"
                  ref={dropdownRef}
                  onMouseEnter={handleDropdownMouseEnter}
                  onMouseLeave={handleDropdownMouseLeave}
                >
                  <button 
                    onClick={handleDropdownClick}
                    className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-200 transition"
                  >
                    <CgProfile size={35} color="#141A45"/>
                  </button>

                  {/* Dropdown con transición mejorada */}
                  <div 
                    className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 transform ${
                      isDropdownOpen 
                        ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' 
                        : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                    }`}
                  >
                    <a
                      href="/perfil"
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 transition-colors duration-200"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Mi Perfil
                    </a>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 border-t border-gray-100 transition-colors duration-200"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* MENÚ MÓVIL - Siempre visible para el botón hamburguesa */}
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
          {/* Solo mostrar items de navegación si hay usuario */}
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
              Cerrar Sesión 
            </button>
          )}
        </div>
      )}
    </header>
  );
}