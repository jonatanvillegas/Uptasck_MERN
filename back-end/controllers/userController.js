import Usuario from "../model/Usuario.js"
import generarID from "../helpers/generarID.js"
import generarToken from "../helpers/generarJWT.js";
import {emailRegistro, olvidePassword} from '../helpers/email.js'

const registrar = async (req, res) => {
    //verificar si un usuario existe
    const { email } = req.body;
    const usuario = await Usuario.findOne({ email });

    if (usuario) {
        const error = new Error('ya existe este usuario')
        return res.status(404).json({ "msg": error.message })
    }

    try {
        //creando la nueva instancia de usuario
        const usuario = new Usuario(req.body)
        //creando el token y guardandolo en la instancia 
        usuario.token = generarID()
        //.save funciona para guardar registros en la base de datos y editar
         await usuario.save()

         //enviar el email al usuario
           emailRegistro({
            email: usuario.email,
            nombre: usuario.nombre,
            token: usuario.token
           })

        res.json({'msg': "usuario creado correctamente"})

    }
    catch (error) {
        console.log(error)
    }

};
const autenticar = async (req, res) => {
    const { email, password } = req.body;

    //comprobar si el usuario existe
    const usuario = await Usuario.findOne({ email });
    
    if (!usuario) {
        const error = new Error('este usuario no existe');
        return res.status(404).json({ msg: error.message });
    }
    //comprobar si el usuario esta confirmado
    if (!usuario.confirmado) {
        const error = new Error('usuario no confirmado');
        return res.status(404).json({ msg: error.message });
    }
    //comprobar su password
    if (await usuario.compararPassword(password)) {
        //retornando propiedades del objeto que esta correcto
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarToken(usuario._id)
        });
    } else {
        const error = new Error('contrasena incorrecta');
        return res.status(404).json({ msg: error.message });
    }
};
const confirm = async (req, res) => {
    const { token } = req.params
    //obteniendo el token y evaluando si uno de los registros son iguales
    const usuarioConfirmado = await Usuario.findOne({ token });
    
    if (!usuarioConfirmado) {
        const error = new Error('token no valido');
        return res.status(403).json({ msg: error.message });
    }
    //modificando el registro y confirmando la cuenta
    try {
        usuarioConfirmado.confirmado = true;
        usuarioConfirmado.token = '';
        await usuarioConfirmado.save();
        return res.json({ "msg": "usuario confirmado correctamente" });
    } catch (error) {
        console.log(error)
    }
};
const recuperar = async (req, res) => {
    //extraer valores de un formulario 
    const { email } = req.body

    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
        const error = new Error('No existe este usuario')
        return res.status(404).json({ "msg": error.message })
    }
    try {
        usuario.token = generarID()
        await usuario.save()

        olvidePassword({
            email: usuario.email,
            nombre: usuario.nombre,
            token: usuario.token
        })

        res.json({ "msg": "hemos enviado un email con las instrucciones" })
    } catch (error) {

    }
};
const comprobarToken = async (req, res) => {
    //extraer valores de la url 
    const { token } = req.params
    
    const tokenValido = await Usuario.findOne({ token })

    if (tokenValido) {
        res.json({ 'msg': 'Token valido   y el usuario existe' });
    }else{
        const error = new Error('token no valido');
        return res.status(404).json({ msg: error.message }); 
    }
};
const nuevaPassword = async (req, res) => {
    const { token } = req.params
    const { password } = req.body
    console.log(token)
    

    const usuario = await Usuario.findOne({ token })
    
    if (usuario) {
        usuario.password = password;
        usuario.token = '';

        try {
            await usuario.save()
            res.json({ msg: "password modificado correctamente" })
        } catch (error) {
            console.log(error)
        }
    } else {
        const error = new Error('token valido');
        return res.status(404).json({ msg: error.message });
    }
};
const perfil = async (req, res) => {
  const {usuario} = req
  res.json(usuario)
}

export {
    registrar,
    autenticar,
    confirm,
    recuperar,
    comprobarToken,
    nuevaPassword,
    perfil
} 

