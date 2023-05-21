import express from 'express'
import dotenv from 'dotenv';
import conectar from './config/db.js'
import userRoutes from './routes/userRoutes.js';
import proyectoRoutes from './routes/proyectoRoutes.js';
import tareaRoutes from './routes/tareaRoutes.js';
import cors from 'cors'

//nota, las importaciones en el back-end son con la extencion  type:module en el package.json

//creando el servido de la app con express 
const app = express();

//permitiendo que express pueda leer json
app.use(express.json())

//permitiendo  que express pueda leer las variables de entorno
dotenv.config();


//llamando a la conexion de la base de datos con mongoose
conectar(); 

//permitiendo las riquest del front end 
const whitelist = [process.env.FRONT_URL];

const corsOptions = {
    
    origin: function(origin,callback){
        
        if(whitelist.includes(origin)){
            //puede consultar la api
            callback(null,true)
        }else{
            //no esta permitido
            callback(new Error('Error de cors'))
        }
    }
}
app.use(cors(corsOptions));


//creando el routing 
app.use("/api/usuarios", userRoutes);
app.use("/api/proyectos", proyectoRoutes);
app.use('/api/tareas', tareaRoutes);

//creando la variable de entorno para cuando de despliegue el proyeto 
const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto ${PORT}`)
})

