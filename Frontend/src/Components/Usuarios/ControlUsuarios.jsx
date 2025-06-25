import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../Context/AuthContext';
import './ControlUsuarios.css';
import { useNavigate } from 'react-router-dom';

const ControlUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const { usuario } = useAuth();
  const navigate = useNavigate();

  // const API_URL = 'http://localhost/MultimediosProyecto/G6_GameStore/Backend/API/usuario.php';
  const API_URL = 'https://gamestorecr.onrender.com/API/usuario.php';

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

  const volverInicio = () => navigate('/admin/dashboard');

  return (
    <div className="container">
      <h2>Control de Usuarios</h2>
      {mensaje && <div className="alert alert-info">{mensaje}</div>}
      <table className="table table-bordered mt-3">
        <thead className="table-dark">
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
                <button className="btn btn-primary btn-sm me-2" onClick={() => abrirModalEdicion(u)}>Editar</button>
                <button className="btn btn-danger btn-sm" onClick={() => eliminarUsuario(u.idUsuario)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="btn btn-secondary mt-4" onClick={volverInicio}>← Regresar al Inicio</button>

      {/* Modal de edición */}
      {usuarioEditando && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Editar Usuario</h4>
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

            <div className="d-flex justify-content-end">
              <button className="btn btn-primary me-2" onClick={guardarCambios}>Guardar</button>
              <button className="btn btn-secondary" onClick={cerrarModal}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ControlUsuarios;
