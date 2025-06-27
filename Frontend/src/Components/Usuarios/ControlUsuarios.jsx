// src/Components/Usuario/ControlUsuarios.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../Context/AuthContext';
import HeaderAdmin from "../Header/HeaderAdmin";
import './ControlUsuarios.css';


const ControlUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const { usuario } = useAuth();
  

  const API_URL = 'http://localhost/G6_GameStore/Backend/API/usuario.php';

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      const res = await axios.get(API_URL);
      if (res.data.codigo === 200) setUsuarios(res.data.datos);
      else setMensaje('Error al obtener los usuarios');
    } catch (err) {
      console.error(err);
      setMensaje('Error al cargar usuarios');
    }
  };

  const eliminarUsuario = async (idUsuario) => {
    if (!window.confirm('¿Eliminar este usuario?')) return;
    try {
      await axios.delete(API_URL, {
        data: { idUsuario }
      });
      setMensaje('Usuario eliminado correctamente');
      cargarUsuarios();
    } catch (err) {
      console.error(err);
      setMensaje('Error al eliminar usuario');
    }
  };

  const guardarCambios = async () => {
    try {
      const res = await axios.put(API_URL, usuarioEditando);
      if (res.data.codigo === 200) {
        setMensaje('Usuario actualizado');
        setUsuarioEditando(null);
        cargarUsuarios();
      } else {
        setMensaje('Error al actualizar');
      }
    } catch (err) {
      console.error(err);
      setMensaje('Error al editar usuario');
    }
  };

  const abrirModalEdicion = (usuario) => {
    setUsuarioEditando({ ...usuario });
  };

  const cerrarModal = () => setUsuarioEditando(null);

  

  return (
    <>
       <HeaderAdmin />

      <div className={`categorias-wrapper ${usuarioEditando ? 'blur' : ''}`}>
        <h2 className="titulo-categorias">Control de Usuarios</h2>
        {mensaje && <div className="alert alert-info">{mensaje}</div>}

        <table className="tabla-categorias">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Fecha Nacimiento</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.idUsuario}>
                <td>{u.idUsuario}</td>
                <td>{u.nombre}</td>
                <td>{u.correo}</td>
                <td>{u.rol}</td>
                <td>{u.fechaNacimiento}</td>
                <td>
                  <div className="botones-accion">
                    <button className="btn-editar" onClick={() => abrirModalEdicion(u)}>Editar</button>
                    <button className="btn-eliminar" onClick={() => eliminarUsuario(u.idUsuario)}>Eliminar</button>
                  </div>
                </td>
              </tr>
              
            ))}
          </tbody>
        </table>
      </div>

      {usuarioEditando && (
        <div className="modal">
          <div className="modal-content">
            <h3>Editar Usuario</h3>
            <input
              value={usuarioEditando.nombre}
              onChange={(e) => setUsuarioEditando({ ...usuarioEditando, nombre: e.target.value })}
              placeholder="Nombre"
            />
            <input
              value={usuarioEditando.correo}
              onChange={(e) => setUsuarioEditando({ ...usuarioEditando, correo: e.target.value })}
              placeholder="Correo"
            />
            <select
              value={usuarioEditando.rol}
              onChange={(e) => setUsuarioEditando({ ...usuarioEditando, rol: e.target.value })}
            >
              <option value="Administrador">Administrador</option>
              <option value="Cliente">Cliente</option>
            </select>
            <div className="modal-buttons">
              <button onClick={guardarCambios}>Guardar</button>
              <button onClick={cerrarModal}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ControlUsuarios;
