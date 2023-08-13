import { createContext, useEffect, useState } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from 'react-router-dom'

const ProyectosContext = createContext()

const ProyectosProvider = ({ children }) => {

  const [proyectos, setProyectos] = useState([])
  const [alerta, setAlerta] = useState({})
  const [proyecto, setProyecto] = useState({})
  const [cargando1, setCargando1] = useState(false)
  const [modalFormularioTarea, setModalFormularioTarea] = useState(false)
  const navigate = useNavigate()

  const mostrarAlerta = alerta => {
    setAlerta(alerta)

    setTimeout(() => {
      setAlerta({})
    }, [3000])
  }
  //mostrando las tareas creadas por el usuario
  useEffect(() => {
    const obtenerProyectos = async () => {
      try {

        const token = localStorage.getItem('token')

        if (!token) return
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
        const { data } = await clienteAxios("/proyectos", config)
        setProyectos(data)
      }
      catch (error) {
        console.log(error)
      }
    }
    obtenerProyectos()
  }, [])


  //creando una nueva instancia para request hacia la api
  const SubmitProyecto = async proyecto => {

    if (proyecto.id) {
      editarProyecto(proyecto)
    } else {
      crearNuevoProyecto(proyecto)
    }
  }

  const editarProyecto = async proyecto => {
    
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await clienteAxios.put(`/proyectos/${proyecto.id}`, proyecto, config)

      const proyectoActualizados = proyectos.map(proyectoExistente => proyectoExistente._id === data._id ?
        data : proyectoExistente)

      
      setProyectos(proyectoActualizados)

      setAlerta({
        msg: 'Proyecto Actualizado correctamente',
        error: false
      })
      setTimeout(() => {
        setAlerta({})
        navigate('/proyectos')
      }, [3000])

    } catch (error) {
      console.log(error)
    }
  }
  const crearNuevoProyecto = async proyecto => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      const { data } = await clienteAxios.post("/proyectos", proyecto, config)
      //actualizando los proyectos cada ves que se cree uno
      setProyectos([...proyectos, data])

      setAlerta({
        msg: 'Proyecto creado correctamente',
        error: false
      })
      setTimeout(() => {
        setAlerta({})
        navigate('/proyectos')
      }, [3000])

    } catch (error) {

    }
  }

  const ObtenerProyecto = async id => {
    setCargando1(true)
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      const { data } = await clienteAxios(`/proyectos/${id}`, config)
      setProyecto(data)

    } catch (error) {
      console.log(error)
    } finally {
      setCargando1(false)
    }
  }

  const EliminarProyecto = async (id) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      const { data } = await clienteAxios.delete(`/proyectos/${id}`, config)
      
      //sincronizar el state
        const ProyectosAtualizados = proyectos.filter(proyectosExistentes => proyectosExistentes._id !== id )
        
        setProyectos(ProyectosAtualizados)

      setAlerta({
        msg: data.msg,
        error: false
      })

      setTimeout(() => {
        setAlerta({})
        navigate('/proyectos')
      }, [3000])
    } catch (error) {
      console.log(error)
    }
  }

  const handleModalTarea = () => {
    setModalFormularioTarea(!modalFormularioTarea)
  }
  

  return (
    <ProyectosContext.Provider
      value={{
        proyectos,
        mostrarAlerta,
        alerta,
        SubmitProyecto,
        ObtenerProyecto,
        proyecto,
        cargando1,
        EliminarProyecto,
        handleModalTarea,
        modalFormularioTarea
      }}
    >
      {children}
    </ProyectosContext.Provider>
  )
}
export {
  ProyectosProvider
}
export default ProyectosContext
