import authApi from './authAPIConfig'

export async function login(data) {
  const response = await authApi.post('/auth/login', data)
  return response
}

export async function signup(data) {
  const response = await authApi.post('/auth/signup', data)
  return response
}

export async function getAdminsByHospital() {
  const response = await authApi.get('/auth/adminsByHospital', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
  return response
}

export async function updateAdmin(id, adminData) {
  try {
    const response = await authApi.put(`/auth/admins/${id}`, adminData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })

    if (response.status !== 200) {
      throw new Error('La actualización no fue exitosa.')
    }

    return response.data
  } catch (error) {
    console.error('Error al actualizar el administrador:', error)
    throw error
  }
}

export async function getAdminById(id) {
  try {
    const response = await authApi.get(`/auth/adminsId/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })

    if (response.status !== 200) {
      throw new Error('No se pudo obtener la información del administrador.')
    }

    return response.data
  } catch (error) {
    console.error('Error al obtener la información del administrador:', error)
    throw error
  }
}

export async function sendEmail(data) {
  try {
    const response = await authApi.post('/auth/send', data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })

    if (response.status !== 200) {
      throw new Error('El envío de correo electrónico no fue exitoso.')
    }

    return response.data
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error)
    throw error
  }
}

export async function forgotPassword(email) {
  try {
    const response = await authApi.post('/auth/forgot-password', { email })
    // Si la respuesta es exitosa, devolveremos los datos de la respuesta.
    return response.data
  } catch (error) {
    // Si hay un error en la respuesta, lanzaremos un error personalizado.
    if (error.response && error.response.status === 404) {
      // Error específico cuando el usuario no se encuentra.
      throw new Error(
        'No existe un usuario asociado con este correo electrónico.'
      )
    } else {
      // Otros errores de servidor.
      throw new Error(
        'No se pudo procesar la solicitud de recuperación de contraseña.'
      )
    }
  }
}

export async function resetPassword(token, newPassword) {
  try {
    const response = await authApi.post('/auth/reset-password', {
      token,
      newPassword,
    })
    if (response.status !== 200) {
      throw new Error('No se pudo restablecer la contraseña.')
    }
    return response.data
  } catch (error) {
    console.error('Error al restablecer la contraseña:', error)
    throw error
  }
}

export async function verifyResetToken(token) {
  try {
    // Enviar una solicitud GET al servidor para verificar la validez del token
    const response = await authApi.get(`/auth/reset-password/${token}`)

    if (response.status !== 200) {
      throw new Error('Token inválido o expirado.')
    }

    // Si el token es válido, podrías devolver algún dato relevante o simplemente confirmar la validez
    return response.data
  } catch (error) {
    console.error('Error al verificar el token de restablecimiento:', error)
    throw error
  }
}

export async function deleteAdminById(id) {
  try {
    const response = await authApi.delete(`/admins/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (response.status !== 200) {
      throw new Error('No se pudo eliminar el administrador.');
    }

    return response.data;
  } catch (error) {
    console.error('Error al eliminar el administrador:', error);
    throw error;
  }
}