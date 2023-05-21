import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const AsideBar = () => {
    const {auth}  = useAuth()
  return (
    <aside className='w-80 lg:w-96 px-5 py-10 '>
        <p className='text-xl font-bold'>Hola: {auth.nombre}</p>

        <Link
        to={'crear-proyecto'}
        className='from-purple-400 to-purple-600 bg-gradient-to-br p-3 border rounded-md text-white block mt-3 text-center
        uppercase font-bold
        '
        >
            Nuevo proyecto
        </Link>
    </aside>
  )
}

export default AsideBar
