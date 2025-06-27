<?php
require_once __DIR__ . '/../Model/CarritoJuego.php';
require_once __DIR__ . '/../accessData/CarritoJuegoDAO.php';
require_once __DIR__ . '/../misc/RespuestaJSON.php';

// Instancia del DAO para acceder a la base de datos
$dao = new CarritoJuegoDAO();

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        // Obtener todos, uno específico, o todos los juegos de un carrito
        if (isset($_GET['idCarrito']) && isset($_GET['idJuego'])) {
            try {
                $registro = $dao->obtenerPorId($_GET['idCarrito'], $_GET['idJuego']);
                if ($registro) {
                    RespuestaJSON::enviarRespuesta(200, "Registro encontrado", $registro);
                } else {
                    RespuestaJSON::enviarError(404, "Registro no encontrado");
                }
            } catch (Exception $e) {
                RespuestaJSON::enviarError(500, $e->getMessage());
            }
        } elseif (isset($_GET['idCarrito'])) {
            try {
                $registros = $dao->obtenerPorCarrito($_GET['idCarrito']);
                RespuestaJSON::enviarRespuesta(200, "Juegos del carrito encontrados", $registros);
            } catch (Exception $e) {
                RespuestaJSON::enviarError(500, $e->getMessage());
            }
        } else {
            try {
                $registros = $dao->obtenerTodos();
                RespuestaJSON::enviarRespuesta(200, "Registros encontrados", $registros);
            } catch (Exception $e) {
                RespuestaJSON::enviarError(500, $e->getMessage());
            }
        }
        break;

    case 'POST':
        // Agregar un juego a un carrito
        $datos = json_decode(file_get_contents("php://input"), true);
        if (isset($datos['idCarrito'], $datos['idJuego'])) {
            try {
                // Si no se manda fecha, usar la fecha y hora local actual
                if (isset($datos['fechaAgregado']) && $datos['fechaAgregado'] !== "") {
                    $fechaAgregado = $datos['fechaAgregado'];
                } else {
                    date_default_timezone_set('America/Costa_Rica'); // Cambia a tu zona horaria local
                    $fechaAgregado = date('Y-m-d H:i:s');
                }
                $carritoJuego = new CarritoJuego($datos['idCarrito'], $datos['idJuego'], $fechaAgregado);
                $dao->insertar($carritoJuego);
                RespuestaJSON::enviarRespuesta(201, "Juego agregado al carrito correctamente");
            } catch (Exception $e) {
                RespuestaJSON::enviarError(400, $e->getMessage());
            }
        } else {
            RespuestaJSON::enviarError(400, "Datos incompletos para agregar juego al carrito");
        }
        break;

case 'DELETE':
    $datos = json_decode(file_get_contents("php://input"), true);

    // Si solo viene el idCarrito, eliminar todo lo del carrito
    if (isset($datos['idCarrito']) && !isset($datos['idJuego'])) {
        $idCarrito = $datos['idCarrito'];
        try {
            $dao->eliminarTodoDelCarrito($idCarrito); // ⚠️ Asegúrate que este método exista
            RespuestaJSON::enviarRespuesta(200, "Todos los juegos del carrito fueron eliminados");
        } catch (Exception $e) {
            RespuestaJSON::enviarError(500, $e->getMessage());
        }
        break;
    }

    // Eliminar un juego específico
    if (isset($_GET['idCarrito'], $_GET['idJuego'])) {
        $idCarrito = $_GET['idCarrito'];
        $idJuego = $_GET['idJuego'];
    } elseif (isset($datos['idCarrito'], $datos['idJuego'])) {
        $idCarrito = $datos['idCarrito'];
        $idJuego = $datos['idJuego'];
    } else {
        RespuestaJSON::enviarError(400, "Faltan parámetros idCarrito o idJuego");
        break;
    }

    try {
        $dao->eliminar($idCarrito, $idJuego);
        RespuestaJSON::enviarRespuesta(200, "Juego eliminado del carrito correctamente");
    } catch (Exception $e) {
        RespuestaJSON::enviarError(500, $e->getMessage());
    }
    break;


?>
