import React from 'react';
import JuegoCard from '../Cards/JuegoCard.jsx';
import './Promociones.css'; // Nuevo CSS para aplicar el fondo con sombra

const juegos = [
  {
    titulo: 'Dying Light: Standard Edition',
    imagenUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/239140/header.jpg',
    precioOriginal: '8643 CRC',
    precioDescuento: '1728,60 CRC',
    descuento: 80
  },
  {
    titulo: 'Never Synth',
    imagenUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2642200/header.jpg',
    precioOriginal: '3780 CRC',
    precioDescuento: '264,60 CRC',
    descuento: 93
  },
  {
    titulo: 'Dead by Daylight',
    imagenUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/381210/header.jpg',
    precioOriginal: '9500 CRC',
    precioDescuento: '3800 CRC',
    descuento: 60
  },
  {
    titulo: 'Firelight Fantasy: Vengeance',
    imagenUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1738650/header.jpg',
    precioOriginal: '4540 CRC',
    precioDescuento: '317,80 CRC',
    descuento: 93
  },
  {
    titulo: 'Dying Light 2 Stay Human',
    imagenUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/534380/header.jpg',
    precioOriginal: '34.990 CRC',
    precioDescuento: '11.546,70 CRC',
    descuento: 67
  }
];

const PromocionesCliente = () => {
  return (
    <div className="contenedor-promociones">
      <div className="container">
        <h2 className="mb-4 fw-bold text-white text-center">🎯 Selección de descuentos</h2>
        <div className="row">
          {juegos.map((juego, index) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={index}>
              <JuegoCard {...juego} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromocionesCliente;
