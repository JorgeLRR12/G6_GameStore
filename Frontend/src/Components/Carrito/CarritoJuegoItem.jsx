import React from "react";

// Componente para mostrar un juego dentro del carrito
const CarritoJuegoItem = ({ juego, onEliminar, onCantidad }) => {
  // Maneja el cambio de cantidad del input
  const handleCantidad = (e) => {
    const nuevaCantidad = Math.max(1, parseInt(e.target.value) || 1);
    onCantidad(juego.idJuego, nuevaCantidad);
  };

  return (
    <tr>
      <td className="d-flex align-items-center">
        <img
          src={juego.imagen}
          alt={juego.nombre}
          className="img-juego-carrito me-2"
          style={{
            width: 72,
            height: 48,
            objectFit: "cover",
            borderRadius: 12,
            border: "2px solid #00cfff",
          }}
        />
        <span className="fw-semibold text-light">{juego.nombre}</span>
      </td>

      <td className="text-info fw-semibold">
        ₡{juego.precio.toLocaleString("es-CR")}
      </td>

      <td>
        <input
          type="number"
          min="1"
          value={juego.cantidad}
          onChange={handleCantidad}
          className="form-control form-control-sm text-center cantidad-input"
          style={{
            width: "70px",
            backgroundColor: "rgba(255,255,255,0.05)",
            border: "1px solid #66c0f4",
            color: "#fff",
          }}
        />
      </td>

      <td className="text-warning fw-semibold">
        ₡{(juego.precio * juego.cantidad).toLocaleString("es-CR")}
      </td>

      <td>
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={() => onEliminar(juego.idJuego)}
          title="Eliminar del carrito"
        >
          <i className="bi bi-trash"></i> Eliminar
        </button>
      </td>
    </tr>
  );
};

export default CarritoJuegoItem;
