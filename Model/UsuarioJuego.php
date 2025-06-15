<?php
class UsuarioJuego {
    public $idUsuario;
    public $idJuego;
    public $fechaAdquisicion;

    public function __construct($idUsuario, $idJuego, $fechaAdquisicion) {
        $this->idUsuario = $idUsuario;
        $this->idJuego = $idJuego;
        $this->fechaAdquisicion = $fechaAdquisicion;
    }

    // Getters
    public function getIdUsuario() { return $this->idUsuario; }
    public function getIdJuego() { return $this->idJuego; }
    public function getFechaAdquisicion() { return $this->fechaAdquisicion; }
}
