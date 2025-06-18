<?php
require_once __DIR__ . '/../model/Categoria.php';
require_once __DIR__ . '/../accessData/CategoriaDAO.php';
require_once __DIR__ . '/../misc/RespuestaJSON.php';

$dao = new CategoriaDAO();

switch ($_SERVER['REQUEST_METHOD']) {

    // 🔍 Obtener todas las categorías o una por ID
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

    // 📝 Crear una nueva categoría
    case 'POST':
        $datos = json_decode(file_get_contents("php://input"), true);

        // Validación básica
        if (isset($datos['nombre'], $datos['idUsuario'])) {

            if (empty(trim($datos['nombre']))) {
                RespuestaJSON::enviarError(400, "El nombre de la categoría no puede estar vacío");
                exit();
            }

            if (!is_numeric($datos['idUsuario'])) {
                RespuestaJSON::enviarError(400, "El ID de usuario debe ser numérico");
                exit();
            }

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

    // ✏️ Actualizar una categoría existente
    case 'PUT':
        $datos = json_decode(file_get_contents("php://input"), true);

        if (isset($datos['idCategoria'], $datos['nombre'], $datos['idUsuario'])) {

            if (!is_numeric($datos['idCategoria']) || !is_numeric($datos['idUsuario'])) {
                RespuestaJSON::enviarError(400, "ID de categoría y usuario deben ser numéricos");
                exit();
            }

            if (empty(trim($datos['nombre']))) {
                RespuestaJSON::enviarError(400, "El nombre de la categoría no puede estar vacío");
                exit();
            }

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

    // 🗑 Eliminar una categoría por ID
    case 'DELETE':
        $datos = json_decode(file_get_contents("php://input"), true);

        if (isset($datos['idCategoria'])) {
            if (!is_numeric($datos['idCategoria'])) {
                RespuestaJSON::enviarError(400, "El ID de la categoría debe ser numérico");
                exit();
            }

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

    // 🚫 Método no permitido
    default:
        RespuestaJSON::enviarError(405, "Método HTTP no permitido");
        break;
}
