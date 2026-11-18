import { api } from "../api.js";

export const obtenerEquipos = () => api('/teams');
export const obtenerEquipoPorId = (_id) => api(`/teams/${_id}`);
export const crearEquipo = (datos) => api('/teams', { method: 'POST', body: datos });
export const editarEquipo = (_id, datos) => api(`/teams/${_id}`, { method: 'PUT', body: datos });
export const eliminarEquipo = (_id) => api(`/teams/${_id}`, { method: 'DELETE' });