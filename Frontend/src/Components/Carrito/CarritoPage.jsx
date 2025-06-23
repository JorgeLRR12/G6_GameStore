import React, { useEffect, useState } from "react";
import CarritoJuegoItem from "./CarritoJuegoItem.jsx";
import ResumenCarrito from "./ResumenCarrito.jsx";
import "./Carrito.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Página principal del carrito de compras
const CarritoPage = () => {
  // Aquí guardo los juegos que están en el carrito
  const [juegos, setJuegos] = useState([]);
  // Este estado me ayuda a mostrar un mensaje de carga
  const [cargando, setCargando] = useState(true);
  // Para navegar a otra página
  const navigate = useNavigate();

  // Aquí debería obtener el idCarrito real del usuario autenticado
  const idCarrito = 1; // Por ahora lo dejo fijo para pruebas

  // Cuando el componente se monta, traigo los juegos del carrito desde la API
  useEffect(() => {
    const fetchCarritoJuegos = async () => {
      try {
        // Pido los juegos que están en el carrito
        const resCarrito = await axios.get(
          `http://localhost/MultimediosProyecto/G6_GameStore/Backend/API/carritojuego.php?idCarrito=${idCarrito}`
        );
        const juegosCarrito = resCarrito.data.datos || [];

        // Si no hay juegos, dejo el estado vacío y termino
        if (juegosCarrito.length === 0) {
          setJuegos([]);
          setCargando(false);
          return;
        }

        // Por cada juego en el carrito, pido la info completa del juego
        const juegosConInfo = await Promise.all(
          juegosCarrito.map(async (item) => {
            // Aquí pido los datos del juego por su id
            const resJuego = await axios.get(
              `http://localhost/MultimediosProyecto/G6_GameStore/Backend/API/juego.php?id=${item.idJuego}`
            );
            const juego = resJuego.data.datos;
            // Si el backend no tiene imagen, uso una por defecto
            return {
              idJuego: juego.idJuego,
              nombre: juego.nombre,
              imagen:
                juego.imagen || "https://via.placeholder.com/60x40?text=Juego",
              precio: juego.precio,
              cantidad: 1, // Si el modelo soporta cantidad, aquí la pondría
            };
          })
        );
        setJuegos(juegosConInfo);
      } catch (error) {
        // Si algo falla, dejo el carrito vacío
        setJuegos([]);
      }
      setCargando(false);
    };

    fetchCarritoJuegos();
  }, [idCarrito]);

  // Cuando quiero eliminar un juego del carrito, lo saco del estado y llamo a la API
  const eliminarJuego = (idJuego) => {
    setJuegos(juegos.filter((j) => j.idJuego !== idJuego));
    axios.delete(
      `http://localhost/MultimediosProyecto/G6_GameStore/Backend/API/carritojuego.php`,
      {
        data: { idCarrito, idJuego },
      }
    );
  };

  // Si cambio la cantidad de un juego, actualizo el estado (y aquí podría llamar a la API si el backend lo soporta)
  const cambiarCantidad = (idJuego, nuevaCantidad) => {
    setJuegos(
      juegos.map((j) =>
        j.idJuego === idJuego ? { ...j, cantidad: nuevaCantidad } : j
      )
    );
  };

  // Calculo el total sumando el precio por cantidad de cada juego
  const total = juegos.reduce((acc, j) => acc + j.precio * j.cantidad, 0);

  // Si quiero regresar a la tienda, uso navigate
  const handleRegresar = () => {
    navigate("/");
  };

  return (
    <div className="carrito-container container mt-5 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="titulo-carrito m-0">🛒 Mi carrito</h2>
        <button
          className="btn btn-outline-info btn-volver-tienda"
          onClick={handleRegresar}
        >
          <i className="bi bi-arrow-left"></i> Volver a la tienda
        </button>
      </div>
      {cargando ? (
        <div className="text-center text-light">Cargando carrito...</div>
      ) : juegos.length === 0 ? (
        <div className="alert alert-info text-center">
          El carrito está vacío.{" "}
          <a href="/" className="enlace-tienda">
            Ir a la tienda
          </a>
        </div>
      ) : (
        <>
          <div className="tabla-carrito table-responsive rounded-3 shadow">
            <table className="table table-dark table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th>Juego</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {juegos.map((juego) => (
                  <CarritoJuegoItem
                    key={juego.idJuego}
                    juego={juego}
                    onEliminar={eliminarJuego}
                    onCantidad={cambiarCantidad}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <ResumenCarrito total={total} juegos={juegos} setJuegos={setJuegos} />
        </>
      )}
    </div>
  );
};

export default CarritoPage;
