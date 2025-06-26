import React, { useEffect, useState } from "react";
import JuegoCard from "../Cards/JuegoCard.jsx";
import "./Promociones.css";
import axios from "axios";
import ClienteNavbar from "../Header/HeaderCliente";

const PromocionesCliente = ({ usuario }) => {
  const [juegos, setJuegos] = useState([]);
  const [toast, setToast] = useState({
    show: false,
    mensaje: "",
    tipo: "success",
  });

  useEffect(() => {
    const fetchPromos = async () => {
      try {
        // const resPromo = await axios.get('http://localhost/MultimediosProyecto/G6_GameStore/Backend/API/promocion.php');
        const resPromo = await axios.get('https://gamestorecr.onrender.com/API/promocion.php');
        // const resJuegos = await axios.get('http://localhost/MultimediosProyecto/G6_GameStore/Backend/API/juego.php');
        const resJuegos = await axios.get('https://gamestorecr.onrender.com/API/juego.php');
        const promos = resPromo.data.datos || [];
        const juegosAll = resJuegos.data.datos || [];
        const juegosPromo = promos
          .map((promo) => {
            const juego = juegosAll.find((j) => j.idJuego === promo.idJuego);
            if (!juego) return null;
            // Ahora la imagen viene directamente desde la base de datos
            return {
              ...juego,
              imagen: juego.imagen,
              precioOriginal: parseFloat(juego.precio),
              precioDescuento: (
                parseFloat(juego.precio) *
                (1 - promo.porcentajeDescuento / 100)
              ).toFixed(2),
              descuento: promo.porcentajeDescuento,
              descripcion: juego.descripcion,
            };
          })
          .filter(Boolean);
        setJuegos(juegosPromo);
      } catch (error) {
        setJuegos([]);
      }
    };
    fetchPromos();
  }, []);

  // Aviso visual elegante al agregar al carrito
  const handleAgregarCarrito = async (idJuego) => {
    if (!usuario || usuario.rol !== "Cliente") return;
    try {
      const resCarrito = await axios.get(
        //`http://localhost/MultimediosProyecto/G6_GameStore/Backend/API/carrito.php?idUsuario=${usuario.idUsuario}`
        `https://gamestorecr.onrender.com/API/carrito.php?idUsuario=${usuario.idUsuario}`
      );
      let carrito = resCarrito.data.datos && resCarrito.data.datos[0];
      if (!carrito) {
        const nuevo = await axios.post(
          "https://gamestorecr.onrender.com/API/carrito.php",
          { idUsuario: usuario.idUsuario }
        );
        carrito = nuevo.data.datos;
      }
      // Intento agregar el juego al carrito
      const resAdd = await axios.post(
        "https://gamestorecr.onrender.com/API/carritojuego.php",
        { idCarrito: carrito.idCarrito, idJuego }
      );
      // Si el backend responde con éxito
      setToast({
        show: true,
        mensaje: "¡Juego agregado al carrito!",
        tipo: "success",
      });
    } catch (error) {
      // Si el juego ya está en el carrito, muestro un aviso elegante
      setToast({
        show: true,
        mensaje: "Este juego ya está en tu carrito.",
        tipo: "info",
      });
    }
    setTimeout(
      () => setToast({ show: false, mensaje: "", tipo: "success" }),
      2000
    );
  };

  return (
    <>
      <ClienteNavbar />
      <div className="contenedor-promociones">
        <div className="container">
          <h2 className="mb-4 fw-bold text-white text-center">
            🎯 Selección de descuentos
          </h2>
          {/* Toast elegante para avisos */}
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
          <div className="row">
            {juegos.map((juego) => (
              <div
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                key={juego.idJuego}
              >
                <JuegoCard
                  {...juego}
                  imagen={juego.imagen}
                  onAgregarCarrito={
                    usuario && usuario.rol === "Cliente"
                      ? () => handleAgregarCarrito(juego.idJuego)
                      : undefined
                  }
                  mostrarBotonAgregar={usuario && usuario.rol === "Cliente"}
                  descripcion={juego.descripcion}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PromocionesCliente;
