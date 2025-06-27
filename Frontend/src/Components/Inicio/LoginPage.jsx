import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import "./LoginPage.css";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const exito = await login(correo, clave);
    if (!exito) {
      setError("Credenciales inválidas");
      return;
    }

    const rol = JSON.parse(localStorage.getItem("usuario")).rol;
    if (rol === "Administrador") {
      navigate("/admin/dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="login-bg-gamer">
      <div className="login-container-gamer">
        <div className="login-card-gamer shadow-lg">
          <div className="login-logo-wrapper">
            <img
              src="../../../public/img/logoStoreCR.png"
              alt="Logo GameStore"
              className="login-logo-gamer"
            />
          </div>
          <h2 className="login-title-gamer">Bienvenido a GameStore</h2>
          <p className="login-subtitle-gamer">
            Inicia sesión para acceder a tu cuenta
          </p>
          <form className="login-form-gamer" onSubmit={handleLogin}>
            {error && (
              <div className="alert alert-danger py-2 mb-3">{error}</div>
            )}
            <div className="mb-3">
              <input
                type="email"
                placeholder="Correo electrónico"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                className="form-control login-input-gamer"
                required
                autoFocus
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Contraseña"
                value={clave}
                onChange={(e) => setClave(e.target.value)}
                className="form-control login-input-gamer"
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-info w-100 login-btn-gamer"
            >
              Iniciar sesión
            </button>
          </form>
          <div className="login-footer-gamer mt-4">
            <span>
              ¿No tienes una cuenta?{" "}
              <Link to="/registro" className="login-link-gamer">
                Regístrate para empezar a jugar
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
