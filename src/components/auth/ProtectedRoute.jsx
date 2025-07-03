import React from "react";
import { Navigate } from "react-router-dom";
import { BASE_URL } from "../../services/base";

const ProtectedRoute = ({ children, allowedRole }) => {
  const userId = localStorage.getItem("userId");

  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    if (userId) {
      fetch(`${BASE_URL}/users/${userId}`)  
        .then((res) => res.json())
        .then((data) => setUser(data));
    }
  }, [userId]);

  if (!userId) {
    return <Navigate to="/login" replace />;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
