<?php
require_once "Conexion.php";
require_once __DIR__ . '/../model/JuegoDesarrollador.php';

// DAO para manejar la relación entre juegos y desarrolladores en la base de datos
class JuegoDesarrolladorDAO {
    // Obtener todas las relaciones juego-desarrollador
    public static function obtenerTodos() {
        $conexion = Conexion::conectar();
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
    }

    // Obtener una relación específica por IDs
    public static function obtenerPorId($idJuego, $idDesarrollador) {
        $conexion = Conexion::conectar();
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
    }

    // Insertar una nueva relación, validando que existan los IDs referenciados
    public static function insertar(JuegoDesarrollador $relacion) {
        $conexion = Conexion::conectar();
        // Validar que el juego exista
        $sqlJuego = "SELECT 1 FROM G6_juego WHERE idJuego = ?";
        $consultaJuego = $conexion->prepare($sqlJuego);
        $consultaJuego->execute([$relacion->getIdJuego()]);
        if (!$consultaJuego->fetch()) {
            throw new Exception("El juego no existe");
        }
        // Validar que el desarrollador exista
        $sqlDesarrollador = "SELECT 1 FROM G6_desarrollador WHERE idDesarrollador = ?";
        $consultaDesarrollador = $conexion->prepare($sqlDesarrollador);
        $consultaDesarrollador->execute([$relacion->getIdDesarrollador()]);
        if (!$consultaDesarrollador->fetch()) {
            throw new Exception("El desarrollador no existe");
        }
        // Insertar la relación
        $sql = "INSERT INTO G6_juegodesarrollador (idJuego, idDesarrollador) VALUES (?, ?)";
        $consulta = $conexion->prepare($sql);
        return $consulta->execute([$relacion->getIdJuego(), $relacion->getIdDesarrollador()]);
    }

    // Actualizar una relación existente (migrar de una combinación a otra)
    public static function actualizar($idJuegoViejo, $idDesarrolladorViejo, $idJuegoNuevo, $idDesarrolladorNuevo) {
        $conexion = Conexion::conectar();
        // Validar que el nuevo juego exista
        $sqlJuego = "SELECT 1 FROM G6_juego WHERE idJuego = ?";
        $consultaJuego = $conexion->prepare($sqlJuego);
        $consultaJuego->execute([$idJuegoNuevo]);
        if (!$consultaJuego->fetch()) {
            throw new Exception("El juego nuevo no existe");
        }
        // Validar que el nuevo desarrollador exista
        $sqlDesarrollador = "SELECT 1 FROM G6_desarrollador WHERE idDesarrollador = ?";
        $consultaDesarrollador = $conexion->prepare($sqlDesarrollador);
        $consultaDesarrollador->execute([$idDesarrolladorNuevo]);
        if (!$consultaDesarrollador->fetch()) {
            throw new Exception("El desarrollador nuevo no existe");
        }
        // Actualizar la relación
        $sql = "UPDATE G6_juegodesarrollador SET idJuego = ?, idDesarrollador = ? WHERE idJuego = ? AND idDesarrollador = ?";
        $consulta = $conexion->prepare($sql);
        return $consulta->execute([$idJuegoNuevo, $idDesarrolladorNuevo, $idJuegoViejo, $idDesarrolladorViejo]);
    }

    // Eliminar una relación por IDs
    public static function eliminar($idJuego, $idDesarrollador) {
        $conexion = Conexion::conectar();
        $sql = "DELETE FROM G6_juegodesarrollador WHERE idJuego = ? AND idDesarrollador = ?";
        $consulta = $conexion->prepare($sql);
        return $consulta->execute([$idJuego, $idDesarrollador]);
    }
}
?>