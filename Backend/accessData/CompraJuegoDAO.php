<?php
require_once __DIR__ . '/../misc/Conexion.php';

class CompraJuegoDAO {

    public function obtenerTodos() {
        $pdo = Conexion::conectar();
        try {
            $stmt = $pdo->query("SELECT * FROM G6_compra_juego");
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return ["error" => $e->getMessage()];
        } finally {
            $pdo = null;
        }
    }

    public function obtenerPorId($idCompra, $idJuego) {
        $pdo = Conexion::conectar();
        try {
            $stmt = $pdo->prepare("SELECT * FROM G6_compra_juego WHERE idCompra = ? AND idJuego = ?");
            $stmt->execute([$idCompra, $idJuego]);
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return ["error" => $e->getMessage()];
        } finally {
            $pdo = null;
        }
    }

    public function insertar($compraJuego) {
        $pdo = Conexion::conectar();
        try {
            $sql = "INSERT INTO G6_compra_juego 
                    (idCompra, idJuego, precioUnitario, porcentajeDescuento, cantidad, subtotal, idPromocion)
                    VALUES (?, ?, ?, ?, ?, ?, ?)";
            $stmt = $pdo->prepare($sql);
            return $stmt->execute([
                $compraJuego->getIdCompra(),
                $compraJuego->getIdJuego(),
                $compraJuego->getPrecioUnitario(),
                $compraJuego->getPorcentajeDescuento(),
                $compraJuego->getCantidad(),
                $compraJuego->getSubtotal(),
                $compraJuego->getIdPromocion()
            ]);
        } catch (PDOException $e) {
            return ["error" => $e->getMessage()];
        } finally {
            $pdo = null;
        }
    }

    public function actualizar($idCompra, $idJuego, $compraJuego) {
        $pdo = Conexion::conectar();
        try {
            $stmt = $pdo->prepare("UPDATE G6_compra_juego 
                                SET precioUnitario = ?, porcentajeDescuento = ?, cantidad = ?, subtotal = ?, idPromocion = ?
                                WHERE idCompra = ? AND idJuego = ?");
            $stmt->execute([
                $compraJuego->getPrecioUnitario(),
                $compraJuego->getPorcentajeDescuento(),
                $compraJuego->getCantidad(),
                $compraJuego->getSubtotal(),
                $compraJuego->getIdPromocion(),
                $idCompra,
                $idJuego
            ]);
            return $stmt->rowCount() > 0;
        } catch (PDOException $e) {
            return ["error" => $e->getMessage()];
        } finally {
            $pdo = null;
        }
    }

    public function eliminar($idCompra, $idJuego) {
        $pdo = Conexion::conectar();
        try {
            $stmt = $pdo->prepare("DELETE FROM G6_compra_juego WHERE idCompra = ? AND idJuego = ?");
            $stmt->execute([$idCompra, $idJuego]);
            return $stmt->rowCount() > 0;
        } catch (PDOException $e) {
            return ["error" => $e->getMessage()];
        } finally {
            $pdo = null;
        }
    }
}
?>
