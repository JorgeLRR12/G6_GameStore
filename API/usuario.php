<?php

// Permitir solicitudes desde cualquier origen (CORS)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

// Manejar solicitud preflight (para CORS en métodos como PUT o DELETE)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Incluir el controlador necesario
require_once __DIR__ . '/../controller/UsuarioController.php';
require_once __DIR__ . '/../misc/RespuestaJSON.php';

// Crear instancia del controlador
$controlador = new UsuarioController();

// Obtener el método de la solicitud HTTP
$metodo = $_SERVER['REQUEST_METHOD'];

// Leer datos de entrada en caso de PUT, POST o DELETE
$datos = json_decode(file_get_contents("php://input"), true);

// Manejo de las solicitudes según el método
switch ($metodo) {
    case 'GET':
        if (isset($_GET['id'])) {
            $controlador->obtenerPorId($_GET['id']);
        } else {
            $controlador->obtenerTodos();
        }
        break;

    case 'POST':
        if ($datos) {
            $controlador->insertar($datos);
        } else {
            RespuestaJSON::enviarError(400, "Datos no válidos para insertar");
        }
        break;

    case 'PUT':
        if ($datos && isset($datos['idUsuario'])) {
            $controlador->actualizar($datos);
        } else {
            RespuestaJSON::enviarError(400, "ID de usuario no proporcionado o datos incompletos para actualizar");
        }
        break;

    case 'DELETE':
        if ($datos && isset($datos['idUsuario'])) {
            $controlador->eliminar($datos['idUsuario']);
        } else {
            RespuestaJSON::enviarError(400, "ID de usuario no proporcionado para eliminar");
        }
        break;

    default:
        RespuestaJSON::enviarError(405, "Método HTTP no permitido");
        break;
}
