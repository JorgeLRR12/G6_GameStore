<?php
require_once __DIR__ . '/../model/Categoria.php';
require_once __DIR__ . '/../accessData/CategoriaDAO.php';
require_once __DIR__ . '/../misc/RespuestaJSON.php';

$dao = new CategoriaDAO();

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        if (isset($_GET['id'])) {
            try {
                $categoria = $dao->obtenerPorId($_GET['id']);
                if ($categoria) {
                    RespuestaJSON::enviarRespuesta(200, "Categoría encontrada", $categoria);
                } else {
                    RespuestaJSON::enviarError(404, "Categoría no encontrada");
                }
            } catch (Exception $e) {
                RespuestaJSON::enviarError(500, $e->getMessage());
            }
        } else {
            try {
                $categorias = $dao->obtenerTodos();
                RespuestaJSON::enviarRespuesta(200, "Categorías encontradas", $categorias);
            } catch (Exception $e) {
                RespuestaJSON::enviarError(500, $e->getMessage());
            }
        }
        break;

    case 'POST':
        $datos = json_decode(file_get_contents("php://input"), true);
        if (isset($datos['nombre'], $datos['idUsuario'])) {
            try {
                $categoria = new Categoria(null, $datos['nombre'], $datos['idUsuario']);
                $dao->insertar($categoria);
                RespuestaJSON::enviarRespuesta(201, "Categoría creada correctamente");
            } catch (Exception $e) {
                RespuestaJSON::enviarError(500, $e->getMessage());
            }
        } else {
            RespuestaJSON::enviarError(400, "Datos incompletos para crear categoría");
        }
        break;

    case 'PUT':
        $datos = json_decode(file_get_contents("php://input"), true);
        if (isset($datos['idCategoria'], $datos['nombre'], $datos['idUsuario'])) {
            try {
                $categoria = new Categoria($datos['idCategoria'], $datos['nombre'], $datos['idUsuario']);
                $dao->actualizar($categoria);
                RespuestaJSON::enviarRespuesta(200, "Categoría actualizada correctamente");
            } catch (Exception $e) {
                RespuestaJSON::enviarError(500, $e->getMessage());
            }
        } else {
            RespuestaJSON::enviarError(400, "Datos incompletos para actualizar categoría");
        }
        break;

    case 'DELETE':
        $datos = json_decode(file_get_contents("php://input"), true);
        if (isset($datos['idCategoria'])) {
            try {
                $dao->eliminar($datos['idCategoria']);
                RespuestaJSON::enviarRespuesta(200, "Categoría eliminada correctamente");
            } catch (Exception $e) {
                RespuestaJSON::enviarError(500, $e->getMessage());
            }
        } else {
            RespuestaJSON::enviarError(400, "ID de categoría no proporcionado");
        }
        break;

    default:
        RespuestaJSON::enviarError(405, "Método HTTP no permitido");
        break;
}
