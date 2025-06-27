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
  const [juegos, setJuegos] = useState([]);
  const [idCarrito, setIdCarrito] = useState(null);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const [promos, setPromos] = useState([]);
  const [toast, setToast] = useState({
    show: false,
    mensaje: "",
    tipo: "info",
  });

  useEffect(() => {
    if (!usuario) return;

    const fetchOrCreateCarrito = async () => {
      try {
        const res = await axios.get(
          `http://localhost/G6_GameStore/Backend/API/carrito.php?idUsuario=${usuario.idUsuario}`
        );
        let carrito = res.data.datos && res.data.datos[0];

        if (!carrito) {
          const nuevo = await axios.post(
            "http://localhost/G6_GameStore/Backend/API/carrito.php",
            {
              idUsuario: usuario.idUsuario,
            }
          );
          carrito = nuevo.data.datos;
        }

        setIdCarrito(carrito.idCarrito);

        const resCarrito = await axios.get(
          `http://localhost/G6_GameStore/Backend/API/carritojuego.php?idCarrito=${carrito.idCarrito}`
        );
        const juegosCarrito = resCarrito.data.datos || [];

        if (juegosCarrito.length === 0) {
          setJuegos([]);
          setCargando(false);
          return;
        }

        const juegosConInfo = await Promise.all(
          juegosCarrito.map(async (item) => {
            const resJuego = await axios.get(
              `http://localhost/G6_GameStore/Backend/API/juego.php?id=${item.idJuego}`
            );
            const juego = resJuego.data.datos;
            return {
              idJuego: juego.idJuego,
              nombre: juego.nombre,
              imagen: juego.imagen,
              precio: parseFloat(juego.precio),
              cantidad: 1,
            };
          })
        );
        setJuegos(juegosConInfo);
      } catch (error) {
        console.error("Error cargando carrito:", error);
        setJuegos([]);
      }
      setCargando(false);
    };

    fetchOrCreateCarrito();
  }, [usuario]);

  useEffect(() => {
    const fetchPromos = async () => {
      try {
        const res = await axios.get(
          "http://localhost/G6_GameStore/Backend/API/promocion.php"
        );
        setPromos(res.data.datos || []);
      } catch (error) {
        setPromos([]);
      }
    };
    fetchPromos();
  }, []);

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

  const eliminarJuego = (idJuego) => {
    setJuegos(juegos.filter((j) => j.idJuego !== idJuego));
    if (idCarrito) {
      axios.delete(`http://localhost/G6_GameStore/Backend/API/carritojuego.php`, {
        data: { idCarrito, idJuego },
      });
    }
  };

  const cambiarCantidad = (idJuego, nuevaCantidad) => {
    setJuegos(
      juegos.map((j) =>
        j.idJuego === idJuego ? { ...j, cantidad: nuevaCantidad } : j
      )
    );
  };

  const handleRegresar = () => {
    navigate("/");
  };

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

            <ResumenCarrito
              total={total}
              juegos={juegos}
              setJuegos={setJuegos}
              idCarrito={idCarrito} // ✅ Se pasa correctamente aquí
            />
          </>
        )}
      </div>
    </>
  );
};

export default CarritoPage;
