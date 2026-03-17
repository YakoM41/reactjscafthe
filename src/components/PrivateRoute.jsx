import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    // Mettre un skeleton ici
    return <div>Chargement...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/connexion" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
