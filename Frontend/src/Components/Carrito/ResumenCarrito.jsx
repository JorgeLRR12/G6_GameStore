import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";

const ResumenCarrito = ({ total, juegos, setJuegos, idCarrito, promos = [] }) => {
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const [procesando, setProcesando] = useState(false);

  const finalizarCompra = async () => {
    if (!usuario || juegos.length === 0 || !idCarrito || procesando) return;

    setProcesando(true);

    try {
      // 1. Registrar la compra
      const compraRes = await axios.post("http://localhost/G6_GameStore/Backend/API/compra.php", {
        idUsuario: usuario.idUsuario,
        total: parseFloat(total.toFixed(2)),
      });

      const idCompra = compraRes.data.datos.idCompra;

      // 2. Insertar los juegos comprados
      for (const juego of juegos) {
        const promo = promos.find(p => p.idJuego === juego.idJuego);
        const porcentajeDescuento = promo?.porcentajeDescuento || 0;
        const precioFinal = juego.precio * (1 - porcentajeDescuento / 100);
        const subtotal = precioFinal * juego.cantidad;

        await axios.post("http://localhost/G6_GameStore/Backend/API/compra_juego.php", {
          idCompra,
          idJuego: juego.idJuego,
          cantidad: juego.cantidad,
          precioUnitario: juego.precio,
          porcentajeDescuento,
          subtotal: parseFloat(subtotal.toFixed(2)),
        });
      }

      // 3. Vaciar el carrito en la base de datos
      await axios.delete("http://localhost/G6_GameStore/Backend/API/carritojuego.php", {
        data: { idCarrito },
      });

      // 4. Limpiar el carrito en el frontend
      setJuegos([]);

      // 5. Redirigir al historial de compras
      alert("¡Compra realizada con éxito!");
      navigate("/Compras");

    } catch (error) {
      console.error("Error al finalizar la compra:", error);
      alert("Ocurrió un error al procesar tu compra. Intenta nuevamente.");
    } finally {
      setProcesando(false);
    }
  };

  return (
    <div className="resumen-carrito mt-4 p-4 rounded bg-dark border border-info">
      <div className="d-flex align-items-center gap-2 mb-3">
        <i className="bi bi-cart-check-fill fs-4 text-success"></i>
        <span className="fw-bold text-light">Total:</span>
        <span className="fs-4 text-info">₡{total.toLocaleString("es-CR")}</span>
      </div>

      <div className="d-flex gap-2">
        <button
          className="btn btn-success px-4"
          onClick={finalizarCompra}
          disabled={juegos.length === 0 || procesando}
        >
          {procesando ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Procesando...
            </>
          ) : (
            <>
              <i className="bi bi-credit-card-2-back-fill me-2"></i>
              Finalizar compra
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ResumenCarrito;
