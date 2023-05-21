import nodemailer from 'nodemailer'


//obteniendo datos de cortroller usuario
export const emailRegistro = async (datos) => {
    const { email, nombre, token } = datos

    //configurando el cliente para enviar el email tambien se puede realizar con google
    const  transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
    // informacion del email
      const info = await transport.sendMail({
        from: '"Uptask - Administrador" <nuevo@uptask.com>',
        to: email,
        subject: 'Uptask - comprueba tu cuenta',
        text: 'comprueba tu cuenta en Uptask',
        html: `<p> ${nombre}comprueba tu cuenta en Uptask</p>
        <p>Tu cuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace</p>
        <p><a href="${process.env.FRONT_URL}/confirmar/${token}">Verificar tu cuenta</a></p>
        `
      })
}

export const olvidePassword = async (datos) => {
  const { email, nombre, token } = datos

  //configurando el cliente para enviar el email tambien se puede realizar con google
  //TODO: Mover hacia variables de entorno
  const  transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
    });
  // informacion del email
    const info = await transport.sendMail({
      from: '"Uptask - Administrador" <nuevo@uptask.com>',
      to: email,
      subject: 'Uptask - Reestablece tu password',
      text: '',
      html: `<p> Hola ${nombre} has solicitado reestablecer tu password</p>
      
      <p>sigue el siguiente paso para generar un nuevo password </p>

      <a href="${process.env.FRONT_URL}/olvide-password/${token}">Reestablecer password</a>
      
      <p> si tu no solicitaste cambiar password, ignora el mensaje</p>
      `
    })
}
