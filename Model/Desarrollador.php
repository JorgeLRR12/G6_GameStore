<?php
class Desarrollador {
    public $idDesarrollador;
    public $nombre;
    public $pais;
    public $idUsuario;

    public function __construct($idDesarrollador, $nombre, $pais, $idUsuario) {
        $this->idDesarrollador = $idDesarrollador;
        $this->nombre = $nombre;
        $this->pais = $pais;
        $this->idUsuario = $idUsuario;
    }

    // Getters
    public function getIdDesarrollador() { return $this->idDesarrollador; }
    public function getNombre() { return $this->nombre; }
    public function getPais() { return $this->pais; }
    public function getIdUsuario() { return $this->idUsuario; }
}
