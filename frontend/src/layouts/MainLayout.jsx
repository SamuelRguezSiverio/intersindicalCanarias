import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material'

import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Box } from '@mui/system'

function MainLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [username, setUsername] = useState('')

  useEffect(() => {
    // Suponiendo que el nombre de usuario se almacena en localStorage después del inicio de sesión
    const loggedInUsername = localStorage.getItem('name')
    setUsername(loggedInUsername)
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

  function onLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('isAdmin')
    localStorage.removeItem('name')
    localStorage.removeItem('id')
    navigate('/')
  }

  return (
    <AppBar>
      <Toolbar
        variant="dense"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: '#4e7b35',
        }}
      >
        <Box sx={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center' }}>
          <IconButton onClick={(event) => openMenu(event)}>
            <AccountCircleIcon sx={{ color: 'white' }} />
          </IconButton>
          <Menu
            open={isMenuOpen}
            anchorEl={anchorEl}
            onClose={() => closeMenu()}
          >
            <MenuItem
  sx={{ '&:hover': { backgroundColor: '#51711a', color: 'white' } }}
  onClick={() => navigate('/profile')}
>
  Mi perfil
</MenuItem>

            <MenuItem
              sx={{ '&:hover': { backgroundColor: '#51711a', color: 'white' } }}
              onClick={() => onLogout()}
            >
              Salir
            </MenuItem>
          </Menu>
          <Typography variant="h6">Bienvenido, {username}</Typography>
        </Box>
        {/* <Box>
          <Link to={'/home'}>
            <Button
              sx={{ backgroundColor: 'white', color: 'blue' }}
              variant="raised"
            >
              Home
            </Button>
          </Link>
        </Box> */}
      </Toolbar>
    </AppBar>
  )
}

export default MainLayout
