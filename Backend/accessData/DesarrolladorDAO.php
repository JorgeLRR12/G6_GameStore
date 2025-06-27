<?php
require_once __DIR__ . '/../misc/Conexion.php';
require_once __DIR__ . '/../Model/Desarrollador.php';

class DesarrolladorDAO {

    public static function obtenerTodos() {
        $conexion = Conexion::conectar();
        try {
            $sql = "SELECT * FROM G6_desarrollador";
            $stmt = $conexion->prepare($sql);
            $stmt->execute();
            $resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $desarrolladores = [];
            foreach ($resultados as $fila) {
                $desarrolladores[] = new Desarrollador(
                    $fila['idDesarrollador'],
                    $fila['nombre'],
                    $fila['pais'],
                    $fila['idUsuario']
                );
            }
            return $desarrolladores;
        } catch (PDOException $e) {
            throw new Exception("Error al obtener desarrolladores: " . $e->getMessage());
        } finally {
            $conexion = null;
        }
    }

    public static function obtenerPorId($id) {
        $conexion = Conexion::conectar();
        try {
            $sql = "SELECT * FROM G6_desarrollador WHERE idDesarrollador = ?";
            $stmt = $conexion->prepare($sql);
            $stmt->execute([$id]);
            $fila = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($fila) {
                return new Desarrollador(
                    $fila['idDesarrollador'],
                    $fila['nombre'],
                    $fila['pais'],
                    $fila['idUsuario']
                );
            }
            return null;
        } catch (PDOException $e) {
            throw new Exception("Error al obtener desarrollador por ID: " . $e->getMessage());
        } finally {
            $conexion = null;
        }
    }

    public static function insertar(Desarrollador $desarrollador) {
        $conexion = Conexion::conectar();
        try {
            $sql = "INSERT INTO G6_desarrollador (nombre, pais, idUsuario) VALUES (?, ?, ?)";
            $stmt = $conexion->prepare($sql);
            return $stmt->execute([
                $desarrollador->getNombre(),
                $desarrollador->getPais(),
                $desarrollador->getIdUsuario()
            ]);
        } catch (PDOException $e) {
            throw new Exception("Error al insertar desarrollador: " . $e->getMessage());
        } finally {
            $conexion = null;
        }
    }

    public static function actualizar(Desarrollador $desarrollador) {
        $conexion = Conexion::conectar();
        try {
            $sql = "UPDATE G6_desarrollador 
                    SET nombre = ?, pais = ?, idUsuario = ?
                    WHERE idDesarrollador = ?";
            $stmt = $conexion->prepare($sql);
            return $stmt->execute([
                $desarrollador->getNombre(),
                $desarrollador->getPais(),
                $desarrollador->getIdUsuario(),
                $desarrollador->getIdDesarrollador()
            ]);
        } catch (PDOException $e) {
            throw new Exception("Error al actualizar desarrollador: " . $e->getMessage());
        } finally {
            $conexion = null;
        }
    }

    public static function eliminar($id) {
        $conexion = Conexion::conectar();
        try {
            $sql = "DELETE FROM G6_desarrollador WHERE idDesarrollador = ?";
            $stmt = $conexion->prepare($sql);
            return $stmt->execute([$id]);
        } catch (PDOException $e) {
            throw new Exception("Error al eliminar desarrollador: " . $e->getMessage());
        } finally {
            $conexion = null;
        }
    }
}
?>
