<?php
class Usuario {
    private $idUsuario;
    private $nombre;
    private $correo;
    private $clave;
    private $fechaNacimiento;
    private $rol;

    public function __construct($idUsuario, $nombre, $correo, $clave, $fechaNacimiento, $rol) {
        $this->idUsuario = $idUsuario;
        $this->nombre = $nombre;
        $this->correo = $correo;
        $this->clave = $clave;
        $this->fechaNacimiento = $fechaNacimiento;
        $this->rol = $rol;
    }

    public function getIdUsuario() { return $this->idUsuario; }
    public function getNombre() { return $this->nombre; }
    public function getCorreo() { return $this->correo; }
    public function getClave() { return $this->clave; }
    public function getFechaNacimiento() { return $this->fechaNacimiento; }
    public function getRol() { return $this->rol; }

    public function setNombre($nombre) { $this->nombre = $nombre; }
    public function setCorreo($correo) { $this->correo = $correo; }
    public function setClave($clave) { $this->clave = $clave; }
    public function setFechaNacimiento($fechaNacimiento) { $this->fechaNacimiento = $fechaNacimiento; }
    public function setRol($rol) { $this->rol = $rol; }
}
?>
