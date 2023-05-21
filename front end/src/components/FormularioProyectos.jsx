import { useState,useEffect } from "react"
import useProyectos from "../hooks/useProyectos"
import Alerta from './Alerta'
import { useParams } from "react-router-dom"


const FormularioProyecto = () => {

  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [fechaEntrega, setFechaEntrega] = useState('')
  const [cliente, setCliente] = useState('')
  const [id, setId] = useState(null)

  const {mostrarAlerta, alerta, SubmitProyecto, proyecto} = useProyectos()
  //evaluando si el formulario se esta utilizando para crear un proyeto o para editar
  const params = useParams()
  
  useEffect(() => {
    if(params.id){
      
      setId(proyecto._id)  
      setNombre(proyecto.nombre)
      setDescripcion(proyecto.descripcion)
      //cortando datos innecesarios en la fecha
      setFechaEntrega(proyecto.fechaEntrega?.split('T')[0])
      setCliente(proyecto.cliente)
    }
  },[params])
  
  const handleSubmit = async e => {
    e.preventDefault()
    if ([nombre,descripcion,fechaEntrega,cliente].includes('')) {
        mostrarAlerta({
          error:true,
          msg: 'todos los campos son obligatorios'
        })
        return
    }
    await SubmitProyecto({id,nombre,descripcion,fechaEntrega,cliente})

    setId(null)
    setNombre('')
    setDescripcion('')
    setFechaEntrega('')
    setCliente('')
  }
  
  const {msg} = alerta
  return (
    <form className='my-5 bg-white shadow rounded-lg p-5 py-10 md:w-1/2' onSubmit={handleSubmit}>

      {msg && <Alerta alerta={alerta}/>}

      <div className="mb-5">
        <label htmlFor="nombre" className='text-gray-700 uppercase font-bold text-sm'> nombre</label>
        <input
          id='nombre'
          type="text"
          className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          placeholder='Nombre del proyecto'
          value={nombre}
          onChange={e => setNombre(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label htmlFor="descripcion" className='text-gray-700 uppercase font-bold text-sm'>descripcion </label>
        <textarea
          id='descripcion'
          className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          placeholder='Descripcion del proyecto'
          value={descripcion}
          onChange={e => setDescripcion(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label htmlFor="fecha" className='text-gray-700 uppercase font-bold text-sm'> fecha</label>
        <input
          id='fecha'
          type="date"
          className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          value={fechaEntrega}
          onChange={e => setFechaEntrega(e.target.value)}
        />
      </div>
      <div >
        <label htmlFor="cliente" className='text-gray-700 uppercase font-bold text-sm'> cliente</label>
        <input
          id='cliente'
          type="text"
          className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          placeholder='cliente del proyecto'
          value={cliente}
          onChange={e => setCliente(e.target.value)}
        />
      </div>

      <input type="submit" value={id ?'guardar cambios':'Crear proyecto'} 
      className='from-purple-400 to-purple-600 bg-gradient-to-br w-full p-3 border rounded-md text-white block mt-3 text-center
      uppercase font-bold cursor-pointer '
      />
    </form>
  )
}

export default FormularioProyecto
