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
                    <td>${usuario.direccion}</td>
                    <td>
                        <button class="btn btn-sm btn-primary" onclick="editarUsuario(${usuario.id})">Editar</button>
                        <button class="btn btn-sm btn-danger" onclick="eliminarUsuario(${usuario.id})">Eliminar</button>
                    </td>
                </tr>`;
            n++;
        });
    } else {
        items = `<tr><td colspan='7' class='text-center'><h3 class='text-danger'>${resp.message}</h3></td></tr>`;
    }
    tbody_usuarios.innerHTML = items;
}