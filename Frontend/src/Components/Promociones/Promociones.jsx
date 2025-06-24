import React from 'react';
import JuegoCard from '../Cards/JuegoCard.jsx';
import './Promociones.css';


const juegos = [
  {
    titulo: 'EA Sports FC 25',
    imagenUrl: '../public/img/FC25.jpg',
    precioOriginal: '49.990 CRC',
    precioDescuento: '39.990 CRC',
    descuento: 20
  },
  {
    titulo: "Tom Clancy's Ghost Recon Wildlands",
    imagenUrl: '../public/img/GhostReacon.jpg',
    precioOriginal: '25.000 CRC',
    precioDescuento: '19.900 CRC',
    descuento: 20
  },
  {
    titulo: 'Mario Kart 8 Deluxe',
    imagenUrl: '../public/img/MarioKart8Deluxe.jpg',
    precioOriginal: '34.990 CRC',
    precioDescuento: '27.990 CRC',
    descuento: 20
  },
  {
    titulo: 'Far Cry 6',
    imagenUrl: '../public/img/FarCry6.jpg',
    precioOriginal: '59.990 CRC',
    precioDescuento: '44.990 CRC',
    descuento: 25
  },
  {
    titulo: 'Multiversus',
    imagenUrl: '../public/img/Multiversus.jpg',
    precioOriginal: '49.990 CRC',
    precioDescuento: '39.990 CRC',
    descuento: 20
  },
  {
    titulo: 'Hogwarts Legacy',
    imagenUrl: '../public/img/HogwartsLegacy.jpg',
    precioOriginal: '59.990 CRC',
    precioDescuento: '41.990 CRC',
    descuento: 30
  },
  {
    titulo: 'Call of Duty: Modern Warfare III',
    imagenUrl: '../public/img/CallofDutyModernWarfareIII.jpg',
    precioOriginal: '69.990 CRC',
    precioDescuento: '55.990 CRC',
    descuento: 20
  },
  {
    titulo: 'The Legend of Zelda: Tears of the Kingdom',
    imagenUrl: '../public/img/TheLegendofZelda.jpg',
    precioOriginal: '59.990 CRC',
    precioDescuento: '49.990 CRC',
    descuento: 17
  },
  {
    titulo: 'Elden Ring',
    imagenUrl: '../public/img/EldenRing.jpg',
    precioOriginal: '59.990 CRC',
    precioDescuento: '47.990 CRC',
    descuento: 20
  },
  {
    titulo: 'The Witcher 3: Wild Hunt',
    imagenUrl: '../public/img/theWitcher3.jpg',
    precioOriginal: '49.990 CRC',
    precioDescuento: '39.990 CRC',
    descuento: 20
  },
  {
    titulo: 'Cyberpunk 2077',
    imagenUrl: '../public/img/cyberpunk.jpg',
    precioOriginal: '34.990 CRC',
    precioDescuento: '27.990 CRC',
    descuento: 20
  },
  {
    titulo: 'Overcooked! 2',
    imagenUrl: '../public/img/overcook2.jpg',
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
