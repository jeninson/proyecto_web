import { enviarPeticion, url } from "./tool.js"

export async function validarLogin(){
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

    let info = {
        url: "../api/login/login.php",
        method: "POST",
        param: {
            usuario: user,
            contrasena: clave
        }
    }

    let resp = await enviarPeticion(info)
    //console.log(resp)
    if(resp.code === 200){
        //console.log(resp.usuario)
        url("panel.html")
    }else{
        $lb_msg.innerHTML = `<strong class='text-danger'>${resp.message}</strong>`
        setTimeout(() => {
            $lb_msg.innerHTML = "&nbsp;"
        }, 3000)
    }

}

function enviarLogin(user, clave){
    try {
        let resp = fetch(`../api/login/login.php`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                usuario: user,
                contrasena: clave
            })
        })
        resp.then((response) => {
            if(response.status === 200){
                response.json().then((data) => {
                    
                })
            }else{
                response.json().then((data) => {
                    let $lb_msg = document.querySelector("#lb_msg")
                    $lb_msg.innerHTML = `<strong class='text-danger'>${data.message}</strong>`
                    setTimeout(() => {
                        $lb_msg.innerHTML = "&nbsp;"
                    }, 3000)
                    //console.error("Error en la respuesta del servidor: ", data.code)
                })
            }
        })
    }catch (error) {
        console.error("Error en la validacion de login: ", error)
    }
}