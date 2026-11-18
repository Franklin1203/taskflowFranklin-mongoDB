import { useTasks } from "../hooks/useTasks.js";
import TareasLista from "../componentes/TareasLista.jsx";

export default function TareasPage() {
    const { formulario, estado, acciones } = useTasks();

    if (estado.isPending) return <p>Cargando...</p>;
    if (estado.isError) return <p>Ocurrió un error: {estado.error.message}</p>;

    return (
        <main >
            <div className="encabezado">
                <h1>TASKFLOW</h1>
            </div>

            <form className="formulario-tarea" onSubmit={acciones.guardarFormulario}>
                <input className="tarea-input" type="text" placeholder="Titulo" value={formulario.titulo} onChange={e => formulario.setTitulo(e.target.value)} required />
                <input className="tarea-input" type="text" placeholder="Estado" value={formulario.estado} onChange={e => formulario.setEstado(e.target.value)}  />
                <input className="tarea-input" type="number" placeholder="Prioridad" value={formulario.prioridad} onChange={e => formulario.setPrioridad(e.target.value)} required />
                <input className="tarea-input" type="date" placeholder="dueDate" value={formulario.dueDate} onChange={e => formulario.setDueDate(e.target.value)} required />

                <select className="tarea-input" value={formulario.equipo} onChange={e => formulario.setEquipo(e.target.value)} required>
                    <option value="" disabled>Selecciona un Equipo</option>
                    {estado.equipos.map(equipo => (
                        <option key={equipo._id} value={equipo._id}>
                            {equipo.nombre}
                        </option>
                    ))}
                </select>

            
                <select className="tarea-input" value={formulario.asignado_a} onChange={e => formulario.setAsignado_a(e.target.value)} >
                    <option value="" disabled>Selecciona un Encargado</option>
                    {estado.usuarios.map(usuario => (
                        <option key={usuario._id} value={usuario._id}>
                            {usuario.nombre}
                        </option>
                    ))}
                </select>

                <button className="guardar-btn" disabled={estado.isGuardando} type="submit">
                    {formulario.idEditando
                        ? (estado.isGuardando ? "Actualizando..." : "Guardar Cambios")
                        : (estado.isGuardando ? "Agregando..." : "Agregar")
                    }
                </button>

                {formulario.idEditando && (
                    <button type="button" className="cancelar-btn" onClick={acciones.cancelarEdicion}>Cancelar</button>
                )}
            </form>

            <TareasLista tasks={estado.tasks} acciones={acciones} />
        </main>
    );
}