import express from 'express';
import { 
    registrar, 
    autenticar, 
    confirm, 
    recuperar,
    comprobarToken,
    nuevaPassword,
    perfil
} from '../controllers/userController.js';
import cheakAuth from '../middleware/cheackAuth.js'

const router = express.Router();

//autenticacion, registro y confirmacion de usuarios
router.post('/', registrar); //crear un nuevo usuario
router.post('/login', autenticar);
router.get('/confirmar/:token', confirm);//con esos dos puntos generas routing dinamico con express
router.post('/olvide-password', recuperar);
router.route('/olvide-password/:token').get(comprobarToken).post(nuevaPassword) //dos metodos para una sola rutax`
//previniendo con el cheakA y esperando que este autenticado
router.get('/perfil', cheakAuth , perfil)
export default router