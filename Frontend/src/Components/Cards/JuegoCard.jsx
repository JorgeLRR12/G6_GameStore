import React from 'react';
import './CardStyle.css'; 

const JuegoCard = ({ imagenUrl, titulo, precioOriginal, precioDescuento, descuento }) => {
  return (
    <div className="card h-100 bg-black text-white border-0 shadow-sm rounded">
      <img
        src={imagenUrl}
        className="card-img-top"
        alt={titulo}
        style={{ height: '250px', objectFit: 'cover' }}
      />
      <div className="card-body">
        <small className="text-muted d-block mb-1">Juego base</small>
        <h5 className="card-title fw-semibold">{titulo}</h5>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <span className="badge bg-info text-dark">-{descuento}%</span>
          <div className="text-end">
            <del className="text-muted small d-block">{precioOriginal}</del>
            <span className="fw-bold">{precioDescuento}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JuegoCard;
