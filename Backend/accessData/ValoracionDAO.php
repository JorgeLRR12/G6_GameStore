<?php
require_once __DIR__ . '/../misc/Conexion.php';
require_once __DIR__ . '/../Model/Valoracion.php';

class ValoracionDAO {
    public function obtenerTodas() {
        $conexion = Conexion::conectar();
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
    }

        public function obtenerPorJuego($idJuego) {
            $conexion = Conexion::conectar();
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
        }

    public function insertar(Valoracion $valoracion) {
        $conexion = Conexion::conectar();
        $sql = "INSERT INTO G6_valoracion (idUsuario, idJuego, puntuacion, comentario)
                VALUES (?, ?, ?, ?)";
        $stmt = $conexion->prepare($sql);
        return $stmt->execute([
            $valoracion->getIdUsuario(),
            $valoracion->getIdJuego(),
            $valoracion->getPuntuacion(),
            $valoracion->getComentario()
        ]);
    }

    public function actualizar(Valoracion $valoracion) {
        $conexion = Conexion::conectar();
        $sql = "UPDATE G6_valoracion SET puntuacion = ?, comentario = ? WHERE idValoracion = ?";
        $stmt = $conexion->prepare($sql);
        return $stmt->execute([
            $valoracion->getPuntuacion(),
            $valoracion->getComentario(),
            $valoracion->getIdValoracion()
        ]);
    }

    public function eliminar($id) {
        $conexion = Conexion::conectar();
        $sql = "DELETE FROM G6_valoracion WHERE idValoracion = ?";
        $stmt = $conexion->prepare($sql);
        return $stmt->execute([$id]);
    }
}
