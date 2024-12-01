import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { handleLogout } = useApp();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(false); // Estado para manejar el modal

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const goHome = () => {
    if (isAuthenticated) {
      navigate("/tasks");
    } else {
      navigate("/");
    }
  };

  const confirmLogout = () => {
    handleLogout(); // Llama al método de cierre de sesión
    setShowModal(false); // Cierra el modal
  };

  const cancelLogout = () => {
    setShowModal(false); // Cierra el modal sin cerrar sesión
  };

  return (
    <>
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
          {isAuthenticated && (
            <button
              onClick={() => setShowModal(true)} // Muestra el modal
              className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition duration-300"
            >
              Cerrar Sesión
            </button>
          )}
        </div>
      </nav>

      {/* Modal de Confirmación */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-bold mb-4">¿Estás seguro de cerrar sesión?</h3>
            <p className="text-sm text-gray-600 mb-6">
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelLogout}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition duration-300"
              >
                Cancelar
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
