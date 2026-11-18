import {api} from "../api.js";


export const obtenerTareas = () => api('/tasks');
export const obtenerTareaPorId= (_id)=>api(`/tasks/${_id}`);
export const crearTarea = (datos)=> api('/tasks',{method:'POST',body:datos});
export const editarTarea = (_id,datos)=>api(`/tasks/${_id}`, {method:'PUT',body:datos});
export const eliminarTarea = (_id)=>api(`/tasks/${_id}`,{method:'DELETE'});