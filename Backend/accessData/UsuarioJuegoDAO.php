<?php
require_once __DIR__ . '/../misc/Conexion.php';
require_once __DIR__ . '/../Model/UsuarioJuego.php';

class UsuarioJuegoDAO {
    public static function obtenerTodos() {
        try {
            $conexion = Conexion::conectar();
            $sql = "SELECT * FROM G6_usuario_juego";
            $stmt = $conexion->prepare($sql);
            $stmt->execute();
            $resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $usuarioJuegos = [];
            foreach ($resultados as $fila) {
                $usuarioJuegos[] = new UsuarioJuego(
                    $fila['idUsuario'],
                    $fila['idJuego'],
                    $fila['fechaAdquisicion']
                );
            }
            return $usuarioJuegos;
        } catch (PDOException $e) {
            throw new Exception("Error al obtener usuario-juego: " . $e->getMessage());
        }
    }

    public static function insertar(UsuarioJuego $registro) {
        try {
            $conexion = Conexion::conectar();
            $sql = "INSERT INTO G6_usuario_juego (idUsuario, idJuego, fechaAdquisicion) VALUES (?, ?, ?)";
            $stmt = $conexion->prepare($sql);
            return $stmt->execute([
                $registro->getIdUsuario(),
                $registro->getIdJuego(),
                $registro->getFechaAdquisicion()
            ]);
        } catch (PDOException $e) {
            throw new Exception("Error al insertar usuario-juego: " . $e->getMessage());
        }
    }

   public static function actualizar(UsuarioJuego $usuarioJuego) {
    try {
        $conexion = Conexion::conectar();
        $sql = "UPDATE G6_usuario_juego SET fechaAdquisicion = ? 
                WHERE idUsuario = ? AND idJuego = ?";
        $stmt = $conexion->prepare($sql);
        return $stmt->execute([
            $usuarioJuego->getFechaAdquisicion(),
            $usuarioJuego->getIdUsuario(),
            $usuarioJuego->getIdJuego()
        ]);
    } catch (PDOException $e) {
        throw new Exception("Error al actualizar usuario-juego: " . $e->getMessage());
    }
}


   

    public static function eliminar($idUsuario, $idJuego) {
        try {
            $conexion = Conexion::conectar();
            $sql = "DELETE FROM G6_usuario_juego WHERE idUsuario = ? AND idJuego = ?";
            $stmt = $conexion->prepare($sql);
            return $stmt->execute([$idUsuario, $idJuego]);
        } catch (PDOException $e) {
            throw new Exception("Error al eliminar usuario-juego: " . $e->getMessage());
        }
    }
}
