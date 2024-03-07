import React, { useState } from 'react'
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Paper,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { resetPassword } from '../../services/auth'

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

export default function ResetPassword() {
  const [token, setToken] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [openDialog, setOpenDialog] = useState(false)

  const navigate = useNavigate()

  const validatePassword = (password) => {
    const re = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d\S]{8,}$/
    return re.test(password)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validatePassword(newPassword)) {
      setErrorMessage(
        'La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula y un número.'
      )
      return
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden.')
      return
    }
    try {
      await resetPassword(token, newPassword)
      setOpenDialog(true)
      setTimeout(() => {
        navigate('/home')
      }, 5000) // Redirige después de 5 segundos
    } catch (error) {
      setErrorMessage(
        'Error al restablecer la contraseña. Asegúrate de que el token sea correcto.'
      )
    }
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: '100vh' }}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: 400,
            width: '100%',
          }}
        >
          <Paper
            elevation={6}
            sx={{
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Typography component="h1" variant="h5">
              Restablecer Contraseña
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <CssTextField
                margin="normal"
                required
                fullWidth
                id="token"
                label="Token de Restablecimiento"
                name="token"
                autoComplete="token"
                autoFocus
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
              <CssTextField
                margin="normal"
                required
                fullWidth
                id="newPassword"
                label="Nueva Contraseña"
                name="newPassword"
                type="password"
                autoComplete="new-password"
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <CssTextField
                margin="normal"
                required
                fullWidth
                id="confirmPassword"
                label="Confirmar Nueva Contraseña"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {errorMessage && (
                <Typography color="error" textAlign="center" mt={2}>
                  {errorMessage}
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: '#85b527',
                  '&:hover': { backgroundColor: '#51711a' },
                }}
              >
                Restablecer Contraseña
              </Button>
            </Box>
          </Paper>
          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Los cambios se han guardado correctamente y ya puedes iniciar
                sesión con tu nueva contraseña. Serás redirigido a la página de
                inicio.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
 sx={{
  color: 'white',
  backgroundColor: '#85b527',
  '&:hover': { backgroundColor: '#51711a' },
}}
                onClick={handleCloseDialog}
                color="primary"
                autoFocus
              >
                Aceptar
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Grid>
    </ThemeProvider>
  )
}
