import Tarea from "../model/Tarea.js";
import Proyecto  from "../model/Proyecto.js";

const agregarTarea = async (req, res) => {
    const { proyecto } = req.body
    const existeProyecto = await Proyecto.findById(proyecto)

    if (!existeProyecto) {
        const error = new Error('proyecto no existe')
        return res.status(404).json({ msg: error.message })
    }

    if (existeProyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error('no tienes los permisos')
        return res.status(403).json({ msg: error.message })
    }
    try {
        const almacenarTarea = new Tarea(req.body)
        await almacenarTarea.save()
        res.json(almacenarTarea)
    } catch (error) {
        console.log(error)
    }
    res.json(existeProyecto)
}
const obtenerTarea = async (req, res) => {
    const { id } = req.params
    //mostrando toda la informacion con el metodo populate y con la propiedad especificada
    const tarea = await Tarea.findById(id).populate('proyecto')

    if (!tarea) {
        const error = new Error('Tarea no encontrada')
        return res.status(404).json({ msg: error.message })
    }
    if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error('Acion no valida')
        return res.status(403).json({ msg: error.message })
    }

    res.json(tarea)
  
}
const actualizarTarea = async (req, res) => {
    const { id } = req.params
    //mostrando toda la informacion con el metodo populate y con la propiedad especificada
    const tarea = await Tarea.findById(id).populate('proyecto')

    if (!tarea) {
        const error = new Error('Tarea no encontrada')
        return res.status(404).json({ msg: error.message })
    }
    if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error('Acion no valida')
        return res.status(403).json({ msg: error.message })
    }
    tarea.nombre = req.body.nombre || tarea.nombre
    tarea.descripcion = req.body.descripcion || tarea.descripcion
    tarea.estado = req.body.estado || tarea.estado
    
    res.json(tarea)
}
const eliminarTarea = async (req, res) => {
    const { id } = req.params
    //mostrando toda la informacion con el metodo populate y con la propiedad especificada
    const tarea = await Tarea.findById(id).populate('proyecto')

    if (!tarea) {
        const error = new Error('Tarea no encontrada')
        return res.status(404).json({ msg: error.message })
    }
    if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error('Acion no valida')
        return res.status(403).json({ msg: error.message })
    }
    try {
        await tarea.deleteOne()
        res.status(200).json({"msg": "eliminado correctamente "})
    } catch (error) {
        console.log(error)
    }

}
const cambiarEstadoTarea = async (req, res) => {
  
}

export {
    agregarTarea,
    obtenerTarea,
    actualizarTarea,
    eliminarTarea,
    cambiarEstadoTarea
}