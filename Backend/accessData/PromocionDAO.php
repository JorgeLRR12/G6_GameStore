<?php
require_once __DIR__ . '/../misc/Conexion.php';

class PromocionDAO {

    public function obtenerTodos() {
        try {
            $pdo = Conexion::conectar();
            $stmt = $pdo->query("SELECT * FROM G6_promocion");
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return ["error" => $e->getMessage()];
        }
    }

    public function obtenerPorId($id) {
        try {
            $pdo = Conexion::conectar();
            $stmt = $pdo->prepare("SELECT * FROM G6_promocion WHERE idPromocion = ?");
            $stmt->execute([$id]);
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return ["error" => $e->getMessage()];
        }
    }

    public function insertar($promocion) {
        try {
            $pdo = Conexion::conectar();
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
        }
    }

    public function actualizar($id, $promocion) {
        try {
            $pdo = Conexion::conectar();
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
            return $stmt->rowCount() > 0; // Solo devuelve true si se actualizó algo
        } catch (PDOException $e) {
            return ["error" => $e->getMessage()];
        }
    }

    public function eliminar($idPromocion) {
        try {
            $pdo = Conexion::conectar();
            $stmt = $pdo->prepare("DELETE FROM G6_promocion WHERE idPromocion = ?");
            $stmt->execute([$idPromocion]);
            return $stmt->rowCount() > 0; // Verifica si se eliminó algo realmente
        } catch (PDOException $e) {
            return ["error" => $e->getMessage()];
        }
    }

}
