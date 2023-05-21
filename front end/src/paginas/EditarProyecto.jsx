import useProyectos from "../hooks/useProyectos"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import Spinner from "../components/Spinner"
import FormularioProyecto from "../components/FormularioProyectos"

const EditarProyecto = () => {
    const params = useParams()
    const { id } = params
    const {ObtenerProyecto, proyecto, cargando1,EliminarProyecto} = useProyectos()

    useEffect(()=>{
        ObtenerProyecto(id)
      },[])
      const handlerClick = () => {
        if(confirm('esta seguro')){
          EliminarProyecto(id)
        }else{
          console.log('no')
        }
      }
  return (
    cargando1 ? <div className="absolute"><Spinner/></div>: (
    <div>
      <div className="flex gap-11 ">

      <h1 className="text-3xl font-bold uppercase">editar proyecto: {proyecto.nombre}</h1>

      <button
      onClick={handlerClick}
      className="text-gray-400 hover:text-black font-bold uppercase mt-4 "
      >Eliminar</button>
      </div>

      <div className="mt-5 flex justify-center">
        <FormularioProyecto/>
      </div>
    </div>
    )
  )
}

export default EditarProyecto
