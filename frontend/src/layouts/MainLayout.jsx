import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Box,
  Container,
} from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import HomeIcon from '@mui/icons-material/Home'

// import cabeceraIMG from '../assets/logo/cabezera-3-climatico.png'
function MainLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [username, setUsername] = useState('')
  const [isAdmin, setIsAdmin] = useState(false) // Estado para almacenar si el usuario es administrador
  const [value, setValue] = useState(0) // Estado para la navegación del footer

  useEffect(() => {
    // Suponiendo que el nombre de usuario y el estado de administrador se almacenan en localStorage después del inicio de sesión
    const loggedInUsername = localStorage.getItem('name')
    const adminStatus = localStorage.getItem('isAdmin') === 'true' // Asegúrate de que 'isAdmin' se almacene como un string
    setUsername(loggedInUsername)
    setIsAdmin(adminStatus)
  }, [])

  const navigate = useNavigate()

  function openMenu(event) {
    setAnchorEl(event.currentTarget)
    setIsMenuOpen(true)
  }

  function closeMenu() {
    setAnchorEl(null)
    setIsMenuOpen(false)
  }

  function goHome() {
    navigate('/home')
  }

  function onLogout() {
    // Aquí también deberías actualizar el estado de isAdmin
    localStorage.removeItem('token')
    localStorage.removeItem('isAdmin')
    localStorage.removeItem('name')
    localStorage.removeItem('id')
    setIsAdmin(false) // Actualizar el estado de isAdmin
    navigate('/')
  }

  return (
    <>
      <AppBar>
        {/* <img
        src={cabeceraIMG}
        alt="Cabecero"
        style={{
          width: '60%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          margin: '10px auto',
          minWidth: '50%',
        }}
      /> */}

        <Toolbar
          variant="dense"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: '#4e7b35',
          }}
        >
          <Box
            sx={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center' }}
          >
            <IconButton onClick={() => navigate(isAdmin ? '/admin' : '/home')}>
              <HomeIcon sx={{ color: 'white' }} />
            </IconButton>
            <IconButton onClick={openMenu}>
              <AccountCircleIcon sx={{ color: 'white' }} />
            </IconButton>
            <Menu open={isMenuOpen} anchorEl={anchorEl} onClose={closeMenu}>
              <MenuItem
                sx={{
                  '&:hover': { backgroundColor: '#51711a', color: 'white' },
                }}
                onClick={() => navigate(isAdmin ? '/admin' : '/home')}
              >
                Inicio
              </MenuItem>
              <MenuItem
                sx={{
                  '&:hover': { backgroundColor: '#51711a', color: 'white' },
                }}
                onClick={() => navigate('/profile')}
              >
                Mi perfil
              </MenuItem>
              <MenuItem
                sx={{
                  '&:hover': { backgroundColor: '#51711a', color: 'white' },
                }}
                onClick={onLogout}
              >
                Salir
              </MenuItem>
            </Menu>
            <Typography variant="h6">Bienvenido, {username}</Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Container
        component="footer"
        style={{ maxWidth: 'none' }}
        sx={{
          width: '100%', // Asegura que el ancho sea del 100%
          bottom: 0,
          position: 'fixed',
          left: 0,
          right: 0,
          backgroundColor: '#4e7b35',
          display: 'flex', // Usa flexbox para centrar el contenido
          justifyContent: 'center', // Centra horizontalmente
          alignItems: 'center', // Centra verticalmente
          height: '50px', // Altura fija del footer
        }}
      >
        <Typography
          variant="body2"
          color="white"
          align="center"
          sx={{
            width: '100%', // Asegura que el texto también ocupe el 100% del ancho
          }}
        >
          Intersindical Canaria Salud © {new Date().getFullYear()}. Todos los
          derechos reservados
        </Typography>
      </Container>
    </>
  )
}

export default MainLayout
