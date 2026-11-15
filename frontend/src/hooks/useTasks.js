import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
    obtenerTareas,
    crearTarea,
    editarTarea,
    eliminarTarea
} from "../servicios/apiTasks.js";

// 1. Importar las funciones para obtener los catálogos
import { obtenerEquipos } from "../servicios/apiTeams.js";
import { obtenerUsuarios } from "../servicios/apiUsers.js";

export function useTasks() {
    const [titulo, setTitulo] = useState("");
    const [estado, setEstado] = useState("");
    const [prioridad, setPrioridad] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [equipo, setEquipo] = useState("");
    const [asignado_a, setAsignado_a] = useState("");
    const [idEditando, setIdEditando] = useState(null);
    const queryClient = useQueryClient();

    const consultar = useQuery({
        queryKey: ['tasks'],
        queryFn: obtenerTareas
    });

   
    const consultarEquipos = useQuery({
        queryKey: ['teams'],
        queryFn: obtenerEquipos
    });

    const consultarUsuarios = useQuery({
        queryKey: ['users'],
        queryFn: obtenerUsuarios
    });

    const limpiarFormulario = () => {
        setTitulo("");
        setEstado("");
        setPrioridad("");
        setDueDate("");
        setEquipo("");      
        setAsignado_a("");  
        setIdEditando(null);
    }

    const crear = useMutation({
        mutationFn: crearTarea,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            limpiarFormulario();
        }
    });

    const editar = useMutation({
        mutationFn: ({ _id, datos }) => editarTarea(_id, datos),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            limpiarFormulario();
        }
    });

    const eliminar = useMutation({
        mutationFn: eliminarTarea,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        }
    });



    function seleccionarParaEditar(tarea) {
        setTitulo(tarea.titulo);
        setEstado(tarea.estado);
        setPrioridad(tarea.prioridad);
        setDueDate(tarea.dueDate);
        setEquipo(tarea.equipos?._id || tarea.equipos || "");
        setAsignado_a(tarea.asignado_a?._id || tarea.asignado_a || "");
        setIdEditando(tarea._id);
    }

    function guardarFormulario(e) {
        e.preventDefault();
        const datosGenerados = {
            titulo,
            estado: estado || "pendiente",
            prioridad: parseInt(prioridad) || 1,
            dueDate,
            equipos: equipo,
            asignado_a: asignado_a
        }

        if (idEditando) {
            editar.mutate({ _id: idEditando, datos: datosGenerados });
        } else {
            crear.mutate(datosGenerados);
        }
    }

    function cancelarEdicion() {
        limpiarFormulario();
    }

    function borrar(_id) {
        eliminar.mutate(_id);
    }

    function completar(task){

      const nuevoEstado = task.estado == "completada" ? "pendiente"  : "completada" 

       editar.mutate({ _id:task._id,datos:{estado:nuevoEstado}}) 
        
    }


    return {
        formulario: { 
            titulo, setTitulo, 
            estado, setEstado, 
            prioridad, setPrioridad, 
            dueDate, setDueDate, 
            equipo, setEquipo, 
            asignado_a, setAsignado_a, 
            idEditando 
        },
        estado: {
            tasks: consultar.data?.data || [],
            equipos: consultarEquipos.data?.data || [],
            usuarios: consultarUsuarios.data?.data || [],
            isPending: consultar.isPending,
            isError: consultar.isError,
            error: consultar.error,
            isGuardando: crear.isPending || editar.isPending
        },
        acciones: { guardarFormulario, seleccionarParaEditar, cancelarEdicion, borrar, completar }
    }
}