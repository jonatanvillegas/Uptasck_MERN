import mongoose from "mongoose";

const proyectosSchema = mongoose.Schema(
    {
        nombre: {
            type: String,
            trim: true,
            require: true,
        },
        descripcion: {
            type: String,
            trim: true,
            require: true,
        },
        fechaEntrega: {
            type: Date,
            default: Date.now(),
            require: true,
        },
        cliente: {
            type: String,
            trim: true,
            require: true,
        },
        creador: {
            //lo que se almacena aca hace referencia a la tabla Usuarios
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Usuario',
        },
        colaboradores: [
            //tendra multiples colaboradores el ObjectId se encuentra en el id por defecto que genera al agregar un nuevo usuario
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Usuario',
            },
        ],
    },
    {
        timestamps: true
    }
);

const Proyecto  = mongoose.model("Proyecto", proyectosSchema);
export default Proyecto