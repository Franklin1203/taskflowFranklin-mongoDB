
const ApiError = require('../utils/ApiError');

const notFound = (req, res, next) =>{

    next(new ApiError(`Ruta no encontrada: ${req.method} ${req.originalUrl}`,404))
}

module.exports = notFound