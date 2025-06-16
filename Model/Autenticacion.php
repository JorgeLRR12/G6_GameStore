<?php
class Autenticacion {
    private $correo;
    private $clave;

    public function __construct($correo, $clave) {
        $this->correo = $correo;
        $this->clave = $clave;
    }

    public function getCorreo() {
        return $this->correo;
    }

    public function getClave() {
        return $this->clave;
    }
}
?>
