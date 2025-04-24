
import { validarLogin } from "./login.js"

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
