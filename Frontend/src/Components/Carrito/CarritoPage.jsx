// Carrrito CarritoPage.jsx

import React, { useEffect, useState } from "react";
import CarritoJuegoItem from "./CarritoJuegoItem.jsx";
import ResumenCarrito from "./ResumenCarrito.jsx";
import "./Carrito.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import ClienteNavbar from "../Header/HeaderCliente";


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
  const [toast, setToast] = useState({
    show: false,
    mensaje: "",
    tipo: "info",
  });

  // Cuando el componente se monta, busco el carrito del usuario y luego los juegos
  useEffect(() => {
    // Si no hay usuario, no hago nada
    if (!usuario) return;

    // Ya no se restringe solo a clientes
    // Busco el carrito del usuario, si no existe lo creo
    const fetchOrCreateCarrito = async () => {
      try {
        // Consulto si ya existe un carrito para este usuario
        const res = await axios.get(
          `https://gamestorecr.onrender.com/API/carrito.php?idUsuario=${usuario.idUsuario}`
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
            // Ahora la imagen viene desde la base de datos (campo imagen)
            return {
              idJuego: juego.idJuego,
              nombre: juego.nombre,
              imagen: juego.imagen, // Uso la url de imagen de la base de datos directamente
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
      axios.delete(`https://gamestorecr.onrender.com/API/carritojuego.php`, {
        data: { idCarrito, idJuego },
      });
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

  // Mostrar toast si el carrito está vacío
  useEffect(() => {
    if (!cargando && juegos.length === 0) {
      setToast({
        show: true,
        mensaje: "Tu carrito está vacío. ¡Agrega juegos para comenzar!",
        tipo: "info",
      });
      const timer = setTimeout(
        () => setToast({ show: false, mensaje: "", tipo: "info" }),
        2500
      );
      return () => clearTimeout(timer);
    }
  }, [cargando, juegos.length]);

  return (
    <>
      <ClienteNavbar />
      <div className="carrito-container container mt-5 mb-5">
        {/* Toast para avisos */}
        {toast.show && (
          <div
            className={`position-fixed top-0 start-50 translate-middle-x mt-3 px-4 py-2 rounded shadow-lg text-center fw-semibold toast-gamer ${toast.tipo}`}
            style={{
              zIndex: 9999,
              minWidth: 260,
              fontSize: "1.1rem",
              letterSpacing: "0.5px",
            }}
          >
            {toast.mensaje}
          </div>
        )}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="titulo-carrito m-0">🛒 Mi carrito</h2>
            {usuario && (
              <div
                className="text-info fw-semibold mt-1"
                style={{ fontSize: "1.1rem" }}
              >
                {usuario.nombre}, estos son los juegos de tu carrito.
              </div>
            )}
          </div>
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
          // El toast ya muestra el aviso, así que solo deja el espacio visual
          <div style={{ minHeight: 120 }}></div>
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
    </>

  );
};

export default CarritoPage;
