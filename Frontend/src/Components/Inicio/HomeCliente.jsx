import React from 'react';
import NavbarCliente from '../Header/HeaderCliente.jsx';
import PromocionesCliente from '../Promociones/Promociones.jsx'; 
import './HomeCliente.css';

const HomeCliente = () => {
  return (
    <>
      <NavbarCliente />

      <div className="home-hero">
        <h1>Bienvenido al Sistema de Juegos</h1>
        <p className="lead">Explora, compra y valora tus juegos favoritos con facilidad.</p>
        <p>Usa el menú de navegación para acceder a tu biblioteca, promociones, soporte y más.</p>
      </div>

      <PromocionesCliente />
    </>
  );
};

export default HomeCliente;
