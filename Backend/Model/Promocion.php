<?php
class Promocion {
    private $idPromocion;
    private $idJuego;
    private $porcentajeDescuento;
    private $fechaInicio;
    private $fechaFin;
    private $idUsuario;

    public function __construct($idJuego, $porcentajeDescuento, $fechaInicio, $fechaFin, $idUsuario, $idPromocion = null) {
        $this->idPromocion = $idPromocion;
        $this->idJuego = $idJuego;
        $this->porcentajeDescuento = $porcentajeDescuento;
        $this->fechaInicio = $fechaInicio;
        $this->fechaFin = $fechaFin;
        $this->idUsuario = $idUsuario;
    }

    public function getIdPromocion() { return $this->idPromocion; }
    public function getIdJuego() { return $this->idJuego; }
    public function getPorcentajeDescuento() { return $this->porcentajeDescuento; }
    public function getFechaInicio() { return $this->fechaInicio; }
    public function getFechaFin() { return $this->fechaFin; }
    public function getIdUsuario() { return $this->idUsuario; }
}
