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
            $sql = "UPDATE G6_promocion 
                    SET idJuego = ?, porcentajeDescuento = ?, fechaInicio = ?, fechaFin = ?, idUsuario = ?
                    WHERE idPromocion = ?";
            $stmt = $pdo->prepare($sql);
            return $stmt->execute([
                $promocion->getIdJuego(),
                $promocion->getPorcentajeDescuento(),
                $promocion->getFechaInicio(),
                $promocion->getFechaFin(),
                $promocion->getIdUsuario(),
                $id
            ]);
        } catch (PDOException $e) {
            return ["error" => $e->getMessage()];
        }
    }

    public function eliminar($id) {
        try {
            $pdo = Conexion::conectar();
            $stmt = $pdo->prepare("DELETE FROM G6_promocion WHERE idPromocion = ?");
            return $stmt->execute([$id]);
        } catch (PDOException $e) {
            return ["error" => $e->getMessage()];
        }
    }
}
