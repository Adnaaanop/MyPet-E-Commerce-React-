import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user info (id, name, role)
  const [loading, setLoading] = useState(true); // Track loading state
  const navigate = useNavigate();

  // Load user on mount using cookie-based authentication
  useEffect(() => {
    const loadUser = async () => {
      try {
        console.log("Attempting to load user from /users/me");
        const res = await api.get("/users/me");
        console.log("User data loaded:", res.data);
        // Ensure user data exists
        if (!res.data.data) {
          throw new Error("User data not found in response");
        }
        // Normalize role to lowercase
        const normalizedUser = { ...res.data.data, role: res.data.data.role.toLowerCase() };
        console.log("Normalized user role:", normalizedUser.role);
        setUser(normalizedUser);
        localStorage.setItem("userId", normalizedUser.id);
      } catch (err) {
        console.error("Error loading user:", {
          status: err.response?.status,
          data: err.response?.data,
          message: err.message,
        });
        if (err.response?.status === 401) {
          try {
            console.log("Attempting to refresh token");
            await api.post("/auth/refresh");
            console.log("Token refreshed, retrying /users/me");
            const retryRes = await api.get("/users/me");
            console.log("Retry user data loaded:", retryRes.data);
            if (!retryRes.data.data) {
              throw new Error("User data not found in retry response");
            }
            const normalizedRetryUser = { ...retryRes.data.data, role: retryRes.data.data.role.toLowerCase() };
            console.log("Normalized retry user role:", normalizedRetryUser.role);
            setUser(normalizedRetryUser);
            localStorage.setItem("userId", normalizedRetryUser.id);
          } catch (refreshErr) {
            console.error("Refresh token failed:", {
              status: refreshErr.response?.status,
              data: refreshErr.response?.data,
              message: refreshErr.message,
            });
            setUser(null);
            localStorage.removeItem("userId");
            toast.error("Session expired. Please log in again.", {
              duration: 3000,
              style: {
                background: "#ffffff",
                color: "#374151",
                border: "1px solid #ef4444",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                fontSize: "14px",
                fontWeight: "500",
              },
              icon: "🔐",
            });
            navigate("/login", { replace: true });
          }
        } else {
          console.error("Non-401 error loading user:", err.message);
          setUser(null);
          localStorage.removeItem("userId");
        }
      } finally {
        setLoading(false);
        console.log("AuthContext loading complete:", { user, isLoggedIn: !!user });
      }
    };
    loadUser();
  }, [navigate]);

  const login = (id, role, name) => {
    if (!id || !role || !name) {
      console.error("Invalid login data:", { id, role, name });
      toast.error("Invalid login data");
      return;
    }
    // Normalize role to lowercase
    const normalizedRole = role.toLowerCase();
    console.log("Logging in user:", { id, role: normalizedRole, name });
    setUser({ id, role: normalizedRole, name });
    localStorage.setItem("userId", id);
    if (normalizedRole === "admin") {
      console.log("Navigating to /admin/dashboard");
      navigate("/admin/dashboard", { replace: true });
    } else {
      console.log("Navigating to /user/home");
      navigate("/user/home", { replace: true });
    }
    toast.success("Logged in successfully!");
  };

  const logout = async () => {
    try {
      console.log("Logging out user");
      await api.post("/auth/revoke");
      setUser(null);
      localStorage.removeItem("userId");
      navigate("/login", { replace: true });
      toast.success("Logged out successfully!");
    } catch (err) {
      console.error("Logout failed:", {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message,
      });
      toast.error("Logout failed. Please try again.");
    }
  };

  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};