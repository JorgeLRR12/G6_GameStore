import React from "react";

const CarritoJuegoItem = ({ juego, onEliminar, onCantidad }) => {
  const handleCantidad = (e) => {
    const nuevaCantidad = Math.max(1, parseInt(e.target.value) || 1);
    onCantidad(juego.idJuego, nuevaCantidad);
  };

  return (
    <tr>
      {/* Nombre + imagen del juego */}
      <td className="d-flex align-items-center">
        <img
          src={juego.imagen || "/default.png"} // Valor por defecto si no hay imagen
          alt={juego.nombre || "Juego"}
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

      {/* Precio unitario */}
      <td className="text-info fw-semibold">
        ₡{parseFloat(juego.precio).toLocaleString("es-CR")}
      </td>

      {/* Cantidad editable */}
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

      {/* Subtotal */}
      <td className="text-warning fw-semibold">
        ₡{(juego.precio * juego.cantidad).toLocaleString("es-CR")}
      </td>

      {/* Botón eliminar */}
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
