const ApiError = require('../utils/ApiError')

const errorHandler = (err,req,res,next) =>{


    let error = {...err}; //hacemos copia de los errores
    error.message = err.message;
    error.name = err.name


    //manejamos los errores de mongoose para mostrarlos en postman
    if(err.name === 'ValidationError'){ 

        const mensajes = Object.values(err.errors).map(e => e.message); //mapeamos los errores (los mensajes)

        error = ApiError.badRequest(mensajes.join(', '))
    }

    if(err.code === 11000){

        error = ApiError.conflict("Ya existe un usuario con ese email")
    }
    
    
    
    const statusCode = error.statusCode || 500


    const message = error.isOperational ? error.message : 'Error interno del servidor'


    if(!error.isOperational){
        console.error(err);
    }


    res.status(statusCode).json({
        error: message
    });



}

module.exports = errorHandler