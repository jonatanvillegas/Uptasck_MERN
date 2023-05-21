import { Link } from "react-router-dom";
import { useState } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";

function Registrar() {

  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [Rpassword, setRpassword] = useState('')
  const [alerta, setAlerta] = useState({})


const handleSubmit = async (e) => {
  e.preventDefault()

  if([nombre,email,password,Rpassword].includes('')){
    setAlerta({
      msg: 'todos los campos son obligatorios',
      error:true
    })
    return
  }

  if(password !== Rpassword){
    setAlerta({
      msg: 'Los passwords no son iguales',
      error:true
    })
    return
  }
  if(password.length < 6){
    setAlerta({
      msg: 'El password es inseguro, Agrega un minimo de 6 caracteres',
      error:true
    })
    return
  }

  setAlerta({})

  //crear el usuario  en la API
  try {
    const {data} = await clienteAxios.post(`/usuarios`,{nombre, password, email})

    setAlerta({
      msg: data.msg,
      error: false
    })

    setNombre('')
    setEmail('')
    setPassword('')
    setRpassword('')

  } catch (error) {
    setAlerta({
      msg: error.response.data.msg,
      error: true
    })
  }
}

const {msg} = alerta

  return(
    <>
      <h1 className='text-purple-600 text-5xl font-black capitalize'>crea tu cuenta y administra tus
        <span className='text-slate-600'> proyectos</span>
      </h1>

      {msg && <Alerta alerta={alerta}/>}

      <form className='my-10 bg-white shadow rounded-lg p-5' onSubmit={handleSubmit}>

        <div className='my-5'>
          <label className='text-gray-600 font-black uppercase block' htmlFor="nombre">nombre</label>

          <input id='nombre'
            type="nombre"
            placeholder='Tu nombre'
            className='w-full mt-3 p-3 border rounded bg-gray-50'
            value={nombre} 
            onChange={e => setNombre(e.target.value)}
            />
        </div>

        <div className='my-5'>
          <label className='text-gray-600 font-black uppercase block'
            htmlFor="email">
            Email
          </label>

          <input id='email'
            type="email"
            placeholder='Email de Registro'
            className='w-full mt-3 p-3 border rounded bg-gray-50'
            value={email} 
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className='my-5'>
          <label className='text-gray-600 font-black capitalize block'
            htmlFor="password">
            Password
          </label>
          <input id='password'
            type="password"
            placeholder='Password'
            className='w-full mt-3 p-3 border rounded bg-gray-50'
            value={password} 
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <div className='my-5'>
          <label className='text-gray-600 font-black capitalize block'
            htmlFor="Rpassword">
            Repite Password
          </label>
          <input id='Rpassword'
            type="password"
            placeholder='Repetir tu Password'
            className='w-full mt-3 p-3 border rounded bg-gray-50'
            value={Rpassword} 
            onChange={e => setRpassword(e.target.value)}
          />
        </div>
        <input type="submit" className='bg-purple-600 w-full py-3 text-white uppercase font-bold rounded hover:bg-purple-800 hover:cursor-pointer mb-5' value='crear cuenta' />
      </form>

      <nav className='md:flex lg:justify-between'>
       <Link to='/' className=" block text-center my-5 text-slate-500 capitalize text-sm">Ya tienes una cuenta?</Link>

       <Link to='/olvide-password' className=" block text-center my-5 text-slate-500 capitalize text-sm">olvide mi password</Link>
      </nav>
    </>
  )
}

export default Registrar
