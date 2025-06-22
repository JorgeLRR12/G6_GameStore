<?php
require_once __DIR__ . '/../misc/Conexion.php';

class SoporteDAO {
    
    public function obtenerTodos() {
        $pdo = Conexion::conectar();
        $sql = "SELECT * FROM G6_soporte";
        $stmt = $pdo->query($sql);

        $soportes = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $soportes[] = [
                'idSoporte' => $row['idSoporte'],
                'idUsuario' => $row['idUsuario'],
                'asunto' => $row['asunto'],
                'descripcion' => $row['descripcion'],
                'estado' => $row['estado'],
                'fechaReporte' => $row['fechaReporte']
            ];
        }
        return $soportes;
    }

    public function obtenerPorUsuario($idUsuario) {
        $pdo = Conexion::conectar();
        $sql = "SELECT * FROM G6_soporte WHERE idUsuario = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$idUsuario]);

        $soportes = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $soportes[] = [
                'idSoporte' => $row['idSoporte'],
                'idUsuario' => $row['idUsuario'],
                'asunto' => $row['asunto'],
                'descripcion' => $row['descripcion'],
                'estado' => $row['estado'],
                'fechaReporte' => $row['fechaReporte']
            ];
        }
        return $soportes;
    }

    public function insertar($idUsuario, $asunto, $descripcion, $estado = 'Abierto') {
        $pdo = Conexion::conectar();
        $sql = "INSERT INTO G6_soporte (idUsuario, asunto, descripcion, estado) VALUES (?, ?, ?, ?)";
        $stmt = $pdo->prepare($sql);
        return $stmt->execute([$idUsuario, $asunto, $descripcion, $estado]);
    }

    public function actualizar($idSoporte, $estado, $descripcion) {
        $pdo = Conexion::conectar();
        $sql = "UPDATE G6_soporte SET estado = ?, descripcion = ? WHERE idSoporte = ?";
        $stmt = $pdo->prepare($sql);
        return $stmt->execute([$estado, $descripcion, $idSoporte]);
    }

    public function eliminar($idSoporte) {
        $pdo = Conexion::conectar();
        $sql = "DELETE FROM G6_soporte WHERE idSoporte = ?";
        $stmt = $pdo->prepare($sql);
        return $stmt->execute([$idSoporte]);
    }
}
?>
