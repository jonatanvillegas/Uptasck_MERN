import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Alerta from '../components/Alerta'
import clienteAxios from '../config/clienteAxios'
import useAuth from "../hooks/useAuth"


function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alerta, setAlerta] = useState({})

  const navigate = useNavigate()
  const { setAuth } = useAuth()

  const handlesubmit = async e => {
    e.preventDefault()

    if ([email, password].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }

    try {
      const url = '/usuarios/login'
      const { data } = await clienteAxios.post(url, { email, password })
      
      setAlerta({})

      //cargando el token en local storage para las proximas request
      localStorage.setItem('token', data.token)
      //pasando los datos del usuario de manera global
      setAuth(data)
      navigate('/proyectos')

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const { msg } = alerta
  return (
    <>
      <h1 className='text-purple-600 text-5xl font-black capitalize'>Inicia sesion y administra tus
        <span className='text-slate-600'> proyectos</span>
      </h1>

      {msg && <Alerta alerta={alerta} />}
      <form className='my-10 bg-white shadow rounded-lg p-5' onSubmit={handlesubmit}>
        <div className='my-5'>
          <label className='text-gray-600 font-black uppercase block' htmlFor="email">Email</label>
          <input
            id='email'
            type="email"
            placeholder='Email de Registro'
            className='w-full mt-3 p-3 border rounded bg-gray-50'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className='my-5'>
          <label className='text-gray-600 font-black capitalize block' htmlFor="password">Password</label>
          <input
            id='password'
            type="password"
            placeholder='Password'
            className='w-full mt-3 p-3 border rounded bg-gray-50'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <input type="submit" className='bg-purple-600 w-full py-3 text-white uppercase font-bold rounded hover:bg-purple-800 hover:cursor-pointer mb-5' value='iniciar secion' />
      </form>

      <nav className='md:flex lg:justify-between'>
        <Link to='/registrar' className=" block text-center my-5 text-slate-500 capitalize text-sm">No tienes una cuenta? Registrate</Link>

        <Link to='/olvide-password' className=" block text-center my-5 text-slate-500 capitalize text-sm">olvide mi password</Link>
      </nav>
    </>
  )
}

export default Login
