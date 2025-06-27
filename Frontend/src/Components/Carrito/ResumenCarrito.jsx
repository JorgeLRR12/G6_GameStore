import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";

const ResumenCarrito = ({ total, juegos, setJuegos }) => {
  const navigate = useNavigate();
  const { usuario } = useAuth();

  const finalizarCompra = async () => {
    if (!usuario || juegos.length === 0) return;

    try {
      // 1. Registrar la compra
      const compraRes = await axios.post("https://gamestorecr.onrender.com/API/compra.php", {
        idUsuario: usuario.idUsuario,
        total,
      });

      const nuevaCompra = compraRes.data.datos;
      const idCompra = nuevaCompra.idCompra;

      // 2. Insertar juegos comprados
      for (const juego of juegos) {
        await axios.post("https://gamestorecr.onrender.com/API/compra_juego.php", {
          idCompra,
          idJuego: juego.idJuego,
          cantidad: juego.cantidad,
          precioUnitario: juego.precio,
          porcentajeDescuento: 0, // Puedes aplicar promos si las manejas aquí
          subtotal: juego.precio * juego.cantidad,
        });
      }

      // ❌ Ya no eliminamos los datos del carrito en la base de datos
      // await axios.delete("https://gamestorecr.onrender.com/API/carritojuego.php", {
      //   data: { idCarrito: usuario.idCarrito },
      // });

      // 3. Limpiar el carrito visualmente en el frontend
      setJuegos([]);

      // 4. Redirigir al historial de compras
      navigate("/Compras");
    } catch (error) {
      console.error("Error al finalizar la compra:", error);
    }
  };

  return (
    <div className="resumen-carrito mt-4 p-4 rounded">
      <div className="d-flex align-items-center gap-2 mb-3">
        <span className="fw-bold">Total:</span>
        <span className="fs-4 text-info">₡{total.toLocaleString()}</span>
      </div>

      <div className="d-flex gap-2">
        <button
          className="btn btn-success"
          onClick={finalizarCompra}
          disabled={juegos.length === 0}
        >
          Finalizar compra
        </button>
      </div>
    </div>
  );
};

export default ResumenCarrito;
