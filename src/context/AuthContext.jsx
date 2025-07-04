import React, { createContext, useContext, useState, useEffect } from "react";

// 1. Create Context
const AuthContext = createContext();

// 2. Custom Hook for easy access
export const useAuth = () => useContext(AuthContext);

// 3. Provider Component
export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);

  // Load user data from localStorage on app load
  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    const storedRole = localStorage.getItem("role");
    if (storedId && storedRole) {
      setUserId(storedId);
      setUserRole(storedRole);
    }
  }, []);

  const login = (id, role) => {
    localStorage.setItem("userId", id);
    localStorage.setItem("role", role);
    setUserId(id);
    setUserRole(role);
  };

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    setUserId(null);
    setUserRole(null);
  };

  const isLoggedIn = !!userId;

  return (
    <AuthContext.Provider
      value={{ userId, userRole, isLoggedIn, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
