<?php
    //Importar requerimientos
    include_once 'loginModel.php';

    header('Content-Type: application/json; charset=UTF-8');
    header('Access-Control-Allow-Origin: *');

    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        // Obtener los datos de la solicitud GET
        
        $idToken = $_GET["idToken"] ?? null;
        $iduser = $_GET["iduser"] ?? null;
        //var_dump($idToken, $iduser);

        try {
            $auth = new LoginModel();
            $row = $auth->validarToken($idToken, $iduser);
            if ($row) {
                // Si se encuentra el usuario, devolver los datos
                http_response_code(200); // OK
                echo json_encode(array("code"=>200,"message" => "Usuario encontrado."));
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
                // Si se encuentra el usuario, generar un token
                $idToken = $auth->generarToken($row['id'], $user);
                // Si se encuentra el usuario, devolver los datos
                http_response_code(200); // OK
                echo json_encode(array("code"=>200,"message" => "Usuario encontrado.", "usuario" => $row, "idtoken" => $idToken));
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
    } elseif ($_SERVER['REQUEST_METHOD'] == 'DELETE') {   
        // Obtener los datos de la solicitud POST
        $data = json_decode(file_get_contents("php://input"), true);
        //var_dump($data);
        $idToken = $data["idToken"] ?? null;

        //var_dump($pass);
        
        try {
            $auth = new LoginModel();
            $row = $auth->eliminarToken($idToken);
            if ($row) {
                http_response_code(200); // OK
                echo json_encode(array("code"=>200,"message" => "Token Eliminado."));
            } else {
                // Si no se encuentra el usuario, devolver un mensaje de error
                http_response_code(401); // No encontrado
                echo json_encode(array("code"=>401,"message" => "Token invalidos."));
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
?>