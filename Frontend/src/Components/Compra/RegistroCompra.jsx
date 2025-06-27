import React, { useEffect, useState } from "react";
import "./RegistroCompra.css";
import ClienteNavbar from "../Header/HeaderCliente";
import { useAuth } from "../../Context/AuthContext";
import axios from "axios";

const RegistroCompra = () => {
  const { usuario } = useAuth();
  const [compras, setCompras] = useState([]);

  useEffect(() => {
    if (!usuario?.idUsuario) return;

    const fetchCompras = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost/G6_GameStore/Backend/API/";

        // Paso 1: Obtener todas las compras del usuario
        const res = await axios.get(`${API_URL}/compra.php?idUsuario=${usuario.idUsuario}`);
        const comprasUsuario = res.data.datos || [];

        // Paso 2: Obtener todos los juegos de todas las compras
        const resJuegos = await axios.get(`${API_URL}/compra_juego.php`);
        const todosLosJuegos = resJuegos.data.datos || [];

        // Paso 3: Asociar los juegos con su compra correspondiente
        const comprasConJuegos = comprasUsuario.map((compra) => ({
          ...compra,
          juegos: todosLosJuegos.filter(j => j.idCompra === compra.idCompra),
        }));

        // Ordenar por fecha de compra descendente
        comprasConJuegos.sort(
          (a, b) => new Date(b.fechaCompra) - new Date(a.fechaCompra)
        );

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
            <a href="/juegos" className="btn btn-outline-info mt-3">
              Ir a la tienda
            </a>
          </div>
        ) : (
          compras.map((compra) => (
            <div key={compra.idCompra} className="card mb-4 shadow">
              <div className="card-header bg-dark text-white">
                Compra #{compra.idCompra} –{" "}
                {new Date(compra.fechaCompra).toLocaleDateString("es-CR")}
              </div>
              <div className="card-body bg-light">
                <table className="table table-sm table-bordered">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">Juego</th>
                      <th scope="col">Cantidad</th>
                      <th scope="col">Precio Unitario</th>
                      <th scope="col">Descuento</th>
                      <th scope="col">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {compra.juegos.map((juego, idx) => (
                      <tr key={idx}>
                        <td>{juego.nombre || `ID ${juego.idJuego}`}</td>
                        <td>{juego.cantidad}</td>
                        <td>₡{parseFloat(juego.precioUnitario).toLocaleString()}</td>
                        <td>{parseFloat(juego.porcentajeDescuento || 0).toFixed(2)}%</td>
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
