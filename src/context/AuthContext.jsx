
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../services/base";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedId = localStorage.getItem("userId");

    if (storedId) {
      setUserId(storedId);

      axios
        .get(`${BASE_URL}/users/${storedId}`)
        .then((res) => {
          const user = res.data;

          
          if (user.status === "blocked") {
            alert("Your account has been blocked by the admin.");
            logout(); // Auto logout
            navigate("/login");
          } else {
            setUserRole(user.role);
          }
        })
        .catch((err) => {
          console.error("Auth load failed", err);
          logout(); // 
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
