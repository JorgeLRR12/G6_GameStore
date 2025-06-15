<?php
require_once __DIR__ . '/../model/Usuario.php';
require_once __DIR__ . '/../accessData/UsuarioDAO.php';
require_once __DIR__ . '/../misc/RespuestaJSON.php';

class UsuarioController {

    private $dao;

    public function __construct() {
        $this->dao = new UsuarioDAO();
    }

    public function obtenerTodos() {
        try {
            $usuarios = $this->dao->obtenerTodos();
            RespuestaJSON::enviarRespuesta(200, "Usuarios encontrados", $usuarios);
        } catch (Exception $e) {
            RespuestaJSON::enviarError(500, $e->getMessage());
        }
    }

    public function obtenerPorId($id) {
        try {
            $usuario = $this->dao->obtenerPorId($id);
            if ($usuario) {
                RespuestaJSON::enviarRespuesta(200, "Usuario encontrado", $usuario);
            } else {
                RespuestaJSON::enviarError(404, "Usuario no encontrado");
            }
        } catch (Exception $e) {
            RespuestaJSON::enviarError(500, $e->getMessage());
        }
    }

    public function insertar($datos) {
        if (isset($datos['nombre'], $datos['correo'], $datos['clave'], $datos['fechaNacimiento'], $datos['rol'])) {
            try {
                $usuario = new Usuario(null, $datos['nombre'], $datos['correo'], $datos['clave'], $datos['fechaNacimiento'], null, $datos['rol']);
                $this->dao->insertar($usuario);
                RespuestaJSON::enviarRespuesta(201, "Usuario creado exitosamente");
            } catch (Exception $e) {
                RespuestaJSON::enviarError(500, $e->getMessage());
            }
        } else {
            RespuestaJSON::enviarError(400, "Datos incompletos para crear usuario");
        }
    }

    public function actualizar($datos) {
        if (isset($datos['idUsuario'], $datos['nombre'], $datos['correo'], $datos['clave'], $datos['fechaNacimiento'], $datos['rol'])) {
            try {
                $usuario = new Usuario($datos['idUsuario'], $datos['nombre'], $datos['correo'], $datos['clave'], $datos['fechaNacimiento'], null, $datos['rol']);
                $actualizado = $this->dao->actualizar($usuario);
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
    }

    public function eliminar($id) {
        try {
            $eliminado = $this->dao->eliminar($id);
            if ($eliminado) {
                RespuestaJSON::enviarRespuesta(200, "Usuario eliminado exitosamente");
            } else {
                RespuestaJSON::enviarError(404, "Usuario no encontrado para eliminar");
            }
        } catch (Exception $e) {
            RespuestaJSON::enviarError(500, "Error al eliminar usuario: " . $e->getMessage());
        }
    }
}
?>
