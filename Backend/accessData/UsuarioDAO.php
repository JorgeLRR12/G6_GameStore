<?php
require_once __DIR__ . '/../misc/Conexion.php';
require_once __DIR__ . '/../model/Usuario.php';

class UsuarioDAO {

    public function obtenerTodos() {
        $pdo = Conexion::conectar();
        $sql = "SELECT * FROM G6_usuarios";
        $stmt = $pdo->query($sql);

        $usuarios = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $usuarios[] = [
                'idUsuario' => $row['idUsuario'],
                'nombre' => $row['nombre'],
                'correo' => $row['correo'],
                'clave' => $row['clave'],
                'fechaNacimiento' => $row['fechaNacimiento'],
                'rol' => $row['rol']
            ];
        }
        return $usuarios;
    }

    public function obtenerPorId($id) {
        $pdo = Conexion::conectar();
        $sql = "SELECT * FROM G6_usuarios WHERE idUsuario = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$id]);

        if ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            return [
                'idUsuario' => $row['idUsuario'],
                'nombre' => $row['nombre'],
                'correo' => $row['correo'],
                'clave' => $row['clave'],
                'fechaNacimiento' => $row['fechaNacimiento'],
                'rol' => $row['rol']
            ];
        }
        return null;
    }

    public function insertar(Usuario $usuario) {
    $pdo = Conexion::conectar();

    // Generamos un hash seguro de la contraseña utilizando password_hash
    $claveHasheada = password_hash($usuario->getClave(), PASSWORD_DEFAULT);

    // Preparamos la consulta SQL con la clave ya hasheada
    $sql = "INSERT INTO G6_usuarios (nombre, correo, clave, fechaNacimiento, rol) VALUES (?, ?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);

        // Ejecutamos con los datos del objeto Usuario, usando la clave encriptada
        return $stmt->execute([
            $usuario->getNombre(),
            $usuario->getCorreo(),
            $claveHasheada, // aquí se usa la clave encriptada
            $usuario->getFechaNacimiento(),
            $usuario->getRol()
        ]);
    }


    public function actualizar(Usuario $usuario) {
    $pdo = Conexion::conectar();

    // Re-hash de la nueva contraseña (aunque sea igual, no afecta seguridad)
    $claveHasheada = password_hash($usuario->getClave(), PASSWORD_DEFAULT);

    $sql = "UPDATE G6_usuarios SET nombre = ?, correo = ?, clave = ?, fechaNacimiento = ?, rol = ? WHERE idUsuario = ?";
    $stmt = $pdo->prepare($sql);
        return $stmt->execute([
            $usuario->getNombre(),
            $usuario->getCorreo(),
            $claveHasheada,
            $usuario->getFechaNacimiento(),
            $usuario->getRol(),
            $usuario->getIdUsuario()
        ]);
    }


    public function eliminar($idUsuario) {
        $pdo = Conexion::conectar();
        $sql = "DELETE FROM G6_usuarios WHERE idUsuario = ?";
        $stmt = $pdo->prepare($sql);
        return $stmt->execute([$idUsuario]);
    }
}
?>
