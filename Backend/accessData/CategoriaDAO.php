<?php
require_once __DIR__ . '/../misc/Conexion.php';
require_once __DIR__ . '/../Model/Categoria.php';

class CategoriaDAO {

    public function obtenerTodos() {
        $pdo = Conexion::conectar();
        try {
            $sql = "SELECT * FROM G6_categoria";
            $stmt = $pdo->query($sql);

            $categorias = [];
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $categorias[] = [
                    'idCategoria' => $row['idCategoria'],
                    'nombre' => $row['nombre'],
                    'idUsuario' => $row['idUsuario']
                ];
            }
            return $categorias;
        } finally {
            $pdo = null;
        }
    }

    public function obtenerPorId($id) {
        $pdo = Conexion::conectar();
        try {
            $sql = "SELECT * FROM G6_categoria WHERE idCategoria = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$id]);

            if ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                return [
                    'idCategoria' => $row['idCategoria'],
                    'nombre' => $row['nombre'],
                    'idUsuario' => $row['idUsuario']
                ];
            }
            return null;
        } finally {
            $pdo = null;
        }
    }

    public function insertar(Categoria $categoria) {
        $pdo = Conexion::conectar();
        try {
            $sql = "INSERT INTO G6_categoria (nombre, idUsuario) VALUES (?, ?)";
            $stmt = $pdo->prepare($sql);
            return $stmt->execute([
                $categoria->getNombre(),
                $categoria->getIdUsuario()
            ]);
        } finally {
            $pdo = null;
        }
    }

    public function actualizar(Categoria $categoria) {
        $pdo = Conexion::conectar();
        try {
            $sql = "UPDATE G6_categoria 
                    SET nombre = ?, idUsuario = ? 
                    WHERE idCategoria = ?";
            $stmt = $pdo->prepare($sql);
            return $stmt->execute([
                $categoria->getNombre(),
                $categoria->getIdUsuario(),
                $categoria->getIdCategoria()
            ]);
        } finally {
            $pdo = null;
        }
    }

    public function eliminar($idCategoria) {
        $pdo = Conexion::conectar();
        try {
            $sql = "DELETE FROM G6_categoria WHERE idCategoria = ?";
            $stmt = $pdo->prepare($sql);
            return $stmt->execute([$idCategoria]);
        } finally {
            $pdo = null;
        }
    }
}
?>
