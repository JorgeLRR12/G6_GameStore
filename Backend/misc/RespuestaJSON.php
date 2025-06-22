<?php

class RespuestaJSON {

    // Enviar respuesta exitosa con código, mensaje y datos opcionales
    public static function enviarRespuesta($codigo, $mensaje, $datos = null) {
        http_response_code($codigo);
        $respuesta = [
            "codigo" => $codigo,
            "mensaje" => $mensaje
        ];

        if (!is_null($datos)) {
            $respuesta["datos"] = $datos;
        }

        header('Content-Type: application/json');
        echo json_encode($respuesta, JSON_UNESCAPED_UNICODE);
        exit();
    }

    // Enviar respuesta de error con código y mensaje
    public static function enviarError($codigo, $mensaje) {
        http_response_code($codigo);
        $respuesta = [
            "codigo" => $codigo,
            "mensaje" => $mensaje
        ];

        header('Content-Type: application/json');
        echo json_encode($respuesta, JSON_UNESCAPED_UNICODE);
        exit();
    }
}
