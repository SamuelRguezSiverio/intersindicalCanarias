import React, { useState, useEffect } from 'react'
import { sendEmail } from '../../services/auth'
import {
  Box,
  TextField,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material'
import { getAdminById, updateAdmin } from '../../services/auth'

const Profile = () => {
  const [adminData, setAdminData] = useState({
    id: '',
    name: '',
    surName: '',
    password: '',
    nif: '',
    email: '',
    mobile: '',
    category: '',
    hospital: '',
  })
  const [newPassword, setNewPassword] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)

  useEffect(() => {
    const fetchAdminData = async () => {
      const adminId = localStorage.getItem('id')
      const data = await getAdminById(adminId)
      setAdminData(data)
    }

    fetchAdminData()
  }, [])

  const handleEditToggle = () => {
    setIsEditing(!isEditing)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setAdminData({ ...adminData, [name]: value })
  }

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const updatedData = {
        ...adminData,
        newPassword: newPassword, // Asegúrate de que 'newPassword' se está enviando
      }
      await updateAdmin(adminData.id, updatedData)
      setIsEditing(false)
      setOpenDialog(true)
      setNewPassword('')
    } catch (error) {
      console.error('Error al actualizar los datos del administrador:', error)
    }
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  return (
    <Box
      sx={{
        mt: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography component="h1" variant="h5">
        Perfil del Administrador
      </Typography>
      {!isEditing ? (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">Nombre: {adminData.name}</Typography>
          <Typography variant="subtitle1">
            Apellido: {adminData.surName}
          </Typography>
          <Typography variant="subtitle1">NIF: {adminData.nif}</Typography>
          <Typography variant="subtitle1">Email: {adminData.email}</Typography>
          <Typography variant="subtitle1">
            Teléfono: {adminData.mobile}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleEditToggle}
          >
            Editar
          </Button>
        </Box>
      ) : (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Nombre"
            name="name"
            autoComplete="name"
            autoFocus
            value={adminData.name}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="surName"
            label="Apellido"
            name="surName"
            autoComplete="surname"
            value={adminData.surName}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="nif"
            label="NIF"
            name="nif"
            autoComplete="nif"
            value={adminData.nif}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            value={adminData.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="mobile"
            label="Teléfono"
            name="mobile"
            autoComplete="tel"
            value={adminData.mobile}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            id="newPassword"
            label="Nueva Contraseña"
            name="newPassword"
            type="password"
            value={newPassword}
            onChange={handleNewPasswordChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Guardar Cambios
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={handleEditToggle}
          >
            Cancelar
          </Button>
        </Box>
      )}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Los cambios se han guardado correctamente.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary" autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Profile
