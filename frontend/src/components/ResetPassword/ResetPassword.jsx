import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { resetPassword } from '../../services/auth';

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

const theme = createTheme();

export default function ResetPassword() {
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden.');
      return;
    }
    try {
      await resetPassword(token, newPassword);
      setMessage('Tu contraseña ha sido restablecida con éxito. Serás redirigido a la página de inicio de sesión.');
      navigate('/login');
    } catch (error) {
      setErrorMessage('Error al restablecer la contraseña. Asegúrate de que el token sea correcto.');
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
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
                Restablecer Contraseña
              </Button>
            </Box>
          </Paper>
        </Box>
      </Grid>
    </ThemeProvider>
  );
}
