import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';

const RegistroUsuario = () => {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleRegistro = async (e) => {
    e.preventDefault();
    try {
      const nuevoUsuario = {
        nombre,
        correo,
        clave,
        fechaNacimiento,
        rol: 'Cliente'
      };

      const respuesta = await axios.post(
        'http://localhost/G6_GameStore/Backend/API/usuario.php',
        JSON.stringify(nuevoUsuario),
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );

      if (respuesta.data.codigo === 200 || respuesta.data.codigo === 201) {

        setMensaje('Registro exitoso. Redirigiendo al login...');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setMensaje('Error: ' + respuesta.data.mensaje);
      }
    } catch (error) {
      console.error(error);
      setMensaje('Hubo un problema con el registro.');
    }
  };

  return (
    <div className="login-bg-gamer">
      <div className="registro-container-gamer">
        <div className="registro-card-gamer shadow-lg">
          <div className="registro-logo-wrapper">
            <img
              src="../../../public/img/logoStoreCR.png"
              alt="Logo GameStore"
              className="registro-logo-gamer"
            />
          </div>
          <h2 className="registro-title-gamer">¡Únete a GameStore!</h2>
          <p className="registro-subtitle-gamer">
            Crea tu cuenta y comienza a disfrutar de los mejores juegos
          </p>
          <form className="registro-form-gamer" onSubmit={handleRegistro}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  placeholder="Nombre completo"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="form-control registro-input-gamer"
                  required
                  autoFocus
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  className="form-control registro-input-gamer"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={clave}
                  onChange={(e) => setClave(e.target.value)}
                  className="form-control registro-input-gamer"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="date"
                  placeholder="Fecha de nacimiento"
                  value={fechaNacimiento}
                  onChange={(e) => setFechaNacimiento(e.target.value)}
                  className="form-control registro-input-gamer"
                  required
                />
              </div>
            </div>
            <button className="btn btn-info w-100 registro-btn-gamer" type="submit">
              Registrarse
            </button>
          </form>
          {mensaje && (
            <div className="alert alert-info py-2 mt-3">{mensaje}</div>
          )}
          <div className="registro-footer-gamer mt-4">
            <span>
              ¿Ya tienes cuenta?{" "}
              <a href="/login" className="login-link-gamer">
                Inicia sesión aquí
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistroUsuario;
