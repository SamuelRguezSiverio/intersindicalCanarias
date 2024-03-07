// ForgotPassword.js
import React, { useState } from 'react'
import { TextField, Button, Typography, Box, Grid, Paper } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { forgotPassword } from '../../services/auth'

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

const theme = createTheme() // Utiliza el mismo tema que en LoginCard

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      setMessage(
        'Se le ha enviado un correo para iniciar el proceso de restablecimiento de contraseña. Continúe con la validación.'
      );
      setTimeout(() => {
        navigate('/reset-password');
      }, 5000); // Espera 5 segundos antes de redirigir a la página de restablecimiento
    } catch (error) {
      setErrorMessage(error.message); // Mostrará el mensaje de error personalizado
      if (error.message === 'No existe un usuario asociado con este correo electrónico.') {
        setTimeout(() => {
          navigate('/home');
        }, 5000); // Espera 5 segundos antes de redirigir a la página de inicio si el usuario no existe
      }
    }
  };
  
  

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: '100vh' }}
      >
        <Paper
          elevation={6}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: 400, // Ajusta este valor según tus necesidades
          }}
        >
          <Typography component="h1" variant="h5">
            Recuperar Contraseña
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
              id="email"
              label="Correo Electrónico"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            {errorMessage && (
              <Typography color="error" textAlign="center" mt={2}>
                {errorMessage}
              </Typography>
            )}
            {message && (
              <Typography color="primary" textAlign="center" mt={2}>
                {message}
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
              Enviar Enlace de Recuperación
            </Button>
          </Box>
        </Paper>
      </Grid>
    </ThemeProvider>
  )
}
