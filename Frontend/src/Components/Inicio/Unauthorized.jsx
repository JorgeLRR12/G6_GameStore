import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

const Unauthorized = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="container text-center mt-5">
      <h1 className="text-danger">Acceso no autorizado</h1>
      <p>No tienes permisos para acceder a esta página.</p>
      <button className="btn btn-outline-primary mt-3" onClick={handleLogout}>
        Volver al Login
      </button>
    </div>
  );
};

export default Unauthorized;
