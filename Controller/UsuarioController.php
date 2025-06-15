<?php
require_once __DIR__ . '/../model/Usuario.php';
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
            try {
                $usuario = new Usuario(null, $datos['nombre'], $datos['correo'], $datos['clave'], $datos['fechaNacimiento'], null, $datos['rol']);
                $insertado = $dao->insertar($usuario);
                RespuestaJSON::enviarRespuesta(201, "Usuario creado exitosamente", $insertado);
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
                $usuario = new Usuario($datos['idUsuario'], $datos['nombre'], $datos['correo'], $datos['clave'], $datos['fechaNacimiento'], null, $datos['rol']);
                $actualizado = $dao->actualizar($usuario);
                if ($actualizado) {
                    RespuestaJSON::enviarRespuesta(200, "Usuario actualizado exitosamente");
                } else {
                    RespuestaJSON::enviarError(404, "Usuario no encontrado para actualizar");
                }
            } catch (Exception $e) {
                RespuestaJSON::enviarError(500, $e->getMessage());
            }
        } else {
            RespuestaJSON::enviarError(400, "Datos incompletos para actualizar usuario");
        }
        break;

    case 'DELETE':
        if (isset($_GET['id'])) {
            try {
                $eliminado = $dao->eliminar($_GET['id']);
                if ($eliminado) {
                    RespuestaJSON::enviarRespuesta(200, "Usuario eliminado exitosamente");
                } else {
                    RespuestaJSON::enviarError(404, "Usuario no encontrado para eliminar");
                }
            } catch (Exception $e) {
                RespuestaJSON::enviarError(500, $e->getMessage());
            }
        } else {
            RespuestaJSON::enviarError(400, "ID de usuario no proporcionado para eliminar");
        }
        break;

    default:
        RespuestaJSON::enviarError(405, "Método HTTP no permitido");
        break;
}
