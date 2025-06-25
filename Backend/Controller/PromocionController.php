<?php
// CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../Model/Promocion.php';
require_once __DIR__ . '/../accessData/PromocionDAO.php';
require_once __DIR__ . '/../misc/RespuestaJSON.php';

$dao = new PromocionDAO();

switch ($_SERVER['REQUEST_METHOD']) {

    case 'GET':
        if (isset($_GET['id'])) {
            try {
                $promocion = $dao->obtenerPorId($_GET['id']);
                if ($promocion) {
                    RespuestaJSON::enviarRespuesta(200, "Promoción encontrada", $promocion);
                } else {
                    RespuestaJSON::enviarError(404, "Promoción no encontrada");
                }
            } catch (Exception $e) {
                RespuestaJSON::enviarError(500, $e->getMessage());
            }
        } else {
            try {
                $lista = $dao->obtenerTodos();
                RespuestaJSON::enviarRespuesta(200, "Promociones encontradas", $lista);
            } catch (Exception $e) {
                RespuestaJSON::enviarError(500, $e->getMessage());
            }
        }
        break;

    case 'POST':
        $datos = json_decode(file_get_contents("php://input"), true);

        if (isset($datos['idJuego'], $datos['porcentajeDescuento'], $datos['fechaInicio'], $datos['fechaFin'], $datos['idUsuario'])) {
            try {
                $promocion = new Promocion(
                    $datos['idJuego'],
                    $datos['porcentajeDescuento'],
                    $datos['fechaInicio'],
                    $datos['fechaFin'],
                    $datos['idUsuario']
                );
                $id = $dao->insertar($promocion);
                RespuestaJSON::enviarRespuesta(201, "Promoción creada", ["idPromocion" => $id]);
            } catch (Exception $e) {
                RespuestaJSON::enviarError(500, $e->getMessage());
            }
        } else {
            RespuestaJSON::enviarError(400, "Datos incompletos para crear promoción");
        }
        break;

    case 'PUT':
    $datos = json_decode(file_get_contents("php://input"), true);

    if (isset($datos['idPromocion'], $datos['idJuego'], $datos['porcentajeDescuento'], $datos['fechaInicio'], $datos['fechaFin'], $datos['idUsuario'])) {
        try {
            $promocion = new Promocion(
                $datos['idJuego'],
                $datos['porcentajeDescuento'],
                $datos['fechaInicio'],
                $datos['fechaFin'],
                $datos['idUsuario'],
                $datos['idPromocion']
            );
            $ok = $dao->actualizar($datos['idPromocion'], $promocion);
            if ($ok) {
                RespuestaJSON::enviarRespuesta(200, "Promoción actualizada");
            } else {
                RespuestaJSON::enviarError(404, "Promoción no encontrada para actualizar");
            }
        } catch (Exception $e) {
            RespuestaJSON::enviarError(500, $e->getMessage());
        }
    } else {
        RespuestaJSON::enviarError(400, "Datos incompletos para actualizar promoción");
    }
    break;

    case 'DELETE':
        $datos = json_decode(file_get_contents("php://input"), true);
        if (isset($datos['idPromocion'])) {
            try {
                $ok = $dao->eliminar($datos['idPromocion']);
                if ($ok) {
                    RespuestaJSON::enviarRespuesta(200, "Promoción eliminada");
                } else {
                    RespuestaJSON::enviarError(404, "Promoción no encontrada para eliminar");
                }
            } catch (Exception $e) {
                RespuestaJSON::enviarError(500, $e->getMessage());
            }
        } else {
            RespuestaJSON::enviarError(400, "ID de promoción no proporcionado para eliminar");
        }
        break;

    default:
        RespuestaJSON::enviarError(405, "Método HTTP no permitido");
        break;
}
