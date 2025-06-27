<?php
class Conexion {
    public static function conectar() {
        // Parámetros de conexión
        $host = 'srv863.hstgr.io';
        $dbname = 'u484426513_ms6';
        $usuario = 'u484426513_ms6';
        $clave = '/Yh&G@QEgm0';
        


            // $host = 'srv863.hstgr.io';
        // $dbname = 'u484426513_ms125';
        // $usuario = 'u484426513_ms125';
        // $clave = 'N]18zvue';

        try {
            $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $usuario, $clave);
            // Configura PDO para que lance excepciones en caso de error
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $pdo;
        } catch (PDOException $e) {
            die("Error de conexión a la base de datos: " . $e->getMessage());
        }
    }
}
?>
