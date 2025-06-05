
import { validarLogin, validarToken} from "./login.js"
import { validarUsuario } from "./panel.js"

document.addEventListener("DOMContentLoaded", (e)=>{
    if(location.pathname.includes("panel")) validarUsuario()
    if(location.pathname.includes("index") || location.pathname === "/proyecto_web/src/") validarToken() 
})

document.addEventListener("click", (e)=>{
    //console.log(e.target)
    //if(e.target.matches("#")) mostrar()
})

document.addEventListener("submit", (e)=>{
    //console.log(e.target)
    e.preventDefault()
    if(e.target.matches("#loginForm")) validarLogin()
})


