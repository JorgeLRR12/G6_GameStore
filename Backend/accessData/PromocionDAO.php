<?php
require_once __DIR__ . '/../misc/Conexion.php';

class PromocionDAO {

    public function obtenerTodos() {
        $pdo = Conexion::conectar();
        try {
            $stmt = $pdo->query("SELECT * FROM G6_promocion");
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return ["error" => $e->getMessage()];
        } finally {
            $pdo = null;
        }
    }

    public function obtenerPorId($id) {
        $pdo = Conexion::conectar();
        try {
            $stmt = $pdo->prepare("SELECT * FROM G6_promocion WHERE idPromocion = ?");
            $stmt->execute([$id]);
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return ["error" => $e->getMessage()];
        } finally {
            $pdo = null;
        }
    }

    public function insertar($promocion) {
        $pdo = Conexion::conectar();
        try {
            $sql = "INSERT INTO G6_promocion (idJuego, porcentajeDescuento, fechaInicio, fechaFin, idUsuario)
                    VALUES (?, ?, ?, ?, ?)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                $promocion->getIdJuego(),
                $promocion->getPorcentajeDescuento(),
                $promocion->getFechaInicio(),
                $promocion->getFechaFin(),
                $promocion->getIdUsuario()
            ]);
            return $pdo->lastInsertId();
        } catch (PDOException $e) {
            return ["error" => $e->getMessage()];
        } finally {
            $pdo = null;
        }
    }

    public function actualizar($id, $promocion) {
        $pdo = Conexion::conectar();
        try {
            $stmt = $pdo->prepare("UPDATE G6_promocion 
                SET nombre = ?, descripcion = ?, porcentajeDescuento = ?, fechaInicio = ?, fechaFin = ?
                WHERE idPromocion = ?");
            $stmt->execute([
                $promocion->getNombre(),
                $promocion->getDescripcion(),
                $promocion->getPorcentajeDescuento(),
                $promocion->getFechaInicio(),
                $promocion->getFechaFin(),
                $id
            ]);
            return $stmt->rowCount() > 0;
        } catch (PDOException $e) {
            return ["error" => $e->getMessage()];
        } finally {
            $pdo = null;
        }
    }

    public function eliminar($idPromocion) {
        $pdo = Conexion::conectar();
        try {
            $stmt = $pdo->prepare("DELETE FROM G6_promocion WHERE idPromocion = ?");
            $stmt->execute([$idPromocion]);
            return $stmt->rowCount() > 0;
        } catch (PDOException $e) {
            return ["error" => $e->getMessage()];
        } finally {
            $pdo = null;
        }
    }
}
?>
