import React, { useEffect, useState } from "react";
import { obtenerJuegos } from "../../Services/JuegoService";
import { useAuth } from "../../Context/AuthContext";
import axios from "axios";
import "./Juego.css";
import ClienteNavbar from "../Header/HeaderCliente";
import ValoracionesJuego from "../Valoracion/ValoracionCliente.jsx";


const JuegosPage = () => {
  const [juegos, setJuegos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [toast, setToast] = useState({
    show: false,
    mensaje: "",
    tipo: "success",
  });
  const [modalJuego, setModalJuego] = useState(null);
  const { usuario } = useAuth();

  useEffect(() => {
    const cargarJuegos = async () => {
      try {
        const datos = await obtenerJuegos();
        const juegosConImagen = (datos || []).map((juego) => ({
          ...juego,
          imagen: juego.imagen,
        }));
        setJuegos(juegosConImagen);
      } catch (error) {
        setJuegos([]);
      }
      setCargando(false);
    };

    cargarJuegos();
  }, []);

  // Lógica para agregar al carrito
  const handleAgregarCarrito = async (idJuego) => {
    if (!usuario) return;
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
    setTimeout(
      () => setToast({ show: false, mensaje: "", tipo: "success" }),
      2000
    );
  };

  // Abre el modal con la info del juego
const handleOpenModal = (juego) => {
  document.body.style.overflow = "hidden"; // 🔒 Bloquea scroll del fondo
  setModalJuego(juego);
};
  // Cierra el modal
const handleCloseModal = (e) => {
  if (
    !e ||
    e.target.classList.contains("modal-juego-bg") ||
    e.target.classList.contains("btn-cerrar-modal")
  ) {
    document.body.style.overflow = ""; // 🔓 Restaura scroll del fondo
    setModalJuego(null);
  }
};

  return (
    <>
      <ClienteNavbar />
      <div className="juegos-container container mt-5 mb-5">
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
        <h2 className="titulo-juegos mb-4">🎮 Catálogo de Juegos</h2>
        {cargando ? (
          <div className="text-center text-light">Cargando juegos...</div>
        ) : juegos.length === 0 ? (
          <div className="alert alert-info text-center">
            No hay juegos disponibles.
          </div>
        ) : (
          <div className="row">
            {juegos.map((juego) => (
              <div className="col-md-4 mb-4" key={juego.idJuego}>
                <div
                  className="card h-100 bg-dark text-white border-0 shadow juego-card-hover juego-card"
                  onClick={() => handleOpenModal(juego)}
                >
                  <img
                    src={juego.imagen || "../../../public/img/default.jpg"}
                    className="card-img-top juego-card-img"
                    alt={juego.nombre}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "../../../public/img/default.jpg";
                    }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title juego-card-title">
                      {juego.nombre}
                    </h5>
                    <p className="card-text flex-grow-1 juego-card-desc">
                      {juego.descripcion}
                    </p>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <strong className="juego-card-precio">
                        ₡{parseFloat(juego.precio).toLocaleString()}
                      </strong>
                      <button
                        className="btn btn-outline-info btn-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenModal(juego);
                        }}
                      >
                        Ver más
                      </button>
                    </div>
                    {usuario && (
                      <button
                        className="btn btn-outline-info mt-3"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAgregarCarrito(juego.idJuego);
                        }}
                      >
                        Agregar al carrito
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal para detalles del juego */}
        {modalJuego && (
          <div className="modal-juego-bg" onClick={handleCloseModal}>
            <div className="modal-juego-contenido">
              <button
                className="btn-cerrar-modal"
                onClick={handleCloseModal}
                title="Cerrar"
              >
                &times;
              </button>
              <div className="modal-juego-img-wrapper">
                <img
                  src={modalJuego.imagen || "../../../public/img/default.jpg"}
                  alt={modalJuego.nombre}
                  className="modal-juego-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "../../../public/img/default.jpg";
                  }}
                />
              </div>
              <h3 className="modal-juego-titulo">{modalJuego.nombre}</h3>
              <div className="modal-juego-descripcion">
                {modalJuego.descripcion}
              </div>
              <div className="modal-juego-precio">
                ₡{parseFloat(modalJuego.precio).toLocaleString()}
              </div>
              
              {usuario && (
                <button
                  className="btn btn-info w-100 fw-bold modal-juego-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAgregarCarrito(modalJuego.idJuego);
                  }}
                >
                  Agregar al carrito
                </button>
              )}
              <ValoracionesJuego idJuego={modalJuego.idJuego} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default JuegosPage;
