<?php
class CompraJuego {
    private $idCompra;
    private $idJuego;
    private $precioUnitario;
    private $porcentajeDescuento;
    private $cantidad;
    private $subtotal;
    private $idPromocion;

    public function __construct($idCompra, $idJuego, $precioUnitario, $porcentajeDescuento, $cantidad, $subtotal, $idPromocion = null) {
        $this->idCompra = $idCompra;
        $this->idJuego = $idJuego;
        $this->precioUnitario = $precioUnitario;
        $this->porcentajeDescuento = $porcentajeDescuento;
        $this->cantidad = $cantidad;
        $this->subtotal = $subtotal;
        $this->idPromocion = $idPromocion;
    }

    public function getIdCompra() { return $this->idCompra; }
    public function getIdJuego() { return $this->idJuego; }
    public function getPrecioUnitario() { return $this->precioUnitario; }
    public function getPorcentajeDescuento() { return $this->porcentajeDescuento; }
    public function getCantidad() { return $this->cantidad; }
    public function getSubtotal() { return $this->subtotal; }
    public function getIdPromocion() { return $this->idPromocion; }
}
