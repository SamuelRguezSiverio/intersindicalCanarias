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
  FormHelperText
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
    workPlace: ''
  })
  const [errors, setErrors] = useState({})
  const [isPassVisible, setIsPassVisible] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedHospital, setSelectedHospital] = useState('');
  const [workPlaces, setWorkPlaces] = useState([]);

  useEffect(() => {
    let timer
    if (openDialog) {
      timer = setTimeout(() => {
        handleCloseDialog()
      }, 12000)
    }
    return () => clearTimeout(timer)
  }, [openDialog])

  const hospitalsWithCenters = {
    'TENERIFE': ['Hospital Universitario de Canarias', 'Complejo Hospitalario de la Candelaria', 'GAP Tenerife'],
    'GRAN CANARIA': ['CHUIMI', 'Negrín', 'Atención Primaria Gran Canaria', 'JASS Cabildo', 'Centros Privados'],
    // Añade aquí otros hospitales con centros si los hay
  };

  const handleHospitalChange = (event) => {
    const selectedHospital = event.target.value;
    setSelectedHospital(selectedHospital);
    setFormValues({ ...formValues, hospital: selectedHospital, workPlace: '' });
  
    if (hospitalsWithCenters[selectedHospital]) {
      setWorkPlaces(hospitalsWithCenters[selectedHospital]);
    } else {
      setWorkPlaces([]);
    }
  };
  
  

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
      if (hospitalsWithCenters[formValues.hospital] && hospitalsWithCenters[formValues.hospital].length > 0) {
        tempErrors.workPlace = formValues.workPlace ? '' : 'Este campo es obligatorio.';
      } else {
        tempErrors.workPlace = ''; // No es obligatorio si no hay centros
      }
    
      setErrors(tempErrors);
      return Object.values(tempErrors).every((x) => x === '');
    };

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
        workPlace: formValues.workPlace
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

  const categorias = [
    'Adjunto Cardiología (Laboral)',
    'Adjunto Geriatría (Laboral)',
    'Auxiliar Administrativo Función Administrativa (Laboral)',
    'Auxiliar Almacén (Laboral)',
    'Auxiliar Enfermería (Laboral)',
    'Ayudante Cocina (Laboral)',
    'Costurera Lavandera Planchadora (Laboral)',
    'Enfermera (Laboral)',
    'Lencera (Laboral)',
    'Limpiador (Laboral)',
    'Técnico Titulado Superior (Laboral)',
    'Albañil (Estatutaria)',
    'Alergología (Estatutaria)',
    'Análisis Clínicos (Estatutaria)',
    'Anatomía Patológica (Estatutaria)',
    'Anestesiología y Reanimación (Estatutaria)',
    'Angiología y Cirugía Vascular (Estatutaria)',
    'Aparato Digestivo (Estatutaria)',
    'Arquitecto Técnico (Estatutaria)',
    'Auxiliar Administrativo Función Administrativa (Estatutaria)',
    'Auxiliar de Enfermería (Estatutaria)',
    'Bioquímica Clínica (Estatutaria)',
    'Calefactor (Estatutaria)',
    'Cardiología (Estatutaria)',
    'Carpintero (Estatutaria)',
    'Celador (Estatutaria)',
    'Cirugía Cardiovascular (Estatutaria)',
    'Cirugía General y Aparato Digestivo (Estatutaria)',
    'Cirugía Oral y Maxilofacial (Estatutaria)',
    'Cirugía Ortopédica y Traumatológica (Estatutaria)',
    'Cirugía Pediátrica (Estatutaria)',
    'Cirugía Plástica, Estética y Reparadora (Estatutaria)',
    'Cirugía Torácica (Estatutaria)',
    'Cocinero/a (Estatutaria)',
    'Conductor/a (Estatutaria)',
    'Conductor/a de Instalaciones (Estatutaria)',
    'Dermatología Médico-Quirúrgica y Venereología (Estatutaria)',
    'Electricista (Estatutaria)',
    'Endocrinología y Nutrición (Estatutaria)',
    'Enfermero/a (Estatutaria)',
    'Farmacia Hospitalaria (Estatutaria)',
    'Farmacología Clínica (Estatutaria)',
    'Fisioterapeuta (Estatutaria)',
    'Fontanero (Estatutaria)',
    'Geriatría (Estatutaria)',
    'Gobernanta (Estatutaria)',
    'Grupo Administrativo Función Administrativa (Estatutaria)',
    'Grupo de Gestión de la Función Administrativa (Estatutaria)',
    'Grupo Técnico de la Función Administrativa (Estatutaria)',
    'Hematología y Hemoterapia (Estatutaria)',
    'Ingeniero/a Superior (Estatutaria)',
    'Ingeniero/a Técnico/a (Estatutaria)',
    'Ingeniero/a Técnico/a Industrial (Estatutaria)',
    'Lavandera (Estatutaria)',
    'Limpiador/a (Estatutaria)',
    'Logopeda (Estatutaria)',
    'Matrona (Estatutaria)',
    'Mecánico (Estatutaria)',
    'Medicina del Trabajo (Estatutaria)',
    'Medicina Familiar y Comunitaria (Estatutaria)',
    'Medicina Física y Rehabilitación (Estatutaria)',
    'Medicina Intensiva (Estatutaria)',
    'Medicina Interna (Estatutaria)',
    'Medicina Nuclear (Estatutaria)',
    'Medicina Preventiva y Salud Pública (Estatutaria)',
    'Médico/a de Admisión y Documentación Clínica (Estatutaria)',
    'Médico/a de Familia (Estatutaria)',
    'Médico/a de Urgencia Hospitalaria (Estatutaria)',
    'Microbiología y Parasitología (Estatutaria)',
    'Nefrología (Estatutaria)',
    'Neumología (Estatutaria)',
    'Neurocirugía (Estatutaria)',
    'Neurofisiología Clínica (Estatutaria)',
    'Neurología (Estatutaria)',
    'Obstetricia y Ginecología (Estatutaria)',
    'Odontoestomatología (Estatutaria)',
    'Oftalmología (Estatutaria)',
    'Oncología Médica (Estatutaria)',
    'Oncología Radioterápica (Estatutaria)',
    'Otorrinolaringología (Estatutaria)',
    'Pediatra de Equipo de Atención Primaria (Estatutaria)',
    'Pediatría de Áreas Específicas (Estatutaria)',
    'Peón (Estatutaria)',
    'Pinche (Estatutaria)',
    'Pintor (Estatutaria)',
    'Planchadora (Estatutaria)',
    'Psicología Clínica (Estatutaria)',
    'Psiquiatría (Estatutaria)',
    'Radiodiagnóstico (Estatutaria)',
    'Radiofísica Hospitalaria (Estatutaria)',
    'Reumatología (Estatutaria)',
    'Técnico/a Especialista en Anatomía Patológica (Estatutaria)',
    'Técnico/a Especialista en Documentación Sanitaria (Estatutaria)',
    'Técnico/a Especialista en Higiene Bucodental (Estatutaria)',
    'Técnico/a Especialista de Laboratorio (Estatutaria)',
    'Técnico/a Especialista en Medicina Nuclear (Estatutaria)',
    'Técnico/a Especialista en Radiodiagnóstico (Estatutaria)',
    'Técnico/a Especialista en Radioterapia (Estatutaria)',
    'Técnico/a de Salud Pública (Estatutaria)',
    'Técnico/a Superior en Gestión de Servicios (Estatutaria)',
    'Técnico/a Titulado/a Medio/a en Informática (Estatutaria)',
    'Técnico/a Titulado/a Superior en ADE (Estatutaria)',
    'Técnico/a Titulado/a Superior en Económico (Estatutaria)',
    'Técnico/a Titulado/a Superior en Informática (Estatutaria)',
    'Técnico/a Titulado/a Superior Jurídico (Estatutaria)',
    'Telefonista (Estatutaria)',
    'Terapeuta Ocupacional (Estatutaria)',
    'Trabajador/a Social (Estatutaria)',
    'Urología (Estatutaria)',
  ]

  return (
    <ThemeProvider theme={theme}>
      <Card
        sx={{
          maxWidth: '500px',
          m: 2,
          '@media screen and (max-width: 380px)': {
            maxWidth: '370px',
          },
        }}
      >
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

          <FormControl
            variant="outlined"
            fullWidth
            required
            error={!!errors.category}
            sx={{ marginBottom: '20px' }}
          >
            <InputLabel id="category-label">Categoría Profesional</InputLabel>
            <Select
              name="category"
              labelId="category-label"
              value={formValues.category}
              onChange={handleInputChange}
              label="Categoría Profesional"
            >
              {categorias.map((categoria, index) => (
                <MenuItem key={index} value={categoria}>
                  {categoria}
                </MenuItem>
              ))}
            </Select>
            {errors.category && (
              <FormHelperText>{errors.category}</FormHelperText>
            )}
          </FormControl>

          <FormControl
            variant="outlined"
            fullWidth
            required
            error={!!errors.hospital}
            sx={{ marginBottom: '20px' }}
          >
            <InputLabel id="hospital-label">Hospital</InputLabel>
            <Select
              name="hospital"
              labelId="hospital-label"
              value={formValues.hospital}
              onChange={handleHospitalChange}
              label="Hospital"
            >
              <MenuItem
                value="TENERIFE"
              >
                TENERIFE
              </MenuItem>
              <MenuItem
                value="LA PALMA"
              >
                LA PALMA
              </MenuItem>
              <MenuItem
                value="LA GOMERA"
              >
                LA GOMERA
              </MenuItem>
              <MenuItem
                value="EL HIERRO"
              >
                EL HIERRO
              </MenuItem>
              <MenuItem
                value="GRAN CANARIA"
              >
                GRAN CANARIA
              </MenuItem>
              <MenuItem
                value="FUERTEVENTURA"
              >
                FUERTEVENTURA
              </MenuItem>
              <MenuItem
                value="LANZAROTE"
              >
                LANZAROTE
              </MenuItem>
            </Select>
          </FormControl>

          {selectedHospital && workPlaces.length > 0 && (
          <FormControl variant="outlined" fullWidth required error={!!errors.workPlace}>
            <InputLabel id="workPlace-label">Centro de Trabajo</InputLabel>
            <Select
              name="workPlace"
              labelId="workPlace-label"
              value={formValues.workPlace}
              onChange={(e) => setFormValues({ ...formValues, workPlace: e.target.value })}
              label="Centro de Trabajo"
            >
              {workPlaces.map((workPlace, index) => (
                <MenuItem key={index} value={workPlace}>
                  {workPlace}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
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
