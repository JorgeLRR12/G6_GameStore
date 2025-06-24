import React, { useEffect, useRef } from 'react';
import NavbarCliente from '../Header/HeaderCliente.jsx';
import PromocionesCliente from '../Promociones/Promociones.jsx';
import './HomeCliente.css';

// Mantengo los juegos top originales en el carrusel visual
const juegosTop = [
  {
    titulo: 'Resident Evil 4 Remake',
    imagenUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/header.jpg',
    descripcion: 'El clásico de terror y acción regresa con gráficos y jugabilidad renovados.',
  },
  {
    titulo: 'Days Gone Remake',
    imagenUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1259420/header.jpg',
    descripcion: 'Sobrevive en un mundo abierto infestado de engendros y peligros constantes.',
  },
  {
    titulo: 'Red Dead Redemption 2',
    imagenUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg',
    descripcion: 'Vive el salvaje oeste con una historia épica y un mundo abierto impresionante.',
  },
  {
    titulo: 'GTA VI (Próximamente)',
    imagenUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/271590/header.jpg',
    descripcion: 'La próxima entrega de la saga más famosa de crimen y mundo abierto.',
  },
  {
    titulo: 'The Last of Us Part I',
    imagenUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1888930/header.jpg',
    descripcion: 'Una aventura emocional y de supervivencia en un mundo postapocalíptico.',
  }
];

const HomeCliente = () => {
  // Uso un ref para controlar el scroll automático del carrusel
  const carruselRef = useRef(null);

  // Hago que el carrusel se desplace solo cada 3 segundos
  useEffect(() => {
    const carrusel = carruselRef.current;
    let index = 0;
    const interval = setInterval(() => {
      if (!carrusel) return;
      index = (index + 1) % juegosTop.length;
      // Calculo el desplazamiento horizontal
      const cardWidth = carrusel.firstChild ? carrusel.firstChild.offsetWidth + 24 : 340;
      carrusel.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
    }, 3000);
    // Limpio el intervalo cuando salgo de la página
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Mejoro la presentación del menú con un fondo y sombra */}
      <div className="header-home-wrapper">
        <NavbarCliente />
      </div>

      {/* Le doy más presencia y estilo al título y bienvenida */}
      <div className="home-hero home-hero-destacado">
        <div className="hero-content">
          <h1 className="titulo-hero">
            <span className="icono-hero">🎮</span> Bienvenido a GameStore
          </h1>
          <p className="lead lead-hero">
            Tu portal para descubrir, comprar y disfrutar los mejores videojuegos del momento.
          </p>
          <p className="sublead-hero">
            Explora títulos de todas las plataformas, aprovecha promociones y gestiona tu biblioteca fácilmente.
          </p>
        </div>
      </div>

      {/* Carrusel visual de juegos top */}
      <section className="destacados-section">
        <h2 className="titulo-destacados">🔥 Juegos top del momento</h2>
        <div className="carrusel-destacados auto-scroll" ref={carruselRef}>
          {juegosTop.map((juego, idx) => (
            <div className="card-destacado" key={idx}>
              <div className="img-destacado-wrapper">
                <img src={juego.imagenUrl} alt={juego.titulo} className="img-destacado" />
              </div>
              <div className="info-destacado">
                <h5>{juego.titulo}</h5>
                <p>{juego.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Aquí muestro la sección de promociones, que ahora tendrá los juegos de la lista que me diste */}
      <PromocionesCliente />
    </>
  );
};

export default HomeCliente;
