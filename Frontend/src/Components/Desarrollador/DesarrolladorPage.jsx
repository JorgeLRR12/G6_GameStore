import React, { useEffect, useState } from "react";
import { obtenerDesarrolladores } from "../../Services/DesarrolladorService";
import "./Desarrollador.css";

const DesarrolladorPage = () => {
  const [desarrolladores, setDesarrolladores] = useState([]);

  useEffect(() => {
    const cargar = async () => {
      const datos = await obtenerDesarrolladores();
      setDesarrolladores(datos || []);
    };
    cargar();
  }, []);

  return (
    <div className="container desarrollador-page mt-5 mb-5">
      <h2 className="titulo-desarrolladores mb-4">👨‍💻 Nuestros Desarrolladores</h2>
      <div className="row">
        {desarrolladores.map((d) => (
          <div className="col-md-4 mb-4" key={d.idDesarrollador}>
            <div className="card h-100 bg-dark text-white border-0 shadow">
              <div className="card-body">
                <h5 className="card-title">{d.nombre}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{d.pais}</h6>
                <p className="card-text">ID Usuario: {d.idUsuario}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesarrolladorPage;
