import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../services/base"; 

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const storedId = localStorage.getItem("userId");

    if (storedId) {
      
      setUserId(storedId);

      axios.get(`${BASE_URL}/users/${storedId}`).then((res) => {
        setUserRole(res.data.role);
      });
    }
  }, []);

  const login = (id, role) => {
    localStorage.setItem("userId", id);
    setUserId(id);
    setUserRole(role); 
  };

  const logout = () => {
    localStorage.removeItem("userId");
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
