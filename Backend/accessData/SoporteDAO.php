<?php
require_once __DIR__ . '/../misc/Conexion.php';

class SoporteDAO {
    
    public function obtenerTodos() {
        $pdo = Conexion::conectar();
        try {
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
        } catch (PDOException $e) {
            return ["error" => $e->getMessage()];
        } finally {
            $pdo = null;
        }
    }

    public function obtenerPorUsuario($idUsuario) {
        $pdo = Conexion::conectar();
        try {
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
        } catch (PDOException $e) {
            return ["error" => $e->getMessage()];
        } finally {
            $pdo = null;
        }
    }

    public function insertar($idUsuario, $asunto, $descripcion, $estado = 'Abierto') {
        $pdo = Conexion::conectar();
        try {
            $sql = "INSERT INTO G6_soporte (idUsuario, asunto, descripcion, estado) VALUES (?, ?, ?, ?)";
            $stmt = $pdo->prepare($sql);
            return $stmt->execute([$idUsuario, $asunto, $descripcion, $estado]);
        } catch (PDOException $e) {
            return false;
        } finally {
            $pdo = null;
        }
    }

    public function actualizar($idSoporte, $estado, $descripcion) {
        $pdo = Conexion::conectar();
        try {
            $sql = "UPDATE G6_soporte SET estado = ?, descripcion = ? WHERE idSoporte = ?";
            $stmt = $pdo->prepare($sql);
            return $stmt->execute([$estado, $descripcion, $idSoporte]);
        } catch (PDOException $e) {
            return false;
        } finally {
            $pdo = null;
        }
    }

    public function eliminar($idSoporte) {
        $pdo = Conexion::conectar();
        try {
            $sql = "DELETE FROM G6_soporte WHERE idSoporte = ?";
            $stmt = $pdo->prepare($sql);
            return $stmt->execute([$idSoporte]);
        } catch (PDOException $e) {
            return false;
        } finally {
            $pdo = null;
        }
    }
}
?>
