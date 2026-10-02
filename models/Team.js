
const {Schema, model} = require("mongoose");


const teamSchema = new Schema(

    {

        nombre:{

            type:String,
            required:[true, "El nombre es obligatorio"],
            trim:true,
            minLength:[2, "El nombre debe tener minimo 2 caracteres"]

        },

        descripcion:{
            type:String,
            trim:true,
            minLength:[5, "La descripcion debe tener minimo 5 caracteres"]   
        },

        miembros:[{type:Schema.Types.ObjectId,ref:"User"}],

    },
    {timestamps:true, collection:"Teams"}

)

module.exports = model("Team", teamSchema);