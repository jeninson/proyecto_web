
document.addEventListener("DOMContentLoaded", (e)=>{
    inicio()
})

document.addEventListener("click", (e)=>{
    //console.log(e.target)
    //if(e.target.matches("#btnIniciar")) mostrar()
})

document.addEventListener("submit", (e)=>{
    //console.log(e.target)
    e.preventDefault()
    if(e.target.matches("#loginForm")) validarLogin()
})

function inicio(){ console.log("Inicio de la Pagina")}

function validarLogin(){
    console.log("ok")
    //Expresion regular para validar el correo electronico
    let regEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    let $lb_msg = document.querySelector("#lb_msg")
    let user = document.querySelector("#user").value
    let clave = document.querySelector("#clave").value
    let msg = "";
    $lb_msg.innerHTML = "Proceso de validacion..."
    if(user.trim() === "" || !regEx.test(user)) msg = "El usuario ingresado es invalido."
    if(clave.trim() === "") msg = "La contraseña ingresada es invalida."
    
    if(msg !== ""){
        $lb_msg.innerHTML = "<strong class='text-danger'>"+msg+"</strong>"
        setTimeout(() => {
            $lb_msg.innerHTML = ""
        }, 3000)
        return
    }

    console.log(user, clave)
}