// src/Components/Categoria/CrudCategorias.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HeaderAdmin from "../Header/HeaderAdmin";
import { useAuth } from '../../Context/AuthContext';
import './CrudCategorias.css';

const API_URL = 'http://localhost/G6_GameStore/Backend/API/categoria.php';
const API_USUARIOS = 'http://localhost/G6_GameStore/Backend/API/usuario.php';

const CrudCategorias = () => {
  const { usuario, isAuthenticated } = useAuth();
  const [categorias, setCategorias] = useState([]);
  const [usuariosAdmin, setUsuariosAdmin] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nuevaCategoria, setNuevaCategoria] = useState('');
  const [nuevoIdUsuario, setNuevoIdUsuario] = useState('');
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    if (!usuario && isAuthenticated()) return;
    if (usuario) {
      obtenerCategorias();
      obtenerUsuariosAdmin();
    }
  }, [usuario]);

  const obtenerCategorias = async () => {
    try {
      const response = await axios.get(API_URL);
      if (response.data.codigo === 200) {
        setCategorias(response.data.datos);
      }
    } catch (error) {
      console.error('Error al obtener categorías', error);
    }
  };

  const obtenerUsuariosAdmin = async () => {
    try {
      const response = await axios.get(API_USUARIOS);
      if (response.data.codigo === 200) {
        const admins = response.data.datos.filter(u => u.rol === 'Administrador');
        setUsuariosAdmin(admins);
      }
    } catch (error) {
      console.error('Error al obtener usuarios', error);
    }
  };

  const agregarCategoria = async () => {
    if (!nuevaCategoria.trim() || !nuevoIdUsuario) return;
    try {
      await axios.post(API_URL, {
        nombre: nuevaCategoria,
        idUsuario: parseInt(nuevoIdUsuario)
      });
      setNuevaCategoria('');
      setNuevoIdUsuario('');
      setMostrarFormulario(false);
      obtenerCategorias();
    } catch (error) {
      console.error('Error al agregar categoría', error);
    }
  };

  const eliminarCategoria = async (idCategoria) => {
    if (!window.confirm('¿Desea eliminar esta categoría?')) return;
    try {
      await axios.delete(API_URL, {
        data: { idCategoria },
      });
      obtenerCategorias();
    } catch (error) {
      console.error('Error al eliminar categoría', error);
    }
  };

  const iniciarEdicion = (categoria) => {
    setEditando({ ...categoria });
  };

  const guardarEdicion = async () => {
    try {
      await axios.put(API_URL, {
        idCategoria: editando.idCategoria,
        nombre: editando.nombre,
        idUsuario: editando.idUsuario,
      });
      setEditando(null);
      obtenerCategorias();
    } catch (error) {
      console.error('Error al actualizar categoría', error);
    }
  };

  return (
    <>

       <HeaderAdmin />

      <div className={`categorias-wrapper ${mostrarFormulario || editando ? 'blur' : ''}`}>
        
        <h2 className="titulo-categorias">Categorías Disponibles</h2>

        <div className="contenedor-btn-agregar">
          <button className="btn-agregar" onClick={() => setMostrarFormulario(true)}>
            + Agregar Categoría
          </button>
        </div>
        
        <table className="tabla-categorias">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>ID Usuario</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((cat) => (
              <tr key={cat.idCategoria}>
                <td>{cat.idCategoria}</td>
                <td>{cat.nombre}</td>
                <td>{cat.idUsuario}</td>
                <td>
                  <button onClick={() => iniciarEdicion(cat)}>Editar</button>
                  <button onClick={() => eliminarCategoria(cat.idCategoria)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Agregar Categoría */}
      {mostrarFormulario && (
        <div className="modal">
          <div className="modal-content">
            <h3>Agregar Categoría</h3>
            <input
              type="text"
              placeholder="Nombre de la categoría"
              value={nuevaCategoria}
              onChange={(e) => setNuevaCategoria(e.target.value)}
            />
            <select
              value={nuevoIdUsuario}
              onChange={(e) => setNuevoIdUsuario(e.target.value)}
            >
              <option value="">Seleccione un administrador</option>
              {usuariosAdmin.map((u) => (
                <option key={u.idUsuario} value={u.idUsuario}>
                  {u.nombre} (ID {u.idUsuario})
                </option>
              ))}
            </select>
            <div className="modal-buttons">
              <button onClick={agregarCategoria}>Guardar</button>
              <button onClick={() => setMostrarFormulario(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Editar Categoría */}
      {editando && (
        <div className="modal">
          <div className="modal-content">
            <h3>Editar Categoría</h3>
            <input
              type="text"
              placeholder="Nuevo nombre de la categoría"
              value={editando.nombre}
              onChange={(e) =>
                setEditando({ ...editando, nombre: e.target.value })
              }
            />
            <div className="modal-buttons">
              <button onClick={guardarEdicion}>Guardar</button>
              <button onClick={() => setEditando(null)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CrudCategorias;
