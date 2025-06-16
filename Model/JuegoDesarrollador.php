<?php
// Modelo para la relación entre un juego y un desarrollador
class JuegoDesarrollador {
    // Identificador del juego
    public $idJuego;
    // Identificador del desarrollador
    public $idDesarrollador;

    // Constructor para inicializar la relación
    public function __construct($idJuego, $idDesarrollador) {
        $this->idJuego = $idJuego;
        $this->idDesarrollador = $idDesarrollador;
    }

    // Obtener el ID del juego
    public function getIdJuego() { return $this->idJuego; }
    // Obtener el ID del desarrollador
    public function getIdDesarrollador() { return $this->idDesarrollador; }
}
?>
