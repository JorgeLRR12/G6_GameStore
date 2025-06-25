<?php
require_once __DIR__ . '/../Model/JuegoDesarrollador.php';
require_once __DIR__ . '/../accessData/JuegoDesarrolladorDAO.php';
require_once __DIR__ . '/../misc/RespuestaJSON.php';

// Instancia del DAO para acceder a la base de datos
$dao = new JuegoDesarrolladorDAO();

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        // Obtener una relación específica si se pasan ambos IDs, si no, obtener todas
        if (isset($_GET['idJuego']) && isset($_GET['idDesarrollador'])) {
            try {
                $relacion = $dao->obtenerPorId($_GET['idJuego'], $_GET['idDesarrollador']);
                if ($relacion) {
                    RespuestaJSON::enviarRespuesta(200, "Relación encontrada", $relacion);
                } else {
                    RespuestaJSON::enviarError(404, "Relación no encontrada");
                }
            } catch (Exception $e) {
                RespuestaJSON::enviarError(500, $e->getMessage());
            }
        } else {
            try {
                $relaciones = $dao->obtenerTodos();
                RespuestaJSON::enviarRespuesta(200, "Relaciones encontradas", $relaciones);
            } catch (Exception $e) {
                RespuestaJSON::enviarError(500, $e->getMessage());
            }
        }
        break;

    case 'POST':
        // Crear una nueva relación entre juego y desarrollador
        $datos = json_decode(file_get_contents("php://input"), true);
        if (isset($datos['idJuego'], $datos['idDesarrollador'])) {
            try {
                $relacion = new JuegoDesarrollador($datos['idJuego'], $datos['idDesarrollador']);
                $dao->insertar($relacion);
                RespuestaJSON::enviarRespuesta(201, "Relación creada correctamente");
            } catch (Exception $e) {
                RespuestaJSON::enviarError(400, $e->getMessage());
            }
        } else {
            RespuestaJSON::enviarError(400, "Datos incompletos para crear relación");
        }
        break;

    case 'PUT':
        // Permitir actualizar por body JSON o por query string
        $datos = json_decode(file_get_contents("php://input"), true);
        // Si vienen por JSON
        if (
            isset($datos['idJuegoOld'], $datos['idDesarrolladorOld'], $datos['idJuegoNew'], $datos['idDesarrolladorNew'])
        ) {
            $idJuegoViejo = $datos['idJuegoOld'];
            $idDesarrolladorViejo = $datos['idDesarrolladorOld'];
            $idJuegoNuevo = $datos['idJuegoNew'];
            $idDesarrolladorNuevo = $datos['idDesarrolladorNew'];
        }
        // Si vienen por query string
        elseif (
            isset($_GET['idJuegoOld'], $_GET['idDesarrolladorOld'], $_GET['idJuegoNew'], $_GET['idDesarrolladorNew'])
        ) {
            $idJuegoViejo = $_GET['idJuegoOld'];
            $idDesarrolladorViejo = $_GET['idDesarrolladorOld'];
            $idJuegoNuevo = $_GET['idJuegoNew'];
            $idDesarrolladorNuevo = $_GET['idDesarrolladorNew'];
        } else {
            RespuestaJSON::enviarError(400, "Datos incompletos para actualizar relación");
            break;
        }
        try {
            $dao->actualizar($idJuegoViejo, $idDesarrolladorViejo, $idJuegoNuevo, $idDesarrolladorNuevo);
            RespuestaJSON::enviarRespuesta(200, "Relación actualizada correctamente");
        } catch (Exception $e) {
            RespuestaJSON::enviarError(400, $e->getMessage());
        }
        break;

    case 'DELETE':
        // Permitir eliminar por query string o por body JSON
        $datos = json_decode(file_get_contents("php://input"), true);
        if (isset($_GET['idJuego'], $_GET['idDesarrollador'])) {
            $idJuego = $_GET['idJuego'];
            $idDesarrollador = $_GET['idDesarrollador'];
        } elseif (isset($datos['idJuego'], $datos['idDesarrollador'])) {
            $idJuego = $datos['idJuego'];
            $idDesarrollador = $datos['idDesarrollador'];
        } else {
            RespuestaJSON::enviarError(400, "Faltan parámetros idJuego o idDesarrollador");
            break;
        }
        try {
            $dao->eliminar($idJuego, $idDesarrollador);
            RespuestaJSON::enviarRespuesta(200, "Relación eliminada correctamente");
        } catch (Exception $e) {
            RespuestaJSON::enviarError(500, $e->getMessage());
        }
        break;

    default:
        RespuestaJSON::enviarError(405, "Método HTTP no permitido");
        break;
}
?>