import authApi from './authAPIConfig';

export async function login(data) {
  const response = await authApi.post('/auth/login', data);
  return response;
}

export async function signup(data) {
  const response = await authApi.post('/auth/signup', data);
  return response;
}

export async function getAdminsByHospital() {
  const response = await authApi.get('/auth/adminsByHospital', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response;
}


export async function updateAdmin(id, adminData) {
  try {
    const response = await authApi.put(`/auth/admins/${id}`, adminData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (response.status !== 200) {
      throw new Error('La actualización no fue exitosa.');
    }

    return response.data;
  } catch (error) {
    console.error('Error al actualizar el administrador:', error);
    throw error;
  }
}

export async function getAdminById(id) {
  try {
    const response = await authApi.get(`/auth/adminsId/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (response.status !== 200) {
      throw new Error('No se pudo obtener la información del administrador.');
    }

    return response.data;
  } catch (error) {
    console.error('Error al obtener la información del administrador:', error);
    throw error;
  }
}


export async function sendEmail(data) {
  try {
    const response = await authApi.post('/auth/send', data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (response.status !== 200) {
      throw new Error('El envío de correo electrónico no fue exitoso.');
    }

    return response.data;
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
    throw error;
  }
}

export async function forgotPassword(email) {
  try {
    const response = await authApi.post('/auth/forgot-password', { email });
    if (response.status !== 200) {
      throw new Error('No se pudo procesar la solicitud de recuperación de contraseña.');
    }
    return response.data;
  } catch (error) {
    console.error('Error al solicitar la recuperación de contraseña:', error);
    throw error;
  }
}

export async function resetPassword(token, newPassword) {
  try {
    const response = await authApi.post('/auth/reset-password', { token, newPassword });
    if (response.status !== 200) {
      throw new Error('No se pudo restablecer la contraseña.');
    }
    return response.data;
  } catch (error) {
    console.error('Error al restablecer la contraseña:', error);
    throw error;
  }
}