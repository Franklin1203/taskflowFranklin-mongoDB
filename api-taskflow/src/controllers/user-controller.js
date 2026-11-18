
const User = require("../models/User");
const Team = require("../models/Team");
const Task = require("../models/Task");
const ApiError = require("../utils/ApiError");
const pick = require("../utils/pick");


const USER_CAMPOS = ["nombre", "email", "rol", "teamId"]


exports.getUsers = async (req, res, next) =>{

    try{

        const filter = pick(req.query,["rol","teamId"]);
        const data = await User.find(filter).sort({nombre:1}).populate("teamId","nombre").lean()


        res.status(200).json({ok:true,total:data.length,data});

    } catch(err){
        next(err)
    }
    

}

exports.getUserById = async (req,res,next) =>{

    try{

        const user = await User.findById(req.params.id).populate("teamId", "nombre").lean()
        if(!user) throw ApiError.notFound("Usuario no encontrado");


        res.status(200).json({ok:true, data:user});

    }catch(err){
        next(err)
    }


}


exports.createUser = async (req, res, next) =>{

    try{

        const campos = pick(req.body,USER_CAMPOS);
        if(campos.teamId && !(await Team.exists({_id: campos.teamId}))){
            throw ApiError.badRequest(`El equipo ${campos.teamId} no existe`)
        }

        const user = await User.create(campos);


        if(user.teamId){
            await Team.updateOne({_id: user.teamId},{$addToSet:{miembros:user._id}})
        }


        res.status(201).json({ok:true, data:user})

    }catch(err){
        next(err)
    }


}

exports.updateUser = async (req, res, next)=>{

    try{

        const campos = pick(req.body, USER_CAMPOS);
        if(Object.keys(campos).length ===0){

            throw ApiError.badRequest(`Envia al menos uno de estos campos: ${USER_CAMPOS.join(", ")}`);
        }

        if(campos.teamId && !(await Team.exists({_id:campos.teamId}))){
            throw ApiError.badRequest(`El equipo ${campos.teamId} no existe`)
        }

        const user = await User.findById(req.params.id);
        if(!user) throw ApiError.notFound("Usuario no encontrado");

        //verificamos si el usuario estaba en un equipo
        const previousTeam = user.teamId ? String(user.teamId) : null;
        user.set(campos);
        await user.save();

        //verificamos el equipo actual del nuevo usuario
        const newTeam = user.teamId ? String(user.teamId) : null;
        if(previousTeam !== newTeam){ //si se asigno un equipo diferente, actualizamos 

            if(previousTeam) await Team.updateOne({_id:previousTeam},{$pull:{miembros:user._id}})
            if(newTeam) await Team.updateOne({_id:newTeam},{$addToSet:{miembros:user._id}})   
        }

        res.status(200).json({ok:true, data:user})

    }catch(err){
        next(err)
    }


}


exports.deleteUser = async (req,res,next) =>{


    try{

        const user = await User.findByIdAndDelete(req.params.id);
        if(!user) throw ApiError.notFound("Usuario no encontrado");


        //eliminamos toda vinculacion a equipos o tareas para evitar conflictos 
        await Promise.all([

            Team.updateMany({miembros:user._id},{$pull:{miembros:user._id}}),
            Task.updateMany({asignado_a:user._id},{$unset:{asignado_a:""}})

        ]);

        res.status(200).json({ok:true, message:"Usuario eliminado",data:{_id: user._id}})

    }catch(err){
        next(err)
    }


}
