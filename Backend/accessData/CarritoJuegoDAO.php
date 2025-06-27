<?php
require_once __DIR__ . '/../misc/Conexion.php';
require_once __DIR__ . '/../Model/CarritoJuego.php';

class CarritoJuegoDAO {

    public function obtenerTodos() {
        $conexion = Conexion::conectar();
        try {
            $sql = "SELECT * FROM G6_carrito_juego";
            $consulta = $conexion->query($sql);
            $resultado = [];
            while ($fila = $consulta->fetch(PDO::FETCH_ASSOC)) {
                $resultado[] = [
                    'idCarrito' => $fila['idCarrito'],
                    'idJuego' => $fila['idJuego'],
                    'fechaAgregado' => $fila['fechaAgregado']
                ];
            }
            return $resultado;
        } finally {
            $conexion = null;
        }
    }

    public function obtenerPorId($idCarrito, $idJuego) {
        $conexion = Conexion::conectar();
        try {
            $sql = "SELECT * FROM G6_carrito_juego WHERE idCarrito = ? AND idJuego = ?";
            $consulta = $conexion->prepare($sql);
            $consulta->execute([$idCarrito, $idJuego]);
            if ($fila = $consulta->fetch(PDO::FETCH_ASSOC)) {
                return [
                    'idCarrito' => $fila['idCarrito'],
                    'idJuego' => $fila['idJuego'],
                    'fechaAgregado' => $fila['fechaAgregado']
                ];
            }
            return null;
        } finally {
            $conexion = null;
        }
    }

    public function obtenerPorCarrito($idCarrito) {
        $conexion = Conexion::conectar();
        try {
            $sql = "SELECT * FROM G6_carrito_juego WHERE idCarrito = ?";
            $consulta = $conexion->prepare($sql);
            $consulta->execute([$idCarrito]);
            $resultado = [];
            while ($fila = $consulta->fetch(PDO::FETCH_ASSOC)) {
                $resultado[] = [
                    'idCarrito' => $fila['idCarrito'],
                    'idJuego' => $fila['idJuego'],
                    'fechaAgregado' => $fila['fechaAgregado']
                ];
            }
            return $resultado;
        } finally {
            $conexion = null;
        }
    }

    public function insertar(CarritoJuego $carritoJuego) {
        $conexion = Conexion::conectar();
        try {
            // Validar que el carrito exista
            $sqlCarrito = "SELECT 1 FROM G6_carrito WHERE idCarrito = ?";
            $consultaCarrito = $conexion->prepare($sqlCarrito);
            $consultaCarrito->execute([$carritoJuego->getIdCarrito()]);
            if (!$consultaCarrito->fetch()) {
                throw new Exception("El carrito no existe");
            }

            // Validar que el juego exista
            $sqlJuego = "SELECT 1 FROM G6_juego WHERE idJuego = ?";
            $consultaJuego = $conexion->prepare($sqlJuego);
            $consultaJuego->execute([$carritoJuego->getIdJuego()]);
            if (!$consultaJuego->fetch()) {
                throw new Exception("El juego no existe");
            }

            // Insertar el juego en el carrito
            if (empty($carritoJuego->getFechaAgregado())) {
                $sql = "INSERT INTO G6_carrito_juego (idCarrito, idJuego) VALUES (?, ?)";
                $consulta = $conexion->prepare($sql);
                return $consulta->execute([
                    $carritoJuego->getIdCarrito(),
                    $carritoJuego->getIdJuego()
                ]);
            } else {
                $sql = "INSERT INTO G6_carrito_juego (idCarrito, idJuego, fechaAgregado) VALUES (?, ?, ?)";
                $consulta = $conexion->prepare($sql);
                return $consulta->execute([
                    $carritoJuego->getIdCarrito(),
                    $carritoJuego->getIdJuego(),
                    $carritoJuego->getFechaAgregado()
                ]);
            }
        } finally {
            $conexion = null;
        }
    }

    public function eliminar($idCarrito, $idJuego) {
        $conexion = Conexion::conectar();
        try {
            $sql = "DELETE FROM G6_carrito_juego WHERE idCarrito = ? AND idJuego = ?";
            $consulta = $conexion->prepare($sql);
            return $consulta->execute([$idCarrito, $idJuego]);
        } finally {
            $conexion = null;
        }
    }

    public function eliminarTodoDelCarrito($idCarrito) {
        $conexion = Conexion::conectar();
        try {
            $sql = "DELETE FROM G6_carrito_juego WHERE idCarrito = ?";
            $consulta = $conexion->prepare($sql);
            return $consulta->execute([$idCarrito]);
        } finally {
            $conexion = null;
        }
    }
}
?>
