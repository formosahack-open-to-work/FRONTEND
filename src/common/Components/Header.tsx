import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext"; 
import Logo from '../../assets/images/Logo.png';

interface NavItem {
  name: string;
  href: string;
  adminOnly?: boolean;
}

// Definir todas las rutas privadas
const privateNavItems: NavItem[] = [
  { name: "Foro", href: "/forum" },
  { name: "Consejos", href: "/explorer" },
  { name: "SerenAI", href: "/chat" },
  { name: "Dashboard", href: "/dashboard", adminOnly: true },
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

  // Filtrar nav items basado en el rol del usuario
  const getNavItems = () => {
    if (!user) return [];
    
    return privateNavItems.filter(item => {
      // Si no es solo para admin, mostrar a todos los usuarios autenticados
      if (!item.adminOnly) return true;
      // Si es solo para admin, verificar si el usuario es admin
      return user.role === 'admin'; // Ajusta según tu estructura de usuario
    });
  };

  // Solo mostrar nav items si hay usuario
  const finalNavItems = user ? getNavItems() : [];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 py-2 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* LOGO */}
          <div className="flex-shrink-0">
            <a
              href="/"
              className="flex items-center space-x-2 hover:scale-[1.02] transition-transform"
            >
              <span className="text-2xl font-extrabold text-gray-900">
                <span className="text-primary-600">Serena</span>
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
                  <div
                    onClick={handleDropdownClick}
                    className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-200 transition cursor-pointer"
                  >
                    {/* AVATAR DEL USUARIO CORREGIDO */}
                    <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-300">
                      <img 
                        src={ Logo} 
                        alt="Avatar"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback si la imagen no carga
                          e.target.src = Logo;
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {user.data.name}
                    </span>
                    <svg 
                      className={`w-4 h-4 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {/* Dropdown con transición mejorada */}
                  <div 
                    className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 transform ${
                      isDropdownOpen 
                        ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' 
                        : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                    }`}
                  >
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900 truncate">{user.data.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.data.email}</p>
                    </div>
                    <a
                      href="/profile"
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
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </a>
          ))}

          {!user ? (
            <>
              <a
                href="/login"
                className="block text-white bg-primary-600 rounded-md px-3 py-2 text-center font-medium hover:bg-primary-700"
                onClick={() => setIsOpen(false)}
              >
                Iniciar Sesión
              </a>
              <a
                href="/register"
                className="block text-primary-600 border border-primary-600 rounded-md px-3 py-2 text-center font-medium hover:bg-indigo-50"
                onClick={() => setIsOpen(false)}
              >
                Registrarse
              </a>
            </>
          ) : (
            <>
              {/* Información del usuario en móvil */}
              <div className="px-3 py-2 border-t border-gray-200 mt-2">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              <a
                href="/p"
                className="block text-gray-700 hover:bg-indigo-50 px-3 py-2 rounded-md font-medium"
                onClick={() => setIsOpen(false)}
              >
                Mi Perfil
              </a>
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50 rounded-md"
              >
                Cerrar Sesión
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
}