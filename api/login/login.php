<?php
    //Importar requerimientos
    include_once '../config/database.php';
    header('Content-Type: application/json; charset=utf-8');

    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        // Obtener los datos de la solicitud GET
        
        $user = $_GET["usuario"] ?? null;
        $pass = $_GET["contrasena"] ?? null;

        http_response_code(200); // OK
        echo json_encode(array("message" => "Metodo GET.", "usuario" => $user, "contraseña" => $pass));
        exit();
    } elseif ($_SERVER['REQUEST_METHOD'] == 'POST') {   
        // Obtener los datos de la solicitud POST
        $data = json_decode(file_get_contents("php://input"), true);
        $user = $_POST["usuario"] ?? null;
        $pass = $_POST["contrasena"] ?? null;

        //var_dump($data);
        http_response_code(200); // OK
        echo json_encode(array("message" => "Metodo POST.", "usuario" => $user, "contraseña" => $pass));
    } else {
        // Método no permitido
        http_response_code(405); // Método no permitido
        echo json_encode(array("code"=>405, "message" => "Método no permitido."));
    }    
    
    /*
    $conexion = new Database();
    $conn = $conexion->connect();
    if (!$conn) {
        echo json_encode(array("message" => "Error de conexion a la base de datos."));
        exit();
    } 
    echo json_encode(array("message" => "Conexion exitosa a la base de datos."));  
    */
?>