import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";
import { obtenerValoracionJuego, crearValoracion  } from "../../Services/ValoracionService.js";

import "./Valoracion.css";

const ValoracionCliente = ({ idJuego }) => {
  const { usuario } = useAuth();
  const [valoraciones, setValoraciones] = useState([]);
  const [nuevaValoracion, setNuevaValoracion] = useState({ puntuacion: 0, comentario: "" });

const cargarValoraciones = async () => {
  try {
    const res = await obtenerValoracionJuego(idJuego);
    setValoraciones(res.datos || []);
  } catch (error) {
    console.error("Error al cargar valoraciones", error);
  }
};

  useEffect(() => {
    if (idJuego) cargarValoraciones();
  }, [idJuego]);

const enviarValoracion = async () => {
  if (!usuario) return;

  const valoracion = {
    idUsuario: usuario.idUsuario,
    idJuego,
    puntuacion: nuevaValoracion.puntuacion,
    comentario: nuevaValoracion.comentario,
  };

  try {
    await crearValoracion(valoracion);
    setNuevaValoracion({ puntuacion: 0, comentario: "" });
    cargarValoraciones(); // Recarga la lista
  } catch (error) {
    console.error("Error al enviar valoración", error);
  }
};


  return (
    <div className="valoracion-contenedor">
      <h5 className="mb-3">⭐ Valoraciones</h5>

      {/* Formulario nueva valoración */}
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
          <button
            className="btn btn-success mt-2"
            onClick={enviarValoracion}
          >
            Enviar valoración
          </button>
        </div>
      )}

      {/* Valoraciones existentes */}
      {valoraciones.length === 0 ? (
        <p className="text-muted">Este juego aún no tiene valoraciones.</p>
      ) : (
        valoraciones.map((v) => (
          <div className="valoracion-item" key={v.idValoracion}>
            <strong>{v.nombreUsuario || "Usuario"}</strong>
            <div className="valoracion-estrellas">
              {[1, 2, 3, 4, 5].map((i) => (
                <span key={i} className={`estrella ${v.puntuacion >= i ? "llena" : ""}`}>★</span>
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
