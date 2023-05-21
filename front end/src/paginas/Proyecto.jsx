import { useEffect } from "react"
import { useParams } from "react-router-dom"
import useProyectos from '../hooks/useProyectos'
import Spinner from "../components/Spinner"
import {AiOutlineEdit} from '@react-icons/all-files/ai/AiOutlineEdit'
import { Link } from "react-router-dom"

const Proyecto = () => {

    const params = useParams()
    const { id } = params 

    const {ObtenerProyecto, proyecto, cargando1} = useProyectos()

    const {nombre} = proyecto

    useEffect(()=>{
      ObtenerProyecto(id)
    },[])
    
  return (
    cargando1 ? <div className="absolute"><Spinner /></div> : (
      <>
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold uppercase">{nombre}</h1>

          <div >
            <Link to={`/proyectos/editar/${id}`}
              className='flex gap-2 text-gray-400 hover:text-black font-bold uppercase'
            >
              <AiOutlineEdit size='1.5em' color='gray' /> Editar
            </Link>

          </div>

        </div>

        <button
          type="button"
          className="text-sm px-5 py-2 w-full md:w-auto rounded-lg uppercase font-bold bg-purple-500 text-white text-center mt-3"
        >
          Nueva tarea
        </button>
      </>
    )
    
  )
}

export default Proyecto
