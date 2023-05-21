import { useEffect, useState,useMemo } from "react"
import { useParams, Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios";

function ConfirmarCuenta() {

  const [alerta, setAlerta] = useState({})
  const [confirmar, setConfirmar] = useState(false)
  const params = useParams();
  const {id} = params

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/usuarios/confirmar/${id}`
        const { data } = await clienteAxios(url)

        setAlerta({
          error: false,
          msg: data.msg
        })

        setConfirmar(true)
      } catch (error) {
        setAlerta({
          error: true,
          msg: error.response.data.msg
        })
        setConfirmar(false)
      }
    }
    confirmarCuenta()
  }, [])
  
  //peticion con useMemo
  // const confirmarCuenta = async () => {
  //   try {
  //     const url = `${import.meta.env.VITE_BACK}/api/usuarios/confirmar/${id}`
  //     const { data } = await axios(url)

  //     setAlerta({
  //       msg: data.msg,
  //       error: false
  //     })
      
  //   } catch (error) {
  //     setAlerta({
  //       msg: error.response.data.msg,
  //       error: true
  //     })
  //   }
  // }

  // const ejemplo = useMemo(() => confirmarCuenta(), [])

  // ejemplo

  const {msg} = alerta

  return (
    <>
      <h1 className='text-purple-600 text-5xl font-black capitalize'>confirma tu cuenta para crear nuevos
        <span className='text-slate-600'> proyectos</span>
      </h1>
      <div className="mt-20 md:mt-5 shadow-lg bg-white px-3 py-8 rounded-md">
        {msg && <Alerta alerta={alerta}/>}

        {confirmar && (
          <Link to='/' className=" block text-center my-5 text-slate-500 capitalize text-sm">Inicia sesion</Link>
        )}
      </div>

    </>
  )
}

export default ConfirmarCuenta
