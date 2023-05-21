import { Link } from "react-router-dom"
import { AiOutlineSearch } from "@react-icons/all-files/ai/AiOutlineSearch";


const Header = () => {
  return (
    <header className='px-3 py-4 bg-white border-b mt-0 w-full'>
        <div className='md:flex md:justify-between'>
            <h2 className='text-4xl text-purple-600 font-black text-center'>
                Uptasck
            </h2>
              <div>
                    <AiOutlineSearch className="absolute mt-1 z-10 ml-1" size='1em' color="gray"/>
                  <input type="search" placeholder='Buscar proyecto'
                      className='rounded-lg lw:w-96 block px-6  border w-96 relative outline-none'
                  />
              </div>
            <div className="flex items-center gap-3">
                <Link 
                to='/proyectos' 
                className='font-bold uppercase'
                >Proyectos</Link>
                <button
                type="button"
                className="from-purple-400 to-purple-600 bg-gradient-to-br p-3 border rounded-md text-white"
                >
                    cerrar sesion
                </button>
            </div>
        </div>
    </header>
  )
}

export default Header
