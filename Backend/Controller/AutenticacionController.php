<?php
require_once __DIR__ . '/../accessData/AutenticacionDAO.php';
require_once __DIR__ . '/../misc/RespuestaJSON.php';

$dao = new AutenticacionDAO();

switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST':
        $datos = json_decode(file_get_contents("php://input"), true);

        if (isset($datos['correo'], $datos['clave'])) {
            try {
                $usuario = $dao->validarCredenciales($datos['correo'], $datos['clave']);
                if ($usuario) {
                    RespuestaJSON::enviarRespuesta(200, "Autenticación exitosa", $usuario);
                } else {
                    RespuestaJSON::enviarError(401, "Credenciales inválidas");
                }
            } catch (Exception $e) {
                RespuestaJSON::enviarError(500, $e->getMessage());
            }
        } else {
            RespuestaJSON::enviarError(400, "Correo y clave son requeridos");
        }
        break;

    default:
        RespuestaJSON::enviarError(405, "Método no permitido");
        break;
}
?>
