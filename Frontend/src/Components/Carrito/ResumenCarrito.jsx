import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";

const ResumenCarrito = ({ total, juegos, setJuegos, idCarrito }) => {
  const navigate = useNavigate();
  const { usuario } = useAuth();

  const finalizarCompra = async () => {
    if (!usuario || juegos.length === 0 || !idCarrito) return;

    try {
      // 1. Registrar la compra
      const compraRes = await axios.post("https://gamestorecr.onrender.com/API/compra.php", {
        idUsuario: usuario.idUsuario,
        total,
      });

      const nuevaCompra = compraRes.data.datos;
      const idCompra = nuevaCompra.idCompra;

      // 2. Insertar los juegos comprados
      for (const juego of juegos) {
        await axios.post("https://gamestorecr.onrender.com/API/compra_juego.php", {
          idCompra,
          idJuego: juego.idJuego,
          cantidad: juego.cantidad,
          precioUnitario: juego.precio,
          porcentajeDescuento: 0, // Si hay promos, aplicar aquí
          subtotal: juego.precio * juego.cantidad,
        });
      }

      // 3. Vaciar el carrito en la base de datos
      await axios.delete("https://gamestorecr.onrender.com/API/carritojuego.php", {
        data: { idCarrito },
      });

      // 4. Limpiar el carrito en el frontend
      setJuegos([]);

      // 5. Redirigir al historial de compras
      navigate("/Compras");
    } catch (error) {
      console.error("Error al finalizar la compra:", error);
      alert("Ocurrió un error al procesar tu compra. Intenta nuevamente.");
    }
  };

  return (
    <div className="resumen-carrito mt-4 p-4 rounded bg-dark border border-info">
      <div className="d-flex align-items-center gap-2 mb-3">
        <i className="bi bi-cart-check-fill fs-4 text-success"></i>
        <span className="fw-bold text-light">Total:</span>
        <span className="fs-4 text-info">₡{total.toLocaleString()}</span>
      </div>

      <div className="d-flex gap-2">
        <button
          className="btn btn-success px-4"
          onClick={finalizarCompra}
          disabled={juegos.length === 0}
        >
          <i className="bi bi-credit-card-2-back-fill me-2"></i>
          Finalizar compra
        </button>
      </div>
    </div>
  );
};

export default ResumenCarrito;
