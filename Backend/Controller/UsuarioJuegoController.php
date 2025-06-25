<?php
require_once __DIR__ . '/../Model/UsuarioJuego.php';
require_once __DIR__ . '/../accessData/UsuarioJuegoDAO.php';
require_once __DIR__ . '/../misc/RespuestaJSON.php';

$dao = new UsuarioJuegoDAO();

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        try {
            $registros = $dao->obtenerTodos();
            RespuestaJSON::enviarRespuesta(200, "Registros encontrados", $registros);
        } catch (Exception $e) {
            RespuestaJSON::enviarError(500, $e->getMessage());
        }
        break;

    case 'POST':
        $datos = json_decode(file_get_contents("php://input"), true);
        if (isset($datos['idUsuario'], $datos['idJuego'], $datos['fechaAdquisicion'])) {
            try {
                $registro = new UsuarioJuego($datos['idUsuario'], $datos['idJuego'], $datos['fechaAdquisicion']);
                $insertado = $dao->insertar($registro);
                RespuestaJSON::enviarRespuesta(201, "Registro creado exitosamente", $insertado);
            } catch (Exception $e) {
                RespuestaJSON::enviarError(500, $e->getMessage());
            }
        } else {
            RespuestaJSON::enviarError(400, "Datos incompletos para crear usuario-juego");
        }
        break;

       case 'DELETE':
    $datos = json_decode(file_get_contents("php://input"), true);
    if (isset($datos['idUsuario'], $datos['idJuego'])) {
        try {
            $eliminado = $dao->eliminar($datos['idUsuario'], $datos['idJuego']);
            if ($eliminado) {
                RespuestaJSON::enviarRespuesta(200, "Registro eliminado exitosamente");
            } else {
                RespuestaJSON::enviarError(404, "Registro no encontrado para eliminar");
            }
        } catch (Exception $e) {
            RespuestaJSON::enviarError(500, $e->getMessage());
        }
    } else {
        RespuestaJSON::enviarError(400, "Faltan parámetros idUsuario o idJuego");
    }
    break;


       case 'PUT':
    $datos = json_decode(file_get_contents("php://input"), true);
    if (isset($datos['idUsuario'], $datos['idJuego'], $datos['fechaAdquisicion'])) {
        try {
            $registro = new UsuarioJuego($datos['idUsuario'], $datos['idJuego'], $datos['fechaAdquisicion']);
            $actualizado = $dao->actualizar($registro);
            if ($actualizado) {
                RespuestaJSON::enviarRespuesta(200, "Registro actualizado correctamente");
            } else {
                RespuestaJSON::enviarError(404, "Registro no encontrado o sin cambios");
            }
        } catch (Exception $e) {
            RespuestaJSON::enviarError(500, $e->getMessage());
        }
    } else {
        RespuestaJSON::enviarError(400, "Datos incompletos para actualizar usuario-juego");
    }
    break;


    default:
        RespuestaJSON::enviarError(405, "Método HTTP no permitido");
        break;
}
