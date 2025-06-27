<?php
// Permitir solicitudes desde cualquier origen (CORS)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Vary: Origin");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Enviar encabezados CORS para la respuesta OPTIONS
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");
    header("Vary: Origin");
    http_response_code(200);
    exit();
}

// Incluir el controlador que contiene toda la lógica con switch
require_once __DIR__ . '/../Controller/CompraJuegoController.php';
