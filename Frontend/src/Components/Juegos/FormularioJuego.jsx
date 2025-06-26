import React, { useState, useEffect } from "react";
import { insertarJuego, actualizarJuego, obtenerJuegoPorId } from "../../Services/JuegoService";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import "./Juego.css";

const FormularioJuego = () => {
  const { usuario } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [juego, setJuego] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    fechaLanzamiento: "",
    clasificacionEdad: "",
    idCategoria: "",
    imagen: "",
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setJuego({ ...juego, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = `/img/${file.name}`;
      setJuego({ ...juego, imagen: imageUrl });
      setPreview(URL.createObjectURL(file));

      alert(`Recuerda mover la imagen a la carpeta public/img`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const datos = {
      ...juego,
      idUsuario: usuario.idUsuario,
    };

    try {
      if (id) {
        await actualizarJuego({ ...datos, idJuego: id });
        alert("Juego actualizado correctamente.");
      } else {
        await insertarJuego(datos);
        alert("Juego registrado correctamente.");
      }
      navigate("/juegos-admin");
    } catch (error) {
      console.error(error);
      alert("Error al guardar el juego.");
    }
  };

 
useEffect(() => {
  if (id) {
    const cargarJuego = async () => {
      try {
        const datos = await obtenerJuegoPorId(id);
      if (datos) {
  const juegoData = datos;
  setJuego({
    nombre: juegoData.nombre,
    descripcion: juegoData.descripcion,
    precio: juegoData.precio,
    fechaLanzamiento: juegoData.fechaLanzamiento,
    clasificacionEdad: juegoData.clasificacionEdad,
    idCategoria: juegoData.idCategoria,
    imagen: juegoData.imagen,
  });
  setPreview(juegoData.imagen);
} else {
  console.warn("No se encontró el juego con id:", id);
}

      } catch (error) {
        console.error("Error al cargar el juego:", error);
      }
    };
    cargarJuego();
  }
}, [id]);


  return (
    <div className="container mt-5">
      <h2>{id ? "Editar Juego" : "Registrar Juego"}</h2>
      <form onSubmit={handleSubmit} className="formulario-juego">

        <div className="mb-3">
          <label>Nombre</label>
          <input type="text" name="nombre" value={juego.nombre} onChange={handleChange} className="form-control" />
        </div>

        <div className="mb-3">
          <label>Descripción</label>
          <textarea name="descripcion" value={juego.descripcion} onChange={handleChange} className="form-control" />
        </div>

        <div className="mb-3">
          <label>Precio</label>
          <input type="number" name="precio" value={juego.precio} onChange={handleChange} className="form-control" />
        </div>

        <div className="mb-3">
          <label>Fecha Lanzamiento</label>
          <input type="date" name="fechaLanzamiento" value={juego.fechaLanzamiento} onChange={handleChange} className="form-control" />
        </div>

        <div className="mb-3">
          <label>Clasificación Edad</label>
          <input type="text" name="clasificacionEdad" value={juego.clasificacionEdad} onChange={handleChange} className="form-control" placeholder="Ej: E, T, M, A, +18" />
        </div>

        <div className="mb-3">
          <label>ID Categoría</label>
          <input type="number" name="idCategoria" value={juego.idCategoria} onChange={handleChange} className="form-control" />
        </div>

        {/* Imagen */}
        <div className="mb-3">
          <label>Imagen del Juego</label>
          <input type="file" accept="image/*" onChange={handleImage} className="form-control" />
          {preview && (
            <div className="mt-2">
              <img src={preview} alt="Preview" style={{ width: "180px", height: "120px", objectFit: "cover", borderRadius: "8px" }} />
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-guardar">
          {id ? "Actualizar" : "Registrar"}
        </button>
        <button type="button" className="btn btn-cancelar ms-2" onClick={() => navigate("/juegos-admin")}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default FormularioJuego;
