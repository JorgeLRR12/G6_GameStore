<?php
require_once __DIR__ . '/../misc/Conexion.php';
require_once __DIR__ . '/../model/Juego.php';

class JuegoDAO {
    public static function obtenerTodos() {
        try {
            $conexion = Conexion::conectar();
            $sql = "SELECT * FROM G6_juego";
            $stmt = $conexion->prepare($sql);
            $stmt->execute();
            $resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $juegos = [];
            foreach ($resultados as $fila) {
                $juegos[] = new Juego(
                    $fila['idJuego'], $fila['nombre'], $fila['descripcion'], $fila['precio'],
                    $fila['fechaLanzamiento'], $fila['clasificacionEdad'],
                    $fila['idCategoria'], $fila['idUsuario']
                );
            }
            return $juegos;
        } catch (PDOException $e) {
            throw new Exception("Error al obtener juegos: " . $e->getMessage());
        }
    }

    public static function obtenerPorId($id) {
        try {
            $conexion = Conexion::conectar();
            $sql = "SELECT * FROM G6_juego WHERE idJuego = ?";
            $stmt = $conexion->prepare($sql);
            $stmt->execute([$id]);
            $fila = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($fila) {
                return new Juego(
                    $fila['idJuego'], $fila['nombre'], $fila['descripcion'], $fila['precio'],
                    $fila['fechaLanzamiento'], $fila['clasificacionEdad'],
                    $fila['idCategoria'], $fila['idUsuario']
                );
            }
            return null;
        } catch (PDOException $e) {
            throw new Exception("Error al obtener juego por ID: " . $e->getMessage());
        }
    }

    public static function insertar(Juego $juego) {
        try {
            $conexion = Conexion::conectar();
            $sql = "INSERT INTO G6_juego (nombre, descripcion, precio, fechaLanzamiento, clasificacionEdad, idCategoria, idUsuario)
                    VALUES (?, ?, ?, ?, ?, ?, ?)";
            $stmt = $conexion->prepare($sql);
            return $stmt->execute([
                $juego->getNombre(),
                $juego->getDescripcion(),
                $juego->getPrecio(),
                $juego->getFechaLanzamiento(),
                $juego->getClasificacionEdad(),
                $juego->getIdCategoria(),
                $juego->getIdUsuario()
            ]);
        } catch (PDOException $e) {
            throw new Exception("Error al insertar juego: " . $e->getMessage());
        }
    }

    public static function eliminar($id) {
        try {
            $conexion = Conexion::conectar();
            $sql = "DELETE FROM G6_juego WHERE idJuego = ?";
            $stmt = $conexion->prepare($sql);
            return $stmt->execute([$id]);
        } catch (PDOException $e) {
            throw new Exception("Error al eliminar juego: " . $e->getMessage());
        }
    }
      public static function actualizar(Juego $juego) {
    try {
        $conexion = Conexion::conectar();
        $sql = "UPDATE G6_juego 
                SET nombre = ?, descripcion = ?, precio = ?, fechaLanzamiento = ?, 
                    clasificacionEdad = ?, idCategoria = ?, idUsuario = ?
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
            $juego->getIdJuego()
        ]);
    } catch (PDOException $e) {
        throw new Exception("Error al actualizar juego: " . $e->getMessage());
    }
}





}

