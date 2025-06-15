<?php
class Conexion {
    private static $host = "127.0.0.1";
    private static $puerto = "3306";
    private static $usuario = "root";
    private static $clave = "Puntarenas09";
    private static $baseDeDatos = "c16345_tiendapruebas";

    public static function conectar() {
        try {
            $conexion = new PDO(
                "mysql:host=" . self::$host . ";port=" . self::$puerto . ";dbname=" . self::$baseDeDatos . ";charset=utf8mb4",
                self::$usuario,
                self::$clave
            );
            $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conexion;
        } catch (PDOException $e) {
            die("Error al conectar a la base de datos: " . $e->getMessage());
        }
    }
}
