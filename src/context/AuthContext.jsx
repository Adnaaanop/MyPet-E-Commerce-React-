// import React, { createContext, useContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../services/api";

// const AuthContext = createContext();
// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null); // store user info (id, name, role)
//   const navigate = useNavigate();

//   // Fetch user info on mount, with refresh token fallback
//   useEffect(() => {
//     const loadUser = async () => {
//       try {
//         const res = await api.get("/users/me"); // protected endpoint
//         setUser(res.data);
//       } catch (err) {
//         // If 401, try refresh token
//         if (err.response?.status === 401) {
//           try {
//             await api.post("/auth/refresh"); // refresh access token
//             const retryRes = await api.get("/users/me");
//             setUser(retryRes.data);
//           } catch (refreshErr) {
//             setUser(null);
//           }
//         } else {
//           setUser(null);
//         }
//       }
//     };
//     loadUser();
//   }, []);
//   useEffect(() => {
//   const loadUser = async () => {
//     try {
//       const res = await api.get("/users/me"); // protected endpoint
//       setUser(res.data); // backend confirms session
//       console.log("User session confirmed:", res.data);
//     } catch (err) {
//       console.log("User not authenticated:", err.response?.status);
//       setUser(null);
//     }
//   };
//   loadUser();
// }, []);

//   // login now accepts a user object (from backend)
//   const login = (userData) => {
//     if (!userData) return;

//     setUser({ id: userData.id, role: userData.role, name: userData.name });

//     if (userData.role === "admin") navigate("/admin/dashboard");
//     else navigate("/user/home");
//   };

//   // logout clears cookies in backend and frontend state
//   const logout = async () => {
//     try {
//       await api.post("/auth/revoke"); // backend clears cookies
//       setUser(null);
//       navigate("/login");
//     } catch (err) {
//       console.error("Logout failed", err);
//     }
//   };

//   const isLoggedIn = !!user;

//   return (
//     <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast"; // Import toast if using notifications

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user info (id, name, role)
  const [loading, setLoading] = useState(true); // Track loading state
  const navigate = useNavigate();

  // Consolidated useEffect to load user
  useEffect(() => {
    const loadUser = async () => {
      try {
        console.log("Attempting to load user from /users/me");
        const res = await api.get("/users/me");
        console.log("User data loaded:", res.data);
        setUser(res.data);
      } catch (err) {
        console.error("Error loading user:", err.response?.status, err.response?.data);
        if (err.response?.status === 401) {
          try {
            console.log("Attempting to refresh token");
            await api.post("/auth/refresh");
            console.log("Token refreshed, retrying /users/me");
            const retryRes = await api.get("/users/me");
            console.log("Retry user data loaded:", retryRes.data);
            setUser(retryRes.data);
          } catch (refreshErr) {
            console.error("Refresh token failed:", refreshErr.response?.status, refreshErr.response?.data);
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = (userData) => {
    if (!userData) {
      console.error("No userData provided to login");
      return;
    }
    console.log("Logging in user:", userData);
    setUser({ id: userData.id, role: userData.role, name: userData.name });

    if (userData.role === "admin") navigate("/admin/dashboard");
    else navigate("/user/home");
  };

  const logout = async () => {
    try {
      console.log("Logging out user");
      await api.post("/auth/revoke");
      setUser(null);
      navigate("/login");
      toast.success("Logged out successfully!");
    } catch (err) {
      console.error("Logout failed:", err.response?.status, err.response?.data);
      toast.error("Logout failed. Please try again.");
    }
  };

  const isLoggedIn = !!user;

  // Expose loading state in context value
  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};