import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import "./LoginPage.css"; // Asegúrate de tener estilos acorde
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
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <img src="/Img/logoGameStore.png" alt="Logo" className="login-logo" />

        <h2 className="login-title">Sign In</h2>

        {error && <p className="text-danger">{error}</p>}

        <input
          type="email"
          placeholder="Email Address"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          className="login-input"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
          className="login-input"
          required
        />

        <button type="submit" className="login-button">
          SIGN IN
        </button>

        <div className="login-footer">
          <p>
            ¿No tienes una cuenta?{" "}
            <Link to="/registro">Regístrate para empezar a jugar</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
