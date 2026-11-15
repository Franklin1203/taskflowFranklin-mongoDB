
function pick(source, allowedFields){ //source es el req.body o req.query, y allowedFields los campos permitidos

    const result = {}; //para guardar los campos permitidos

    for(const field of allowedFields){ //recorremos y guardamos para campo

        if(source[field] !== undefined){
            result[field] = source[field];
        }
    }

    return result;


}

module.exports = pick