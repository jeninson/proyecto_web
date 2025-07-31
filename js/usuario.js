import { enviarPeticion } from "./tool.js";

export async function cargarUsuario(id="") {
    //const iduser = localStorage.getItem('iduser');   
    const tbody_usuarios = document.querySelector('#tb_usuarios tbody')
    //console.log(tbody_usuarios);
    tbody_usuarios.innerHTML = "<tr><td colspan='7' class='text-center'><i class='fas fa-spinner fa-spin'></i> Cargando información...</td></tr>";
    let items="", info = {
        url: '../api/usuario/',
        method: 'GET',
        param: { id }
    };

    let resp = await enviarPeticion(info);
    if (resp.code === 200) {
        // Aquí puedes procesar la respuesta y mostrar los datos del usuario
        //console.log(resp.data);
        items = ""; // Limpiar el contenido de "items"
        let n = 1;
        resp.data.forEach(usuario => {
            items += `
                <tr>
                    <th>${n}</th>
                    <td>${usuario.identificacion}</td>
                    <td>${usuario.nombres} ${usuario.apellidos}</td>
                    <td>${usuario.celular}</td>
                    <td>${usuario.correo}</td>
                    <td>(ID=${usuario.id}) ${usuario.direccion}</td>
                    <td>
                        <button class="btn btn-sm btn-primary btn_update_user" data-iduser="${usuario.id}" data-bs-toggle="modal" data-bs-target="#addUserModal">Editar</button>
                        <button class="btn btn-sm btn-danger btn_delete_user" data-iduser="${usuario.id}" data-bs-toggle="modal" data-bs-target="#ModalEliminarUsuario">Eliminar</button>
                    </td>
                </tr>`;
            n++;
        });
    } else {
        items = `<tr><td colspan='7' class='text-center'><h3 class='text-danger'>${resp.message}</h3></td></tr>`;
    }
    tbody_usuarios.innerHTML = items;
}

export async function mostrarModalEliminarUsuario(id, idModal) {
    let bodyModal = document.querySelector(idModal + ' .modal-body');
    let btnEliminar = document.querySelector(idModal + ' .btn-danger');
    bodyModal.innerHTML = `Consultando información del usuario...`;
    let info = {
        url: '../api/usuario/',
        method: 'GET',
        param: { id }
    }
    //console.log(idModal);
    let resp = await enviarPeticion(info);
    if (resp.code === 200) {
        //console.log(resp.data);
        bodyModal.innerHTML = `
            <h3 class='text-center'>¿Está seguro de eliminar el usuario?</h3>
            <p><b>Identificación: </b>${resp.data[0].identificacion}</p>
            <p><b>Nombre: </b>${resp.data[0].nombres} ${resp.data[0].apellidos}</p>
            <p><b>E-mail: </b>${resp.data[0].correo}</p>
            <p><b>Celular: </b>${resp.data[0].celular}</p>
            <p><b>Dirección: </b>${resp.data[0].direccion}</p>
        `;
        btnEliminar.dataset.iduser = id
    }else {
        bodyModal.innerHTML = `<h3 class='text-danger'>${resp.message}</h3>`;
        return;
    }    
}

export async function eliminarUsuario(id) {
    
    const $modal = document.querySelector('#ModalEliminarUsuario');
    const modalBootstrap = bootstrap.Modal.getInstance($modal) || new bootstrap.Modal($modal);
    //let result = confirm("Estas seguro de eliminar el usuario?");
    //console.log(result);
    
    let info = {
        url: '../api/usuario/',
        method: 'DELETE',
        param: { id }
    }
    let resp = await enviarPeticion(info);
    if (resp.code === 200) {
        //console.log(resp.data);
        cargarUsuario();
        modalBootstrap.hide();
    } else {
        alert(resp.message);
    }
}

export async function guardarUsuario() {
    
    const formulario = document.getElementById('formulario_usuario');
    const formData = new FormData(formulario);
    let param = {}
    for (let [key, value] of formData.entries()) {
        param[`${key}`] = `${value}`;
    }

    let info = {
            url: '../api/usuario/',
            method: param.id_usuario ? 'PUT' : 'POST',
            param
    }
    console.log(info, formData);
    
    let resp = await enviarPeticion(info);
    if (resp.code === 200) {
        //console.log(resp.data);
        cargarUsuario();
        formulario.reset();
        const $modal = document.querySelector('#addUserModal');
        const modalBootstrap = bootstrap.Modal.getInstance($modal) || new bootstrap.Modal($modal);
        modalBootstrap.hide();
    } else {
        alert(resp.message);
    }/**/
}

export function reiniciarFormulario() {
    const $modal = document.querySelector('#addUserModal');
    document.querySelector(idModal + ' #exampleModalLabel').innerHTML = "!!! AGREGAR UN NUEVO USUARIO !!!";
    $modal.querySelector('.modal-header').classList.remove('text-bg-primary');
    $modal.querySelector('.modal-header').classList.add('text-bg-success');
    const formulario = document.getElementById('formulario_usuario');
    formulario.querySelector('#id_usuario').value = "";
    
    formulario.reset();     
}

export async function mostrarModalActualizarUsuario(id, idModal) {
    let bodyModal = document.querySelector(idModal + ' .modal-body');
    const id_usuario = document.querySelector(idModal + ' #id_usuario');
    const identificacion = document.querySelector(idModal + ' #identificacion');
    const nombres = document.querySelector(idModal + ' #nombres');
    const apellidos = document.querySelector(idModal + ' #apellidos');
    const celular = document.querySelector(idModal + ' #celular');
    const correo = document.querySelector(idModal + ' #correo');
    const direccion = document.querySelector(idModal + ' #direccion');
    const pass = document.querySelector(idModal + ' #contrasena');
    document.querySelector(idModal + ' #exampleModalLabel').innerHTML = "!!! ACTUALIZAR USUARIO !!!";
    document.querySelector(idModal + ' .modal-header').classList.remove('text-bg-success');
    document.querySelector(idModal + ' .modal-header').classList.add('text-bg-primary');

    let info = {
        url: '../api/usuario/',
        method: 'GET',
        param: { id }
    }
    let resp = await enviarPeticion(info);
    if (resp.code === 200) {
        //console.log(resp.data);
        id_usuario.value = resp.data[0].id;
        identificacion.value = resp.data[0].identificacion;
        nombres.value = resp.data[0].nombres;
        apellidos.value = resp.data[0].apellidos;
        celular.value = resp.data[0].celular;
        correo.value = resp.data[0].correo;
        direccion.value = resp.data[0].direccion;
        pass.value = resp.data[0].id;
    }else {
        bodyModal.innerHTML = `<h3 class='text-danger'>${resp.message}</h3>`;
        return;
    }   
}
