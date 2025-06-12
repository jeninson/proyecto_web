import { enviarPeticion } from "./tool.js";

export async function cargarUsuario(id="") {
    //const iduser = localStorage.getItem('iduser');   
    const tbody_usuarios = document.querySelector('#tb_usuarios tbody')
    let items = "<tr><td colspan='7' class='text-center'><i class='fas fa-spinner fa-spin'></i> Cargando información...</td></tr>";
    let info = {
        url: '../api/usuario/',
        method: 'GET',
        param: { id }
    };

    /*let resp = await enviarPeticion(info);
    if (resp.code === 200) {
        // Aquí puedes procesar la respuesta y mostrar los datos del usuario
        console.log(resp.data);
        items = ""; // Limpiar el contenido de "items"
        resp.data.forEach(usuario => {
            items += `
                <tr>
                    <td>${usuario.id}</td>
                    <td>${usuario.nombre}</td>
                    <td>${usuario.email}</td>
                    <td>${usuario.rol}</td>
                    <td>${usuario.celular}</td>
                    <td>${usuario.direccion}</td>
                    <td>
                        <button class="btn btn-sm btn-primary" onclick="editarUsuario(${usuario.id})">Editar</button>
                        <button class="btn btn-sm btn-danger" onclick="eliminarUsuario(${usuario.id})">Eliminar</button>
                    </td>
                </tr>
            `;
        });
    } else {
        console.error('Error al cargar los datos del usuario:', resp.message);
    }*/
    tbody_usuarios.innerHTML = items;
}