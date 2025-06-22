<?php
class Valoracion {
    private $idValoracion;
    private $idUsuario;
    private $idJuego;
    private $puntuacion;
    private $comentario;
    private $fechaValoracion;

    public function __construct($idValoracion, $idUsuario, $idJuego, $puntuacion, $comentario, $fechaValoracion = null) {
        $this->idValoracion = $idValoracion;
        $this->idUsuario = $idUsuario;
        $this->idJuego = $idJuego;
        $this->puntuacion = $puntuacion;
        $this->comentario = $comentario;
        $this->fechaValoracion = $fechaValoracion;
    }

    public function getIdValoracion() { return $this->idValoracion; }
    public function getIdUsuario() { return $this->idUsuario; }
    public function getIdJuego() { return $this->idJuego; }
    public function getPuntuacion() { return $this->puntuacion; }
    public function getComentario() { return $this->comentario; }
    public function getFechaValoracion() { return $this->fechaValoracion; }
}
?>
