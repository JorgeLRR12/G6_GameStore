<?php
require_once __DIR__ . '/../misc/Conexion.php';
require_once __DIR__ . '/../model/Soporte.php';

class SoporteDAO {
    public function obtenerTodos() {
        $conexion = Conexion::conectar();
        $sql = "SELECT * FROM g6_soporte";
        $stmt = $conexion->prepare($sql);
        $stmt->execute();
        $resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $soportes = [];
        foreach ($resultados as $fila) {
            $soportes[] = new Soporte(
                $fila['idSoporte'], $fila['idUsuario'], $fila['asunto'],
                $fila['descripcion'], $fila['estado'], $fila['fechaReporte']
            );
        }
        return $soportes;
    }

    public function obtenerPorUsuario($idUsuario) {
        $conexion = Conexion::conectar();
        $sql = "SELECT * FROM g6_soporte WHERE idUsuario = ?";
        $stmt = $conexion->prepare($sql);
        $stmt->execute([$idUsuario]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function insertar(Soporte $soporte) {
        $conexion = Conexion::conectar();
        $sql = "INSERT INTO g6_soporte (idUsuario, asunto, descripcion, estado) VALUES (?, ?, ?, ?)";
        $stmt = $conexion->prepare($sql);
        return $stmt->execute([
            $soporte->getIdUsuario(),
            $soporte->getAsunto(),
            $soporte->getDescripcion(),
            $soporte->getEstado()
        ]);
    }

    public function actualizar(Soporte $soporte) {
        $conexion = Conexion::conectar();
        $sql = "UPDATE g6_soporte SET estado = ?, descripcion = ? WHERE idSoporte = ?";
        $stmt = $conexion->prepare($sql);
        return $stmt->execute([
            $soporte->getEstado(),
            $soporte->getDescripcion(),
            $soporte->getIdSoporte()
        ]);
    }

    public function eliminar($id) {
        $conexion = Conexion::conectar();
        $sql = "DELETE FROM g6_soporte WHERE idSoporte = ?";
        $stmt = $conexion->prepare($sql);
        return $stmt->execute([$id]);
    }
}
?>
