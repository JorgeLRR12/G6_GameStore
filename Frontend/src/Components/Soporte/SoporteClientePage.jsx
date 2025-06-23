import React from 'react';
import ClienteNavbar from '../Header/HeaderCliente.jsx'; // ajusta ruta si es necesario
import FormularioSoporte from './FormsTicket.jsx';

const SoporteCliente = () => {
  return (
    <>
      <ClienteNavbar />
      <div className="container mt-4">
        <FormularioSoporte />
      </div>
    </>
  );
};

export default SoporteCliente;
