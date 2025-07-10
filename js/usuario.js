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
                        <button class="btn btn-sm btn-primary btn_update_user" data-iduser="${usuario.id}" data-bs-toggle="modal" data-bs-target="#ModalEditarUsuario">Editar</button>
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