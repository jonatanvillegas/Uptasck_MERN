import FormularioProyecto from "../components/FormularioProyectos"

const NuevoProyecto = () => {
  return (
    <>
      <h2 className='text-3xl font-bold'>Crear proyecto</h2>

      <div className="mt-5 flex justify-center">
        <FormularioProyecto/>
      </div>
    </>
  )
}



export default NuevoProyecto
