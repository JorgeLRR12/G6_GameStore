<?php
require_once __DIR__ . '/../misc/Conexion.php';
require_once __DIR__ . '/../Model/Carrito.php';

class CarritoDAO {

    public function obtenerTodos() {
        $conexion = Conexion::conectar();
        try {
            $sql = "SELECT * FROM G6_carrito";
            $consulta = $conexion->query($sql);
            $resultado = [];

            while ($fila = $consulta->fetch(PDO::FETCH_ASSOC)) {
                $resultado[] = [
                    'idCarrito' => $fila['idCarrito'],
                    'idUsuario' => $fila['idUsuario'],
                    'fechaCreacion' => $fila['fechaCreacion']
                ];
            }
            return $resultado;
        } finally {
            $conexion = null;
        }
    }

    public function obtenerPorId($idCarrito) {
        $conexion = Conexion::conectar();
        try {
            $sql = "SELECT * FROM G6_carrito WHERE idCarrito = ?";
            $consulta = $conexion->prepare($sql);
            $consulta->execute([$idCarrito]);

            if ($fila = $consulta->fetch(PDO::FETCH_ASSOC)) {
                return [
                    'idCarrito' => $fila['idCarrito'],
                    'idUsuario' => $fila['idUsuario'],
                    'fechaCreacion' => $fila['fechaCreacion']
                ];
            }
            return null;
        } finally {
            $conexion = null;
        }
    }

    public function insertar(Carrito $carrito) {
        $conexion = Conexion::conectar();
        try {
            // Validar que el usuario exista
            $sqlUsuario = "SELECT 1 FROM G6_usuarios WHERE idUsuario = ?";
            $consultaUsuario = $conexion->prepare($sqlUsuario);
            $consultaUsuario->execute([$carrito->getIdUsuario()]);
            if (!$consultaUsuario->fetch()) {
                throw new Exception("El usuario no existe");
            }

            // Insertar el carrito
            if (empty($carrito->getFechaCreacion())) {
                $sql = "INSERT INTO G6_carrito (idUsuario) VALUES (?)";
                $consulta = $conexion->prepare($sql);
                $consulta->execute([$carrito->getIdUsuario()]);
            } else {
                $sql = "INSERT INTO G6_carrito (idUsuario, fechaCreacion) VALUES (?, ?)";
                $consulta = $conexion->prepare($sql);
                $consulta->execute([
                    $carrito->getIdUsuario(),
                    $carrito->getFechaCreacion()
                ]);
            }

            return $conexion->lastInsertId();
        } finally {
            $conexion = null;
        }
    }

    public function actualizar(Carrito $carrito) {
        $conexion = Conexion::conectar();
        try {
            // Validar que el usuario exista
            $sqlUsuario = "SELECT 1 FROM G6_usuarios WHERE idUsuario = ?";
            $consultaUsuario = $conexion->prepare($sqlUsuario);
            $consultaUsuario->execute([$carrito->getIdUsuario()]);
            if (!$consultaUsuario->fetch()) {
                throw new Exception("El usuario no existe");
            }

            // Actualizar carrito
            $sql = "UPDATE G6_carrito SET idUsuario = ?, fechaCreacion = ? WHERE idCarrito = ?";
            $consulta = $conexion->prepare($sql);
            return $consulta->execute([
                $carrito->getIdUsuario(),
                $carrito->getFechaCreacion(),
                $carrito->getIdCarrito()
            ]);
        } finally {
            $conexion = null;
        }
    }

    public function eliminar($idCarrito) {
        $conexion = Conexion::conectar();
        try {
            $sql = "DELETE FROM G6_carrito WHERE idCarrito = ?";
            $consulta = $conexion->prepare($sql);
            return $consulta->execute([$idCarrito]);
        } finally {
            $conexion = null;
        }
    }
}
?>
