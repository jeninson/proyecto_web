
export function url(url,open = undefined){
    (open !== undefined) ? window.open(url,open) : window.location=url;
}

export async function enviarPeticion(info){
    let {url, method, param} = info, data = {}

    if(param != undefined && method === "GET") url += "?" + new URLSearchParams(param).toString()
    
    if(method === "POST" || method === "PUT" || method === "DELETE") 
        data = {method, headers: {"Content-Type": "application/json"}, body: JSON.stringify(param)}
    else data = {method, headers: {"Content-Type": "application/json"}}
    
    try{
        let resp = await fetch(url, data)
        return await resp.json()
    }catch(e){
        console.error("Error en la petición: ", e)
        return {code: 500, message: "Error en la petición"}
    }
}