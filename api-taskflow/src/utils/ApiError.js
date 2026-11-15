
class ApiError extends Error{

    constructor(message,statusCode){


        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this,this.constructor);

    }

 
    static badRequest(message){

        return new ApiError(message,400)


    }

    static notFound(message){

        return new ApiError(message,404)

    }

    static conflict(message){

        return new ApiError(message,409)
    }

    




}

module.exports = ApiError;