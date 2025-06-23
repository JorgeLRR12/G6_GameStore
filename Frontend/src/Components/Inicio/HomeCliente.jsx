import React from 'react';
import NavbarCliente from '../Header/HeaderCliente.jsx';
import '../../App.css'; 

const HomeCliente = () => {
  return (
    <>
      <NavbarCliente />

      <div className="container mt-5 text-center text-white">
        <h1 className="display-4">🎮 Bienvenido al Sistema de Juegos</h1>
        <p className="lead">Explora, compra y valora tus juegos favoritos con facilidad.</p>
        <p>Usa el menú de navegación para acceder a tu biblioteca, promociones, soporte y más.</p>
      </div>
    </>
  );
};

export default HomeCliente;
