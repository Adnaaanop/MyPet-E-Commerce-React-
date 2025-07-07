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
// import React, { createContext, useContext, useState, useEffect } from "react";

// // 1. Create Context
// const AuthContext = createContext();

// // 2. Custom Hook for easy access
// export const useAuth = () => useContext(AuthContext);

// // 3. Provider Component
// export const AuthProvider = ({ children }) => {
//   const [userId, setUserId] = useState(null);
//   const [userRole, setUserRole] = useState(null);

//   // Load user data from localStorage on app load
//   useEffect(() => {
//     const storedId = localStorage.getItem("userId");
//     const storedRole = localStorage.getItem("role");
//     if (storedId && storedRole) {
//       setUserId(storedId);
//       setUserRole(storedRole);
//     }
//   }, []);

//   const login = (id, role) => {
//     localStorage.setItem("userId", id);
//     localStorage.setItem("role", role);
//     setUserId(id);
//     setUserRole(role);
//   };

//   const logout = () => {
//     localStorage.removeItem("userId");
//     localStorage.removeItem("role");
//     setUserId(null);
//     setUserRole(null);
//   };

//   const isLoggedIn = !!userId;

//   return (
//     <AuthContext.Provider
//       value={{ userId, userRole, isLoggedIn, login, logout }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };