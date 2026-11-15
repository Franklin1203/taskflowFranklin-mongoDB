
const express = require('express');
const cors = require('cors')
const mongoose = require("mongoose");

const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");
const teamRoutes = require("./routes/teamRoutes");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
app.use(cors());
app.use(express.json({limit:"100kb"})); //limita el peso de lo que pongamos en el body


//para verificar el estado de nuestro servidor
app.get("/api/health",(req,res)=>{

    const states = ["desconectado", "conectado","conectando","desconectando"];
    res.status(200).json({
        ok:true,
        db: states[mongoose.connection.readyState] || "desconocido",
        database: mongoose.connection.name,
    });

});


app.use("/api/tasks",taskRoutes);
app.use("/api/users", userRoutes);
app.use("/api/teams",teamRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app