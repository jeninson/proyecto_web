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
        url: "../api/login/",
        method: "POST",
        param: {
            usuario: user,
            contrasena: clave
        }
    }

    let resp = await enviarPeticion(info)
    console.log(resp.usuario)
    if(resp.code === 200){
        //console.log(resp.usuario)
        localStorage.setItem("idtoken", resp.idtoken)
        localStorage.setItem("usuario", resp.usuario.nombres + " " + resp.usuario.apellidos)
        url("panel.html?idtk=" + resp.idtoken, "_self")
    }else{
        $lb_msg.innerHTML = `<strong class='text-danger'>${resp.message}</strong>`
        setTimeout(() => {
            $lb_msg.innerHTML = "&nbsp;"
        }, 3000)
    }

}
