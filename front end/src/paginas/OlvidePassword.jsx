import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";

function OlvidePassword() {

  const [email, setEmail] = useState('')
  const [alerta, setAlerta] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(email == '' || email.length < 6){
      setAlerta({
        error: true,
        msg:'El email es obligatorio'
      });
      return
    }

    try {
      //enviar los datos en formato json
      const {data} = await clienteAxios.post(`/usuarios/olvide-password`, {email})
      setAlerta({
        error:false,
        msg: data.msg
      })
      
    } catch (error) {
      setAlerta({
        error: true,
        msg: error.response.data.msg
      })
      
    }
  }

  const {msg} = alerta

  return (
    <>
      <h1 className='text-purple-600 text-5xl font-black capitalize'>recupera tu acceso y no pierdas tus
        <span className='text-slate-600'> proyectos</span>
      </h1>

        {msg && <Alerta alerta={alerta}/> }

      <form className='my-10 bg-white shadow rounded-lg p-5' onSubmit={handleSubmit}>
  
        <div className='my-5'>
          <label className='text-gray-600 font-black uppercase block' htmlFor="email">Email</label>
          <input 
          id='email' 
          type="email" placeholder='Email de Registro' 
          className='w-full mt-3 p-3 border rounded bg-gray-50'
          value={email}
          onChange={e => setEmail(e.target.value)}
           />
        </div>

        <input 
        type="submit" 
        className='bg-purple-600 w-full py-3 text-white uppercase font-bold rounded hover:bg-purple-800 hover:cursor-pointer mb-5'
         value='Enviar instrucciones' />
      </form>

      <nav className='md:flex lg:justify-between mx-4'>
       <Link to='/' className=" block text-center my-5 text-slate-500 capitalize text-sm">Ya tienes una cuenta?</Link>

       <Link to='/registrar' className=" block text-center my-5 text-slate-500 capitalize text-sm">No tienes una cuenta? Registrate</Link>
      </nav>
    </>
  )
}

export default OlvidePassword
