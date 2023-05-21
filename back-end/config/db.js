import mongoose from "mongoose";

//creando la coexion con la base de datos 
const conectar = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
        );
        const url = `${connection.connection.host}:${connection.connection.port}`
        console.log(url)
    } catch (error) {
        console.log(`error: ${error.message}`)
        //cuando exista un error en la conexion de la database permitira que se pare el resto de procesos
        process.exit(1);
    }
}

export default conectar