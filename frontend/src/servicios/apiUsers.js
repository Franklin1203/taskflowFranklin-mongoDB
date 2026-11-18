import { api } from "../api.js";

export const obtenerUsuarios = () => api('/users');
export const obtenerUsuarioPorId = (_id) => api(`/users/${_id}`);
export const crearUsuario = (datos) => api('/users', { method: 'POST', body: datos });
export const editarUsuario = (_id, datos) => api(`/users/${_id}`, { method: 'PUT', body: datos });
export const eliminarUsuario = (_id) => api(`/users/${_id}`, { method: 'DELETE' });