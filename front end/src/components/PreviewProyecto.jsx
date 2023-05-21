import { Link } from "react-router-dom"
import { AiFillEye } from "@react-icons/all-files/ai/AiFillEye";

const PreviewProyecto = ({proyecto}) => {

    const {nombre, _id, cliente} = proyecto
  return (
    <div className='p-3 border-b flex'>
        
        <p className="flex-1">{nombre}
        <span className="text-gray-500 uppercase text-xs">{' '}{cliente}</span>
        </p>
        <Link
            to={`${_id}`}
            className="flex items-center justify-center"
        >
            <AiFillEye color="gray" size='1.2em' /> 
        </Link>
    </div>
  )
}

export default PreviewProyecto
