<?php
class Compra {
    private $idCompra;
    private $idUsuario;
    private $fechaCompra;
    private $total;

    public function __construct($idUsuario, $total, $idCompra = null, $fechaCompra = null) {
        $this->idCompra = $idCompra;
        $this->idUsuario = $idUsuario;
        $this->fechaCompra = $fechaCompra;
        $this->total = $total;
    }

    public function getIdCompra() { return $this->idCompra; }
    public function getIdUsuario() { return $this->idUsuario; }
    public function getFechaCompra() { return $this->fechaCompra; }
    public function getTotal() { return $this->total; }
}
