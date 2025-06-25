import React from "react";
import HeaderAdmin from "../Header/HeaderAdmin";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const HomeAdmin = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Limpia la sesión
    navigate("/login"); // Redirige al login
  };

  return (
    <>
      <HeaderAdmin />

      <div className="home-hero">
        <h1>Panel de Administración</h1>
        <p className="lead">
          Bienvenido, administrador. Aquí puedes gestionar todo el sistema.
        </p>
        <p>
          Usa el menú para controlar usuarios, juegos, categorías, promociones y
          más.
        </p>

        {/* 🔘 Botón para cerrar sesión */}
        <button className="btn btn-outline-danger mt-3" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    </>
  );
};

export default HomeAdmin;
