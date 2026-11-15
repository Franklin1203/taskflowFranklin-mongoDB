import TareaTarjeta from "./TareaTarjeta.jsx";

//parte del view, lista de Tareas
export default function TareasLista({tasks,acciones}){
    if(tasks.length ===0) return <p>No hay tareas en lista</p>


    return(
        <div className="lista-tareas">
            {tasks.map(t=>(

                <TareaTarjeta
                    key={t._id}
                    task={t}
                    borrar={acciones.borrar}
                    seleccionarParaEditar={acciones.seleccionarParaEditar}
                    completar={acciones.completar}

                />
            ))}

        </div>
    )
}