import { url } from "./tool.js"

export function validarLogin(){
    //console.log("ok")
    //Expresion regular para validar el correo electronico
    let regEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    let $lb_msg = document.querySelector("#lb_msg")
    let user = document.querySelector("#user").value
    let clave = document.querySelector("#clave").value
    let msg = "";
    $lb_msg.innerHTML = "<div class='spinner-border text-primary' role='status'><span class='sr-only'>Proceso de validacion...</span></div>"
    if(user.trim() === "" || !regEx.test(user)) msg = "El usuario ingresado es invalido.";
    if(clave.trim() === "") msg = "La contraseña ingresada es invalida."
    
    if(msg !== ""){
        $lb_msg.innerHTML = `<strong class='text-danger'>${msg}</strong>`        
        setTimeout(() => {
            $lb_msg.innerHTML = "&nbsp;"
        }, 3000)
        return false
    }

    setTimeout(() => {
        $lb_msg.innerHTML = "&nbsp;"
        url("principal.html")
    }, 3000)
}
