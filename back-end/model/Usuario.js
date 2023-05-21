import mongoose from "mongoose";
import bcrypt from 'bcrypt'

//definiendo el esquema de la tabla usuario

const usuarioSchema = mongoose.Schema(
    {
        nombre: {
            type: String,
            require: true,
            trim: true,
        },
        password: {
            type: String,
            require: true,
            trim: true,
        },
        email: {
            type: String,
            require: true,
            trim: true,
            unique: true,
        },
        token: {
            type: String,
        },
        confirmado: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true, //se crearan dos culumnas mas una de creado y otra de actualizado  
    }

);
//midelwars mongoose
usuarioSchema.pre('save',async function(next){
    //isModified es una funcion de mongoose srive para verificar en este caso si el password ha sido moficicado
    if(!this.isModified("password")){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    //this se refiere al objeto usuario creado en los controladores
    this.password = await bcrypt.hash(this.password, salt)
})
usuarioSchema.methods.compararPassword = async function(password) {
    //comparando la pasword que exiten en el sistema
    return await bcrypt.compare(password, this.password)
}

const Usuario = mongoose.model("Usuario", usuarioSchema)

export default Usuario