const Admin = require('../models/adminModel')
const emailConfigs = require('./emailConfig')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const crypto = require('crypto')
const { Op } = require('sequelize') // Asegúrate de importar Op de sequelize

let currentEmailConfigIndex = 0
let emailConfigFound = false

async function sendMail(to, subject, text) {
  const emailConfig = await getActiveEmailConfig()

  const transporter = nodemailer.createTransport(emailConfig)

  const mailOptions = {
    from: emailConfig.auth.user,
    to: to,
    subject: subject,
    text: text,
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo:', error)
    } else {
      console.log('Correo enviado:', info.response)
    }
  })
}

async function getActiveEmailConfig() {
  while (currentEmailConfigIndex < emailConfigs.length && !emailConfigFound) {
    const emailConfig = emailConfigs[currentEmailConfigIndex];

    const transporter = nodemailer.createTransport(emailConfig);

    try {
      await transporter.sendMail({
        from: emailConfig.auth.user,
        to: 'info@alzados.org',
        subject: 'Correo de prueba',
        text: 'Este es un correo de prueba para verificar si la configuración de correo electrónico está bloqueada',
      });

      emailConfigFound = true;
    } catch (error) {
      console.error('Error al enviar el correo de prueba. Intentando con la siguiente configuración de correo electrónico.', error);

      currentEmailConfigIndex = (currentEmailConfigIndex + 1) % emailConfigs.length;
    }
  }

  if (emailConfigFound) {
    return emailConfigs[currentEmailConfigIndex];
  } else {
    throw new Error('No se encontró ninguna configuración de correo electrónico válida.');
  }
}

// Mapeo de hospitales a correos electrónicos de administradores
const emailMap = {
  'LA PALMA': 'intersindicalhuc@alzados.org',
  'LA GOMERA': 'intersindicalhunsc@alzados.org',
  'EL HIERRO': 'intersindicalhunsc@alzados.org',
  FUERTEVENTURA: 'intersindicalfuerteventura@alzados.org',
  LANZAROTE: 'intersindicallanzarote@alzados.org',
  'Hospital Universitario de Canarias': 'intersindicalhuc@alzados.org',
  'Complejo Hospitalario de la Candelaria': 'intersindicalhunsc@alzados.org',
  'GAP Tenerife': 'intersindicalhunsc@alzados.org',
  CHUIMI: 'intersindicalgrancanaria@alzados.org',
  Negrín: 'intersindicalgrancanaria@alzados.org',
  'Atención Primaria Gran Canaria': 'intersindicalgrancanaria@alzados.org',
  'JASS Cabildo': 'intersindicalgrancanaria@alzados.org',
  'Centros Privados': 'intersindicalgrancanaria@alzados.org',
}

async function login(req, res) {
  try {
    const admin = await Admin.findOne({
      where: {
        email: req.body.email,
      },
    })

    if (!admin) return res.status(401).send('Email o contraseña incorrectos')

    // Verifica si el usuario está activo antes de comparar la contraseña
    if (admin.isActive === false) {
      return res.status(401).send('Su cuenta aún no está activada.')
    }

    bcrypt.compare(req.body.password, admin.password, (err, result) => {
      if (err) return res.status(500).send(err)
      if (!result) return res.status(401).send('Email o contraseña incorrectos')

      // Añade todos los campos necesarios al payload del token
      const payload = {
        id: admin.id, // Asegúrate de incluir el id del administrador
        email: admin.email,
        password: admin.password,
        name: admin.name,
        surName: admin.surName, // Añade el apellido si es necesario
        nif: admin.nif, // Añade el NIF si es necesario
        mobile: admin.mobile, // Añade el móvil si es necesario
        category: admin.category, // Añade la categoría si es necesario
        hospital: admin.hospital,
        workPlace: admin.workPlace,
        isAdmin: admin.isAdmin,
        isActive: admin.isActive, // Añade el estado de activación si es necesario
      }
      const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' })
      return res.status(200).json({
        token: token,
        isAdmin: admin.isAdmin,
        name: admin.name,
        id: admin.id,
      })
    })
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

// Función auxiliar para validar el email
const validateEmail = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

// Función auxiliar para validar el NIF
const validateNIF = (nif) => {
  const re = /^[XYZ]?\d{5,8}[A-Z]$/ // Ajusta esta expresión regular a tus necesidades
  return re.test(nif.toUpperCase())
}

// Función auxiliar para validar la contraseña
const validatePassword = (password) => {
  // Asegúrate de que la contraseña tenga al menos 8 caracteres, una letra y un número
  const re = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d\S]{8,}$/
  return re.test(password)
}

async function signup(req, res) {
  try {
    let {
      name,
      surName,
      nif,
      email,
      password,
      mobile,
      category,
      hospital,
      workPlace,
    } = req.body

    console.log('Inicio del registro:', req.body) // Log de inicio

    // Convertir la letra del NIF a mayúscula
    nif = nif.toUpperCase()

    // Validaciones
    if (!validateEmail(email)) {
      console.error('Error de validación: Email inválido')
      return res.status(400).send('El formato del email no es válido.')
    }
    if (!validateNIF(nif)) {
      console.error('Error de validación: NIF inválido')
      return res.status(400).send('El formato del NIF no es válido.')
    }
    if (!validatePassword(password)) {
      console.error('Error de validación: Contraseña inválida')
      return res
        .status(400)
        .send(
          'La contraseña debe tener al menos 8 caracteres incluyendo una letra mayúscula y un número.'
        )
    }

    // Hashear la contraseña
    const hashedPassword = bcrypt.hashSync(password, 10)

    // Crear el administrador
    const admin = await Admin.create(
      {
        name,
        surName,
        nif,
        email,
        password: hashedPassword,
        mobile,
        category,
        hospital,
        workPlace,
        isAdmin: false,
        isActive: false,
      },
      {
        fields: [
          'name',
          'surName',
          'nif',
          'email',
          'password',
          'mobile',
          'category',
          'hospital',
          'workPlace',
          'isAdmin',
          'isActive',
        ],
      }
    )

    console.log('Administrador creado con éxito:', {
      id: admin.id,
      email: admin.email,
    }) // Log de éxito

    // Generar el token JWT
    const payload = { email: admin.email }
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' })

    // Log del token
    console.log('Token generado:', token)
    // Obtener el correo electrónico del administrador basado en el hospital
    const adminEmail = workPlace ? emailMap[workPlace] : emailMap[hospital]

    if (adminEmail) {
      // Enviar correo electrónico al usuario registrado
      sendMail(
        email,
        'Registro exitoso',
        'Te has registrado exitosamente. Un administrador verificará sus datos de afiliad@ y, posteriormente, recibirás un email de activación de la cuenta, entonces podrás iniciar sesión.'
      )

      // Enviar correo electrónico al administrador correspondiente
      sendMail(
        adminEmail,
        'Nuevo registro',
        `El usuario ${email} con NIF/NIE: ${nif} se ha registrado exitosamente.`
      )
    } else {
      console.error('Hospital no encontrado en el mapeo')
    }

    // Respuesta exitosa
    return res.status(200).json({ token: token })
  } catch (error) {
    // Log del error
    console.error('Error en la función signup:', error)

    // Manejo de errores específicos
    if (error.name === 'SequelizeUniqueConstraintError') {
      const field = error.errors[0].path
      console.error('Error de restricción de unicidad:', field)
      if (field === 'email') {
        return res.status(400).send('El email ya está en uso.')
      } else {
        return res.status(400).send(`El campo ${field} ya está en uso.`)
      }
    }
    // Respuesta de error
    return res.status(500).send(error.message)
  }
}

async function getAdminsByHospital(req, res) {
  try {
    // Asumiendo que el correo electrónico del admin está incluido en el token JWT
    const authHeader = req.headers.authorization
    const tokenStart = authHeader.indexOf(' ') + 1 // Encontrar el inicio del token
    const token = authHeader.substring(tokenStart) // Extraer el token del header
    const decoded = jwt.verify(token, process.env.SECRET) // Decodificar el token

    // Obtener la lista de hospitales y centros de trabajo basados en el correo electrónico del admin
    const adminHospitalsAndCenters = Object.keys(emailMap).filter(
      (key) => emailMap[key] === decoded.email
    )

    const admins = await Admin.findAll({
      where: {
        [Op.or]: [
          { hospital: adminHospitalsAndCenters },
          { workPlace: adminHospitalsAndCenters },
        ],
      },
    })

    return res.status(200).json(admins)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const sendActivationEmail = async (to, name) => {
  const mailOptions = {
    from: 'info@alzados.org', // Reemplaza con tu correo
    to: to,
    subject: 'Cuenta Activada',
    text: `Hola ${name},\n\nTu cuenta ha sido activada y ya puedes iniciar sesión.\n\nSaludos,\nEl Equipo de Soporte`,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('Correo de activación enviado a:', to)
  } catch (error) {
    console.error('Error al enviar el correo de activación:', error)
  }
}

async function updateAdmin(req, res) {
  try {
    const { id } = req.params
    const {
      name,
      surName,
      nif,
      email,
      mobile,
      category,
      hospital,
      workPlace,
      isActive,
      newPassword,
    } = req.body

    console.log('Nueva contraseña recibida:', newPassword) // Agregar para depuración

    const admin = await Admin.findOne({ where: { id } })

    if (!admin) {
      return res.status(404).json({ message: 'Administrador no encontrado' })
    }

    let isPasswordUpdated = false
    let wasActiveUpdated = admin.isActive !== isActive

    if (newPassword && newPassword.trim()) {
      const currentHashedPassword = admin.password
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(newPassword, salt)

      if (currentHashedPassword !== hashedPassword) {
        await admin.update({ password: hashedPassword })
        isPasswordUpdated = true
      }
    }

    admin.name = name
    admin.surName = surName
    admin.nif = nif
    admin.email = email
    admin.mobile = mobile
    admin.category = category
    admin.hospital = hospital
    admin.workPlace = workPlace
    admin.isActive = isActive

    await admin.save()

    if (wasActiveUpdated && isActive === true) {
      await sendActivationEmail(email, name)
    }

    const updatedAdmin = admin.toJSON()
    delete updatedAdmin.password

    console.log('Contraseña actualizada:', isPasswordUpdated)
    return res.status(200).json(updatedAdmin)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

async function getAdminById(req, res) {
  try {
    const { id } = req.params // Obtener el ID del administrador de los parámetros de la ruta
    const admin = await Admin.findOne({ where: { id } })

    if (!admin) {
      return res.status(404).send('Administrador no encontrado')
    }

    return res.status(200).json(admin)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

// Función para iniciar el proceso de restablecimiento de contraseña
async function forgotPassword(req, res) {
  const { email } = req.body
  const user = await Admin.findOne({ where: { email } })
  if (!user) {
    return res.status(404).send('Usuario no encontrado')
  }

  // Generar token seguro
  const resetToken = crypto.randomBytes(20).toString('hex')

  // Establecer la fecha de caducidad del token, por ejemplo, 1 hora desde ahora
  const expireDate = new Date()
  expireDate.setHours(expireDate.getHours() + 1)

  // Guardar el token y la fecha de caducidad en la base de datos
  user.resetPasswordToken = resetToken
  user.resetPasswordExpires = expireDate
  await user.save()

  // Enviar correo electrónico con el token en el cuerpo del mensaje
  const message = `Has solicitado restablecer tu contraseña. Copia y pega el siguiente token en la página de restablecimiento de contraseña: ${resetToken}`

  try {
    await sendMail(
      user.email,
      'Instrucciones para restablecer la contraseña',
      message
    )
    res.status(200).send('Correo de recuperación enviado.')
  } catch (error) {
    res.status(500).send('Error al enviar el correo de recuperación.')
  }
}

// Función para permitir al usuario restablecer su contraseña
async function resetPassword(req, res) {
  const { token, newPassword } = req.body
  // Buscar el usuario por el token y verificar que no haya expirado
  const admin = await Admin.findOne({
    where: {
      resetPasswordToken: token,
      resetPasswordExpires: {
        [Op.gt]: Date.now(), // Usar Op.gt para la comparación
      },
    },
  })

  if (!admin) {
    return res.status(400).send('Token inválido o expirado')
  }

  // Hashear la nueva contraseña
  const hashedPassword = await bcrypt.hash(newPassword, 10)

  // Actualizar la contraseña del usuario en la base de datos
  admin.password = hashedPassword
  admin.resetPasswordToken = null
  admin.resetPasswordExpires = null
  await admin.save()

  res.status(200).send('Contraseña actualizada con éxito')
}

async function getResetPasswordToken(req, res) {
  const { token } = req.params

  try {
    // Buscar al usuario con el token proporcionado y verificar que no haya expirado
    const user = await Admin.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: {
          [Op.gt]: new Date(), // Asegúrate de que el token no haya expirado
        },
      },
    })

    if (!user) {
      // Si no se encuentra el usuario o el token ha expirado, enviar una respuesta de error
      return res.status(404).json({
        message:
          'El enlace de restablecimiento de contraseña es inválido o ha expirado.',
      })
    }

    // Si el token es válido, redirigir al usuario a la página de restablecimiento de contraseña en el cliente
    // Asegúrate de que la URL de redirección sea correcta y coincida con la configuración de tu cliente React
    res.redirect(`https://${req.headers.host}/reset-password/${token}`)
  } catch (error) {
    // Manejar cualquier error que ocurra durante el proceso
    console.error(
      'Error al obtener el token de restablecimiento de contraseña:',
      error
    )
    res
      .status(500)
      .json({ message: 'Error interno del servidor al procesar la solicitud.' })
  }
}

async function deleteAdminById(req, res) {
  try {
    const { id } = req.params // Obtener el ID del administrador de los parámetros de la ruta
    const admin = await Admin.findOne({ where: { id } })

    if (!admin) {
      return res.status(404).send('Administrador no encontrado')
    }

    await admin.destroy() // Utiliza el método adecuado para eliminar el registro en tu ORM
    return res.status(200).send('Administrador eliminado con éxito')
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

module.exports = {
  login,
  signup,
  getAdminsByHospital,
  getAdminById,
  updateAdmin,
  forgotPassword,
  resetPassword,
  getResetPasswordToken,
  deleteAdminById,
}
