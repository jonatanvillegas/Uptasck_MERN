import jwt from 'jsonwebtoken';
import Usuario from '../model/Usuario.js';

const cheackAuth = async (req, res, next) => {
  //revisano que el usuario este autenticado y el json web token sea valido
  let token
  //distintos tipos de berificacion el mas recomendado es bearer
  if (req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.PALABRA_SECRETA)
      //variable en node ||buscando el registro mediante el id gracias al jsonwt excluyendo el password
      req.usuario = await Usuario.findById(decoded.id).select('-password -token -createdAt -updatedAt -__v -confirmado');

      return next();
    } catch (error) {
      return res.status(404).json({ 'msg': 'hubo un error' });
    }

  }

  if (!token) {
    const error = new Error('Token no valido');
    return res.status(401).json({ msg: error.message })
  }

  next();
}

export default cheackAuth