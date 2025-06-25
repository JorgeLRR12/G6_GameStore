<?php
require_once __DIR__ . '/../Model/Usuario.php';
require_once __DIR__ . '/../accessData/UsuarioDAO.php';
require_once __DIR__ . '/../misc/RespuestaJSON.php';

$dao = new UsuarioDAO();

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        if (isset($_GET['id'])) {
            try {
                $usuario = $dao->obtenerPorId($_GET['id']);
                if ($usuario) {
                    RespuestaJSON::enviarRespuesta(200, "Usuario encontrado", $usuario);
                } else {
                    RespuestaJSON::enviarError(404, "Usuario no encontrado");
                }
            } catch (Exception $e) {
                RespuestaJSON::enviarError(500, $e->getMessage());
            }
        } else {
            try {
                $usuarios = $dao->obtenerTodos();
                RespuestaJSON::enviarRespuesta(200, "Usuarios encontrados", $usuarios);
            } catch (Exception $e) {
                RespuestaJSON::enviarError(500, $e->getMessage());
            }
        }
        break;

    case 'POST':
        $datos = json_decode(file_get_contents("php://input"), true);
        if (isset($datos['nombre'], $datos['correo'], $datos['clave'], $datos['fechaNacimiento'], $datos['rol'])) {
           
            // Validamos que el formato del correo sea correcto
            if (!filter_var($datos['correo'], FILTER_VALIDATE_EMAIL)) {
                RespuestaJSON::enviarError(400, "Formato de correo inválido");
                exit();
            }

            // Validamos que la clave tenga al menos 6 caracteres
            if (strlen($datos['clave']) < 6) {
                RespuestaJSON::enviarError(400, "La clave debe tener al menos 6 caracteres");
                exit();
            }
            try {
                $usuario = new Usuario(null, $datos['nombre'], $datos['correo'], $datos['clave'], $datos['fechaNacimiento'], $datos['rol']);
                $dao->insertar($usuario);
                RespuestaJSON::enviarRespuesta(201, "Usuario creado correctamente");
            } catch (Exception $e) {
                RespuestaJSON::enviarError(500, $e->getMessage());
            }
        } else {
            RespuestaJSON::enviarError(400, "Datos incompletos para crear usuario");
        }
        break;

    case 'PUT':
        $datos = json_decode(file_get_contents("php://input"), true);
        if (isset($datos['idUsuario'], $datos['nombre'], $datos['correo'], $datos['clave'], $datos['fechaNacimiento'], $datos['rol'])) {
            try {
                $usuario = new Usuario($datos['idUsuario'], $datos['nombre'], $datos['correo'], $datos['clave'], $datos['fechaNacimiento'], $datos['rol']);
                $dao->actualizar($usuario);
                RespuestaJSON::enviarRespuesta(200, "Usuario actualizado correctamente");
            } catch (Exception $e) {
                RespuestaJSON::enviarError(500, $e->getMessage());
            }
        } else {
            RespuestaJSON::enviarError(400, "Datos incompletos para actualizar usuario");
        }
        break;

    case 'DELETE':
        $datos = json_decode(file_get_contents("php://input"), true);
        if (isset($datos['idUsuario'])) {
            try {
                $dao->eliminar($datos['idUsuario']);
                RespuestaJSON::enviarRespuesta(200, "Usuario eliminado correctamente");
            } catch (Exception $e) {
                RespuestaJSON::enviarError(500, $e->getMessage());
            }
        } else {
            RespuestaJSON::enviarError(400, "ID de usuario no proporcionado");
        }
        break;

    default:
        RespuestaJSON::enviarError(405, "Método HTTP no permitido");
        break;
}
?>
