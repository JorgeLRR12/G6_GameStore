import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css"; // Reutiliza los estilos del login

const RegistroUsuario = () => {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleRegistro = async (e) => {
    e.preventDefault();
    try {
      const nuevoUsuario = {
        nombre,
        correo,
        clave, // ← texto plano, se encripta en backend
        fechaNacimiento,
        rol: "Cliente",
      };

      const respuesta = await axios.post(
        "http://localhost/G6_GameStore/Backend/API/usuario.php",
        JSON.stringify(nuevoUsuario),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (respuesta.data.codigo === 200 || respuesta.data.codigo === 201) {
        setMensaje("✅ Registro exitoso. Redirigiendo al login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMensaje("❌ Error: " + respuesta.data.mensaje);
      }
    } catch (error) {
      console.error(error);
      setMensaje("❌ Hubo un problema con el registro.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleRegistro}>
        <img src="/Img/logoGameStore.png" alt="Logo" className="login-logo" />
        <h2 className="login-title">Regístrate</h2>

        <input
          type="text"
          placeholder="Nombre completo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="login-input"
          required
        />

        <input
          type="email"
          placeholder="Correo electrónico"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          className="login-input"
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
          className="login-input"
          required
        />

        <input
          type="date"
          placeholder="Fecha de nacimiento"
          value={fechaNacimiento}
          onChange={(e) => setFechaNacimiento(e.target.value)}
          className="login-input"
          required
        />

        <button className="btn btn-primary w-100 mt-2" type="submit">
          Registrarse
        </button>

        {mensaje && <p className="text-white mt-2">{mensaje}</p>}

        <p className="mt-3">
          ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
        </p>
      </form>
    </div>
  );
};

export default RegistroUsuario;
