<?php
class Soporte {
    private $idSoporte;
    private $idUsuario;
    private $asunto;
    private $descripcion;
    private $estado;
    private $fechaReporte;

    public function __construct($idSoporte, $idUsuario, $asunto, $descripcion, $estado, $fechaReporte = null) {
        $this->idSoporte = $idSoporte;
        $this->idUsuario = $idUsuario;
        $this->asunto = $asunto;
        $this->descripcion = $descripcion;
        $this->estado = $estado;
        $this->fechaReporte = $fechaReporte;
    }

    public function getIdSoporte() { return $this->idSoporte; }
    public function getIdUsuario() { return $this->idUsuario; }
    public function getAsunto() { return $this->asunto; }
    public function getDescripcion() { return $this->descripcion; }
    public function getEstado() { return $this->estado; }
    public function getFechaReporte() { return $this->fechaReporte; }
}
?>
