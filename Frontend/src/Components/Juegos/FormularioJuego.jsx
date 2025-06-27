 import React, { useEffect, useState } from "react";
import {
  insertarJuego,
  actualizarJuego,
  obtenerJuegoPorId,
} from "../../Services/JuegoService";
import { obtenerCategorias } from "../../Services/CategoriaService";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import "./Juego.css";

const clasificaciones = ["E", "T", "M", "A", "+18"];

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

  const [categorias, setCategorias] = useState([]);
  const [imagenPreview, setImagenPreview] = useState("");

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const categoriasBD = await obtenerCategorias();
        setCategorias(categoriasBD);

        if (id) {
          const datos = await obtenerJuegoPorId(id);
          if (datos) {
            setJuego(datos);
            if (datos.imagen) {
              setImagenPreview(datos.imagen); //  Ya debe venir con "/img/archivo.jpg"
            }
          }
        }
      } catch (error) {
        console.error("Error al cargar datos", error);
      }
    };
    cargarDatos();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "imagen") {
      const archivo = files[0];
      if (archivo) {
        const rutaImagen = `../../../public/img/${archivo.name}`;
        setJuego({ ...juego, imagen: rutaImagen });
        setImagenPreview(URL.createObjectURL(archivo)); //  Preview local mientras se sube
      } else {
        setJuego({ ...juego, imagen: "" });
        setImagenPreview("");
      }
    } else {
      setJuego({ ...juego, [name]: value });
    }
  };

  const validarCampos = () => {
    const {
      nombre,
      descripcion,
      precio,
      fechaLanzamiento,
      clasificacionEdad,
      idCategoria,
      imagen,
    } = juego;

    if (
      !nombre ||
      !descripcion ||
      !precio ||
      !fechaLanzamiento ||
      !clasificacionEdad ||
      !idCategoria ||
      !imagen
    ) {
      alert(" Debe completar todos los campos.");
      return false;
    }

    if (Number(precio) <= 0) {
      alert(" El precio debe ser mayor a 0.");
      return false;
    }

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const fechaSeleccionada = new Date(fechaLanzamiento);

    if (fechaSeleccionada > hoy) {
      alert(" La fecha de lanzamiento no puede ser futura.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarCampos()) return;

    const datos = { ...juego, idUsuario: usuario.idUsuario };

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

  return (
    <div className="container mt-5">
      <h2>{id ? "Editar Juego" : "Registrar Juego"}</h2>
      <form onSubmit={handleSubmit} className="formulario-juego">
        <div className="mb-3">
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            value={juego.nombre}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>Descripción</label>
          <textarea
            name="descripcion"
            value={juego.descripcion}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>Precio</label>
          <input
            type="number"
            name="precio"
            min="1"
            value={juego.precio}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>Fecha Lanzamiento</label>
          <input
            type="date"
            name="fechaLanzamiento"
            value={juego.fechaLanzamiento}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>Clasificación Edad</label>
          <select
            name="clasificacionEdad"
            value={juego.clasificacionEdad}
            onChange={handleChange}
            className="form-control"
          >
            <option value="">Seleccione</option>
            {clasificaciones.map((clase) => (
              <option key={clase} value={clase}>
                {clase}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label>Categoría</label>
          <select
            name="idCategoria"
            value={juego.idCategoria}
            onChange={handleChange}
            className="form-control"
          >
            <option value="">Seleccione una categoría</option>
            {categorias.map((cat) => (
              <option key={cat.idCategoria} value={cat.idCategoria}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label>Imagen del Juego</label>
          <input
            type="file"
            name="imagen"
            onChange={handleChange}
            className="form-control"
            accept="image/*"
          />
           {imagenPreview && (
  <div className="mt-2">
    <img
      src={imagenPreview}
      alt={juego.nombre}
      style={{
        width: "80px",
        height: "60px",
        objectFit: "cover",
        borderRadius: "8px",
        border: "1px solid #00bfff44",
        background: "#111"
      }}
    />
  </div>
)}

        </div>
        <button type="submit" className="btn btn-guardar">
          {id ? "Actualizar" : "Registrar"}
        </button>
        <button
          type="button"
          className="btn btn-cancelar ms-2"
          onClick={() => navigate("/juegos-admin")}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default FormularioJuego;

// import React, { useEffect, useState } from "react";
// import {
//   insertarJuego,
//   actualizarJuego,
//   obtenerJuegoPorId,
// } from "../../Services/JuegoService";
// import { insertarJuegoDesarrollador } from "../../Services/JuegoDesarrolladorService";
// import { obtenerCategorias } from "../../Services/CategoriaService";
// import { obtenerDesarrolladores } from "../../Services/DesarrolladorService";
// import { useNavigate, useParams } from "react-router-dom";
// import { useAuth } from "../../Context/AuthContext";
// import "./Juego.css";

// const clasificaciones = ["E", "T", "M", "A", "+18"];

// const FormularioJuego = () => {
//   const { usuario } = useAuth();
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const [juego, setJuego] = useState({
//     nombre: "",
//     descripcion: "",
//     precio: "",
//     fechaLanzamiento: "",
//     clasificacionEdad: "",
//     idCategoria: "",
//     imagen: "",
//   });

//   const [categorias, setCategorias] = useState([]);
//   const [desarrolladores, setDesarrolladores] = useState([]);
//   const [desarrolladoresSeleccionados, setDesarrolladoresSeleccionados] = useState([]);

//   const [imagenPreview, setImagenPreview] = useState("");

//   useEffect(() => {
//     const cargarDatos = async () => {
//       try {
//         const categoriasBD = await obtenerCategorias();
//         const desarrolladoresBD = await obtenerDesarrolladores();
//         setCategorias(categoriasBD);
//         setDesarrolladores(desarrolladoresBD);

//         if (id) {
//           const datos = await obtenerJuegoPorId(id);
//           if (datos) {
//             setJuego(datos);
//             setImagenPreview(datos.imagen);
//             const relaciones = datos.desarrolladores || [];
//             setDesarrolladoresSeleccionados(relaciones.map((d) => d.idDesarrollador));
//           }
//         }
//       } catch (error) {
//         console.error("Error al cargar datos", error);
//       }
//     };
//     cargarDatos();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "imagen") {
//       const archivo = files[0];
//       setJuego({ ...juego, imagen: archivo ? archivo.name : "" });
//       setImagenPreview(archivo ? URL.createObjectURL(archivo) : "");
//     } else {
//       setJuego({ ...juego, [name]: value });
//     }
//   };

//  const handleSeleccionDesarrolladores = (e) => {
//   const seleccionados = Array.from(e.target.selectedOptions).map(
//     (opcion) => parseInt(opcion.value)  //  Aseguramos que sea número
//   );
//   setDesarrolladoresSeleccionados(seleccionados);
// };





 
//   const validarCampos = () => {
//     const {
//       nombre,
//       descripcion,
//       precio,
//       fechaLanzamiento,
//       clasificacionEdad,
//       idCategoria,
//       imagen,
//     } = juego;

//     if (
//       !nombre ||
//       !descripcion ||
//       !precio ||
//       !fechaLanzamiento ||
//       !clasificacionEdad ||
//       !idCategoria ||
//       !imagen
//     ) {
//       alert("⚠️ Debe completar todos los campos.");
//       return false;
//     }

//     if (Number(precio) <= 0) {
//       alert("⚠️ El precio debe ser mayor a 0.");
//       return false;
//     }

//     const hoy = new Date();
//     hoy.setHours(0, 0, 0, 0);
//     const fechaSeleccionada = new Date(fechaLanzamiento);

//     if (fechaSeleccionada > hoy) {
//       alert("⚠️ La fecha de lanzamiento no puede ser futura.");
//       return false;
//     }

//     if (desarrolladoresSeleccionados.length === 0) {
//       alert("⚠️ Debe seleccionar al menos un desarrollador.");
//       return false;
//     }

//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validarCampos()) return;

//     const datos = { ...juego, idUsuario: usuario.idUsuario };

//     try {
//       if (id) {
//         await actualizarJuego({ ...datos, idJuego: id });
//         alert("Juego actualizado correctamente.");
//       } else {
//         const res = await insertarJuego(datos);
//         const idJuegoInsertado = res.idJuego;

//         for (const idDesarrollador of desarrolladoresSeleccionados) {
//           await insertarJuegoDesarrollador(idJuegoInsertado, idDesarrollador);
//         }

//         alert("Juego registrado correctamente.");
//       }
//       navigate("/juegos-admin");
//     } catch (error) {
//       console.error(error);
//       alert("Error al guardar el juego.");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2>{id ? "Editar Juego" : "Registrar Juego"}</h2>
//       <form onSubmit={handleSubmit} className="formulario-juego">
//         {/* Campos existentes */}
//         <div className="mb-3">
//           <label>Nombre</label>
//           <input type="text" name="nombre" value={juego.nombre} onChange={handleChange} className="form-control" />
//         </div>
//         <div className="mb-3">
//           <label>Descripción</label>
//           <textarea name="descripcion" value={juego.descripcion} onChange={handleChange} className="form-control" />
//         </div>
//         <div className="mb-3">
//           <label>Precio</label>
//           <input type="number" name="precio" value={juego.precio} onChange={handleChange} className="form-control" />
//         </div>
//         <div className="mb-3">
//           <label>Fecha Lanzamiento</label>
//           <input type="date" name="fechaLanzamiento" value={juego.fechaLanzamiento} onChange={handleChange} className="form-control" />
//         </div>
//         <div className="mb-3">
//           <label>Clasificación Edad</label>
//           <select name="clasificacionEdad" value={juego.clasificacionEdad} onChange={handleChange} className="form-control">
//             <option value="">Seleccione</option>
//             {clasificaciones.map((clase) => (
//               <option key={clase} value={clase}>{clase}</option>
//             ))}
//           </select>
//         </div>
//         <div className="mb-3">
//           <label>Categoría</label>
//           <select name="idCategoria" value={juego.idCategoria} onChange={handleChange} className="form-control">
//             <option value="">Seleccione una categoría</option>
//             {categorias.map((cat) => (
//               <option key={cat.idCategoria} value={cat.idCategoria}>
//                 {cat.nombre}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="mb-3">
//   <label>Desarrolladores</label>
//   <select
//     multiple
//     className="form-control"
//     value={desarrolladoresSeleccionados}
//     onChange={(e) => {
//       const seleccionados = Array.from(e.target.selectedOptions).map(
//         (option) => parseInt(option.value)
//       );
//       setDesarrolladoresSeleccionados(seleccionados);
//     }}
//   >
//     {desarrolladores.map((dev) => (
//       <option key={dev.idDesarrollador} value={dev.idDesarrollador}>
//         {dev.nombre} ({dev.pais})
//       </option>
//     ))}
//   </select>
// </div>


      




//         <div className="mb-3">
//           <label>Imagen del Juego</label>
//           <input
//             type="file"
//             name="imagen"
//             onChange={handleChange}
//             className="form-control"
//             accept="image/*"
//           />
//           {imagenPreview && (
//             <div className="mt-2">
//               <img
//                 src={imagenPreview.startsWith("blob:") ? imagenPreview : `/img/${imagenPreview}`}
//                 alt={juego.nombre}
//                 style={{
//                   width: "80px",
//                   height: "60px",
//                   objectFit: "cover",
//                   borderRadius: "8px",
//                   border: "1px solid #00bfff44",
//                   background: "#111",
//                 }}
//               />
//             </div>
//           )}
//         </div>
//         <button type="submit" className="btn btn-guardar">
//           {id ? "Actualizar" : "Registrar"}
//         </button>
//         <button
//           type="button"
//           className="btn btn-cancelar ms-2"
//           onClick={() => navigate("/juegos-admin")}
//         >
//           Cancelar
//         </button>
//       </form>
//     </div>
//   );
// };

// export default FormularioJuego;

