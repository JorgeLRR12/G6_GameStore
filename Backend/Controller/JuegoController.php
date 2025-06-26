<?php
require_once __DIR__ . '/../Model/Juego.php';
require_once __DIR__ . '/../accessData/JuegoDAO.php';
require_once __DIR__ . '/../misc/RespuestaJSON.php';

$dao = new JuegoDAO();

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        if (isset($_GET['id'])) {
            try {
                $juego = $dao->obtenerPorId($_GET['id']);
                if ($juego) {
                    RespuestaJSON::enviarRespuesta(200, "Juego encontrado", $juego);
                } else {
                    RespuestaJSON::enviarError(404, "Juego no encontrado");
                }
            } catch (Exception $e) {
                RespuestaJSON::enviarError(500, $e->getMessage());
            }
        } else {
            try {
                $juegos = $dao->obtenerTodos();
                RespuestaJSON::enviarRespuesta(200, "Juegos encontrados", $juegos);
            } catch (Exception $e) {
                RespuestaJSON::enviarError(500, $e->getMessage());
            }
        }
        break;

    case 'POST':
        $datos = json_decode(file_get_contents("php://input"), true);
        if (isset($datos['nombre'], $datos['descripcion'], $datos['precio'], $datos['fechaLanzamiento'],
                  $datos['clasificacionEdad'], $datos['idCategoria'], $datos['idUsuario'], $datos['imagen'])) {
            try {
                $juego = new Juego(null, $datos['nombre'], $datos['descripcion'], $datos['precio'],
                                $datos['fechaLanzamiento'], $datos['clasificacionEdad'],
                                $datos['idCategoria'], $datos['idUsuario'], $datos['imagen']);
                $insertado = $dao->insertar($juego);
                RespuestaJSON::enviarRespuesta(201, "Juego creado exitosamente", $insertado);
            } catch (Exception $e) {
                RespuestaJSON::enviarError(500, $e->getMessage());
            }
        } else {
            RespuestaJSON::enviarError(400, "Datos incompletos para crear juego");
        }
        break;

          case 'DELETE':
    $datos = json_decode(file_get_contents("php://input"), true);
    if (isset($datos['idJuego'])) {
        try {
            $eliminado = $dao->eliminar($datos['idJuego']);
            if ($eliminado) {
                RespuestaJSON::enviarRespuesta(200, "Juego eliminado exitosamente");
            } else {
                RespuestaJSON::enviarError(404, "Juego no encontrado para eliminar");
            }
        } catch (Exception $e) {
            RespuestaJSON::enviarError(500, $e->getMessage());
        }
    } else {
        RespuestaJSON::enviarError(400, "ID de juego no proporcionado para eliminar");
    }
    break;


 

     case 'PUT':
    $datos = json_decode(file_get_contents("php://input"), true);
    if (isset($datos['idJuego'], $datos['nombre'], $datos['descripcion'], $datos['precio'],
              $datos['fechaLanzamiento'], $datos['clasificacionEdad'], $datos['idCategoria'], $datos['idUsuario'], $datos['imagen'])) {
        try {
            $juego = new Juego(
                $datos['idJuego'],
                $datos['nombre'],
                $datos['descripcion'],
                $datos['precio'],
                $datos['fechaLanzamiento'],
                $datos['clasificacionEdad'],
                $datos['idCategoria'],
                $datos['idUsuario'],
                $datos['imagen']
            );

            $actualizado = $dao->actualizar($juego);
            RespuestaJSON::enviarRespuesta(200, "Juego actualizado exitosamente", $actualizado);
        } catch (Exception $e) {
            RespuestaJSON::enviarError(500, $e->getMessage());
        }
    } else {
        RespuestaJSON::enviarError(400, "Datos incompletos para actualizar juego");
    }
    break;



    default:
        RespuestaJSON::enviarError(405, "Método HTTP no permitido");
        break;


}
