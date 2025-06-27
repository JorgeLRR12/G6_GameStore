// Cards -JuegoCard.jsx

import React, { useState } from "react";
import "./CardStyle.css";

// Descripciones detalladas para cada juego
const descripciones = {
  "EA Sports FC 25":
    "Vive la emoción del fútbol con licencias oficiales, modos competitivos y gráficos de última generación. Juega en línea o local, crea tu equipo y compite en las mejores ligas del mundo.",
  "Tom Clancy's Ghost Recon Wildlands":
    "Sumérgete en un mundo abierto de acción táctica. Lidera un escuadrón de élite para derrocar a un cartel en Bolivia. Juega solo o en cooperativo, con libertad total de exploración y estrategia.",
  "Mario Kart 8 Deluxe":
    "Disfruta de las carreras más divertidas y frenéticas con Mario y sus amigos. Compite en circuitos llenos de sorpresas, usa objetos locos y reta a tus amigos en multijugador local u online.",
  "Far Cry 6":
    "Únete a la revolución en Yara, una isla caribeña bajo el yugo de un dictador. Explora, combate y libera el país en un mundo abierto lleno de acción, vehículos y armas únicas.",
  "Bloodborne":
    "Adéntrate en un oscuro mundo gótico y lucha contra criaturas aterradoras en este desafiante RPG de acción. Explora la ciudad de Yharnam y descubre sus secretos mientras mejoras tus habilidades y equipo.",
  "Hogwarts Legacy":
    "Vive tu propia aventura en el mundo mágico de Harry Potter. Explora Hogwarts, aprende hechizos, crea pociones y descubre secretos en una historia original ambientada en el siglo XIX.",
  "Call of Duty: Modern Warfare III":
    "Acción bélica moderna con intensos modos multijugador, campaña cinematográfica y cooperativo. Experimenta el combate táctico y las armas más avanzadas.",
  "The Legend of Zelda: Tears of the Kingdom":
    "Acompaña a Link en una nueva aventura épica por Hyrule. Explora, resuelve acertijos y enfréntate a enemigos en un mundo abierto lleno de misterios y magia.",
  "Elden Ring":
    "Explora las Tierras Intermedias en un RPG de acción desafiante y profundo. Descubre secretos, derrota jefes colosales y forja tu destino en un mundo abierto creado por FromSoftware.",
  "The Witcher 3: Wild Hunt":
    "Embárcate en una aventura épica como Geralt de Rivia. Caza monstruos, toma decisiones que afectan la historia y explora un mundo abierto lleno de misiones y secretos.",
  "Cyberpunk 2077":
    "Sumérgete en Night City, una metrópolis futurista llena de acción, tecnología y decisiones morales. Personaliza a tu personaje y vive una historia intensa en un mundo abierto.",
  "Overcooked! 2":
    "Trabaja en equipo para preparar y servir platos en cocinas caóticas. Coordina con tus amigos, supera obstáculos y diviértete en este juego cooperativo de cocina.",
};

// Al hacer clic en la tarjeta, muestro un modal con los detalles completos del juego
const JuegoCard = ({
  idJuego,
  nombre,
  descripcion,
  precioOriginal,
  precioDescuento,
  descuento,
  imagenUrl,
  imagen, // ahora puede venir de la base de datos
  onAgregarCarrito,
  mostrarBotonAgregar,
  ...props
}) => {
  const [showModal, setShowModal] = useState(false);

  // Abro el modal
  const handleOpen = () => setShowModal(true);
  // Cierro el modal
  const handleClose = (e) => {
    // Cierro solo si hago clic fuera del contenido o en el botón cerrar
    if (
      e.target.classList.contains("modal-juego-bg") ||
      e.target.classList.contains("btn-cerrar-modal")
    ) {
      setShowModal(false);
    }
  };

  // Si viene la descripción por props, la uso; si no, busco en el diccionario; si no, muestro la genérica
  const descripcionFinal =
    descripcion ||
    descripciones[nombre] ||
    "Juego destacado en nuestra tienda. Consulta más detalles en la web oficial.";

  // Usar la imagen de la base de datos (imagen o imagenUrl), si no hay, mostrar una por defecto
  const imgSrc = imagen || imagenUrl || "../../../public/img/default.jpg";

  return (
    <>
      <div
        className="card h-100 bg-black text-white border-0 shadow-sm rounded juego-card-hover"
        onClick={handleOpen}
        style={{ cursor: "pointer" }}
      >
        <div className="card-img-container">
          <img
            src={imgSrc}
            className="card-img-top"
            alt={nombre}
            style={{ objectFit: "cover", height: 200 }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "../../../public/img/default.jpg";
            }}
          />
        </div>
        <div className="card-body">
          <small className="text-muted d-block mb-1">Juego base</small>
          <h5 className="card-title fw-semibold">{nombre}</h5>
          <div className="d-flex justify-content-between align-items-center mt-3">
            {descuento && (
              <span className="badge bg-info text-dark">-{descuento}%</span>
            )}
            <div className="text-end">
              {precioOriginal && (
                <del className="text-muted small d-block">
                  {precioOriginal} CRC
                </del>
              )}
              {precioDescuento && (
                <span className="fw-bold">{precioDescuento} CRC</span>
              )}
            </div>
          </div>
          {/* Solo muestro el botón si corresponde */}
          {mostrarBotonAgregar && (
            <button
              className="btn btn-outline-info mt-2 w-100"
              onClick={(e) => {
                e.stopPropagation();
                onAgregarCarrito && onAgregarCarrito();
              }}
            >
              Agregar al carrito
            </button>
          )}
        </div>
      </div>

      {/* Modal para mostrar los detalles del juego */}
      {showModal && (
        <div className="modal-juego-bg" onClick={handleClose}>
          <div className="modal-juego-contenido">
            <button
              className="btn-cerrar-modal"
              onClick={handleClose}
              title="Cerrar"
            >
              &times;
            </button>
            <div className="modal-juego-img-wrapper">
              <img src={imgSrc} alt={nombre} className="modal-juego-img" />
            </div>
            <div className="modal-juego-info">
              <h3 className="modal-juego-titulo">{nombre}</h3>
              <div className="modal-juego-precios">
                {descuento && (
                  <span className="badge bg-info text-dark me-2">
                    -{descuento}%
                  </span>
                )}
                {precioOriginal && (
                  <del className="text-muted me-2">{precioOriginal} CRC</del>
                )}
                {precioDescuento && (
                  <span className="fw-bold fs-5">{precioDescuento} CRC</span>
                )}
              </div>
              <p className="modal-juego-descripcion mt-3">{descripcionFinal}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JuegoCard;
