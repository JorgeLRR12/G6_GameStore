import React, { useState } from "react";
import { crearTicket } from "../../Services/SoporteService";
import { useAuth } from "../../Context/AuthContext.jsx";

import "./FormsTicket.css";

const FormularioSoporte = () => {
  const { usuario } = useAuth(); 

  const [formulario, setFormulario] = useState({
    asunto: "",
    descripcion: "",
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const datosTicket = {
      ...formulario,
      idUsuario: usuario.idUsuario, 
    };

    crearTicket(datosTicket)
      .then((res) => {
        if (res.codigo === 201) {
          setMensaje("✅ Ticket creado correctamente.");
          setFormulario({ asunto: "", descripcion: "" });
        } else {
          setMensaje("❌ Error: " + res.mensaje);
        }
      })
      .catch((err) => {
        console.error(err);
        setMensaje("❌ Error al conectar con la API.");
      });
  };

  return (
    <div className="formulario-soporte">
      <h3>Crear nuevo ticket de soporte</h3>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Asunto</label>
          <input
            type="text"
            name="asunto"
            className="form-control"
            value={formulario.asunto}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            name="descripcion"
            className="form-control"
            rows="4"
            value={formulario.descripcion}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">Enviar</button>
      </form>

      {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
    </div>
  );
};

export default FormularioSoporte;
