// Header: HeaderAdmin.jsx
import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HeaderCliente.css"; // Usamos el mismo estilo visual

const AdminNavbar = () => {
  return (
    <nav className="navbar navbar-expand-lg px-4">
      <Link className="navbar-brand" to="/admin/dashboard">
        🛠 Panel Admin
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarAdmin"
        aria-controls="navbarAdmin"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarAdmin">
        <ul className="navbar-nav ms-auto">
          
          <li className="nav-item">
            <Link className="nav-link" to="/admin/usuarios">
              Usuarios
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/categorias">
              Categorías
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link className="nav-link" to="/juegos">
              Juegos
            </Link>
          </li> */}
          <li className="nav-item">
          <Link className="nav-link" to="/juegos-admin">
            Juegos
          </Link>
        </li>

          <li className="nav-item">
           <Link className="nav-link" to="/desarrolladores-admin">
         Desarrolladores
         </Link>

          </li>
          {/* <li className="nav-item">
            <Link className="nav-link" to="/admin/promociones">
              Promociones
            </Link>
          </li> */}
          {/* <li className="nav-item">
            <Link className="nav-link" to="../Soporte/SoportaAdminPage.jsx">
              Juegos
            </Link>
          </li> */}
          <li className="nav-item">
            <Link className="nav-link" to="/admin/compras">
              Compras
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/admin/soporte">
              Soporte
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AdminNavbar;
