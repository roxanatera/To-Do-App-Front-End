import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [tasks, setTasks] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token")); // Estado de autenticación
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Actualiza el estado según la existencia del token
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setTasks([]);
    setUserId(null);
    setIsAuthenticated(false); // Actualiza el estado
    navigate("/login");
  };

  const login = (id) => {
    localStorage.setItem("userId", id);
    setUserId(id);
    setIsAuthenticated(true); // Marca como autenticado
    navigate("/tasks");
  };

  return (
    <AppContext.Provider
      value={{
        userId,
        setUserId,
        tasks,
        setTasks,
        handleLogout,
        login,
        isAuthenticated,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
