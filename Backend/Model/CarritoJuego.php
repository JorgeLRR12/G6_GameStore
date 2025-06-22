<?php
// Modelo para la relación entre un carrito y un juego agregado
class CarritoJuego {
    public $idCarrito;
    public $idJuego;
    public $fechaAgregado;

    // Constructor para inicializar la relación
    public function __construct($idCarrito, $idJuego, $fechaAgregado) {
        $this->idCarrito = $idCarrito;
        $this->idJuego = $idJuego;
        $this->fechaAgregado = $fechaAgregado;
    }

    public function getIdCarrito() { return $this->idCarrito; }
    public function getIdJuego() { return $this->idJuego; }
    public function getFechaAgregado() { return $this->fechaAgregado; }
}
?>
