import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HeaderCliente.css';

const ClienteNavbar = () => {
  // Estado para controlar el colapso del menú en móviles
  const [showMenu, setShowMenu] = useState(false);

  // Alterno el menú cuando hago clic en el botón hamburguesa
  const toggleMenu = () => setShowMenu(!showMenu);

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
      <div className={`collapse navbar-collapse${showMenu ? ' show' : ''}`} id="navbarCliente">
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
