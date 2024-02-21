import { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment'
import { Visibility, VisibilityOff } from '@mui/icons-material/'
import { Typography, IconButton } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import backgroundIMG from '../../assets/logo/logoIntersindical.png'
import { login } from '../../services/auth'

function Copyright(props) {
  return (
    <Typography
      sx={{ mt: 3 }}
      variant="body2"
      color="black"
      align="center"
      {...props}
    >
      {'Intersindical Canaria Salud © '}
      Todos los derechos reservados {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

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

export default function LoginCard({ changeToSignup }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isPassVisible, setIsPassVisible] = useState(false)

  const navigate = useNavigate()

  function updateEmail(inputValue) {
    setEmail(inputValue)
  }

  function updatePassword(inputValue) {
    setPassword(inputValue)
  }

  async function onLogin() {
    const dataInLogin = {
      email,
      password,
    }
    try {
      const apiResponse = await login(dataInLogin)

      localStorage.setItem('token', apiResponse.data.token)
      // Guarda si el usuario es administrador en el almacenamiento local
      localStorage.setItem('isAdmin', apiResponse.data.isAdmin)
      localStorage.setItem('name', apiResponse.data.name)
      localStorage.setItem('id', apiResponse.data.id)
      // Redirige al usuario a la página correspondiente
      if (apiResponse.data.isAdmin === true) {
        navigate('/admin')
      } else {
        navigate('/home')
      }
    } catch (error) {
      // Maneja aquí los errores de inicio de sesión
      // Por ejemplo, abrir un diálogo de error si la autenticación falla
      setErrorMessage(error.response.data)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 2,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img width="150" src={backgroundIMG} />
          <br />
          <CssTextField
            margin="normal"
            required
            fullWidth
            id="email"
            color="warning"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => updateEmail(e.target.value)}
          />
          <CssTextField
            margin="normal"
            required
            fullWidth
            name="password"
            color="warning"
            label="Contraseña"
            type={isPassVisible ? 'text' : 'password'}
            id="password"
            onChange={(e) => updatePassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      setIsPassVisible((oldState) => !oldState)
                    }}
                  >
                    {isPassVisible ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
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
            onClick={() => onLogin()}
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: '#85b527',
              '&:hover': { backgroundColor: '#51711a' },
            }}
          >
            Login
          </Button>
          <Typography variant="body1">
            Si no estás dado de alta,{' '}
            <Button
              onClick={() => changeToSignup()}
              sx={{
                padding: 0,
                minWidth: 'none',
                textTransform: 'none',
                fontWeight: 'bold',
                color: '#85b527',
                '&:hover': { backgroundColor: 'white', color: '#51711a' },
              }}
            >
              ¡Regístrate!
            </Button>
          </Typography>
          <Copyright />
        </Box>
      </Grid>
    </ThemeProvider>
  )
}
