import React, { useState } from 'react';
import './CardStyle.css';

// Descripciones detalladas para cada juego
const descripciones = {
  "EA Sports FC 25": "Vive la emoción del fútbol con licencias oficiales, modos competitivos y gráficos de última generación. Juega en línea o local, crea tu equipo y compite en las mejores ligas del mundo.",
  "Tom Clancy's Ghost Recon Wildlands": "Sumérgete en un mundo abierto de acción táctica. Lidera un escuadrón de élite para derrocar a un cartel en Bolivia. Juega solo o en cooperativo, con libertad total de exploración y estrategia.",
  "Mario Kart 8 Deluxe": "Disfruta de las carreras más divertidas y frenéticas con Mario y sus amigos. Compite en circuitos llenos de sorpresas, usa objetos locos y reta a tus amigos en multijugador local u online.",
  "Far Cry 6": "Únete a la revolución en Yara, una isla caribeña bajo el yugo de un dictador. Explora, combate y libera el país en un mundo abierto lleno de acción, vehículos y armas únicas.",
  "Multiversus": "Lucha en batallas épicas con personajes icónicos de Warner Bros. como Batman, Shaggy, Arya Stark y más. Disfruta de combates multijugador llenos de acción y diversión.",
  "Hogwarts Legacy": "Vive tu propia aventura en el mundo mágico de Harry Potter. Explora Hogwarts, aprende hechizos, crea pociones y descubre secretos en una historia original ambientada en el siglo XIX.",
  "Call of Duty: Modern Warfare III": "Acción bélica moderna con intensos modos multijugador, campaña cinematográfica y cooperativo. Experimenta el combate táctico y las armas más avanzadas.",
  "The Legend of Zelda: Tears of the Kingdom": "Acompaña a Link en una nueva aventura épica por Hyrule. Explora, resuelve acertijos y enfréntate a enemigos en un mundo abierto lleno de misterios y magia.",
  "Elden Ring": "Explora las Tierras Intermedias en un RPG de acción desafiante y profundo. Descubre secretos, derrota jefes colosales y forja tu destino en un mundo abierto creado por FromSoftware.",
  "The Witcher 3: Wild Hunt": "Embárcate en una aventura épica como Geralt de Rivia. Caza monstruos, toma decisiones que afectan la historia y explora un mundo abierto lleno de misiones y secretos.",
  "Cyberpunk 2077": "Sumérgete en Night City, una metrópolis futurista llena de acción, tecnología y decisiones morales. Personaliza a tu personaje y vive una historia intensa en un mundo abierto.",
  "Overcooked! 2": "Trabaja en equipo para preparar y servir platos en cocinas caóticas. Coordina con tus amigos, supera obstáculos y diviértete en este juego cooperativo de cocina."
};

// Al hacer clic en la tarjeta, muestro un modal con los detalles completos del juego
const JuegoCard = ({ imagenUrl, titulo, precioOriginal, precioDescuento, descuento }) => {
  const [showModal, setShowModal] = useState(false);

  // Abro el modal
  const handleOpen = () => setShowModal(true);
  // Cierro el modal
  const handleClose = (e) => {
    // Cierro solo si hago clic fuera del contenido o en el botón cerrar
    if (e.target.classList.contains('modal-juego-bg') || e.target.classList.contains('btn-cerrar-modal')) {
      setShowModal(false);
    }
  };

  // Tomo la descripción real del juego, si no hay, muestro un texto genérico
  const descripcion = descripciones[titulo] || "Juego destacado en nuestra tienda. Consulta más detalles en la web oficial.";

  return (
    <>
      <div className="card h-100 bg-black text-white border-0 shadow-sm rounded juego-card-hover" onClick={handleOpen} style={{ cursor: 'pointer' }}>
        <div className="card-img-container">
          <img
            src={imagenUrl}
            className="card-img-top"
            alt={titulo}
          />
        </div>
        <div className="card-body">
          <small className="text-muted d-block mb-1">Juego base</small>
          <h5 className="card-title fw-semibold">{titulo}</h5>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <span className="badge bg-info text-dark">-{descuento}%</span>
            <div className="text-end">
              <del className="text-muted small d-block">{precioOriginal}</del>
              <span className="fw-bold">{precioDescuento}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para mostrar los detalles del juego */}
      {showModal && (
        <div className="modal-juego-bg" onClick={handleClose}>
          <div className="modal-juego-contenido">
            <button className="btn-cerrar-modal" onClick={handleClose} title="Cerrar">
              &times;
            </button>
            <div className="modal-juego-img-wrapper">
              <img src={imagenUrl} alt={titulo} className="modal-juego-img" />
            </div>
            <div className="modal-juego-info">
              <h3 className="modal-juego-titulo">{titulo}</h3>
              <div className="modal-juego-precios">
                <span className="badge bg-info text-dark me-2">-{descuento}%</span>
                <del className="text-muted me-2">{precioOriginal}</del>
                <span className="fw-bold fs-5">{precioDescuento}</span>
              </div>
              <p className="modal-juego-descripcion mt-3">
                {descripcion}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JuegoCard;
