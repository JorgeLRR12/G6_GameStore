import React, { useEffect, useState } from "react";
import { insertarDesarrollador, actualizarDesarrollador, obtenerDesarrolladorPorId } from "../../Services/DesarrolladorService";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import "./Desarrollador.css";

const FormularioDesarrollador = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { usuario } = useAuth();

  const [desarrollador, setDesarrollador] = useState({
    nombre: "",
    pais: "",
    idUsuario: usuario.idUsuario || "",
  });

  useEffect(() => {
    if (id) {
      const cargar = async () => {
        const datos = await obtenerDesarrolladorPorId(id);
        if (datos) {
          setDesarrollador(datos);
        }
      };
      cargar();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDesarrollador({ ...desarrollador, [name]: value });
  };

  const validar = () => {
    const { nombre, pais } = desarrollador;
    if (!nombre || !pais) {
      alert("⚠️ Todos los campos son obligatorios.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validar()) return;

    const datos = { ...desarrollador, idUsuario: usuario.idUsuario };

    try {
      if (id) {
        await actualizarDesarrollador({ ...datos, idDesarrollador: id });
        alert("Desarrollador actualizado correctamente.");
      } else {
        await insertarDesarrollador(datos);
        alert("Desarrollador registrado correctamente.");
      }
      navigate("/desarrolladores-admin");
    } catch (error) {
      console.error(error);
      alert("Error al guardar el desarrollador.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>{id ? "Editar Desarrollador" : "Registrar Desarrollador"}</h2>
      <form onSubmit={handleSubmit} className="formulario-desarrollador">
        <div className="mb-3">
          <label>Nombre</label>
          <input type="text" name="nombre" value={desarrollador.nombre} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label>País</label>
          <input type="text" name="pais" value={desarrollador.pais} onChange={handleChange} className="form-control" />
        </div>
        <button type="submit" className="btn btn-guardar">
          {id ? "Actualizar" : "Registrar"}
        </button>
        <button type="button" className="btn btn-cancelar ms-2" onClick={() => navigate("/desarrolladores-admin")}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default FormularioDesarrollador;
