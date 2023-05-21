import jwt from "jsonwebtoken";

const generarToken = (id) => {
    //creando el jsonwebtoken no agregar informacion tan importante
  return jwt.sign({id}, process.env.PALABRA_SECRETA, {
    expiresIn: '5d'
  })
  
}
export default generarToken