<?php
require_once __DIR__ . '/../misc/Conexion.php';

class CompraDAO {

    public function obtenerTodos() {
        try {
            $pdo = Conexion::conectar();
            $stmt = $pdo->query("SELECT * FROM g6_compra");
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return ["error" => $e->getMessage()];
        }
    }

    public function obtenerPorId($id) {
        try {
            $pdo = Conexion::conectar();
            $stmt = $pdo->prepare("SELECT * FROM g6_compra WHERE idCompra = ?");
            $stmt->execute([$id]);
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return ["error" => $e->getMessage()];
        }
    }

    public function insertar($compra) {
        try {
            $pdo = Conexion::conectar();
            $sql = "INSERT INTO g6_compra (idUsuario, total) VALUES (?, ?)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                $compra->getIdUsuario(),
                $compra->getTotal()
            ]);
            return $pdo->lastInsertId();
        } catch (PDOException $e) {
            return ["error" => $e->getMessage()];
        }
    }

    public function actualizar($id, $compra) {
        try {
            $pdo = Conexion::conectar();
            $sql = "UPDATE g6_compra SET idUsuario = ?, total = ? WHERE idCompra = ?";
            $stmt = $pdo->prepare($sql);
            return $stmt->execute([
                $compra->getIdUsuario(),
                $compra->getTotal(),
                $id
            ]);
        } catch (PDOException $e) {
            return ["error" => $e->getMessage()];
        }
    }

    public function eliminar($id) {
        try {
            $pdo = Conexion::conectar();
            $stmt = $pdo->prepare("DELETE FROM g6_compra WHERE idCompra = ?");
            return $stmt->execute([$id]);
        } catch (PDOException $e) {
            return ["error" => $e->getMessage()];
        }
    }
}
