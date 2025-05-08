<?php

class Database {
    private $host;
    private $dbname;
    private $user;
    private $pass;
    private $conn;

    public function __construct() {
        // Cargar credenciales desde el archivo protegido
        $credencialesPath = "../config/.key";
        if (!file_exists($credencialesPath)) {
            throw new Exception("El archivo de credenciales no existe: {$credencialesPath}");
        }

        $credenciales = json_decode(file_get_contents($credencialesPath), true);
        if (!$credenciales || !isset($credenciales["host"], $credenciales["dbname"], $credenciales["user"], $credenciales["pass"])) {
            throw new Exception("Credenciales inválidas o incompletas en el archivo: {$credencialesPath}");
        }

        // Asignar las credenciales a las propiedades privadas
        $this->host = $credenciales["host"];
        $this->dbname = $credenciales["dbname"];
        $this->user = $credenciales["user"];
        $this->pass = $credenciales["pass"];
        $this->conn = null;
    }

    public function connect() {
        $this->conn = null;
        try {
            $this->conn = new PDO(
                "mysql:host={$this->host};dbname={$this->dbname}",
                $this->user,
                $this->pass
            );
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            throw new Exception("Connection failed: " . $e->getMessage());
        }
        return $this->conn;
    }
}

// Uso de la clase Database
try {
    $db = new Database();
    $connection = $db->connect();
} catch (Exception $e) {
    echo $e->getMessage();
}
?>