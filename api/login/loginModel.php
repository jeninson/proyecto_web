<?php
require_once "../config/database.php"; // Asegúrate de que la ruta sea correcta

class LoginModel {
    private $conexion;

    public function __construct() {
        $this->conexion = new Database();
    }

    public function autenticarUsuario($user, $pass) {
        try {
            $conn = $this->conexion->conectar();
            $result = $conn->prepare("SELECT `id`, `identificacion`, `nombres`, `apellidos`, `celular` FROM `tbusuarios` WHERE `correo` = :email AND `contrasena` = MD5(:clave)");
            $result->bindParam(":email", $user, PDO::PARAM_STR);
            $result->bindParam(":clave", $pass, PDO::PARAM_STR);
            $result->execute();
            return $result->fetch(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            throw new Exception("Error de conexion a la base de datos: " . $e->getMessage());
        }
    }

    public function generarToken($userId, $user) {
        // Generar un token único para el usuario
        $token = bin2hex(random_bytes(16)); // Genera un token aleatorio de 32 caracteres
        //var_dump($userId, $user, $token);
        try {
            $conn = $this->conexion->conectar();
            $stmt = $conn->prepare("INSERT INTO `tbtokens`(`user_id`, `token`, `user_name`, `fecha_creacion`, `id_estado`) VALUES (:usuario_id, :token, :user, CURRENT_TIMESTAMP(), 1)");
            $stmt->bindParam(":usuario_id", $userId, PDO::PARAM_INT);
            $stmt->bindParam(":token", $token, PDO::PARAM_STR);
            $stmt->bindParam(":user", $user, PDO::PARAM_STR);
            $stmt->execute();
            return $token;
        } catch (Exception $e) {
            throw new Exception("Error al generar el token: " . $e->getMessage());
        }
    }

    public function validarToken($token, $userId) {
        try {
            $conn = $this->conexion->conectar();
            $stmt = $conn->prepare("SELECT * FROM `tbtokens` WHERE `token` = :token AND `user_id` = :usuario_id");
            $stmt->bindParam(":token", $token, PDO::PARAM_STR);
            $stmt->bindParam(":usuario_id", $userId, PDO::PARAM_INT);
            $stmt->execute();
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            throw new Exception("Error al validar el token: " . $e->getMessage());
        }
    }

    public function eliminarToken($token) {
        try {
            $conn = $this->conexion->conectar();
            $stmt = $conn->prepare("DELETE FROM `tbtokens` WHERE `token` = :token");
            $stmt->bindParam(":token", $token, PDO::PARAM_STR);
            return $stmt->execute();
        } catch (Exception $e) {
            throw new Exception("Error al eliminar el token: " . $e->getMessage());
        }
    }

    public function __destruct() {
        // Cerrar la conexión si es necesario
        $this->conexion = null;
    }
}

?>