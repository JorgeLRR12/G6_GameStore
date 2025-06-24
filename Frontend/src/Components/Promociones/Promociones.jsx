import React from 'react';
import JuegoCard from '../Cards/JuegoCard.jsx';
import './Promociones.css';


const juegos = [
  {
    titulo: 'EA Sports FC 24',
    imagenUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2195250/header.jpg',
    precioOriginal: '49.990 CRC',
    precioDescuento: '39.990 CRC',
    descuento: 20
  },
  {
    titulo: "Tom Clancy's Ghost Recon Wildlands",
    imagenUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/460930/header.jpg',
    precioOriginal: '25.000 CRC',
    precioDescuento: '19.900 CRC',
    descuento: 20
  },
  {
    titulo: 'Mario Kart 8 Deluxe',
    imagenUrl: 'https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_2.0/c_scale,w_400/ncom/en_US/games/switch/m/mario-kart-8-deluxe-switch/hero',
    precioOriginal: '34.990 CRC',
    precioDescuento: '27.990 CRC',
    descuento: 20
  },
  {
    titulo: 'Far Cry 6',
    imagenUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2369390/header.jpg',
    precioOriginal: '59.990 CRC',
    precioDescuento: '44.990 CRC',
    descuento: 25
  },
  {
    titulo: 'Multiversus',
    imagenUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1818750/header.jpg',
    precioOriginal: '49.990 CRC',
    precioDescuento: '39.990 CRC',
    descuento: 20
  },
  {
    titulo: 'Hogwarts Legacy',
    imagenUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/990080/header.jpg',
    precioOriginal: '59.990 CRC',
    precioDescuento: '41.990 CRC',
    descuento: 30
  },
  {
    titulo: 'Call of Duty: Modern Warfare III',
    imagenUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1938090/header.jpg',
    precioOriginal: '69.990 CRC',
    precioDescuento: '55.990 CRC',
    descuento: 20
  },
  {
    titulo: 'The Legend of Zelda: Tears of the Kingdom',
    imagenUrl: 'https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_2.0/c_scale,w_400/ncom/en_US/games/switch/t/the-legend-of-zelda-tears-of-the-kingdom-switch/hero',
    precioOriginal: '59.990 CRC',
    precioDescuento: '49.990 CRC',
    descuento: 17
  },
  {
    titulo: 'Elden Ring',
    imagenUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg',
    precioOriginal: '59.990 CRC',
    precioDescuento: '47.990 CRC',
    descuento: 20
  },
  {
    titulo: 'The Witcher 3: Wild Hunt',
    imagenUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg',
    precioOriginal: '49.990 CRC',
    precioDescuento: '39.990 CRC',
    descuento: 20
  },
  {
    titulo: 'Cyberpunk 2077',
    imagenUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg',
    precioOriginal: '34.990 CRC',
    precioDescuento: '27.990 CRC',
    descuento: 20
  },
  {
    titulo: 'Overcooked! 2',
    imagenUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/728880/header.jpg',
    precioOriginal: '10.000 CRC',
    precioDescuento: '6.000 CRC',
    descuento: 20
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
