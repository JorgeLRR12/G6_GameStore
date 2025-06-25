<?php
// Permitir solicitudes desde cualquier origen (CORS)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");

// Responder a solicitudes de verificación CORS del navegador
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Incluir el controlador que maneja la lógica de juegos en carritos
require_once __DIR__ . '/../Controller/CarritoJuegoController.php';
?>
