import React, { useEffect, useState } from "react";
import CarritoJuegoItem from "./CarritoJuegoItem.jsx";
import ResumenCarrito from "./ResumenCarrito.jsx";
import "./Carrito.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

// Página principal del carrito de compras
const CarritoPage = () => {
  // Estado para los juegos en el carrito
  const [juegos, setJuegos] = useState([]);
  // Estado para el idCarrito real del usuario autenticado
  const [idCarrito, setIdCarrito] = useState(null);
  // Estado de carga
  const [cargando, setCargando] = useState(true);
  // Para navegar a otra página
  const navigate = useNavigate();
  // Obtengo el usuario autenticado desde el contexto
  const { usuario } = useAuth();

  // Cuando el componente se monta, busco el carrito del usuario y luego los juegos
  useEffect(() => {
    // Si no hay usuario, no hago nada
    if (!usuario) return;

    // Solo los clientes pueden tener carrito, si es admin lo saco de aquí
    if (usuario.rol !== "Cliente") {
      setCargando(false);
      setJuegos([]);
      setIdCarrito(null);
      return;
    }

    // Busco el carrito del usuario, si no existe lo creo
    const fetchOrCreateCarrito = async () => {
      try {
        // Consulto si ya existe un carrito para este usuario
        const res = await axios.get(
          `https://gamestorecr.onrender.com/API/carrito.php
?idUsuario=${usuario.idUsuario}`
        );
        let carrito = res.data.datos && res.data.datos[0];

        // Si no existe, lo creo
        if (!carrito) {
          const nuevo = await axios.post(
            "https://gamestorecr.onrender.com/API/carrito.php",
            {
              idUsuario: usuario.idUsuario,
            }
          );
          carrito = nuevo.data.datos;
        }
        setIdCarrito(carrito.idCarrito);

        // Ahora traigo los juegos de este carrito
        const resCarrito = await axios.get(
          `https://gamestorecr.onrender.com/API/carritojuego.php?idCarrito=${carrito.idCarrito}`
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
            // Traigo los datos del juego por su id
            const resJuego = await axios.get(
              `https://gamestorecr.onrender.com/API/juego.php?id=${item.idJuego}`
            );
            const juego = resJuego.data.datos;
            // Aquí puedo agregar la imagen si la manejo en frontend
            // Si el backend no tiene imagen, uso una por defecto
            return {
              idJuego: juego.idJuego,
              nombre: juego.nombre,
              imagen: `/img/${juego.nombre.toLowerCase().replace(/[^a-z0-9]/g, "_")}.jpg`,
              precio: parseFloat(juego.precio),
              cantidad: 1,
            };
          })
        );
        setJuegos(juegosConInfo);
      } catch (error) {
        setJuegos([]);
      }
      setCargando(false);
    };

    fetchOrCreateCarrito();
  }, [usuario]);

  // Elimino un juego del carrito y lo saco del estado
  const eliminarJuego = (idJuego) => {
    setJuegos(juegos.filter((j) => j.idJuego !== idJuego));
    if (idCarrito) {
      axios.delete(
        `https://gamestorecr.onrender.com/API/carritojuego.php`,
        {
          data: { idCarrito, idJuego },
        }
      );
    }
  };

  // Si cambio la cantidad de un juego, actualizo el estado (y aquí podría llamar a la API si el backend lo soporta)
  const cambiarCantidad = (idJuego, nuevaCantidad) => {
    setJuegos(
      juegos.map((j) =>
        j.idJuego === idJuego ? { ...j, cantidad: nuevaCantidad } : j
      )
    );
  };

  // Calculo el total sumando el precio por cantidad de cada juego, aplicando descuento si hay promoción
  const [promos, setPromos] = useState([]);
  useEffect(() => {
    // Traigo todas las promociones para aplicar descuentos en el carrito
    const fetchPromos = async () => {
      try {
        const res = await axios.get(
          "https://gamestorecr.onrender.com/API/promocion.php"
        );
        setPromos(res.data.datos || []);
      } catch (error) {
        setPromos([]);
      }
    };
    fetchPromos();
  }, []);

  // Función para obtener el precio con descuento si hay promoción
  const getPrecioConDescuento = (juego) => {
    const promo = promos.find((p) => p.idJuego === juego.idJuego);
    if (promo) {
      return juego.precio * (1 - promo.porcentajeDescuento / 100);
    }
    return juego.precio;
  };

  const total = juegos.reduce(
    (acc, j) => acc + getPrecioConDescuento(j) * j.cantidad,
    0
  );

  // Si quiero regresar a la tienda, uso navigate
  const handleRegresar = () => {
    navigate("/");
  };

  // Si el usuario no es cliente, muestro solo un mensaje
  if (usuario && usuario.rol !== "Cliente") {
    return (
      <div className="carrito-container container mt-5 mb-5">
        <div className="alert alert-warning text-center">
          El carrito solo está disponible para clientes.
        </div>
      </div>
    );
  }

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
