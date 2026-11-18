
const app = require("./app.js");
const {connectDB, disconnectDB} = require("./config/db.js");


const PORT = Number(process.env.PORT) || 3008;


//conexion a la base de datos
async function start(){

    try{

        await connectDB(); 
        const server = app.listen(PORT,()=>{

            console.log(`TaskFlow MongoDB API corriendo en http://localhost:${PORT}/api`);
        });


        process.on("SIGINT",()=>{  //para desconectar el servidor de forma ordenada, deja de aceptar peticiones y culmina la que estan en proceso

            server.close(async ()=>{
                await disconnectDB();
                process.exit(0)
            });
        });

    }catch(err){
        console.error("No se pudo iniciar la API:", err.message);
        process.exit(1);

    }


}

start();