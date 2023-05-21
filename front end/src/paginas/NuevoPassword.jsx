import { useState, useEffect } from "react"
import { useParams, Link} from "react-router-dom"
import clienteAxios from "../config/clienteAxios"
import Alerta from "../components/Alerta"

function NuevoPassword() {

  const params = useParams()
  const {token} = params

 
  const [tokenValido, setTokenValido]= useState(false)
  const [password, setPassword] = useState('')
  const [alerta, setAlerta] = useState({})
  const [passwordModificado, setPasswordModificado]= useState(false)

  useEffect(() => {
    const comprobarToken = async () =>{
      try {
        await clienteAxios(`/usuarios/olvide-password/${token}`)
        setTokenValido(true)

      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      } 
    }
    comprobarToken()
  },[])


  const handlerNewPassword = async e => {
    e.preventDefault();

    if(password  < 6){
      setAlerta({
        msg: 'El password es de un minimo de 6 caracteres',
        error: true
      })
      return
    }

    try {
      const url = `/usuarios/olvide-password/${token}`
      const {data} =  await  clienteAxios.post(url, {password})
      setAlerta({
        error: false,
        msg: data.msg
      })
      setPasswordModificado(true)
      setPassword('')

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }
  
  const {msg} =  alerta
  return (
    <>
      <h1 className='text-purple-600 text-5xl font-black capitalize'>Restablece tu password y no pierdas acceso a tus
        <span className='text-slate-600'> proyectos</span>
      </h1>
      {msg && <Alerta alerta={alerta}/>}
      {tokenValido && (

        <form onSubmit={handlerNewPassword} className='my-10 bg-white shadow rounded-lg p-5'>

          <div className='my-5'>
            <label className='text-gray-600 font-black capitalize block' htmlFor="password">Nueva Password</label>
            <input
              id='password'
              type="password"
              placeholder='Escribe tu nueva Password'
              className='w-full mt-3 p-3 border rounded bg-gray-50'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <input type="submit" className='bg-purple-600 w-full py-3 text-white uppercase font-bold rounded hover:bg-purple-800 hover:cursor-pointer mb-5' value='guardar nuevo password' />
        </form>
      )}
       {passwordModificado && (
          <Link to='/' className=" block text-center my-5 text-slate-500 capitalize text-sm">Inicia sesion</Link>
        )}
    </>
  )
}

export default NuevoPassword
