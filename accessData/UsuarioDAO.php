<?php
require_once "Conexion.php";
require_once __DIR__ . '/../model/Usuario.php';

class UsuarioDAO {
    public static function obtenerTodos() {
        try {
            $conexion = Conexion::conectar();
            $sql = "SELECT * FROM G6_usuarios";
            $stmt = $conexion->prepare($sql);
            $stmt->execute();
            $resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $usuarios = [];
            foreach ($resultados as $fila) {
                $usuarios[] = new Usuario(
                    $fila['idUsuario'],
                    $fila['nombre'],
                    $fila['correo'],
                    $fila['clave'],
                    $fila['fechaNacimiento'],
                    $fila['fechaRegistro'],
                    $fila['rol']
                );
            }
            return $usuarios;
        } catch (PDOException $e) {
            throw new Exception("Error al obtener usuarios: " . $e->getMessage());
        }
    }

    public static function obtenerPorId($id) {
        try {
            $conexion = Conexion::conectar();
            $sql = "SELECT * FROM G6_usuarios WHERE idUsuario = ?";
            $stmt = $conexion->prepare($sql);
            $stmt->execute([$id]);
            $fila = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($fila) {
                return new Usuario(
                    $fila['idUsuario'],
                    $fila['nombre'],
                    $fila['correo'],
                    $fila['clave'],
                    $fila['fechaNacimiento'],
                    $fila['fechaRegistro'],
                    $fila['rol']
                );
            }
            return null;
        } catch (PDOException $e) {
            throw new Exception("Error al obtener usuario por ID: " . $e->getMessage());
        }
    }

    public static function insertar(Usuario $usuario) {
        try {
            $conexion = Conexion::conectar();
            $sql = "INSERT INTO G6_usuarios (nombre, correo, clave, fechaNacimiento, rol) VALUES (?, ?, ?, ?, ?)";
            $stmt = $conexion->prepare($sql);
            return $stmt->execute([
                $usuario->getNombre(),
                $usuario->getCorreo(),
                $usuario->getClave(),
                $usuario->getFechaNacimiento(),
                $usuario->getRol()
            ]);
        } catch (PDOException $e) {
            throw new Exception("Error al insertar usuario: " . $e->getMessage());
        }
    }

    public static function actualizar(Usuario $usuario) {
        try {
            $conexion = Conexion::conectar();
            $sql = "UPDATE g6_usuarios SET nombre = ?, correo = ?, clave = ?, fechaNacimiento = ?, rol = ? WHERE idUsuario = ?";
            $stmt = $conexion->prepare($sql);
            return $stmt->execute([
                $usuario->getNombre(),
                $usuario->getCorreo(),
                $usuario->getClave(),
                $usuario->getFechaNacimiento(),
                $usuario->getRol(),
                $usuario->getIdUsuario()
            ]);
        } catch (PDOException $e) {
            throw new Exception("Error al actualizar usuario: " . $e->getMessage());
        }
    }

    public static function eliminar($idUsuario) {
    try {
        $conexion = Conexion::conectar();
        $sql = "DELETE FROM G6_usuarios WHERE idUsuario = :idUsuario";
        $stmt = $conexion->prepare($sql);
        $stmt->bindParam(':idUsuario', $idUsuario, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->rowCount() > 0;
    } catch (PDOException $e) {
        throw new Exception("Error al eliminar el usuario: " . $e->getMessage());
    }
   }


}
