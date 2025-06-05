
import { validarLogin } from "./login.js"
import { panel } from "./panel.js"

document.addEventListener("DOMContentLoaded", (e)=>{
    //panel()
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


