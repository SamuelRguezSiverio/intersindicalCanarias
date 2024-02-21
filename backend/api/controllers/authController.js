const Admin = require('../models/adminModel')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

// Función auxiliar para validar el NIF
const validateNIF = (nif) => {
  const re = /^[XYZ]?\d{5,8}[A-Z]$/; // Ajusta esta expresión regular a tus necesidades
  return re.test(nif.toUpperCase());
};

// Función auxiliar para validar la contraseña
const validatePassword = (password) => {
  // Asegúrate de que la contraseña tenga al menos 8 caracteres, una letra y un número
  const re = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d\S]{8,}$/;
  return re.test(password);
};

async function signup(req, res) {
  try {
    const { name, surName, nif, email, password, mobile, category, hospital } = req.body;

    // Validaciones
    if (!validateEmail(email)) {
      return res.status(400).send('El formato del email no es válido.');
    }
    if (!validateNIF(nif)) {
      return res.status(400).send('El formato del NIF no es válido.');
    }
    if (!validatePassword(password)) {
      return res.status(400).send('La contraseña debe tener al menos 8 caracteres incluyendo una letra mayúscula y un número.');
    }

    // Hashear la contraseña
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Crear el administrador
    const admin = await Admin.create({
      name,
      surName,
      nif,
      email,
      password: hashedPassword,
      mobile,
      category,
      hospital,
      isAdmin: false, // Por defecto no son administradores
      isActive: false, // La cuenta debe estar inactiva desde el inicio
    }, {
      fields: [
        'name',
        'surName',
        'nif',
        'email',
        'password',
        'mobile',
        'category',
        'hospital',
        'isAdmin',
        'isActive',
      ],
    });

    // Generar el token JWT
    const payload = { email: admin.email };
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' });

    return res.status(200).json({ token: token });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).send('El email ya está en uso.');
    }
    // Otros manejos de errores específicos...
    return res.status(500).send(error.message);
  }
}

async function getAdminsByHospital(req, res) {
  try {
    // Asumiendo que el hospital del admin está incluido en el token JWT
    const authHeader = req.headers.authorization
    const tokenStart = authHeader.indexOf(' ') + 1 // Encontrar el inicio del token
    const token = authHeader.substring(tokenStart) // Extraer el token del header
    const decoded = jwt.verify(token, process.env.SECRET) // Decodificar el token

    const admins = await Admin.findAll({
      where: {
        hospital: decoded.hospital, // Filtrar administradores por el hospital del admin
      },
    })

    return res.status(200).json(admins)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

async function updateAdmin(req, res) {
  try {
    const { id } = req.params;
    const { name, surName, nif, email, mobile, category, hospital, isActive, newPassword } = req.body;

    console.log('Nueva contraseña recibida:', newPassword); // Agregar para depuración

    const admin = await Admin.findOne({ where: { id } });

    if (!admin) {
      return res.status(404).json({ message: 'Administrador no encontrado' });
    }

    let isPasswordUpdated = false;

    if (newPassword && newPassword.trim()) {
      const currentHashedPassword = admin.password;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      if (currentHashedPassword !== hashedPassword) {
        await admin.update({ password: hashedPassword });
        isPasswordUpdated = true;
      }
    }

    admin.name = name;
    admin.surName = surName;
    admin.nif = nif;
    admin.email = email;
    admin.mobile = mobile;
    admin.category = category;
    admin.hospital = hospital;
    admin.isActive = isActive;

    await admin.save();

    const updatedAdmin = admin.toJSON();
    delete updatedAdmin.password;

    console.log('Contraseña actualizada:', isPasswordUpdated);
    return res.status(200).json(updatedAdmin);
  } catch (error) {
    return res.status(500).send(error.message);
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

module.exports = {
  login,
  signup,
  getAdminsByHospital,
  getAdminById,
  updateAdmin,
}
