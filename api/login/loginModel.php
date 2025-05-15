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
}

?>