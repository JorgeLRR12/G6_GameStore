<?php
require_once __DIR__ . '/../misc/Conexion.php';
require_once __DIR__ . '/../Model/JuegoDesarrollador.php';

class JuegoDesarrolladorDAO {

    public static function obtenerTodos() {
        $conexion = Conexion::conectar();
        try {
            $sql = "SELECT * FROM G6_juegodesarrollador";
            $consulta = $conexion->query($sql);
            $resultado = [];
            while ($fila = $consulta->fetch(PDO::FETCH_ASSOC)) {
                $resultado[] = [
                    'idJuego' => $fila['idJuego'],
                    'idDesarrollador' => $fila['idDesarrollador']
                ];
            }
            return $resultado;
        } catch (PDOException $e) {
            throw new Exception("Error al obtener relaciones: " . $e->getMessage());
        } finally {
            $conexion = null;
        }
    }

    public static function obtenerPorId($idJuego, $idDesarrollador) {
        $conexion = Conexion::conectar();
        try {
            $sql = "SELECT * FROM G6_juegodesarrollador WHERE idJuego = ? AND idDesarrollador = ?";
            $consulta = $conexion->prepare($sql);
            $consulta->execute([$idJuego, $idDesarrollador]);
            if ($fila = $consulta->fetch(PDO::FETCH_ASSOC)) {
                return [
                    'idJuego' => $fila['idJuego'],
                    'idDesarrollador' => $fila['idDesarrollador']
                ];
            }
            return null;
        } catch (PDOException $e) {
            throw new Exception("Error al obtener relación: " . $e->getMessage());
        } finally {
            $conexion = null;
        }
    }

    public static function insertar(JuegoDesarrollador $relacion) {
        $conexion = Conexion::conectar();
        try {
            // Validar existencia del juego
            $sqlJuego = "SELECT 1 FROM G6_juego WHERE idJuego = ?";
            $consultaJuego = $conexion->prepare($sqlJuego);
            $consultaJuego->execute([$relacion->getIdJuego()]);
            if (!$consultaJuego->fetch()) {
                throw new Exception("El juego no existe");
            }

            // Validar existencia del desarrollador
            $sqlDesarrollador = "SELECT 1 FROM G6_desarrollador WHERE idDesarrollador = ?";
            $consultaDesarrollador = $conexion->prepare($sqlDesarrollador);
            $consultaDesarrollador->execute([$relacion->getIdDesarrollador()]);
            if (!$consultaDesarrollador->fetch()) {
                throw new Exception("El desarrollador no existe");
            }

            // Insertar relación
            $sql = "INSERT INTO G6_juegodesarrollador (idJuego, idDesarrollador) VALUES (?, ?)";
            $consulta = $conexion->prepare($sql);
            return $consulta->execute([
                $relacion->getIdJuego(),
                $relacion->getIdDesarrollador()
            ]);
        } catch (PDOException $e) {
            throw new Exception("Error al insertar relación: " . $e->getMessage());
        } finally {
            $conexion = null;
        }
    }

    public static function actualizar($idJuegoViejo, $idDesarrolladorViejo, $idJuegoNuevo, $idDesarrolladorNuevo) {
        $conexion = Conexion::conectar();
        try {
            // Validar existencia del nuevo juego
            $sqlJuego = "SELECT 1 FROM G6_juego WHERE idJuego = ?";
            $consultaJuego = $conexion->prepare($sqlJuego);
            $consultaJuego->execute([$idJuegoNuevo]);
            if (!$consultaJuego->fetch()) {
                throw new Exception("El juego nuevo no existe");
            }

            // Validar existencia del nuevo desarrollador
            $sqlDesarrollador = "SELECT 1 FROM G6_desarrollador WHERE idDesarrollador = ?";
            $consultaDesarrollador = $conexion->prepare($sqlDesarrollador);
            $consultaDesarrollador->execute([$idDesarrolladorNuevo]);
            if (!$consultaDesarrollador->fetch()) {
                throw new Exception("El desarrollador nuevo no existe");
            }

            // Actualizar relación
            $sql = "UPDATE G6_juegodesarrollador 
                    SET idJuego = ?, idDesarrollador = ? 
                    WHERE idJuego = ? AND idDesarrollador = ?";
            $consulta = $conexion->prepare($sql);
            return $consulta->execute([
                $idJuegoNuevo, $idDesarrolladorNuevo, $idJuegoViejo, $idDesarrolladorViejo
            ]);
        } catch (PDOException $e) {
            throw new Exception("Error al actualizar relación: " . $e->getMessage());
        } finally {
            $conexion = null;
        }
    }

    public static function eliminar($idJuego, $idDesarrollador) {
        $conexion = Conexion::conectar();
        try {
            $sql = "DELETE FROM G6_juegodesarrollador WHERE idJuego = ? AND idDesarrollador = ?";
            $consulta = $conexion->prepare($sql);
            return $consulta->execute([$idJuego, $idDesarrollador]);
        } catch (PDOException $e) {
            throw new Exception("Error al eliminar relación: " . $e->getMessage());
        } finally {
            $conexion = null;
        }
    }
}
?>
