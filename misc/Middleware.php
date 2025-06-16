<?php

class Middleware {
    // Verifica si el token JWT existe y es válido
    public static function autenticar() {
        if (!isset($_SERVER['HTTP_AUTHORIZATION'])) {
            http_response_code(401);
            echo json_encode(["error" => "No se proporcionó token de autenticación"]);
            exit();
        }

        $token = trim(str_replace("Bearer", "", $_SERVER['HTTP_AUTHORIZATION']));

        // Aquí puedes verificar el token JWT manualmente o usando una librería externa.
        // Por simplicidad, este ejemplo usa un "token falso"
        if ($token !== "TOKEN_DE_EJEMPLO") {
            http_response_code(403);
            echo json_encode(["error" => "Token inválido o expirado"]);
            exit();
        }

        // Si se desea, se puede retornar información del usuario autenticado
        return true;
    }

    // Verifica si el usuario tiene el rol necesario
    public static function autorizar($rolRequerido, $rolUsuario) {
        if ($rolRequerido !== $rolUsuario) {
            http_response_code(403);
            echo json_encode(["error" => "Acceso denegado. Rol insuficiente."]);
            exit();
        }
    }
}
