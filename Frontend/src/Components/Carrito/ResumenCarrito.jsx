// Carrito: ResumenCarrito.jsx

import React from "react";
import { useNavigate } from "react-router-dom";

// Componente para mostrar el resumen y acciones del carrito
const ResumenCarrito = ({ total, juegos, setJuegos }) => {
  const navigate = useNavigate();

  // Vacía el carrito
  const vaciarCarrito = () => {
    setJuegos([]);
  };

  // Cuando finalizo la compra, navego a la vista de registro de compra
  const finalizarCompra = () => {
    // Aquí solo hago la transición
    navigate("/Compra/Registro");
  };

  return (
    <div className="resumen-carrito mt-4 p-4 rounded">
      <div className="d-flex justify-content-between align-items-center mb-3">
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
