import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ClienteNavbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand fw-bold" to="/Home">
        🎮 Sistema de Juegos
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCliente"
        aria-controls="navbarCliente"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarCliente">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Juegos">Juegos</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Carrito">Carrito</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Compras">Compras</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Promociones">Promociones</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Valoracion">Valoración</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Biblioteca">Biblioteca</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Soporte">Soporte</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default ClienteNavbar;
