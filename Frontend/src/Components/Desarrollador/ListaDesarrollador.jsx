import React, { useEffect, useState } from "react";
import NavDes from "../Header/HeaderAdmin"
import { obtenerDesarrolladores, eliminarDesarrollador } from "../../Services/DesarrolladorService";
import { Link } from "react-router-dom";
import "./Desarrollador.css"; 

const ListaDesarrollador = () => {
  const [desarrolladores, setDesarrolladores] = useState([]);
  const [cargando, setCargando] = useState(true);

  const cargar = async () => {
    try {
      const datos = await obtenerDesarrolladores();
      setDesarrolladores(datos || []);
    } catch (error) {
      console.error(error);
      setDesarrolladores([]);
    }
    setCargando(false);
  };

  const handleEliminar = async (id) => {
    if (confirm("¿Estás seguro de eliminar este desarrollador?")) {
      try {
        await eliminarDesarrollador(id);
        alert("Desarrollador eliminado correctamente.");
        cargar();
      } catch (error) {
        alert("Error al eliminar.");
      }
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  return (
    <>
      <NavDes />
      <div className="desarrolladores-container container mt-5 mb-5">
        <div className="d-flex justify-content-between mb-3">
          <h2 className="titulo-desarrolladores">👨‍💻 Gestión de Desarrolladores</h2>
          <Link to="/desarrolladores/registrar" className="btn btn-agregar">
            ➕ Agregar Desarrollador
          </Link>
        </div>

        {cargando ? (
          <div className="text-center text-light">Cargando desarrolladores...</div>
        ) : desarrolladores.length === 0 ? (
          <div className="alert alert-info text-center">No hay desarrolladores registrados.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-dark table-hover tabla-desarrolladores">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>País</th>
                  <th>ID Usuario</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {desarrolladores.map((d) => (
                  <tr key={d.idDesarrollador}>
                    <td>{d.idDesarrollador}</td>
                    <td>{d.nombre}</td>
                    <td>{d.pais}</td>
                    <td>{d.idUsuario}</td>
                    <td>
                      <Link to={`/desarrolladores/editar/${d.idDesarrollador}`} className="btn btn-editar btn-sm me-2">
                        Editar
                      </Link>
                      <button onClick={() => handleEliminar(d.idDesarrollador)} className="btn btn-eliminar btn-sm">
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default ListaDesarrollador;
