import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box } from '@mui/system';

function MainLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [username, setUsername] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // Estado para almacenar si el usuario es administrador

  useEffect(() => {
    // Suponiendo que el nombre de usuario y el estado de administrador se almacenan en localStorage después del inicio de sesión
    const loggedInUsername = localStorage.getItem('name');
    const adminStatus = localStorage.getItem('isAdmin') === 'true'; // Asegúrate de que 'isAdmin' se almacene como un string
    setUsername(loggedInUsername);
    setIsAdmin(adminStatus);
  }, []);

  const navigate = useNavigate();

  function openMenu(event) {
    setAnchorEl(event.currentTarget);
    setIsMenuOpen(true);
  }

  function closeMenu() {
    setAnchorEl(null);
    setIsMenuOpen(false);
  }

  function onLogout() {
    // Aquí también deberías actualizar el estado de isAdmin
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('name');
    localStorage.removeItem('id');
    setIsAdmin(false); // Actualizar el estado de isAdmin
    navigate('/');
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
          <IconButton onClick={openMenu}>
            <AccountCircleIcon sx={{ color: 'white' }} />
          </IconButton>
          <Menu
            open={isMenuOpen}
            anchorEl={anchorEl}
            onClose={closeMenu}
          >
    <MenuItem
              sx={{ '&:hover': { backgroundColor: '#51711a', color: 'white' } }}
              onClick={() => navigate(isAdmin ? '/admin' : '/home')}
            >
              Inicio
            </MenuItem>
            <MenuItem
              sx={{ '&:hover': { backgroundColor: '#51711a', color: 'white' } }}
              onClick={() => navigate('/profile')}
            >
              Mi perfil
            </MenuItem>
            <MenuItem
              sx={{ '&:hover': { backgroundColor: '#51711a', color: 'white' } }}
              onClick={onLogout}
            >
              Salir
            </MenuItem>
          </Menu>
          <Typography variant="h6">Bienvenido, {username}</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default MainLayout;
