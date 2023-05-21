import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import AsideBar from "../components/AsideBar"
import Header from "../components/Header"
import Spinner from "../components/Spinner"
import useProyectos from "../hooks/useProyectos"

//logica para preveir que el usuario no visite el componente de proyecto gracias al obj que se esta retornado
//en userController
const Rutaprotegida = () => {

  const { auth, cargando } = useAuth()
  const{cargando1} = useProyectos()

  if (cargando) {
    return <div className="w-full h-full absolute"><Spinner/></div>
  }
  return (
    <>
      {auth._id ? (

        <div className="bg-gray-100">
          <Header />

          <div className="md:flex md:min-h-screen">
            <AsideBar />

            <main className={`${cargando1 ? ' flex-1 flex justify-center items-center' : 'flex-1 p-10'} `}>

              <Outlet />
            </main>
          </div>
        </div>
      )
        : <Navigate to={'/'} />}
    </>

  )
}

export default Rutaprotegida
