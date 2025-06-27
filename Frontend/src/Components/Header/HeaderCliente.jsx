
// Header:HeaderCliente.jsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext"; // ← Importa el contexto
import "bootstrap/dist/css/bootstrap.min.css";
import "./HeaderCliente.css";

const ClienteNavbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => setShowMenu(!showMenu);

  const { logout } = useAuth(); // ← Obtiene la función logout
  const navigate = useNavigate(); // ← Para redirigir al login

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg px-4">
      <button
        className="navbar-toggler"
        type="button"
        aria-controls="navbarCliente"
        aria-expanded={showMenu}
        aria-label="Toggle navigation"
        onClick={toggleMenu}
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className={`collapse navbar-collapse${showMenu ? " show" : ""}`}
        id="navbarCliente"
      >
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Juegos">
              Juegos
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Carrito">
              Carrito
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Compras">
              Compras
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Promociones">
              Promociones
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Soporte">
              Soporte
            </Link>
          </li>

          {/* Botón de cerrar sesión */}
          <li className="nav-item">
            <button
              onClick={handleLogout}
              className="btn btn-danger btn-sm ms-3"
            >
              Cerrar sesión
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default ClienteNavbar;
