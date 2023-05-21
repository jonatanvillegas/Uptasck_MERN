import express from 'express';
import {
    agregarTarea, 
    obtenerTarea,
    actualizarTarea,
    eliminarTarea,
    cambiarEstadoTarea
} from '../controllers/tareaController.js'
import cheackAuth from '../middleware/cheackAuth.js';

const router = express.Router();

router.post('/',cheackAuth, agregarTarea);

router.route('/:id')
.get(cheackAuth,obtenerTarea)
.put(cheackAuth,actualizarTarea)
.delete(cheackAuth,eliminarTarea);

router.post('/estado/:id',cheackAuth, cambiarEstadoTarea)

export default router
