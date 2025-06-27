import React, { useEffect, useState } from "react";
import { obtenerValoracionJuego, eliminarValoracion } from "../../Services/ValoracionService";
import "./Valoracion.css";

const ValoracionAdmin = ({ idJuego }) => {
  const [valoraciones, setValoraciones] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);

  const cargarValoraciones = async () => {
    try {
      const res = await obtenerValoracionJuego(idJuego);
      setValoraciones(res.datos || []);
    } catch (error) {
      console.error("Error al cargar valoraciones", error);
    }
  };

  useEffect(() => {
    if (mostrarModal) cargarValoraciones();
  }, [mostrarModal]);

  const eliminar = async (idValoracion) => {
    try {
      await eliminarValoracion(idValoracion);
      cargarValoraciones();
    } catch (error) {
      console.error("Error al eliminar valoración", error);
    }
  };

  return (
    <>
      <button
        className="btn btn-outline-info btn-sm"
        onClick={() => setMostrarModal(true)}
      >
        Valoraciones
      </button>

      {mostrarModal && (
        <div className="modal-juego-bg" onClick={() => setMostrarModal(false)}>
          <div className="modal-juego-contenido">
            <button
              className="btn-cerrar-modal"
              onClick={() => setMostrarModal(false)}
              title="Cerrar"
            >
              &times;
            </button>
            <h5 className="mb-3">⭐ Valoraciones del juego</h5>

            {valoraciones.length === 0 ? (
              <p className="text-muted">Este juego no tiene valoraciones aún.</p>
            ) : (
              valoraciones.map((v) => (
                <div className="valoracion-item" key={v.idValoracion}>
                  <strong>{v.nombreUsuario || "Usuario"}</strong>
                  <div className="valoracion-estrellas">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <span
                        key={i}
                        className={`estrella ${v.puntuacion >= i ? "llena" : ""}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <div className="comentario">{v.comentario}</div>
                  <div className="fecha">
                    {new Date(v.fechaValoracion).toLocaleDateString("es-ES")}
                  </div>
                  <button
                    className="btn btn-sm btn-danger mt-2"
                    onClick={() => eliminar(v.idValoracion)}
                  >
                    Eliminar
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ValoracionAdmin;
