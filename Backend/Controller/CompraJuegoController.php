<?php
require_once __DIR__ . '/../Model/CompraJuego.php';
require_once __DIR__ . '/../accessData/CompraJuegoDAO.php';
require_once __DIR__ . '/../misc/RespuestaJSON.php';

$dao = new CompraJuegoDAO();

switch ($_SERVER['REQUEST_METHOD']) {

    case 'GET':
        if (isset($_GET['idCompra'], $_GET['idJuego'])) {
            try {
                $registro = $dao->obtenerPorId($_GET['idCompra'], $_GET['idJuego']);
                if ($registro) {
                    RespuestaJSON::enviarRespuesta(200, "CompraJuego encontrado", $registro);
                } else {
                    RespuestaJSON::enviarError(404, "CompraJuego no encontrado");
                }
            } catch (Exception $e) {
                RespuestaJSON::enviarError(500, $e->getMessage());
            }
        } else {
            try {
                $lista = $dao->obtenerTodos();
                RespuestaJSON::enviarRespuesta(200, "CompraJuegos encontrados", $lista);
            } catch (Exception $e) {
                RespuestaJSON::enviarError(500, $e->getMessage());
            }
        }
        break;

    case 'POST':
        $datos = json_decode(file_get_contents("php://input"), true);

        if (isset($datos['idCompra'], $datos['idJuego'], $datos['precioUnitario'], $datos['porcentajeDescuento'], $datos['cantidad'])) {
            try {
                $descuento = $datos['precioUnitario'] * ($datos['porcentajeDescuento'] / 100);
                $subtotal = ($datos['precioUnitario'] - $descuento) * $datos['cantidad'];

                $compraJuego = new CompraJuego(
                    $datos['idCompra'],
                    $datos['idJuego'],
                    $datos['precioUnitario'],
                    $datos['porcentajeDescuento'],
                    $datos['cantidad'],
                    $subtotal,
                    $datos['idPromocion'] ?? null
                );

                $ok = $dao->insertar($compraJuego);
                RespuestaJSON::enviarRespuesta(201, "CompraJuego registrado", $ok);
            } catch (Exception $e) {
                RespuestaJSON::enviarError(500, $e->getMessage());
            }
        } else {
            RespuestaJSON::enviarError(400, "Datos incompletos para registrar CompraJuego");
        }
        break;

    case 'PUT':
    $datos = json_decode(file_get_contents("php://input"), true);

    if (isset($datos['idCompra'], $datos['idJuego'], $datos['precioUnitario'], $datos['porcentajeDescuento'], $datos['cantidad'])) {
        try {
            $descuento = $datos['precioUnitario'] * ($datos['porcentajeDescuento'] / 100);
            $subtotal = ($datos['precioUnitario'] - $descuento) * $datos['cantidad'];

            $compraJuego = new CompraJuego(
                $datos['idCompra'],
                $datos['idJuego'],
                $datos['precioUnitario'],
                $datos['porcentajeDescuento'],
                $datos['cantidad'],
                $subtotal,
                $datos['idPromocion'] ?? null
            );

            $ok = $dao->actualizar($datos['idCompra'], $datos['idJuego'], $compraJuego);
            if ($ok) {
                RespuestaJSON::enviarRespuesta(200, "CompraJuego actualizado");
            } else {
                RespuestaJSON::enviarError(404, "CompraJuego no encontrado para actualizar");
            }
        } catch (Exception $e) {
            RespuestaJSON::enviarError(500, $e->getMessage());
        }
    } else {
        RespuestaJSON::enviarError(400, "Datos incompletos para actualizar CompraJuego");
    }
    break;

    case 'DELETE':
        $datos = json_decode(file_get_contents("php://input"), true);

        if (isset($datos['idCompra'], $datos['idJuego'])) {
            try {
                $ok = $dao->eliminar($datos['idCompra'], $datos['idJuego']);
                if ($ok) {
                    RespuestaJSON::enviarRespuesta(200, "CompraJuego eliminado");
                } else {
                    RespuestaJSON::enviarError(404, "CompraJuego no encontrado para eliminar");
                }
            } catch (Exception $e) {
                RespuestaJSON::enviarError(500, $e->getMessage());
            }
        } else {
            RespuestaJSON::enviarError(400, "ID de compra y juego requeridos para eliminar");
        }
        break;

    default:
        RespuestaJSON::enviarError(405, "Método HTTP no permitido");
        break;
}
