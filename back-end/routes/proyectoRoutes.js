import express from 'express';
import { 
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyecto,
    eliminarProyecto,
    agregarColaborador,
    eliminarColaborador
} from "../controllers/proyectoController.js";
import cheakAuth from '../middleware/cheackAuth.js';

const router = express.Router();

router.route('/').get(cheakAuth, obtenerProyectos).post(cheakAuth, nuevoProyecto)
router.route('/:id').get(cheakAuth,obtenerProyecto).put(cheakAuth,editarProyecto).delete(cheakAuth,eliminarProyecto)


router.post('/agregar-colaborador/:id', cheakAuth, agregarColaborador)
//un delete es para eliminar un resgitro comleto pero al utilizar post se puede eliminar una parte 
router.post('/eliminar-usuario/:id', cheakAuth, eliminarColaborador)

export default router

