<?php
    //Importar requerimientos
    include_once 'usuarioModel.php';

    header('Content-Type: application/json; charset=UTF-8');
    header('Access-Control-Allow-Origin: *');

    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        // Obtener los datos de la solicitud GET
        
        $id = $_GET["id"] ?? "";

        try {
            $usuarios = new usuarioModel();
            $row = $usuarios->consultarUsuario($id);
            if ($row) {
                http_response_code(200); // OK
                echo json_encode(array("code"=>200,"message" => "Consulta exitosa", "data" => $row));
            } else {
                http_response_code(401);
                echo json_encode(array("code"=>401,"message" => "Error al consultar el usuario."));
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