const API = 'http://localhost:3008/api';


export async function api(ruta,opciones={}){

    const res = await fetch(API + ruta,{

        method: opciones.method || 'GET',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(opciones.body)

    });

    if(res.status === 204) return null;
    const data = await res.json();
    if(!res.ok) throw new Error(data.message || 'Error en la peticion');
    return data;

}