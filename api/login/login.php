<?php
    //Importar requerimientos
    include_once 'loginModel.php';

    header('Content-Type: application/json; charset=utf-8');

    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        // Obtener los datos de la solicitud GET
        
        $user = $_GET["usuario"] ?? null;
        $pass = $_GET["contrasena"] ?? null;

        try {
            $auth = new LoginModel();
            $row = $auth->autenticarUsuario($user, $pass);
            if ($row) {
                // Si se encuentra el usuario, devolver los datos
                http_response_code(200); // OK
                echo json_encode(array("code"=>200,"message" => "Usuario encontrado.", "usuario" => $row));
            } else {
                // Si no se encuentra el usuario, devolver un mensaje de error
                http_response_code(401); // No encontrado
                echo json_encode(array("code"=>401,"message" => "Credenciales invalidas."));
            }
        } catch (Exception $e) {
            http_response_code(500); // Error interno del servidor
            echo json_encode(array("code"=>500,"message" => "Error de conexion a la base de datos.", "Error" => $e->getMessage()));
            exit();
        }
        exit();
    } elseif ($_SERVER['REQUEST_METHOD'] == 'POST') {   
        // Obtener los datos de la solicitud POST
        $data = json_decode(file_get_contents("php://input"), true);
        //var_dump($data);
        $user = $data["usuario"] ?? null;
        $pass = $data["contrasena"] ?? null;

        //var_dump($pass);
        
        try {
            $auth = new LoginModel();
            $row = $auth->autenticarUsuario($user, $pass);
            if ($row) {
                // Si se encuentra el usuario, devolver los datos
                http_response_code(200); // OK
                echo json_encode(array("code"=>200,"message" => "Usuario encontrado.", "usuario" => $row));
            } else {
                // Si no se encuentra el usuario, devolver un mensaje de error
                http_response_code(401); // No encontrado
                echo json_encode(array("code"=>401,"message" => "Credenciales invalidas."));
            }
        } catch (Exception $e) {
            http_response_code(500); // Error interno del servidor
            echo json_encode(array("code"=>500,"message" => "Error de conexion a la base de datos.", "Error" => $e->getMessage()));
            exit();
        }
        exit();
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