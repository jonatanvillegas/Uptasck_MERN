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
  const [tarea, setTarea] = useState({})
  const [modalEliminar, setModalEliminar] = useState(false)

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
      const ProyectosAtualizados = proyectos.filter(proyectosExistentes => proyectosExistentes._id !== id)

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
    setTarea({})
  }
  const submitTarea = async tarea => {

    if (tarea?.id) {
      await EditarTarea(tarea)
    } else {
      await crearTarea(tarea)
    }


  }
  const EditarTarea = async (tarea) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      const { data } = await clienteAxios.put(`/tareas/${tarea.id}`, tarea, config)

      //creando una copia del proyecto
      const proyectoActualizado = { ...proyecto }
      //utilizando la copia para iterar en el arreglo de tareas para identificar la tarea modificada
      proyectoActualizado.tareas = proyectoActualizado.tareas.map(tareaState =>
        tareaState._id === data._id ? data : tareaState)
      setProyecto(proyectoActualizado)



      setAlerta({})
      setModalFormularioTarea(false)

    } catch (error) {
      console.log(error)
    }
  }

  const crearTarea = async (tarea) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      const { data } = await clienteAxios.post('/tareas', tarea, config)
      //agrega la tarea al state
      const proyectoActualizado = { ...proyecto }
      proyectoActualizado.tareas = [...proyecto.tareas, data]
      setProyecto(proyectoActualizado)
      setModalFormularioTarea(false)
      setAlerta({})

    } catch (error) {
      console.log(error)
    }
  }


  const handleEditarTarea = tarea => {
    setModalFormularioTarea(true)
    setTarea(tarea)
  }

  const handleEliminarTarea = async (tarea) => {
    setTarea(tarea)
    setModalEliminar(!modalEliminar)
  }

  const EliminarTarea = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      const { data } = await clienteAxios.delete(`/tareas/${tarea._id}`, config)
      console.log(data)
      //creando una copia del proyecto
      const proyectoActualizado = { ...proyecto }
      proyectoActualizado.tareas = proyectoActualizado.tareas.filter(tareaE => tareaE._id !== tarea._id)

      setProyecto(proyectoActualizado)

      setAlerta({
        msg: data.msg,
        error: false
      })

      setModalFormularioTarea(false)
      setTarea({})
      setModalEliminar(!modalEliminar)
      
      setTimeout(() => {
        setAlerta({})
      }, [2000])

    } catch (error) {
      console.log(error)
    }
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
        modalFormularioTarea,
        submitTarea,
        handleEliminarTarea,
        handleEditarTarea,
        tarea,
        modalEliminar,
        EliminarTarea
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
