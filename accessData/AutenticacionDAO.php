<?php
require_once __DIR__ . '/../misc/Conexion.php';

class AutenticacionDAO {
    public function validarCredenciales($correo, $clave) {
        $pdo = Conexion::conectar();

        // Buscamos al usuario por su correo (no incluimos la clave en el WHERE)
        $sql = "SELECT * FROM G6_usuarios WHERE correo = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$correo]);

        // Verificamos si el usuario existe
        if ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            // 🔐 Comparamos la clave ingresada con el hash almacenado
            if (password_verify($clave, $row['clave'])) {
                // ✅ Si coinciden, devolvemos los datos del usuario
                return [
                    'idUsuario' => $row['idUsuario'],
                    'nombre' => $row['nombre'],
                    'correo' => $row['correo'],
                    'rol' => $row['rol']
                ];
            }
        }

        // Si no existe o la clave es incorrecta
        return null;
    }
}
?>
