import React, { useEffect, useRef, useState } from "react";
import NavbarCliente from "../Header/HeaderCliente.jsx";
import PromocionesCliente from "../Promociones/Promociones.jsx";
import { useAuth } from "../../Context/AuthContext";
import axios from "axios";
import "./HomeCliente.css";

const HomeCliente = () => {
  const [juegosTop, setJuegosTop] = useState([]);
  const [toast, setToast] = useState({
    show: false,
    mensaje: "",
    tipo: "success",
  });
  const carruselRef = useRef(null);
  const { usuario } = useAuth();

  useEffect(() => {
    const fetchJuegos = async () => {
      try {
        // const res = await axios.get('http://localhost/MultimediosProyecto/G6_GameStore/Backend/API/juego.php');
        const res = await axios.get('https://gamestorecr.onrender.com/API/juego.php');
        // Los nombres aquí deben coincidir exactamente con los de la base de datos
        const nombresTop = [
          'Resident Evil 4 Remake',
          'Days Gone Remake',
          'Red Dead Redemption 2',
          'GTA VI (Próximamente)',
          'God of War: Ragnarok',
          'The Last of Us Part I',
          'The Last of Us Part II'
        ];
        // Diccionario para forzar la ruta correcta de las imágenes del carrusel
        const imagenesCarruselFix = {
          "God of War: Ragnarok": "/img/god_of_war_ragnarok.jpg",
          "GTA VI (Próximamente)": "/img/gta_vi_proximamente.jpg"
        };
        const juegosFiltrados = (res.data.datos || []).filter(j =>
          nombresTop.some(n => n.trim().toLowerCase() === j.nombre.trim().toLowerCase())
        ).map(j => ({
          ...j,
          imagenUrl: imagenesCarruselFix[j.nombre] ||
            `/img/${j.nombre.toLowerCase().replace(/[^a-z0-9]/g, "_")}.jpg`
        }));
        setJuegosTop(juegosFiltrados);
      } catch (error) {
        setJuegosTop([]);
      }
    };
    fetchJuegos();
  }, []);

  useEffect(() => {
    const carrusel = carruselRef.current;
    let index = 0;
    const interval = setInterval(() => {
      if (!carrusel || juegosTop.length === 0) return;
      index = (index + 1) % juegosTop.length;
      const cardWidth = carrusel.firstChild
        ? carrusel.firstChild.offsetWidth + 24
        : 340;
      carrusel.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [juegosTop]);

  // Aviso visual al agregar al carrito
  const handleAgregarCarrito = async (idJuego) => {
    if (!usuario || usuario.rol !== "Cliente") return;
    try {
      const resCarrito = await axios.get(
       // `http://localhost/MultimediosProyecto/G6_GameStore/Backend/API/carrito.php?idUsuario=${usuario.idUsuario}`
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
      await axios.post(
        //"http://localhost/MultimediosProyecto/G6_GameStore/Backend/API/carritojuego.php",
        "https://gamestorecr.onrender.com/API/carritojuego.php",
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

  return (
    <>
      <div className="header-home-wrapper">
        <NavbarCliente />
      </div>
      <div className="home-hero home-hero-destacado">
        <div className="hero-content">
          <h1 className="titulo-hero">
            <span className="icono-hero">🎮</span> Bienvenido a GameStore
          </h1>
          <p className="lead lead-hero">
            Tu portal para descubrir, comprar y disfrutar los mejores
            videojuegos del momento.
          </p>
          <p className="sublead-hero">
            Explora títulos de todas las plataformas, aprovecha promociones y
            gestiona tu biblioteca fácilmente.
          </p>
        </div>
      </div>
      {/* Toast para mensajes de éxito o info */}
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
      <section className="destacados-section">
        <h2 className="titulo-destacados">🔥 Juegos top del momento</h2>
        <div className="carrusel-destacados auto-scroll" ref={carruselRef}>
          {juegosTop.map((juego) => (
            <div className="card-destacado" key={juego.idJuego}>
              <div className="img-destacado-wrapper">
                <img src={juego.imagenUrl} alt={juego.nombre} className="img-destacado" />
              </div>
              <div className="info-destacado">
                <h5>{juego.nombre}</h5>
                <p>{juego.descripcion}</p>
                {usuario && usuario.rol === "Cliente" && (
                  <button
                    className="btn btn-outline-info mt-2"
                    onClick={() => handleAgregarCarrito(juego.idJuego)}
                  >
                    Agregar al carrito
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
      <PromocionesCliente usuario={usuario} />
    </>
  );
};

export default HomeCliente;
