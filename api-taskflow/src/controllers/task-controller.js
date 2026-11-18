
const Task = require("../models/Task");
const Team = require("../models/Team");
const User = require("../models/User");
const ApiError = require("../utils/ApiError");
const pick = require("../utils/pick");



const TASK_CAMPOS_PERMITIDOS = ["titulo","estado","prioridad","dueDate","equipos","asignado_a"]; //campos que el cliente puede manejar
const TASK_FILTROS = ["createdAt", "prioridad","dueDate","titulo","estado"]; //campos por los que podemos filtrar


//verificamos que el Team y el User existan
async function checkReferences({equipos,asignado_a}){

    if(equipos && !(await Team.exists({_id:equipos}))){
       throw ApiError.badRequest(`El equipo ${equipos} no existe`)
    }
    if(asignado_a && !(await User.exists({_id:asignado_a}))){

        throw ApiError.badRequest(`El usuario ${asignado_a} no existe`)
    }

}


exports.getTasks = async(req, res, next) =>{

    try{

        const filter = pick(req.query,["estado","equipos","asignado_a"]);
        if(req.query.prioridad !== undefined) filter.prioridad = Number(req.query.prioridad); //para covertir la prioridad a numero

        const page = Math.max(Number(req.query.page) || 1, 1); //paginacion de tareas
        const limit = Math.min(Math.max(Number(req.query.limit) || 20, 1),100); //limite de tareas por pagina



        const sortField = String(req.query.sort || "-createdAt");  //filtra por fecha de creado de forma descendente en caso de no indicar ningun sort

        const sortKey = sortField.replace(/^-/,""); //elimina el guion para leer el campo
        const sort = TASK_FILTROS.includes(sortKey) //verifica si es uno de los filtros permitidos de la lista
        ? {[sortKey]: sortField.startsWith("-")? -1 : 1} : {createdAt:-1}


        //filtro,orden y paginacion de las tareas
        const [data, total] = await Promise.all([ 
            Task.find(filter)
            .sort(sort)
            .skip((page-1)*limit) //trae los datos desde la pagina actual
            .limit(limit)
            .populate("equipos","nombre")  //trae el nombre de los equipos
            .populate("asignado_a", "nombre email") //trae el nombre y email del encargado de la tarea
            .lean(), //devuelve los datos en documento js planos
            Task.countDocuments(filter)
        ]);


        res.status(200).json({ok:true, total, page, limit, data})

    }catch(err){
        next(err)

    }

}

exports.getTaskById= async(req,res,next) =>{

    try {

        const task = await Task.findById(req.params.id)

            .populate("equipos","name")
            .populate("asignado_a","nombre email")
            .lean();

        if(!task)  throw ApiError.notFound("Tarea no encontrada") ;

        res.status(200).json({ok:true,data:task})

    }catch(err){
        next(err)
    }



};


exports.createTask = async(req, res, next) =>{

    try{
        const campos = pick(req.body,TASK_CAMPOS_PERMITIDOS); //verifica que se esten manejando los campos permitidos
        await checkReferences(campos)

        const task = await Task.create(campos);
        res.status(201).json({ok:true, data:task});

    } catch(err){
        next(err)
    }

}


exports.updateTask = async(req, res, next) =>{

    try{

        const campos = pick(req.body, TASK_CAMPOS_PERMITIDOS);
        if(Object.keys(campos).length ===0){

            throw ApiError.badRequest(`Envía al menos uno de estos campos: ${TASK_CAMPOS_PERMITIDOS.join(", ")}`)
        }
        await checkReferences(campos)


        const task = await Task.findById(req.params.id);
        if(!task) throw ApiError.notFound("Tarea no encontrada");

        task.set(campos);
        await task.save()

        res.status(200).json({ok:true, data:task})



    } catch(err){
        next(err)
    }

}


exports.deleteTask = async (req,res,next) =>{
    try{

        const task = await Task.findByIdAndDelete(req.params.id);
        if(!task) throw ApiError.notFound("Tarea no encontrada");

        res.status(200).json({ok:true, message:"Tarea eliminada", data:{_id:task._id}})


    }catch(err){
        next(err)
    }
}



