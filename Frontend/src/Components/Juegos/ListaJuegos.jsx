import React, { useEffect, useState } from "react";
import { obtenerJuegos, eliminarJuego } from "../../Services/JuegoService";
import { Link } from "react-router-dom";
import "./Juego.css";

const ListaJuegos = () => {
  const [juegos, setJuegos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const cargarJuegos = async () => {
    try {
      const datos = await obtenerJuegos();
      setJuegos(datos || []);
    } catch (error) {
      setJuegos([]);
    }
    setCargando(false);
  };

  const handleEliminar = async (id) => {
    if (confirm("¿Estás seguro de eliminar este juego?")) {
      try {
        await eliminarJuego(id);
        alert("Juego eliminado correctamente.");
        cargarJuegos();
      } catch (error) {
        console.error(error);
        alert("Error al eliminar el juego.");
      }
    }
  };

  useEffect(() => {
    cargarJuegos();
  }, []);

  return (
    <div className="juegos-container container mt-5 mb-5">
      <div className="d-flex justify-content-between mb-3">
        <h2 className="titulo-juegos">🎮 Gestión de Juegos</h2>
        <Link to="/juegos/registrar" className="btn btn-agregar-juego">
          ➕ Agregar Juego
        </Link>
      </div>

      {cargando ? (
        <div className="text-center text-light">Cargando juegos...</div>
      ) : juegos.length === 0 ? (
        <div className="alert alert-info text-center">
          No hay juegos registrados.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-dark table-hover tabla-juegos">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Fecha</th>
                <th>Clasificación</th>
                <th>ID Categoría</th>
                <th>ID Usuario</th>
                <th>Imagen</th> 
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {juegos.map((j) => (
                <tr key={j.idJuego}>
                  <td>{j.idJuego}</td>
                  <td>{j.nombre}</td>
                  <td>{j.descripcion}</td>
                  <td>₡{parseFloat(j.precio).toLocaleString()}</td>
                  <td>{j.fechaLanzamiento}</td>
                  <td>{j.clasificacionEdad}</td>
                  <td>{j.idCategoria}</td>
                  <td>{j.idUsuario}</td>

                  {/* 🔥 Imagen después de ID Usuario */}
                  <td>
                    {j.imagen ? (
                      <img
                        src={j.imagen}
                        alt={j.nombre}
                        style={{
                          width: "80px",
                          height: "60px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          border: "1px solid #00bfff44",
                          background: "#111"
                        }}
                      />
                    ) : (
                      <span className="text-muted">Sin imagen</span>
                    )}
                  </td>

                  <td>
                    <Link
                      to={`/juegos/editar/${j.idJuego}`}
                      className="btn btn-editar btn-sm me-2"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleEliminar(j.idJuego)}
                      className="btn btn-eliminar btn-sm"
                    >
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
  );
};

export default ListaJuegos;
