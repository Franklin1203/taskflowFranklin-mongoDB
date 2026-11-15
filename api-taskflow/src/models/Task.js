
const { model, Schema } = require("mongoose");


const ESTADOS = ["pendiente", "en_progreso", "completada"];


const taskSchema = new Schema(

    {

        titulo: {

            type: String,
            required: [true, "El titulo es obligatorio"], 
            trim: true, //elimina espacios de mas 
            minLength: [5, "El titulo debe tener minimo 5 caracteres"],
            maxLength: [120, "El titulo no puede pasar de 120 caracteres"]

        },
        estado: {
            type: String,
            enum: { values: ESTADOS, message: "El estado '{VALUE}' no es valido" },
            default: "pendiente"

        },
        prioridad: {
            type: Number,
            min: [1, "la prioridad debe ser minimo 1"],
            max: [5, "la prioridad no debe exceder 5"],
            default: 1
        },
        dueDate: {
            type: Date,   
            validate: {
                validator: (value) => !value || value >= new Date(new Date().toDateString()), //valida que la fecha no sea pasada
                message: "La fecha limite no puede estar en el pasado"
            },
        },
        asignado_a: {
            type: Schema.Types.ObjectId,
            ref: "User"  //para referenciar la tabla User
        },
        equipos: {
            type: Schema.Types.ObjectId,
            ref: "Team",
            required: [true, "La tarea debe pertenecer a un equipo"]
        },
        completedAt: Date,
    },
    { timestamps: true, collection: "Tasks" }
);


taskSchema.pre("save",function(){

    if(this.estado === "completada" && !this.completedAt){ //agrega fecha de completada en caso de no tenerla
        this.completedAt = new Date();
    }
    if(this.estado !== "done"){
        this.completedAt = undefined;  //retirar fecha en caso de aun no estar completada
    }

});

taskSchema.post("save",function(doc){
    console.log(`Tarea "${doc.titulo}" guardada con estado "${doc.estado}"`); //feedback luego de haberse creado la tarea
})

module.exports = model("Task", taskSchema);
module.exports.ESTADOS = ESTADOS
