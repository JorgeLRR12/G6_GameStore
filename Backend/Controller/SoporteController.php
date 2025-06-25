<?php
require_once __DIR__ . '/../Model/Soporte.php';
require_once __DIR__ . '/../accessData/SoporteDAO.php';
require_once __DIR__ . '/../misc/RespuestaJSON.php';

$dao = new SoporteDAO();

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        try {
            if (isset($_GET['idUsuario'])) {
                $soportes = $dao->obtenerPorUsuario($_GET['idUsuario']);
                RespuestaJSON::enviarRespuesta(200, "Tickets encontrados para el usuario", $soportes);
            } else {
                $soportes = $dao->obtenerTodos();
                RespuestaJSON::enviarRespuesta(200, "Todos los tickets encontrados", $soportes);
            }
        } catch (Exception $e) {
            RespuestaJSON::enviarError(500, $e->getMessage());
        }
        break;

    case 'POST':
        $datos = json_decode(file_get_contents("php://input"), true);
        if (isset($datos['idUsuario'], $datos['asunto'], $datos['descripcion'])) {
            try {
                $insertado = $dao->insertar(
                    $datos['idUsuario'],
                    $datos['asunto'],
                    $datos['descripcion'],
                    'Abierto'
                );
                RespuestaJSON::enviarRespuesta(201, "Ticket creado correctamente", $insertado);
            } catch (Exception $e) {
                RespuestaJSON::enviarError(400, $e->getMessage());
            }
        } else {
            RespuestaJSON::enviarError(400, "Datos incompletos para crear ticket");
        }
        break;

    case 'PUT':
        $datos = json_decode(file_get_contents("php://input"), true);
        if (isset($datos['idSoporte'], $datos['estado'], $datos['descripcion'])) {
            try {
                $actualizado = $dao->actualizar(
                    $datos['idSoporte'],
                    $datos['estado'],
                    $datos['descripcion']
                );
                RespuestaJSON::enviarRespuesta(200, "Ticket actualizado correctamente", $actualizado);
            } catch (Exception $e) {
                RespuestaJSON::enviarError(500, $e->getMessage());
            }
        } else {
            RespuestaJSON::enviarError(400, "Datos incompletos para actualizar ticket");
        }
        break;

    case 'DELETE':
        $datos = json_decode(file_get_contents("php://input"), true);
        if (isset($datos['idSoporte'])) {
            try {
                $eliminado = $dao->eliminar($datos['idSoporte']);
                if ($eliminado) {
                    RespuestaJSON::enviarRespuesta(200, "Ticket eliminado correctamente");
                } else {
                    RespuestaJSON::enviarError(404, "Ticket no encontrado para eliminar");
                }
            } catch (Exception $e) {
                RespuestaJSON::enviarError(500, $e->getMessage());
            }
        } else {
            RespuestaJSON::enviarError(400, "ID de ticket no proporcionado para eliminar");
        }
        break;

    default:
        RespuestaJSON::enviarError(405, "Método HTTP no permitido");
        break;
}
