import { URL } from "./config.js";

const solicitud = async (url) => {
    let solicitud = await fetch(`${URL}/${url}`);
    let data = await solicitud.json()
    return data;
}


export const enviar = async (endpoint, options) => {
    try{
        let solicitud = await fetch(`${URL}/${endpoint}`,options);
        let data = await solicitud.json();
        return data;
    } catch(error){
        return error
    }
}
export default solicitud;


//Utilizamos una función de fecha donde fecth realiza la solicitud.
//Then maneja la respuesta y lo convierte en JSON.
//En caso de error el error se captura con catch.


// export default async (endpoint, options) => fetch(`${URL}/${endpoint}`, options).then(res => res.json()).catch(error => error);
