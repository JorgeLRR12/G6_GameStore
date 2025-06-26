<?php
class Juego {
    public $idJuego;
    public $nombre;
    public $descripcion;
    public $precio;
    public $fechaLanzamiento;
    public $clasificacionEdad;
    public $idCategoria;
    public $idUsuario;
    public $imagen;

    public function __construct($idJuego, $nombre, $descripcion, $precio, $fechaLanzamiento, $clasificacionEdad, $idCategoria, $idUsuario, $imagen) {
        $this->idJuego = $idJuego;
        $this->nombre = $nombre;
        $this->descripcion = $descripcion;
        $this->precio = $precio;
        $this->fechaLanzamiento = $fechaLanzamiento;
        $this->clasificacionEdad = $clasificacionEdad;
        $this->idCategoria = $idCategoria;
        $this->idUsuario = $idUsuario;
        $this->imagen = $imagen;
    }

    // Getters
    public function getIdJuego() { return $this->idJuego; }
    public function getNombre() { return $this->nombre; }
    public function getDescripcion() { return $this->descripcion; }
    public function getPrecio() { return $this->precio; }
    public function getFechaLanzamiento() { return $this->fechaLanzamiento; }
    public function getClasificacionEdad() { return $this->clasificacionEdad; }
    public function getIdCategoria() { return $this->idCategoria; }
    public function getIdUsuario() { return $this->idUsuario; }
    public function getImagen() { return $this->imagen; }
}
