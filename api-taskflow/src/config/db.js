
require("dotenv").config({quiet:true});
const mongoose = require("mongoose");

//evita que se inyecte codigo puro noSql a la base de datos
mongoose.set("sanitizeFilter",true);

mongoose.connection.on("connected",()=>{
     console.log(`MongoDB Conectado -> base de datos: ${mongoose.connection.name}`);
})

mongoose.connection.on("error",(err)=>{
    console.error("Error en la conexion con MongoDB",err.message);
})

mongoose.connection.on("disconnected",()=>{
    console.log("MongoDB desconectado")
})



async function connectDB(){

    const uri = process.env.MONGO_URI
    if(!uri){
        throw new Error("Falta MONGO_URI en el archivo .env")
    }


    await mongoose.connect(uri,{

        dbName: process.env.MONGO_DB_NAME || "tasksflow",

        maxPoolSize: Number(process.env.MONGO_MAX_POOL_SIZE) || 10, //maximo 10 conexiones simultaneas
        serverSelectionTimeoutMS: 10000 //tiempo maximo de espera para encontrar servidor

    });


}

async function disconnectDB() {

    await mongoose.disconnect();
  
    
}

module.exports = {connectDB, disconnectDB};