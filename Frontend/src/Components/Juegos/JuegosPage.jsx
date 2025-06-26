import React, { useEffect, useState } from "react";
import { obtenerJuegos } from "../../Services/JuegoService";
import "./Juego.css";

const JuegosPage = () => {
  const [juegos, setJuegos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarJuegos = async () => {
      try {
        const datos = await obtenerJuegos();
        // Ahora la imagen viene directamente desde la base de datos (campo imagen)
        const juegosConImagen = (datos || []).map((juego) => ({
          ...juego,
          imagen: juego.imagen, // No generes la ruta, usa la que viene de la BD
        }));
        setJuegos(juegosConImagen);
      } catch (error) {
        setJuegos([]);
      }
      setCargando(false);
    };

    cargarJuegos();
  }, []);

  return (
    <div className="juegos-container container mt-5 mb-5">
      <h2 className="titulo-juegos mb-4">🎮 Catálogo de Juegos</h2>
      {cargando ? (
        <div className="text-center text-light">Cargando juegos...</div>
      ) : juegos.length === 0 ? (
        <div className="alert alert-info text-center">
          No hay juegos disponibles.
        </div>
      ) : (
        <div className="row">
          {juegos.map((juego) => (
            <div className="col-md-4 mb-4" key={juego.idJuego}>
              <div className="card h-100 bg-dark text-white border-0 shadow">
                <img
                  src={juego.imagen || "/img/default.jpg"}
                  className="card-img-top"
                  alt={juego.nombre}
                  style={{ height: "200px", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/img/default.jpg";
                  }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{juego.nombre}</h5>
                  <p className="card-text flex-grow-1">
                    {juego.descripcion.length > 100
                      ? juego.descripcion.slice(0, 100) + "..."
                      : juego.descripcion}
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <strong>₡{parseFloat(juego.precio).toLocaleString()}</strong>
                    <button
                      className="btn btn-outline-info btn-sm"
                      onClick={() =>
                        alert("Aquí se puede abrir un modal de detalle")
                      }
                    >
                      Ver más
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JuegosPage;
