// Compra: RegistroCompra.jsx
import React, { useEffect, useState } from "react";
import "./RegistroCompra.css";
import ClienteNavbar from "../Header/HeaderCliente";
import { useAuth } from "../../Context/AuthContext";
import axios from "axios";

const RegistroCompra = () => {
  const { usuario } = useAuth();
  const [compras, setCompras] = useState([]);

  useEffect(() => {
    if (!usuario) return;

    const fetchCompras = async () => {
      try {
        // Paso 1: Obtener todas las compras del usuario
        const res = await axios.get(
          `https://gamestorecr.onrender.com/API/compra.php?idUsuario=${usuario.idUsuario}`
        );
        const comprasUsuario = res.data.datos || [];

        // Paso 2: Obtener los juegos de cada compra
        const comprasConJuegos = await Promise.all(
          comprasUsuario.map(async (compra) => {
            const resJuegos = await axios.get(
              `https://gamestorecr.onrender.com/API/compra_juego.php?idCompra=${compra.idCompra}`
            );
            return {
              ...compra,
              juegos: resJuegos.data.datos || [],
            };
          })
        );

        // Ordena por fecha descendente (más reciente primero)
        comprasConJuegos.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        setCompras(comprasConJuegos);
      } catch (error) {
        console.error("Error al cargar compras:", error);
      }
    };

    fetchCompras();
  }, [usuario]);

  return (
    <>
      <ClienteNavbar />
      <div className="registro-compra-container container mt-5 mb-5">
        <h2 className="mt-5 text-light">🧾 Historial de Compras</h2>
        {compras.length === 0 ? (
          <div className="tarjeta-sin-compras animate__animated animate__fadeIn">
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🛒❌</div>
            <h4>Aún no has realizado ninguna compra</h4>
            <p>Visita la tienda y encuentra los mejores juegos para ti 🎮✨</p>
            <a href="/juegos" className="btn btn-outline-info mt-3">Ir a la tienda</a>
          </div>
        ) : (
          compras.map((compra) => (
            <div key={compra.idCompra} className="card mb-4 shadow">
              <div className="card-header bg-dark text-white">
                Compra #{compra.idCompra} – {new Date(compra.fecha).toLocaleDateString("es-CR")}
              </div>
              <div className="card-body bg-light">
                <table className="table table-sm table-bordered">
                  <thead className="table-dark">
                    <tr>
                      <th>Juego</th>
                      <th>Cantidad</th>
                      <th>Precio Unitario</th>
                      <th>Descuento</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {compra.juegos.map((juego, i) => (
                      <tr key={i}>
                        <td>{juego.nombre || `ID ${juego.idJuego}`}</td>
                        <td>{juego.cantidad}</td>
                        <td>₡{parseFloat(juego.precioUnitario).toLocaleString()}</td>
                        <td>{juego.porcentajeDescuento || 0}%</td>
                        <td>₡{parseFloat(juego.subtotal).toLocaleString()}</td>
                      </tr>
                    ))}
                    <tr className="fw-bold">
                      <td colSpan={4} className="text-end">
                        Total:
                      </td>
                      <td>₡{parseFloat(compra.total).toLocaleString()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default RegistroCompra;
