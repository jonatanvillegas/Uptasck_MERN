import { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({});
    const [cargando, setCargando] = useState(true)
    const navigate = useNavigate()

    useEffect(() =>{
        const autenticarToken = async () => {
            const token = localStorage.getItem('token')

            if(!token){
                setCargando(false)
                return
            }
            //pasando los parametros para la autenticacion de jsonwebtoken
            const config = {
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const {data} = await clienteAxios(`/usuarios/perfil`, config)
                
                setAuth(data)
                navigate('/proyectos')
            } catch (error) {
                
            }finally{
                setCargando(false)
            }
        }
        autenticarToken()
    },[])
    
  return (
        <AuthContext.Provider
         value={{
            setAuth,
            auth,
            cargando
         }}
        >
            {children}
        </AuthContext.Provider>
  )
}

export {
    AuthProvider
}
export default AuthContext