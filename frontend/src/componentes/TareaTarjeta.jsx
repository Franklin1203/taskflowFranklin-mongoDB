export default function TareaTarjeta({ task, borrar, seleccionarParaEditar, completar }) {
    return (
        <div className="tarjeta-tarea">
            <div className="datos-tareas-lista">
                <h3 className="titulo-txt">{task.titulo}</h3>
                <p className="estado-txt"><b>Estado:</b> {task.estado}</p>
                <p className="prioridad-txt"><b>Prioridad:</b> {task.prioridad}</p>
                <p className="dueDate-txt"><b>Fecha:</b> {task.dueDate}</p>
                <p className="equipo-txt">
                    <b>Equipo:</b> {task.equipos?.nombre || "Sin equipo"}
                </p>
                <p className="asignado-txt">
                    <b>Asignado a:</b> {task.asignado_a?.nombre || "Sin asignar"}
                </p>
            </div>

            <div className="botonera-tareas">
                <button type="button" className="eliminar-btn" onClick={() => borrar(task._id)}>Eliminar</button>
                <button type="button" className="editar-btn" onClick={() => seleccionarParaEditar(task)}>Editar</button>
                <button type="button" className="completar-btn" onClick={()=> completar(task)}> {task.estado == "completada" ? "Marcar como pendiente" : "Completar"} </button>
            </div>
        </div>
    );
}