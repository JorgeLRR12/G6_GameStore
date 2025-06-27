<?php
require_once __DIR__ . '/../Model/Compra.php';
require_once __DIR__ . '/../accessData/CompraDAO.php';
require_once __DIR__ . '/../misc/RespuestaJSON.php';

$dao = new CompraDAO();

switch ($_SERVER['REQUEST_METHOD']) {

    case 'GET':
        if (isset($_GET['id'])) {
            try {
                $compra = $dao->obtenerPorId($_GET['id']);
                if ($compra) {
                    RespuestaJSON::enviarRespuesta(200, "Compra encontrada", $compra);
                } else {
                    RespuestaJSON::enviarError(404, "Compra no encontrada");
                }
            } catch (Exception $e) {
                RespuestaJSON::enviarError(500, $e->getMessage());
            }
        } else {
            try {
                $lista = $dao->obtenerTodos();
                RespuestaJSON::enviarRespuesta(200, "Compras encontradas", $lista);
            } catch (Exception $e) {
                RespuestaJSON::enviarError(500, $e->getMessage());
            }
        }
        break;

    case 'GET':
        if (isset($_GET['detallado'])) {
            $respuesta = $compraDAO->obtenerComprasDetalladas();
        } elseif (isset($_GET['idCompra'])) {
            $respuesta = $compraDAO->obtenerPorId($_GET['idCompra']);
        } else {
            $respuesta = $compraDAO->obtenerTodos();
        }
    break;


    case 'POST':
        $datos = json_decode(file_get_contents("php://input"), true);

        if (isset($datos['idUsuario'], $datos['total'])) {
            try {
                $compra = new Compra($datos['idUsuario'], $datos['total']);
                $id = $dao->insertar($compra);
                RespuestaJSON::enviarRespuesta(201, "Compra creada", ["idCompra" => $id]);
            } catch (Exception $e) {
                RespuestaJSON::enviarError(500, $e->getMessage());
            }
        } else {
            RespuestaJSON::enviarError(400, "Datos incompletos para crear compra");
        }
    break;

    case 'PUT':
    $datos = json_decode(file_get_contents("php://input"), true);

    if (isset($datos['idCompra'], $datos['idUsuario'], $datos['total'])) {
        try {
            $compra = new Compra($datos['idUsuario'], $datos['total'], $datos['idCompra']);
            $ok = $dao->actualizar($datos['idCompra'], $compra);
            if ($ok) {
                RespuestaJSON::enviarRespuesta(200, "Compra actualizada");
            } else {
                RespuestaJSON::enviarError(404, "Compra no encontrada para actualizar");
            }
        } catch (Exception $e) {
            RespuestaJSON::enviarError(500, $e->getMessage());
        }
    } else {
        RespuestaJSON::enviarError(400, "Datos incompletos para actualizar compra");
    }
    break;

    case 'DELETE':
        $datos = json_decode(file_get_contents("php://input"), true);

        if (isset($datos['idCompra'])) {
            try {
                $ok = $dao->eliminar($datos['idCompra']);
                if ($ok) {
                    RespuestaJSON::enviarRespuesta(200, "Compra eliminada");
                } else {
                    RespuestaJSON::enviarError(404, "Compra no encontrada para eliminar");
                }
            } catch (Exception $e) {
                RespuestaJSON::enviarError(500, $e->getMessage());
            }
        } else {
            RespuestaJSON::enviarError(400, "ID de compra no proporcionado para eliminar");
        }
        break;

    default:
        RespuestaJSON::enviarError(405, "Método HTTP no permitido");
        break;
}
