<?php
require_once "Conexion.php";
require_once __DIR__ . '/../model/UsuarioJuego.php';

class UsuarioJuegoDAO {
    public static function obtenerTodos() {
        try {
            $conexion = Conexion::conectar();
            $sql = "SELECT * FROM g6_usuario_juego";
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
            $sql = "INSERT INTO g6_usuario_juego (idUsuario, idJuego, fechaAdquisicion) VALUES (?, ?, ?)";
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

    public static function eliminar($idUsuario, $idJuego) {
        try {
            $conexion = Conexion::conectar();
            $sql = "DELETE FROM g6_usuario_juego WHERE idUsuario = ? AND idJuego = ?";
            $stmt = $conexion->prepare($sql);
            return $stmt->execute([$idUsuario, $idJuego]);
        } catch (PDOException $e) {
            throw new Exception("Error al eliminar usuario-juego: " . $e->getMessage());
        }
    }
}
