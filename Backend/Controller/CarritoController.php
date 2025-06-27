<?php
require_once __DIR__ . '/../Model/Carrito.php';
require_once __DIR__ . '/../accessData/CarritoDAO.php';
require_once __DIR__ . '/../misc/RespuestaJSON.php';

// Instancia del DAO para acceder a la base de datos
$dao = new CarritoDAO();

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        // Si se pasa un ID, obtener ese carrito, si no, obtener todos
        if (isset($_GET['id'])) {
            try {
                $carrito = $dao->obtenerPorId($_GET['id']);
                if ($carrito) {
                    RespuestaJSON::enviarRespuesta(200, "Carrito encontrado", $carrito);
                } else {
                    RespuestaJSON::enviarError(404, "Carrito no encontrado");
                }
            } catch (Exception $e) {
                RespuestaJSON::enviarError(500, $e->getMessage());
            }
        } else {
            try {
                $carritos = $dao->obtenerTodos();
                RespuestaJSON::enviarRespuesta(200, "Carritos encontrados", $carritos);
            } catch (Exception $e) {
                RespuestaJSON::enviarError(500, $e->getMessage());
            }
        }
        break;

case 'POST':
    $datos = json_decode(file_get_contents("php://input"), true);
    if (isset($datos['idUsuario'])) {
        try {
            if (isset($datos['fechaCreacion']) && $datos['fechaCreacion'] !== "") {
                $fechaCreacion = $datos['fechaCreacion'];
            } else {
                date_default_timezone_set('America/Costa_Rica');
                $fechaCreacion = date('Y-m-d H:i:s');
            }

            $carrito = new Carrito(null, $datos['idUsuario'], $fechaCreacion);
            $idGenerado = $dao->insertar($carrito); // ← importante capturar el ID

          
            RespuestaJSON::enviarRespuesta(201, [
                "mensaje" => "Carrito creado correctamente",
                "idCarrito" => $idGenerado
            ]);
        } catch (Exception $e) {
            RespuestaJSON::enviarError(400, $e->getMessage());
        }
    } else {
        RespuestaJSON::enviarError(400, "Datos incompletos para crear carrito");
    }
    break;


    case 'PUT':
        // Actualizar un carrito existente
        $datos = json_decode(file_get_contents("php://input"), true);
        if (isset($datos['idCarrito'], $datos['idUsuario'], $datos['fechaCreacion'])) {
            try {
                $carrito = new Carrito($datos['idCarrito'], $datos['idUsuario'], $datos['fechaCreacion']);
                $dao->actualizar($carrito);
                RespuestaJSON::enviarRespuesta(200, "Carrito actualizado correctamente");
            } catch (Exception $e) {
                RespuestaJSON::enviarError(400, $e->getMessage());
            }
        } else {
            RespuestaJSON::enviarError(400, "Datos incompletos para actualizar carrito");
        }
        break;

    case 'DELETE':
        // Eliminar un carrito por ID (por query string o body JSON)
        $datos = json_decode(file_get_contents("php://input"), true);
        if (isset($_GET['id'])) {
            $idCarrito = $_GET['id'];
        } elseif (isset($datos['idCarrito'])) {
            $idCarrito = $datos['idCarrito'];
        } else {
            RespuestaJSON::enviarError(400, "ID de carrito no proporcionado");
            break;
        }
        try {
            $dao->eliminar($idCarrito);
            RespuestaJSON::enviarRespuesta(200, "Carrito eliminado correctamente");
        } catch (Exception $e) {
            RespuestaJSON::enviarError(500, $e->getMessage());
        }
        break;

    default:
        RespuestaJSON::enviarError(405, "Método HTTP no permitido");
        break;
}
?>
