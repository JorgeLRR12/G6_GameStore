import React, { useEffect, useState } from "react";
import JuegoCard from "../Cards/JuegoCard.jsx";
import "./Promociones.css";
import axios from "axios";
import ClienteNavbar from "../Header/HeaderCliente";

const PromocionesCliente = ({ usuario, mostrarTitulo = true }) => {
  const [juegos, setJuegos] = useState([]);
  const [toast, setToast] = useState({
    show: false,
    mensaje: "",
    tipo: "success",
  });

  useEffect(() => {
    const fetchPromos = async () => {
      try {
        const resPromo = await axios.get("http://localhost/G6_GameStore/Backend/API/promocion.php");
        const resJuegos = await axios.get("http://localhost/G6_GameStore/Backend/API/juego.php");

        const promos = resPromo.data.datos || [];
        const juegosAll = resJuegos.data.datos || [];

        const juegosPromo = promos
          .map((promo) => {
            const juego = juegosAll.find((j) => j.idJuego === promo.idJuego);
            if (!juego) return null;

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

  const handleAgregarCarrito = async (idJuego) => {
    if (!usuario || usuario.rol !== "Cliente") return;
    try {
      const resCarrito = await axios.get(
        `http://localhost/G6_GameStore/Backend/API/carrito.php?idUsuario=${usuario.idUsuario}`
      );

      let carrito = resCarrito.data.datos && resCarrito.data.datos[0];

      if (!carrito) {
        const nuevo = await axios.post(
          "http://localhost/G6_GameStore/Backend/API/carrito.php",
          { idUsuario: usuario.idUsuario }
        );
        carrito = nuevo.data.datos;
      }

      await axios.post(
        "http://localhost/G6_GameStore/Backend/API/carritojuego.php",
        { idCarrito: carrito.idCarrito, idJuego }
      );

      setToast({
        show: true,
        mensaje: "¡Juego agregado al carrito!",
        tipo: "success",
      });
    } catch (error) {
      setToast({
        show: true,
        mensaje: "Este juego ya está en tu carrito.",
        tipo: "info",
      });
    }
    setTimeout(() => setToast({ show: false, mensaje: "", tipo: "success" }), 2000);
  };

  return (
    <>
      <ClienteNavbar />
      <div className={`contenedor-promociones ${mostrarTitulo ? "" : "promos-home-light"}`}>
        {mostrarTitulo}

        <div className="container">
          {mostrarTitulo && (
            <h2 className="mb-4 fw-bold text-white text-center">
              🎯 Selección de descuentos
            </h2>
          )}

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
            {juegos.length === 0 ? (
              <div className="col-12 text-center">
                <div className="col-12 d-flex justify-content-center">
                  <div className="tarjeta-sin-promos">
                    <div className="fs-1 mb-3">🚫🎯</div>
                    <h4>No hay promociones activas por el momento</h4>
                    <p>¡Vuelve pronto! Estamos preparando nuevos descuentos exclusivos para vos 🎮✨</p>
                    <a href="/juegos" className="btn">Ir a la tienda</a>
                  </div>
                </div>

              </div>
            ) : (
              juegos.map((juego) => (
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
              ))
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export default PromocionesCliente;
