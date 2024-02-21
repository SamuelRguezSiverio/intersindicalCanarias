import React, { useState, useEffect } from 'react'
import { signup } from '../../services/auth'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { styled } from '@mui/material/styles'
import {
  Card,
  CardHeader,
  TextField,
  CardContent,
  Button,
  CardActions,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material/'
import InputAdornment from '@mui/material/InputAdornment'

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

function SignupCard({ changeToLogin }) {
  const [formValues, setFormValues] = useState({
    name: '',
    surName: '',
    nif: '',
    email: '',
    password: '',
    mobile: '',
    category: '',
    hospital: '',
  })
  const [errors, setErrors] = useState({})
  const [isPassVisible, setIsPassVisible] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)

  useEffect(() => {
    let timer
    if (openDialog) {
      timer = setTimeout(() => {
        handleCloseDialog()
      }, 12000)
    }
    return () => clearTimeout(timer)
  }, [openDialog])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  const validateForm = () => {
    let tempErrors = {}
    tempErrors.name = formValues.name ? '' : 'Este campo es obligatorio.'
    tempErrors.surName = formValues.surName ? '' : 'Este campo es obligatorio.'
    tempErrors.nif = formValues.nif ? '' : 'Este campo es obligatorio.'
    tempErrors.email = formValues.email ? '' : 'Este campo es obligatorio.'
    tempErrors.password = formValues.password
      ? ''
      : 'Este campo es obligatorio.'
    tempErrors.mobile = formValues.mobile ? '' : 'Este campo es obligatorio.'
    tempErrors.category = formValues.category
      ? ''
      : 'Este campo es obligatorio.'
    tempErrors.hospital = formValues.hospital
      ? ''
      : 'Este campo es obligatorio.'
    setErrors(tempErrors)
    return Object.values(tempErrors).every((x) => x === '')
  }

  const onSignup = async () => {
    if (validateForm()) {
      const dataInSignup = {
        name: formValues.name,
        surName: formValues.surName,
        nif: formValues.nif,
        email: formValues.email,
        password: formValues.password,
        mobile: formValues.mobile,
        category: formValues.category,
        hospital: formValues.hospital,
      }
      try {
        const apiResponse = await signup(dataInSignup)
        console.log(apiResponse)
        handleOpenDialog()
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setErrors({ ...errors, form: error.response.data })
        } else {
          setErrors({
            ...errors,
            form: 'Ocurrió un error al registrar. Por favor, intenta de nuevo.',
          })
        }
      }
    }
  }

  const handleOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    changeToLogin()
  }

  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ maxWidth: '500px', m: 10 }}>
        <CardHeader sx={{ color: '#51711a' }} title="Solicitud de Registro" />
        <CardContent>
          <CssTextField
            name="name"
            onChange={handleInputChange}
            label="Nombre"
            variant="outlined"
            fullWidth
            required
            error={!!errors.name}
            helperText={errors.name}
            sx={{ marginBottom: '20px' }}
          />
          <CssTextField
            name="surName"
            onChange={handleInputChange}
            label="Apellidos"
            variant="outlined"
            fullWidth
            required
            error={!!errors.surName}
            helperText={errors.surName}
            sx={{ marginBottom: '20px' }}
          />
          <CssTextField
            name="nif"
            onChange={handleInputChange}
            label="NIF"
            variant="outlined"
            fullWidth
            required
            error={!!errors.nif}
            helperText={errors.nif}
            sx={{ marginBottom: '20px' }}
            inputProps={{ style: { textTransform: 'uppercase' } }}
          />

          <CssTextField
            name="email"
            onChange={handleInputChange}
            label="Email"
            variant="outlined"
            fullWidth
            required
            error={!!errors.email}
            helperText={errors.email}
            sx={{ marginBottom: '20px' }}
          />
          <CssTextField
            name="password"
            onChange={handleInputChange}
            label="Contraseña"
            type={isPassVisible ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            required
            error={!!errors.password}
            helperText={errors.password}
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
            sx={{ marginBottom: '20px' }}
          />
          <CssTextField
            name="mobile"
            onChange={handleInputChange}
            label="Móvil"
            variant="outlined"
            fullWidth
            required
            error={!!errors.mobile}
            helperText={errors.mobile}
            sx={{ marginBottom: '20px' }}
          />
          <CssTextField
            name="category"
            onChange={handleInputChange}
            label="Categoría Profesional"
            variant="outlined"
            fullWidth
            required
            error={!!errors.category}
            helperText={errors.category}
            sx={{ marginBottom: '20px' }}
          />
          <FormControl
            variant="outlined"
            fullWidth
            required
            error={!!errors.hospital}
          >
            <InputLabel id="hospital-label">Hospital</InputLabel>
            <Select
              name="hospital"
              labelId="hospital-label"
              value={formValues.hospital}
              onChange={handleInputChange}
              label="Hospital"
            >
              <MenuItem value="HUC - LA PALMA">HUC - LA PALMA</MenuItem>
              <MenuItem value="HUNSC - LA GOMERA - EL HIERRO">
                HUNSC - LA GOMERA - EL HIERRO
              </MenuItem>
              <MenuItem value="GRAN CANARIA">GRAN CANARIA</MenuItem>
              <MenuItem value="FUERTEVENTURA">FUERTEVENTURA</MenuItem>
              <MenuItem value="LANZAROTE">LANZAROTE</MenuItem>
            </Select>
          </FormControl>
          {errors.form && (
            <Typography color="error" sx={{ mt: 2 }}>
              {errors.form}
            </Typography>
          )}
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            onClick={() => changeToLogin()}
            sx={{
              minWidth: 'none',
              textTransform: 'none',
              fontWeight: 'bold',
              color: '#85b527',
              '&:hover': { backgroundColor: 'white', color: '#51711a' },
            }}
          >
            Volver al Inicio
          </Button>
          <Button
            type="submit"
            variant="contained"
            onClick={onSignup}
            sx={{
              mb: 2,
              backgroundColor: '#85b527',
              '&:hover': { backgroundColor: '#51711a' },
            }}
          >
            Enviar
          </Button>
        </CardActions>
      </Card>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title">{'Registro Exitoso'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="dialog-description">
            Tu alta de registro se ha completado con éxito. Recibirás un correo
            para recibir tu contraseña de acceso, cuando se procese tu
            solicitud. Serás redirigido a la página de inicio de sesión en
            breve.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            sx={{
              color: 'white',
              backgroundColor: '#85b527',
              '&:hover': { backgroundColor: '#51711a' },
            }}
            autoFocus
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  )
}

export default SignupCard
