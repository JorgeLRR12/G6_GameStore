<?php
require_once __DIR__ . '/../misc/Conexion.php';
require_once __DIR__ . '/../Model/Juego.php';

class JuegoDAO {
    public static function obtenerTodos() {
        $conexion = Conexion::conectar();
        try {
            $sql = "SELECT * FROM G6_juego";
            $stmt = $conexion->prepare($sql);
            $stmt->execute();
            $resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $juegos = [];
            foreach ($resultados as $fila) {
                $juegos[] = new Juego(
                    $fila['idJuego'], $fila['nombre'], $fila['descripcion'], $fila['precio'],
                    $fila['fechaLanzamiento'], $fila['clasificacionEdad'],
                    $fila['idCategoria'], $fila['idUsuario'], $fila['imagen']
                );
            }
            return $juegos;
        } catch (PDOException $e) {
            throw new Exception("Error al obtener juegos: " . $e->getMessage());
        } finally {
            $conexion = null;
        }
    }

    public static function obtenerPorId($id) {
        $conexion = Conexion::conectar();
        try {
            $sql = "SELECT * FROM G6_juego WHERE idJuego = ?";
            $stmt = $conexion->prepare($sql);
            $stmt->execute([$id]);
            $fila = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($fila) {
                return new Juego(
                    $fila['idJuego'], $fila['nombre'], $fila['descripcion'], $fila['precio'],
                    $fila['fechaLanzamiento'], $fila['clasificacionEdad'],
                    $fila['idCategoria'], $fila['idUsuario'], $fila['imagen']
                );
            }
            return null;
        } catch (PDOException $e) {
            throw new Exception("Error al obtener juego por ID: " . $e->getMessage());
        } finally {
            $conexion = null;
        }
    }

    public static function insertar(Juego $juego) {
        $conexion = Conexion::conectar();
        try {
            $sql = "INSERT INTO G6_juego (nombre, descripcion, precio, fechaLanzamiento, clasificacionEdad, idCategoria, idUsuario, imagen)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            $stmt = $conexion->prepare($sql);
            return $stmt->execute([
                $juego->getNombre(),
                $juego->getDescripcion(),
                $juego->getPrecio(),
                $juego->getFechaLanzamiento(),
                $juego->getClasificacionEdad(),
                $juego->getIdCategoria(),
                $juego->getIdUsuario(),
                $juego->getImagen()
            ]);
        } catch (PDOException $e) {
            throw new Exception("Error al insertar juego: " . $e->getMessage());
        } finally {
            $conexion = null;
        }
    }

    public static function actualizar(Juego $juego) {
        $conexion = Conexion::conectar();
        try {
            $sql = "UPDATE G6_juego 
                    SET nombre = ?, descripcion = ?, precio = ?, fechaLanzamiento = ?, 
                        clasificacionEdad = ?, idCategoria = ?, idUsuario = ?, imagen = ?
                    WHERE idJuego = ?";
            $stmt = $conexion->prepare($sql);
            return $stmt->execute([
                $juego->getNombre(),
                $juego->getDescripcion(),
                $juego->getPrecio(),
                $juego->getFechaLanzamiento(),
                $juego->getClasificacionEdad(),
                $juego->getIdCategoria(),
                $juego->getIdUsuario(),
                $juego->getImagen(),
                $juego->getIdJuego()
            ]);
        } catch (PDOException $e) {
            throw new Exception("Error en la actualización: " . $e->getMessage());
        } finally {
            $conexion = null;
        }
    }

    public static function eliminar($id) {
        $conexion = Conexion::conectar();
        try {
            $sql = "DELETE FROM G6_juego WHERE idJuego = ?";
            $stmt = $conexion->prepare($sql);
            return $stmt->execute([$id]);
        } catch (PDOException $e) {
            throw new Exception("Error al eliminar juego: " . $e->getMessage());
        } finally {
            $conexion = null;
        }
    }
}
?>
