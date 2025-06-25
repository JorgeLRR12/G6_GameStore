<?php
require_once __DIR__ . '/../misc/Conexion.php';
require_once __DIR__ . '/../Model/Carrito.php';

// DAO para manejar operaciones de carrito en la base de datos
class CarritoDAO {
    // Obtener todos los carritos
    public function obtenerTodos() {
        $conexion = Conexion::conectar();
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
    }

    // Obtener un carrito por su ID
    public function obtenerPorId($idCarrito) {
        $conexion = Conexion::conectar();
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
    }

    // Insertar un nuevo carrito, validando que el usuario exista
    public function insertar(Carrito $carrito) {
        $conexion = Conexion::conectar();
        // Validar que el usuario exista
        $sqlUsuario = "SELECT 1 FROM G6_usuarios WHERE idUsuario = ?";
        $consultaUsuario = $conexion->prepare($sqlUsuario);
        $consultaUsuario->execute([$carrito->getIdUsuario()]);
        if (!$consultaUsuario->fetch()) {
            throw new Exception("El usuario no existe");
        }
        // Si no se especifica fecha, omitirla en el INSERT para que MySQL ponga el valor por defecto
        if ($carrito->getFechaCreacion() === null || $carrito->getFechaCreacion() === "") {
            $sql = "INSERT INTO G6_carrito (idUsuario) VALUES (?)";
            $consulta = $conexion->prepare($sql);
            return $consulta->execute([
                $carrito->getIdUsuario()
            ]);
        } else {
            $sql = "INSERT INTO G6_carrito (idUsuario, fechaCreacion) VALUES (?, ?)";
            $consulta = $conexion->prepare($sql);
            return $consulta->execute([
                $carrito->getIdUsuario(),
                $carrito->getFechaCreacion()
            ]);
        }
    }

    // Actualizar un carrito (por ejemplo, cambiar el usuario asociado)
    public function actualizar(Carrito $carrito) {
        $conexion = Conexion::conectar();
        // Validar que el usuario exista
        $sqlUsuario = "SELECT 1 FROM G6_usuarios WHERE idUsuario = ?";
        $consultaUsuario = $conexion->prepare($sqlUsuario);
        $consultaUsuario->execute([$carrito->getIdUsuario()]);
        if (!$consultaUsuario->fetch()) {
            throw new Exception("El usuario no existe");
        }
        // Actualizar el carrito
        $sql = "UPDATE G6_carrito SET idUsuario = ?, fechaCreacion = ? WHERE idCarrito = ?";
        $consulta = $conexion->prepare($sql);
        return $consulta->execute([
            $carrito->getIdUsuario(),
            $carrito->getFechaCreacion(),
            $carrito->getIdCarrito()
        ]);
    }

    // Eliminar un carrito por su ID
    public function eliminar($idCarrito) {
        $conexion = Conexion::conectar();
        $sql = "DELETE FROM G6_carrito WHERE idCarrito = ?";
        $consulta = $conexion->prepare($sql);
        return $consulta->execute([$idCarrito]);
    }
}
?>
