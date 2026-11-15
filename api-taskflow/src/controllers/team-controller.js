
const mongoose = require("mongoose");
const Team = require("../models/Team");
const User = require("../models/User");
const Task = require("../models/Task");
const ApiError = require("../utils/ApiError");
const pick = require("../utils/pick");


const TEAM_CAMPOS = ["nombre","descripcion"];



exports.getTeams = async (req, res, next) =>{

    try{

        const data = await Team.find().sort({nombre:1}).populate("miembros", "nombre email rol").lean();
        res.status(200).json({ok:true, total: data.length, data});


    }catch(err){
        next(err);
    }

};

exports.getTeamById = async (req, res, next) =>{

    try{

        const team = await Team.findById(req.params.id).populate("miembros", "nombre email rol").lean()
        if(!team) throw ApiError.notFound("Equipo no encontrado");


        res.status(200).json({ok:true, data:team});

    }catch(err){
        next(err);
    }


}

exports.createTeam = async (req,res,next) =>{

    try{

     const team = await Team.create(pick(req.body,TEAM_CAMPOS));
     res.status(201).json({ok:true,data:team});   


    }catch(err){
        next(err)

    }

}


exports.updateTeam = async(req,res,next)=>{

    try{

        const campos = pick(req.body,TEAM_CAMPOS)
        if(Object.keys(campos).length===0){
            throw ApiError.badRequest("Envía el campo name")
        }

        const team = await Team.findById(req.params.id);
        if(!team) throw ApiError.notFound("Equipo no encontrado");


        team.set(campos);
        await team.save();

        res.status(200).json({ok:true,data:team})
    }catch(err){
        next(err)
    }

}

exports.deleteTeam = async(req,res,next)=>{

    try{

        const team = await Team.findById(req.params.id);
        if(!team) throw ApiError.notFound("Equipo no encontrado");


        const pending = await Task.countDocuments({equipos:team._id});

        //verifica si el equipo tiene tareas asignadas antes de eliminarlo
        if(pending>0) throw ApiError.conflict(`El equipo tiene ${pending} tareas, procura eliminarlas o moverlas antes de borrarlo`);


        await team.deleteOne();
        await User.updateMany({teamId:team._id},{$unset:{teamId:""}}) //desvinculamos al usuario del equipo eliminado

        

        res.status(200).json({ok:true,message:"Equipo eliminado", data:{_id:team._id}})
    }catch(err){

        next(err)

    }



}

exports.getTeamStats = async (req,res,next)=>{

    try{

        const {id} = req.params

        //verificamos si el id es un ObjectId de forma manual ya que aggregate no lo convierte al contrario de .find()
        if(!mongoose.isValidObjectId(id)) throw ApiError.badRequest(`El id '${id}' no es valido`)
        if(!(await Team.exists({_id:id}))) throw ApiError.notFound("Equipo no encontrado");


        const rows = await Task.aggregate([

            {$match:{equipos: new mongoose.Types.ObjectId(id)}},
            {$group:{_id: "$estado", total:{$sum:1},avgPriority:{$avg:"$prioridad"}}},
            {$sort:{_id:1}}


        ]);


        const byStatus = Object.fromEntries(Task.ESTADOS.map((e)=>[e, 0]));
        let total = 0;

        for(const row of rows){

            byStatus[row._id] = row.total;
            total += row.total;

        }


        res.status(200).json({ok:true, data:{equipos:id,total,byStatus,detail:rows}})

    }catch(err){
        next(err)
    }



}
