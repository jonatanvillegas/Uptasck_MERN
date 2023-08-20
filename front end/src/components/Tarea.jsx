import { formatearFecha } from "../helpers/FormatearFecha"
import useProyectos from "../hooks/useProyectos"
import ModalEliminarTarea from "./ModalEliminarTarea"

function Tarea({tarea}) {
    
    const {descripcion, nombre, prioridad,fechaEntrega, _id, estado} = tarea

    const {handleEliminarTarea, handleEditarTarea} = useProyectos()



  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div>
            <p className="mb-1 text-md font-bold">{nombre}</p>
            <p className="mb-1 text-sm">{descripcion}</p>
            <p className="mb-1 text-lg">{formatearFecha(fechaEntrega)}</p>
            <p className="mb-1 text-sm text-gray-400">Prioridad: {prioridad}</p>
      </div>

      <div>
        <button onClick={()=>  handleEditarTarea(tarea) } className="bg-indigo-600 text-sm mx-2 text-white rounded-md uppercase px-2 py-2">Editar</button>
        {estado ? 
        <button className="bg-green-500 text-sm mx-2 text-white rounded-md uppercase px-2 py-2">completa</button>
        :
        <button className="bg-gray-600 text-sm mx-2 text-white rounded-md uppercase px-2 py-2">incompleta</button>
        }
       
        <button onClick={()=>handleEliminarTarea(tarea)} className="bg-red-500 text-sm mx-2 text-white rounded-md uppercase px-2 py-2">Eliminar</button>
      </div>
    </div>
  )
}

export default Tarea
