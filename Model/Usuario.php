<?php
class Usuario {
    public $idUsuario;
    public $nombre;
    public $correo;
    public $clave;
    public $fechaNacimiento;
    public $fechaRegistro;
    public $rol;

    public function __construct($idUsuario = null, $nombre, $correo, $clave, $fechaNacimiento, $fechaRegistro = null, $rol = 'Cliente') {
        $this->idUsuario = $idUsuario;
        $this->nombre = $nombre;
        $this->correo = $correo;
        $this->clave = $clave;
        $this->fechaNacimiento = $fechaNacimiento;
        $this->fechaRegistro = $fechaRegistro;
        $this->rol = $rol;
    }

    // Getters
    public function getIdUsuario() { return $this->idUsuario; }
    public function getNombre() { return $this->nombre; }
    public function getCorreo() { return $this->correo; }
    public function getClave() { return $this->clave; }
    public function getFechaNacimiento() { return $this->fechaNacimiento; }
    public function getFechaRegistro() { return $this->fechaRegistro; }
    public function getRol() { return $this->rol; }

    // Setters
    public function setNombre($nombre) { $this->nombre = $nombre; }
    public function setCorreo($correo) { $this->correo = $correo; }
    public function setClave($clave) { $this->clave = $clave; }
    public function setFechaNacimiento($fechaNacimiento) { $this->fechaNacimiento = $fechaNacimiento; }
    public function setFechaRegistro($fechaRegistro) { $this->fechaRegistro = $fechaRegistro; }
    public function setRol($rol) { $this->rol = $rol; }
}
