import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// Crear el contexto
const AppContext = createContext();

// Proveedor del contexto
export const AppProvider = ({ children }) => {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [tasks, setTasks] = useState([]); // Estado para las tareas
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userId"); 
    setTasks([]); 
    setUserId(null); 
    navigate("/login"); 
  };

  const login = (id) => {
    localStorage.setItem("userId", id); 
    setUserId(id); 
    navigate("/tasks"); 
  };

  return (
    <AppContext.Provider value={{ userId, setUserId, tasks, setTasks, handleLogout, login }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook para usar el contexto en componentes
export const useApp = () => useContext(AppContext);
