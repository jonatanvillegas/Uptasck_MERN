import { useEffect } from "react"
import { useParams } from "react-router-dom"
import useProyectos from '../hooks/useProyectos'
import Spinner from "../components/Spinner"
import { AiOutlineEdit } from '@react-icons/all-files/ai/AiOutlineEdit'
import { Link } from "react-router-dom"
import ModalFormularioTarea from "../components/ModalFormularioTarea"
import ModalEliminarTarea from "../components/ModalEliminarTarea"
import Tarea from "../components/Tarea"
import Alerta from "../components/Alerta"

const Proyecto = () => {

  const params = useParams()
  const { id } = params

  const { ObtenerProyecto, proyecto, cargando1 , handleModalTarea, alerta} = useProyectos()

 
  const { nombre } = proyecto
  useEffect(() => {
    ObtenerProyecto(id)
  }, [])

  const {msg} = alerta
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
          onClick={handleModalTarea}
          type="button"
          className="text-sm px-5 py-2  w-full md:w-auto rounded-lg uppercase font-bold bg-purple-500 text-white text-center mt-3"
        >
          Nueva tarea
        </button>

        <p className="font-bold text-xl mt-10">Tareas del proyecto</p>

        {msg && <Alerta alerta={alerta}/>}

        <div className="bg-white shadow mt-10 rounded-lg">
          {proyecto.tareas?.length ? 
          proyecto.tareas?.map(tarea => (
            <Tarea
              key={tarea._id}
              tarea={tarea}
            />
          )): 
          <p className="text-center my-5 p-10"> No hay tareas</p>
          }
        </div>

        <ModalFormularioTarea/>
        <ModalEliminarTarea/>
      </>
    )

  )
}

export default Proyecto
