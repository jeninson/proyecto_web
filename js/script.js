
import { validarLogin, validarToken} from "./login.js"
import { validarUsuario } from "./panel.js"
import { mostrarModalEliminarUsuario , eliminarUsuario, guardarUsuario, reiniciarFormulario, mostrarModalActualizarUsuario} from "./usuario.js"

document.addEventListener("DOMContentLoaded", (e)=>{
    if(location.pathname.includes("panel")) validarUsuario()
    if(location.pathname.includes("index") || location.pathname === "/proyecto_web/src/") validarToken() 
})

document.addEventListener("click", (e)=>{
    //console.log(e.target)
    /*const formulario = document.getElementById('formulario_usuario');
    const formData = new FormData(formulario);
    let param = {}
    for (let [key, value] of formData.entries()) {
        param[`${key}`] = `${value}`;
    }
    console.log(param);*/
    if(e.target.matches("#btnAgregarUsuario")) reiniciarFormulario()
    if(e.target.matches(".btn_update_user")) mostrarModalActualizarUsuario(e.target.dataset.iduser, e.target.dataset.bsTarget)
    if(e.target.matches(".btn_delete_user")) mostrarModalEliminarUsuario(e.target.dataset.iduser, e.target.dataset.bsTarget)
    if(e.target.matches("#ModalEliminarUsuario .btn-danger")) eliminarUsuario(e.target.dataset.iduser)
})

document.addEventListener("submit", (e)=>{
    //console.log(e.target)
    e.preventDefault()
    if(e.target.matches("#loginForm")) validarLogin()
    if(e.target.matches("#formulario_usuario")) guardarUsuario()
})


