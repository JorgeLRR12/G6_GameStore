<?php
require_once __DIR__ . '/../misc/Conexion.php';

class AutenticacionDAO {
    public function validarCredenciales($correo, $clave) {
        $pdo = Conexion::conectar();

        try {
            $sql = "SELECT * FROM G6_usuarios WHERE correo = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$correo]);

            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($row) {
                if (password_verify($clave, $row['clave'])) {
                    return [
                        'idUsuario' => $row['idUsuario'],
                        'nombre' => $row['nombre'],
                        'correo' => $row['correo'],
                        'rol' => $row['rol']
                    ];
                }
            }
            return null;
        } catch (PDOException $e) {
            throw new Exception("Error al validar credenciales: " . $e->getMessage());
        } finally {
            // 🔥 Cerrar conexión y liberar recursos
            $stmt = null;
            $pdo = null;
        }
    }
}
?>
