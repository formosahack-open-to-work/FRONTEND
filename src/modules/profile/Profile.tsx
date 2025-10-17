export type Role = "admin" | "user";
import Logo from '../../assets/images/Logo.png';
import React from 'react';
import { useAuth } from '../../context/AuthContext';


const Profile: React.FC = () => {
  const { user } = useAuth();
  {console.log(user);}

  // Si user es null, mostrar mensaje de carga o redireccionar
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-md overflow-hidden w-full max-w-md p-6 text-center">
          <p>No hay usuario autenticado</p>
          {/* O puedes mostrar un spinner de carga */}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-md overflow-hidden w-full max-w-md">
        {/* Cabecera con foto de perfil - SEPARADO del gradiente */}
        <div className="relative">
          {/* Fondo gradiente */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-32"></div>
          
          {/* Avatar posicionado de forma estática */}
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <img
              src={Logo}
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg bg-white"
            />
          </div>
        </div>

        {/* Espacio para el avatar */}
        <div className="h-16"></div>

        {/* Información del usuario */}
        <div className="p-6 text-center mt-4">
          <h1 className="text-2xl font-bold text-gray-800">{user.data.name}</h1>
          <p className="text-gray-600 mt-2">{user.data.email}</p>
        </div>

        
      </div>
    </div>
  );
};

export default Profile;