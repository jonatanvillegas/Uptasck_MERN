import mongoose from "mongoose";

const tareasSchema = mongoose.Schema(
    {
        nombre : {
            type : String,
            //eliminar espacios en blanco
            trim: true,
            require: true
        },
        descripcion : {
            type : String,
            //eliminar espacios en blanco
            trim: true,
            require: true
        },
        estado : {
            type : Boolean,
            default: false
        },
        fechaEntrega:{
            type: Date,
            default: Date.now(),
            require: true
        },
        prioridad : {
            type : String,
            enum: ['Baja','Media','Alta'],
            require: true
        },
        proyecto : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Proyecto"
        }
    },
    {
        timestamps: true,
    }
)
const Tarea = mongoose.model('Tarea', tareasSchema);
export default Tarea