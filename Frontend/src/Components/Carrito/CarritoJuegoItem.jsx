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
      <td>
        <img
          src={juego.imagen}
          alt={juego.nombre}
          className="img-juego-carrito"
          style={{ width: 72, height: 48, objectFit: "cover", borderRadius: 12 }}
        />
        <span className="ms-2">{juego.nombre}</span>
      </td>
      <td>₡{juego.precio.toLocaleString()}</td>
      <td>
        <input
          type="number"
          min="1"
          value={juego.cantidad}
          onChange={handleCantidad}
          className="form-control form-control-sm cantidad-input"
          style={{ width: "70px" }}
        />
      </td>
      <td>₡{(juego.precio * juego.cantidad).toLocaleString()}</td>
      <td>
        <button
          className="btn btn-danger btn-sm"
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
