<?php
require_once __DIR__ . '/../misc/Conexion.php';

class AutenticacionDAO {

    public function validarCredenciales($correo, $clave) {
        $pdo = Conexion::conectar();

        try {
            // Buscar el usuario por su correo
            $sql = "SELECT * FROM G6_usuarios WHERE correo = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$correo]);

            // Verificar si existe
            if ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                // Comparar la clave ingresada con el hash almacenado
                if (password_verify($clave, $row['clave'])) {
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

        } catch (PDOException $e) {
            throw new Exception("Error en la autenticación: " . $e->getMessage());
        } finally {
            // 🔥 Cerrar conexión
            $pdo = null;
        }
    }
}
?>

