<?php
require_once __DIR__ . '/../misc/Conexion.php';
require_once __DIR__ . '/../Model/Usuario.php';

class UsuarioDAO {

    public function obtenerTodos() {
        $pdo = Conexion::conectar();
        try {
            $sql = "SELECT * FROM G6_usuarios";
            $stmt = $pdo->query($sql);

            $usuarios = [];
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $usuarios[] = [
                    'idUsuario' => $row['idUsuario'],
                    'nombre' => $row['nombre'],
                    'correo' => $row['correo'],
                    'clave' => $row['clave'],
                    'fechaNacimiento' => $row['fechaNacimiento'],
                    'rol' => $row['rol']
                ];
            }
            return $usuarios;
        } catch (PDOException $e) {
            return ["error" => $e->getMessage()];
        } finally {
            $pdo = null;
        }
    }

    public function obtenerPorId($id) {
        $pdo = Conexion::conectar();
        try {
            $sql = "SELECT * FROM G6_usuarios WHERE idUsuario = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$id]);

            if ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return [
                    'idUsuario' => $row['idUsuario'],
                    'nombre' => $row['nombre'],
                    'correo' => $row['correo'],
                    'clave' => $row['clave'],
                    'fechaNacimiento' => $row['fechaNacimiento'],
                    'rol' => $row['rol']
                ];
            }
            return null;
        } catch (PDOException $e) {
            return ["error" => $e->getMessage()];
        } finally {
            $pdo = null;
        }
    }

    public function insertar(Usuario $usuario) {
        $pdo = Conexion::conectar();
        try {
            $claveHasheada = password_hash($usuario->getClave(), PASSWORD_DEFAULT);
            $sql = "INSERT INTO G6_usuarios (nombre, correo, clave, fechaNacimiento, rol) VALUES (?, ?, ?, ?, ?)";
            $stmt = $pdo->prepare($sql);

            return $stmt->execute([
                $usuario->getNombre(),
                $usuario->getCorreo(),
                $claveHasheada,
                $usuario->getFechaNacimiento(),
                $usuario->getRol()
            ]);
        } catch (PDOException $e) {
            return false;
        } finally {
            $pdo = null;
        }
    }

    public function actualizar(Usuario $usuario) {
        $pdo = Conexion::conectar();
        try {
            $claveHasheada = password_hash($usuario->getClave(), PASSWORD_DEFAULT);
            $sql = "UPDATE G6_usuarios 
                    SET nombre = ?, correo = ?, clave = ?, fechaNacimiento = ?, rol = ? 
                    WHERE idUsuario = ?";
            $stmt = $pdo->prepare($sql);

            return $stmt->execute([
                $usuario->getNombre(),
                $usuario->getCorreo(),
                $claveHasheada,
                $usuario->getFechaNacimiento(),
                $usuario->getRol(),
                $usuario->getIdUsuario()
            ]);
        } catch (PDOException $e) {
            return false;
        } finally {
            $pdo = null;
        }
    }

    public function eliminar($idUsuario) {
        $pdo = Conexion::conectar();
        try {
            $sql = "DELETE FROM G6_usuarios WHERE idUsuario = ?";
            $stmt = $pdo->prepare($sql);
            return $stmt->execute([$idUsuario]);
        } catch (PDOException $e) {
            return false;
        } finally {
            $pdo = null;
        }
    }
}
?>
