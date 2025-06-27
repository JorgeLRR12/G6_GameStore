<?php
require_once __DIR__ . '/../misc/Conexion.php';
require_once __DIR__ . '/../Model/Valoracion.php';

class ValoracionDAO {

    public function obtenerTodas() {
        $conexion = Conexion::conectar();
        try {
            $sql = "SELECT * FROM G6_valoracion";
            $stmt = $conexion->prepare($sql);
            $stmt->execute();

            $valoraciones = [];
            foreach ($stmt->fetchAll(PDO::FETCH_ASSOC) as $fila) {
                $valoraciones[] = [
                    'idValoracion' => $fila['idValoracion'],
                    'idUsuario' => $fila['idUsuario'],
                    'idJuego' => $fila['idJuego'],
                    'puntuacion' => $fila['puntuacion'],
                    'comentario' => $fila['comentario'],
                    'fechaValoracion' => $fila['fechaValoracion']
                ];
            }
            return $valoraciones;
        } catch (PDOException $e) {
            throw new Exception("Error al obtener valoraciones: " . $e->getMessage());
        } finally {
            $conexion = null;
        }
    }

    public function obtenerPorJuego($idJuego) {
        $conexion = Conexion::conectar();
        try {
            $sql = "SELECT v.*, u.nombre AS nombreUsuario
                    FROM G6_valoracion v
                    INNER JOIN G6_usuarios u ON v.idUsuario = u.idUsuario
                    WHERE v.idJuego = ?";
            $stmt = $conexion->prepare($sql);
            $stmt->execute([$idJuego]);

            $valoraciones = [];
            foreach ($stmt->fetchAll(PDO::FETCH_ASSOC) as $fila) {
                $valoraciones[] = [
                    'idValoracion' => $fila['idValoracion'],
                    'idUsuario' => $fila['idUsuario'],
                    'idJuego' => $fila['idJuego'],
                    'puntuacion' => $fila['puntuacion'],
                    'comentario' => $fila['comentario'],
                    'fechaValoracion' => $fila['fechaValoracion'],
                    'nombreUsuario' => $fila['nombreUsuario']
                ];
            }
            return $valoraciones;
        } catch (PDOException $e) {
            throw new Exception("Error al obtener valoraciones del juego: " . $e->getMessage());
        } finally {
            $conexion = null;
        }
    }

    public function insertar(Valoracion $valoracion) {
        $conexion = Conexion::conectar();
        try {
            $sql = "INSERT INTO G6_valoracion (idUsuario, idJuego, puntuacion, comentario)
                    VALUES (?, ?, ?, ?)";
            $stmt = $conexion->prepare($sql);
            return $stmt->execute([
                $valoracion->getIdUsuario(),
                $valoracion->getIdJuego(),
                $valoracion->getPuntuacion(),
                $valoracion->getComentario()
            ]);
        } catch (PDOException $e) {
            throw new Exception("Error al insertar valoracion: " . $e->getMessage());
        } finally {
            $conexion = null;
        }
    }

    public function actualizar(Valoracion $valoracion) {
        $conexion = Conexion::conectar();
        try {
            $sql = "UPDATE G6_valoracion 
                    SET puntuacion = ?, comentario = ? 
                    WHERE idValoracion = ?";
            $stmt = $conexion->prepare($sql);
            return $stmt->execute([
                $valoracion->getPuntuacion(),
                $valoracion->getComentario(),
                $valoracion->getIdValoracion()
            ]);
        } catch (PDOException $e) {
            throw new Exception("Error al actualizar valoracion: " . $e->getMessage());
        } finally {
            $conexion = null;
        }
    }

    public function eliminar($id) {
        $conexion = Conexion::conectar();
        try {
            $sql = "DELETE FROM G6_valoracion WHERE idValoracion = ?";
            $stmt = $conexion->prepare($sql);
            return $stmt->execute([$id]);
        } catch (PDOException $e) {
            throw new Exception("Error al eliminar valoracion: " . $e->getMessage());
        } finally {
            $conexion = null;
        }
    }
}
?>
