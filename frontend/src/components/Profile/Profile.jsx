import React, { useState, useEffect } from 'react'
import {
  Box,
  TextField,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Card,
  CardContent,
  CardActions,
  Divider,
  InputAdornment,
  IconButton,
} from '@mui/material'
import { getAdminById, updateAdmin } from '../../services/auth'
import { styled } from '@mui/material/styles'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Visibility, VisibilityOff } from '@mui/icons-material/'

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#A0AAB4',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#B2BAC2',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#E0E3E7',
    },
    '&:hover fieldset': {
      borderColor: '#85b527',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#85b527',
    },
  },
})

const theme = createTheme()
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
  const [passwordError, setPasswordError] = useState('')
  const [isPassVisible, setIsPassVisible] = useState(false)

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
  const validatePassword = (password) => {
    const re = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d\S]{8,}$/
    return re.test(password)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setPasswordError('') // Limpiar errores previos
    if (!validatePassword(newPassword)) {
      setPasswordError(
        'La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula y un número.'
      )
      return
    }
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
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: 'calc(100vh - 50px)',
        }}
      >
        {!isEditing ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Card sx={{ minWidth: 275, mt: 2 }}>
              <CardContent sx={{ m: 2 }}>
                <Typography variant="h5" component="div">
                  Datos de contacto
                </Typography>
                <Divider sx={{ mt: 2, mb: 2 }} />
                <Typography variant="subtitle1">
                  <b>Nombre:</b> {adminData.name}
                </Typography>
                <Typography variant="subtitle1">
                  <b>Apellido:</b> {adminData.surName}
                </Typography>
                <Typography variant="subtitle1">
                  <b>NIF:</b> {adminData.nif}
                </Typography>
                <Typography variant="subtitle1">
                  <b>Email:</b> {adminData.email}
                </Typography>
                <Typography variant="subtitle1">
                  <b>Teléfono:</b> {adminData.mobile}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleEditToggle}
                  sx={{
                    ml: 3,
                    mb: 2,
                    backgroundColor: '#85b527',
                    '&:hover': { backgroundColor: '#51711a' },
                  }}
                >
                  Editar
                </Button>
              </CardActions>
            </Card>
          </Box>
        ) : (
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              m: 5,
              p: { xs: 2, sm: 3, md: 5 }, // Ajusta el padding según el tamaño de la pantalla
              width: { xs: '90%', sm: '400px', md: '500px' }, // Ajusta el ancho según el tamaño de la pantalla
              borderRadius: 5,
              backgroundColor: 'white',
              '& .MuiButton-root': {
                // Estilos para los botones de Material-UI
                m: 1, // Margen para los botones
                width: '100%', // Ancho completo dentro del contenedor
                maxWidth: '300px', // Ancho máximo para los botones
              },
            }}
          >
            <CssTextField
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
            <CssTextField
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
            <CssTextField
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
            <CssTextField
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
            <CssTextField
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
            <CssTextField
              margin="normal"
              fullWidth
              id="newPassword"
              label="Nueva Contraseña"
              name="newPassword"
              type={isPassVisible ? 'text' : 'password'}
              value={newPassword}
              error={Boolean(passwordError)}
              helperText={passwordError}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setIsPassVisible(!isPassVisible)}
                    >
                      {isPassVisible ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={handleNewPasswordChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: '#85b527',
                '&:hover': { backgroundColor: '#51711a' },
              }}
            >
              Guardar Cambios
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={handleEditToggle}
              sx={{
                mb: 2,
                backgroundColor: '#d63142',
                '&:hover': { backgroundColor: '#881420' },
              }}
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
    </ThemeProvider>
  )
}

export default Profile
