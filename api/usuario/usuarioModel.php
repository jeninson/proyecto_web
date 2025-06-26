<?php
    require_once "../config/database.php"; // Asegúrate de que la ruta sea correcta

    class usuarioModel {
        private $db;

        public function __construct() {
            $this->db = new Database();
        }

        public function consultarUsuario($id) {
            $query = "SELECT `id`, `identificacion`, `nombres`, `apellidos`, `celular`, `correo`, `direccion` FROM tbusuarios";
            if (!empty($id)) {
                $query .= " WHERE id = :id";
            }
            $query .= " ORDER BY nombres asc, apellidos asc";
            $conn = $this->db->conectar();
            $result = $conn->prepare($query);
            if (!empty($id)) {
                $result->bindParam(":id", $id, PDO::PARAM_INT);
            }
            $result->execute();
            return $result->fetchAll(PDO::FETCH_ASSOC);
        }

        function eliminarUsuario($id) {
            $query = "DELETE FROM tbusuarios WHERE `id` = :id";
            $conn = $this->db->conectar();
            $result = $conn->prepare($query);
            $result->bindParam(":id", $id, PDO::PARAM_INT);
            return $result->execute();
        }
}
?>