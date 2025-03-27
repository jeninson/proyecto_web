<?php
    echo "Mensaje desde PHP";
    var_dump("Mensaje desde PHP");
    if($_GET["id"]){
        echo "El ID es: ".$_GET["id"];
    }
?>