// Compra: RegistroCompra.jsx
import React from "react";
import "./RegistroCompra.css";
import ClienteNavbar from "../Header/HeaderCliente";

// Esta es la vista básica de registro de compra.

const RegistroCompra = () => {
  return (
    <>
    <ClienteNavbar/>
    <div className="registro-compra-container">
      <div className="registro-compra-card">
        <h2 className="mb-3">Registro de compra</h2>
        <p>
          Aquí va el formulario y la lógica para registrar la compra. <br />
        </p>
      </div>
    </div>
    </>
  );
};

export default RegistroCompra;
