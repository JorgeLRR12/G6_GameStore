<?php
class Categoria {
    private $idCategoria;
    private $nombre;
    private $idUsuario;

    public function __construct($idCategoria, $nombre, $idUsuario) {
        $this->idCategoria = $idCategoria;
        $this->nombre = $nombre;
        $this->idUsuario = $idUsuario;
    }

    public function getIdCategoria() { return $this->idCategoria; }
    public function getNombre() { return $this->nombre; }
    public function getIdUsuario() { return $this->idUsuario; }

    public function setNombre($nombre) { $this->nombre = $nombre; }
    public function setIdUsuario($idUsuario) { $this->idUsuario = $idUsuario; }
}
?>
