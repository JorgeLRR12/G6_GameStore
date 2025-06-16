<?php
// Modelo para representar un carrito de compras
class Carrito {
    // Identificador del carrito
    public $idCarrito;
    // Identificador del usuario dueño del carrito
    public $idUsuario;
    // Fecha de creación del carrito
    public $fechaCreacion;

    // Constructor para inicializar el carrito
    public function __construct($idCarrito, $idUsuario, $fechaCreacion) {
        $this->idCarrito = $idCarrito;
        $this->idUsuario = $idUsuario;
        $this->fechaCreacion = $fechaCreacion;
    }

    // Obtener el ID del carrito
    public function getIdCarrito() { return $this->idCarrito; }
    // Obtener el ID del usuario
    public function getIdUsuario() { return $this->idUsuario; }
    // Obtener la fecha de creación
    public function getFechaCreacion() { return $this->fechaCreacion; }
}
?>
