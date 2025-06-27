<?php
require_once __DIR__ . '/../misc/Conexion.php';

class CompraDAO {

    public function obtenerTodos() {
        $pdo = Conexion::conectar();
        try {
            $stmt = $pdo->query("SELECT * FROM G6_compra");
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
            $stmt = $pdo->prepare("SELECT * FROM G6_compra WHERE idCompra = ?");
            $stmt->execute([$id]);
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return ["error" => $e->getMessage()];
        } finally {
            $pdo = null;
        }
    }

    public function insertar($compra) {
        $pdo = Conexion::conectar();
        try {
            $sql = "INSERT INTO G6_compra (idUsuario, total) VALUES (?, ?)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                $compra->getIdUsuario(),
                $compra->getTotal()
            ]);
            return $pdo->lastInsertId();
        } catch (PDOException $e) {
            return ["error" => $e->getMessage()];
        } finally {
            $pdo = null;
        }
    }

    public function actualizar($idCompra, $compra) {
        $pdo = Conexion::conectar();
        try {
            $stmt = $pdo->prepare("UPDATE G6_compra SET idUsuario = ?, total = ? WHERE idCompra = ?");
            $stmt->execute([
                $compra->getIdUsuario(),
                $compra->getTotal(),
                $idCompra
            ]);
            return $stmt->rowCount() > 0;
        } catch (PDOException $e) {
            return ["error" => $e->getMessage()];
        } finally {
            $pdo = null;
        }
    }

    public function eliminar($idCompra) {
        $pdo = Conexion::conectar();
        try {
            $stmt = $pdo->prepare("DELETE FROM G6_compra WHERE idCompra = ?");
            $stmt->execute([$idCompra]);
            return $stmt->rowCount() > 0;
        } catch (PDOException $e) {
            return ["error" => $e->getMessage()];
        } finally {
            $pdo = null;
        }
    }

    public function obtenerComprasDetalladas() {
        $pdo = Conexion::conectar();
        try {
            $sql = "
                SELECT 
                    c.idCompra,
                    c.idUsuario,
                    u.nombre AS nombreUsuario,
                    c.total,
                    c.fechaCompra,
                    j.idJuego,
                    j.nombre AS nombreJuego
                FROM G6_compra c
                JOIN G6_usuarios u ON c.idUsuario = u.idUsuario
                LEFT JOIN G6_compra_juego cj ON c.idCompra = cj.idCompra
                LEFT JOIN G6_juego j ON cj.idJuego = j.idJuego
                ORDER BY c.fechaCompra DESC
            ";

            $stmt = $pdo->query($sql);
            $resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $compras = [];
            foreach ($resultados as $row) {
                $idCompra = $row['idCompra'];
                if (!isset($compras[$idCompra])) {
                    $compras[$idCompra] = [
                        "idCompra" => $idCompra,
                        "idUsuario" => $row["idUsuario"],
                        "nombreUsuario" => $row["nombreUsuario"],
                        "total" => $row["total"],
                        "fecha" => $row["fechaCompra"],
                        "juegos" => []
                    ];
                }

                if ($row["idJuego"]) {
                    $compras[$idCompra]["juegos"][] = [
                        "idJuego" => $row["idJuego"],
                        "nombre" => $row["nombreJuego"]
                    ];
                }
            }

            return array_values($compras);
        } catch (PDOException $e) {
            return ["error" => $e->getMessage()];
        } finally {
            $pdo = null;
        }
    }
}
?>
