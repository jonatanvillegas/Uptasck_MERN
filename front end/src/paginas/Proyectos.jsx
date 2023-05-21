import useProyectos from "../hooks/useProyectos"
import PreviewProyecto from "../components/PreviewProyecto"

const Proyectos = () => {

  const {proyectos} = useProyectos()

  return (
    <>
      <h2 className='text-3xl font-bold'>Proyectos</h2>

      <div className=" w-full bg-white shadow rounded-md mt-7 ">
        {proyectos.length 
        ? proyectos.map(proyecto => (
            <PreviewProyecto
              key={proyecto._id}
              proyecto={proyecto}
            />
        ))
         : <p className="text-center font-bold text-xl uppercase text-gray-600 p-2">no hay proyectos</p>
        }
      </div>
    </>
  )
}

export default Proyectos
