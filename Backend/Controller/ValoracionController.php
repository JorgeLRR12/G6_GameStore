<?php
require_once __DIR__ . '/../Model/Valoracion.php';
require_once __DIR__ . '/../accessData/ValoracionDAO.php';
require_once __DIR__ . '/../misc/RespuestaJSON.php';

$dao = new ValoracionDAO();

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        try {
            if (isset($_GET['idValoracion'])) {
                $valoracion = $dao->obtenerPorId($_GET['idValoracion']);
                if ($valoracion) {
                    RespuestaJSON::enviarRespuesta(200, "Valoración encontrada", $valoracion);
                } else {
                    RespuestaJSON::enviarError(404, "Valoración no encontrada");
                }
            } elseif (isset($_GET['idJuego'])) {
                $valoraciones = $dao->obtenerPorJuego($_GET['idJuego']);
                RespuestaJSON::enviarRespuesta(200, "Valoraciones encontradas", $valoraciones);
            } else {
                $valoraciones = $dao->obtenerTodas();
                RespuestaJSON::enviarRespuesta(200, "Todas las valoraciones encontradas", $valoraciones);
            }
        } catch (Exception $e) {
            RespuestaJSON::enviarError(500, $e->getMessage());
        }
        break;


    case 'POST':
        $datos = json_decode(file_get_contents("php://input"), true);
        if (isset($datos['idUsuario'], $datos['idJuego'], $datos['puntuacion'])) {
            try {
                $comentario = $datos['comentario'] ?? null;
                $valoracion = new Valoracion(null, $datos['idUsuario'], $datos['idJuego'], $datos['puntuacion'], $comentario);
                $dao->insertar($valoracion);
                RespuestaJSON::enviarRespuesta(201, "Valoración creada correctamente");
            } catch (Exception $e) {
                RespuestaJSON::enviarError(400, $e->getMessage());
            }
        } else {
            RespuestaJSON::enviarError(400, "Datos incompletos para crear valoración");
        }
        break;

    case 'PUT':
        $datos = json_decode(file_get_contents("php://input"), true);
        if (isset($datos['idValoracion'], $datos['puntuacion'], $datos['comentario'])) {
            try {
                $valoracion = new Valoracion($datos['idValoracion'], null, null, $datos['puntuacion'], $datos['comentario']);
                $dao->actualizar($valoracion);
                RespuestaJSON::enviarRespuesta(200, "Valoración actualizada correctamente");
            } catch (Exception $e) {
                RespuestaJSON::enviarError(500, $e->getMessage());
            }
        } else {
            RespuestaJSON::enviarError(400, "Datos incompletos para actualizar valoración");
        }
        break;

    case 'DELETE':
        $datos = json_decode(file_get_contents("php://input"), true);
        if (isset($datos['idValoracion'])) {
            try {
                $eliminado = $dao->eliminar($datos['idValoracion']);
                if ($eliminado) {
                    RespuestaJSON::enviarRespuesta(200, "Valoración eliminada correctamente");
                } else {
                    RespuestaJSON::enviarError(404, "Valoración no encontrada");
                }
            } catch (Exception $e) {
                RespuestaJSON::enviarError(500, $e->getMessage());
            }
        } else {
            RespuestaJSON::enviarError(400, "ID de valoración no proporcionado");
        }
        break;

    default:
        RespuestaJSON::enviarError(405, "Método HTTP no permitido");
        break;
}
