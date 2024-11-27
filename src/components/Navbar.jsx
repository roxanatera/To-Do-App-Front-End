import React from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import { useApp } from '../context/AppContext'; // Importar el contexto de la aplicación

export default function Navbar() {
  const navigate = useNavigate(); // Definir navigate con el hook useNavigate
  const { handleLogout } = useApp();

  const goHome = () => {
    navigate("/"); 
  };

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-4 shadow-md">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center cursor-pointer" onClick={goHome}>
          <img
            src="/to-do.webp"
            alt="To-Do App Logo"
            className="w-12 h-12 rounded-full mr-3 border-2 border-white"
          />
          <span className="text-2xl font-bold">To-Do App</span>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition duration-300"
        >
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
}
