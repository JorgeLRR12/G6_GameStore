<?php
require_once "Conexion.php";

class AutenticacionDAO {
    public function validarCredenciales($correo, $clave) {
        $pdo = Conexion::conectar();
        $sql = "SELECT * FROM G6_usuarios WHERE correo = ? AND clave = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$correo, $clave]);

        if ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            return [
                'idUsuario' => $row['idUsuario'],
                'nombre' => $row['nombre'],
                'correo' => $row['correo'],
                'rol' => $row['rol']
            ];
        }
        return null;
    }
}
?>
