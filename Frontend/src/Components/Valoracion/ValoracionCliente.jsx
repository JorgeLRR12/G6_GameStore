import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import {
  obtenerValoracionJuego,
  crearValoracion,
  actualizarValoracion,
  eliminarValoracion,
} from "../../Services/ValoracionService";
import "./Valoracion.css";

const ValoracionCliente = ({ idJuego }) => {
  const { usuario } = useAuth();
  const [valoraciones, setValoraciones] = useState([]);
  const [nuevaValoracion, setNuevaValoracion] = useState({ puntuacion: 0, comentario: "" });
  const [valoracionDelUsuario, setValoracionDelUsuario] = useState(null);

  const cargarValoraciones = async () => {
    try {
      const res = await obtenerValoracionJuego(idJuego);
      const todas = res.datos || [];
      setValoraciones(todas);

      if (usuario) {
        const existente = todas.find((v) => v.idUsuario === usuario.idUsuario);
        setValoracionDelUsuario(existente || null);
        if (existente) {
          setNuevaValoracion({
            puntuacion: existente.puntuacion,
            comentario: existente.comentario,
          });
        }
      }
    } catch (error) {
      console.error("Error al cargar valoraciones", error);
    }
  };

  useEffect(() => {
    if (idJuego) cargarValoraciones();
  }, [idJuego]);

  const enviarValoracion = async () => {
    if (!usuario) return;
    try {
      await crearValoracion({
        idUsuario: usuario.idUsuario,
        idJuego,
        puntuacion: nuevaValoracion.puntuacion,
        comentario: nuevaValoracion.comentario,
      });
      setNuevaValoracion({ puntuacion: 0, comentario: "" });
      cargarValoraciones();
    } catch (error) {
      console.error("Error al enviar valoración", error);
    }
  };

  const editarValoracion = async () => {
    if (!valoracionDelUsuario) return;
    try {
      await actualizarValoracion({
        idValoracion: valoracionDelUsuario.idValoracion,
        puntuacion: nuevaValoracion.puntuacion,
        comentario: nuevaValoracion.comentario,
      });
      cargarValoraciones();
    } catch (error) {
      console.error("Error al actualizar valoración", error);
    }
  };

  const eliminarMiValoracion = async () => {
    if (!valoracionDelUsuario) return;
    try {
      await eliminarValoracion(valoracionDelUsuario.idValoracion);
      setNuevaValoracion({ puntuacion: 0, comentario: "" });
      setValoracionDelUsuario(null);
      cargarValoraciones();
    } catch (error) {
      console.error("Error al eliminar valoración", error);
    }
  };

  return (
    <div className="valoracion-contenedor">
      <h5 className="mb-3">⭐ Valoraciones</h5>

      {usuario && (
        <div className="mb-4">
          <div className="estrellas-input mb-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <span
                key={num}
                className={`estrella ${nuevaValoracion.puntuacion >= num ? "llena" : ""}`}
                onClick={() =>
                  setNuevaValoracion({ ...nuevaValoracion, puntuacion: num })
                }
              >
                ★
              </span>
            ))}
          </div>
          <textarea
            className="form-control comentario"
            placeholder="Escribe tu comentario..."
            value={nuevaValoracion.comentario}
            onChange={(e) =>
              setNuevaValoracion({ ...nuevaValoracion, comentario: e.target.value })
            }
          ></textarea>
          {valoracionDelUsuario ? (
            <>
              <button className="btn btn-warning mt-2 me-2" onClick={editarValoracion}>
                Actualizar valoración
              </button>
              <button className="btn btn-danger mt-2" onClick={eliminarMiValoracion}>
                Eliminar valoración
              </button>
            </>
          ) : (
            <button className="btn btn-success mt-2" onClick={enviarValoracion}>
              Enviar valoración
            </button>
          )}
        </div>
      )}

      {valoraciones.length === 0 ? (
        <p className="text-muted">Este juego aún no tiene valoraciones.</p>
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
          </div>
        ))
      )}
    </div>
  );
};

export default ValoracionCliente;
