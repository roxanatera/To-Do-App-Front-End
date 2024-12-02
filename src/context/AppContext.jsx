import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [userName, setUserName] = useState(localStorage.getItem("userName")); // Cargar nombre desde localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
      setUserId(null);
      setUserName(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    setUserId(null);
    setUserName(null);
    setIsAuthenticated(false);
    navigate("/login");
  };

  const login = (id, token, name) => {
    localStorage.setItem("userId", id);
    localStorage.setItem("token", token);
    localStorage.setItem("userName", name); // Almacena el nombre del usuario
    setUserId(id);
    setUserName(name); // Actualiza el estado global
    setIsAuthenticated(true);
    navigate("/tasks");
  };

  return (
    <AppContext.Provider
      value={{
        userId,
        userName,
        isAuthenticated,
        login,
        handleLogout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
