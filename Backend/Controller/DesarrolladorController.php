<?php
require_once __DIR__ . '/../Model/Desarrollador.php';

require_once __DIR__ . '/../accessData/DesarrolladorDAO.php';
require_once __DIR__ . '/../misc/RespuestaJSON.php';

$dao = new DesarrolladorDAO();

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        if (isset($_GET['id'])) {
            try {
                $desarrollador = $dao->obtenerPorId($_GET['id']);
                if ($desarrollador) {
                    RespuestaJSON::enviarRespuesta(200, "Desarrollador encontrado", $desarrollador);
                } else {
                    RespuestaJSON::enviarError(404, "Desarrollador no encontrado");
                }
            } catch (Exception $e) {
                RespuestaJSON::enviarError(500, $e->getMessage());
            }
        } else {
            try {
                $todos = $dao->obtenerTodos();
                RespuestaJSON::enviarRespuesta(200, "Desarrolladores encontrados", $todos);
            } catch (Exception $e) {
                RespuestaJSON::enviarError(500, $e->getMessage());
            }
        }
        break;

    case 'POST':
        $datos = json_decode(file_get_contents("php://input"), true);
        if (isset($datos['nombre'], $datos['pais'], $datos['idUsuario'])) {
            try {
                $desarrollador = new Desarrollador(null, $datos['nombre'], $datos['pais'], $datos['idUsuario']);
                $insertado = $dao->insertar($desarrollador);
                RespuestaJSON::enviarRespuesta(201, "Desarrollador creado exitosamente", $insertado);
            } catch (Exception $e) {
                RespuestaJSON::enviarError(500, $e->getMessage());
            }
        } else {
            RespuestaJSON::enviarError(400, "Datos incompletos para crear desarrollador");
        }
        break;

 
        case 'DELETE':
            $datos = json_decode(file_get_contents("php://input"), true);
            if (isset($datos['idDesarrollador'])) {
                try {
                    $eliminado = $dao->eliminar($datos['idDesarrollador']);
                    if ($eliminado) {
                        RespuestaJSON::enviarRespuesta(200, "Desarrollador eliminado exitosamente");
                    } else {
                        RespuestaJSON::enviarError(404, "Desarrollador no encontrado para eliminar");
                    }
                } catch (Exception $e) {
                    RespuestaJSON::enviarError(500, $e->getMessage());
                }
            } else {
                RespuestaJSON::enviarError(400, "ID de desarrollador no proporcionado para eliminar");
            }
            break;






           case 'PUT':
        $datos = json_decode(file_get_contents("php://input"), true);
        if (isset($datos['idDesarrollador'], $datos['nombre'], $datos['pais'], $datos['idUsuario'])) {
            try {
                $desarrollador = new Desarrollador(
                    $datos['idDesarrollador'],
                    $datos['nombre'],
                    $datos['pais'],
                    $datos['idUsuario']
                );
                $actualizado = $dao->actualizar($desarrollador);
                RespuestaJSON::enviarRespuesta(200, "Desarrollador actualizado exitosamente", $actualizado);
            } catch (Exception $e) {
                RespuestaJSON::enviarError(500, $e->getMessage());
            }
        } else {
            RespuestaJSON::enviarError(400, "Datos incompletos para actualizar desarrollador");
        }
        break;







    default:
        RespuestaJSON::enviarError(405, "Método HTTP no permitido");
        break;
}
