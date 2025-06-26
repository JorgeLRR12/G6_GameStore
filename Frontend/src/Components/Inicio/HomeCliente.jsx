import React, { useEffect, useRef, useState } from "react";
import NavbarCliente from "../Header/HeaderCliente.jsx";
import PromocionesCliente from "../Promociones/Promociones.jsx";
import { useAuth } from "../../Context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./HomeCliente.css";

const TRAILERS = [
  {
    titulo: "The Last of Us Part II",
    url: "https://www.youtube-nocookie.com/embed/JdE9U9WW_HM?si=jHQDGTJTZu2T9sr1",
  },
  {
    titulo: "Days Gone",
    url: "https://www.youtube-nocookie.com/embed/9kCjoIBVWaU?si=0qj7ZUEIePD5RuLh",
  },
  {
    titulo: "God Of War: Ragnarok",
    url: "https://www.youtube-nocookie.com/embed/dIQGI36BxDE?si=oGR69lUsdi8lAODy",
  },
  {
    titulo: "Spider-Man Miles Morales",
    url: "https://www.youtube-nocookie.com/embed/IG5fUY7mimQ?si=H2SS0J5WM6XIvcd_",
  },
  {
    titulo: "Call of Duty: Modern Warfare III",
    url: "https://www.youtube-nocookie.com/embed/DZNSOEVJtok?si=0nwDfIr7S9zt6bQ6",
  },
  {
    titulo: "Dying Light 2",
    url: "https://www.youtube-nocookie.com/embed/cOgpChpiNEk?si=rC0OsG0X6pAZIRMJ",
  },
];

// Trailer destacado de The Witcher 3: Wild Hunt
const WITCHER_TRAILER = {
  titulo: "The Witcher 3: Wild Hunt",
  // Agrega loop=1&playlist=... para que YouTube haga loop (truco oficial)
  url: "https://www.youtube-nocookie.com/embed/X8Bh7esrGkM?si=Zz70sfLy3YggnHmx&autoplay=1&mute=1&loop=1&playlist=X8Bh7esrGkM",
};

const HomeCliente = () => {
  const [juegosTop, setJuegosTop] = useState([]);
  const [toast, setToast] = useState({
    show: false,
    mensaje: "",
    tipo: "success",
  });
  const carruselRef = useRef(null);
  const { usuario } = useAuth();
  const navigate = useNavigate();

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
      {/* Trailer destacado grande */}
      <section className="witcher-trailer-section mb-5">
        <div className="witcher-trailer-bg">
          <div className="witcher-trailer-content">
            <div className="witcher-trailer-video-wrapper">
              <iframe
                src={WITCHER_TRAILER.url}
                title={WITCHER_TRAILER.titulo}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                frameBorder="0"
                className="witcher-trailer-iframe"
              />
              {/* El overlay ya no se muestra */}
            </div>
            <div className="witcher-trailer-info">
              <h2 className="witcher-trailer-titulo">
                <span role="img" aria-label="witcher">⚔️</span> {WITCHER_TRAILER.titulo}
              </h2>
              <button
                className="btn btn-outline-warning witcher-trailer-btn"
                onClick={() => navigate("/juegos")}
              >
                Ir al catálogo
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Sección de trailers de juegos */}
      <section className="trailers-section mt-5 mb-5">
        <h2 className="trailers-titulo mb-4">🎬 Trailers destacados</h2>
        <div className="trailers-grid">
          {TRAILERS.map((trailer, idx) => (
            <div className="trailer-card" key={idx}>
              <div className="trailer-video-wrapper">
                <iframe
                  src={trailer.url}
                  title={trailer.titulo}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  frameBorder="0"
                  className="trailer-iframe"
                />
              </div>
              <div className="trailer-info">
                <h5 className="trailer-titulo">{trailer.titulo}</h5>
                <button
                  className="btn btn-outline-info btn-sm trailer-btn"
                  onClick={() => navigate("/juegos")}
                >
                  Ir al catálogo
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* <PromocionesCliente usuario={usuario} /> */}
    </>
  );
};

export default HomeCliente;
