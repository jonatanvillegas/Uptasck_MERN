import Proyecto from "../model/Proyecto.js";

const obtenerProyectos = async (req, res) => {
    //creando consulta mas avansada en mongoose 
    const proyectos = await Proyecto.find().where('creador').equals(req.usuario)
    res.json(proyectos)
};

const nuevoProyecto = async (req, res) => {
    const proyecto = new Proyecto(req.body)
    proyecto.creador = req.usuario._id

    try {
       const proyectoAlmacenado = await proyecto.save()
       res.json(proyectoAlmacenado)
    } catch (error) {
        console.log(error)
    }
};
const obtenerProyecto = async (req, res) => {
    //obteniendo valor de la url gracias al routing dinamico
    const {id} = req.params

    const proyecto = await Proyecto.findById(id).populate('tareas')

    if(!proyecto){
        const error = new Error('Proyecto no valido');
        return res.status(404).json({ msg: error.message });
    }
    //confirmando si es la persona que lo creo
    if(proyecto.creador._id.toString() !== req.usuario._id.toString()){
        const error = new Error('Accion no valida');
        return res.status(404).json({ msg: error.message });
    }

    res.json(proyecto)
};

const editarProyecto = async (req, res) => {
    //obteniendo valor de la url gracias al routing dinamico
    const { id } = req.params

    const proyecto = await Proyecto.findById(id)

    if (!proyecto) {
        const error = new Error('Proyecto no valido');
        return res.status(404).json({ msg: error.message });
    }
    //confirmando si es la persona que lo creo
    if (proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error('Accion no valida');
        return res.status(404).json({ msg: error.message });
    }

    proyecto.nombre = req.body.nombre || proyecto.nombre;
    proyecto.descripcion = req.body.descripcion || proyecto.descripcion;
    proyecto.fechaEntrega = req.body.fechaEntrega || proyecto.fechaEntrega;
    proyecto.cliente = req.body.cliente || proyecto.cliente;

    try {
        const proyectoActualizado = await proyecto.save()
        
        res.json(proyectoActualizado)
        
    } catch (error) {
            error = new Error('Accion no valida');
        return res.status(404).json({ msg: error.message });
    }

};
const eliminarProyecto = async (req, res) => {

 //obteniendo valor de la url gracias al routing dinamico
    const { id } = req.params
    //consultando la base de datos
    const proyecto = await Proyecto.findById(id)

    if (!proyecto) {
        const error = new Error('Proyecto no valido');
        return res.status(404).json({ msg: error.message });
    }
    //confirmando si es la persona que lo creo
    if (proyecto.creador._id.toString() !== req.usuario._id.toString()) {
        const error = new Error('Accion no valida');
        return res.status(404).json({ msg: error.message });
    }

    try {
        await proyecto.deleteOne()
        res.json({'msg': ' Proyecto eliminado correctamente'})
    } catch (error) {
        console.log(error)
    }
};
const agregarColaborador = async (req, res) => {

};
const eliminarColaborador = async (req, res) => {

};

export{
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyecto,
    eliminarProyecto,
    agregarColaborador,
    eliminarColaborador
}