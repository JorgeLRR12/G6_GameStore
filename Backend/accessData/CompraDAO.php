<?php
require_once __DIR__ . '/../misc/Conexion.php';

class CompraDAO {

    public function obtenerTodos() {
        try {
            $pdo = Conexion::conectar();
            $stmt = $pdo->query("SELECT * FROM G6_compra");
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return ["error" => $e->getMessage()];
        }
    }

    public function obtenerPorId($id) {
        try {
            $pdo = Conexion::conectar();
            $stmt = $pdo->prepare("SELECT * FROM G6_compra WHERE idCompra = ?");
            $stmt->execute([$id]);
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return ["error" => $e->getMessage()];
        }
    }

    public function insertar($compra) {
        try {
            $pdo = Conexion::conectar();
            $sql = "INSERT INTO G6_compra (idUsuario, total) VALUES (?, ?)";
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

    public function actualizar($idCompra, $compra) {
        try {
            $pdo = Conexion::conectar();
            $stmt = $pdo->prepare("UPDATE G6_compra SET idUsuario = ?, total = ? WHERE idCompra = ?");
            $stmt->execute([
                $compra->getIdUsuario(),
                $compra->getTotal(),
                $idCompra
            ]);
            return $stmt->rowCount() > 0; // Devuelve true solo si se actualizó algo
        } catch (PDOException $e) {
            return ["error" => $e->getMessage()];
        }
    }


    public function eliminar($idCompra) {
    try {
        $pdo = Conexion::conectar();
        $stmt = $pdo->prepare("DELETE FROM G6_compra WHERE idCompra = ?");
        $stmt->execute([$idCompra]);
        return $stmt->rowCount() > 0; 
    } catch (PDOException $e) {
        return ["error" => $e->getMessage()];
    }
}

}
