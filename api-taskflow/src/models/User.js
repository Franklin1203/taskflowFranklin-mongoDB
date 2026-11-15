
const {Schema, model} = require("mongoose");


const userSchema = new Schema(

    {

        nombre:{
            type:String,
            required:[true,"El nombre es obligatorio"],
            trim: true,
        },
        email:{
            type: String,
            required:[true, "El email es obligatorio"],
            unique:true,
            lowercase:true,
            trim:true,
            match:[/^\S+@\S+\.\S+$/, "El email no tiene formato valido"] //verificamos formato valido de email
        },
        rol:{
            type: String,
            enum:{
                values:["developer", "designer", "qa", "lead"],
                message:"El rol '{VALUE}' no es valido",     
            },
            default:"developer",
        },
        teamId:{type: Schema.Types.ObjectId, ref:"Team"}
    },

    {timestamps: true, collection:"Users"}

);

module.exports = model("User", userSchema);