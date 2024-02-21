import { createBrowserRouter, redirect } from 'react-router-dom';
import App from '../App';

import Auth from '../pages/Auth/Auth';
import Home from '../pages/Home/Home';
import Resource from '../pages/Resource/Resource';
import Admin from '../pages/Admin/Admin';
import Profile
 from '../components/Profile/Profile';
// Función actualizada para comprobar la autenticación y si el usuario es administrador
const checkAuth = () => {
  const token = localStorage.getItem('token');
  // Cambia el valor de isAdmin a booleano
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  return { token, isAdmin };
};

// Router actualizado con la nueva lógica de autenticación
const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Auth />
  },
  {
    path: '/',
    element: <App />,
    loader: () => {
      const { token } = checkAuth();
      if (!token) {
        return redirect('/');
      }
      return null;
    },
    children: [
      { 
        path: '/home', 
        element: <Home />,
        loader: () => {
          const { token } = checkAuth();
          if (!token) {
            return redirect('/');
          }
          return null;
        }
      },
      { 
        path: '/admin', 
        element: <Admin />,
        loader: () => {
          const { token, isAdmin } = checkAuth();
          // Comprueba si isAdmin es true
          if (!token || !isAdmin) {
            return redirect('/');
          }
          return null;
        }
      },
      {
        path: 'profile',
        element: <Profile />
      },
      { 
        path: '/resource/:resourceName', 
        element: <Resource />,
        loader: () => {
          const { token } = checkAuth();
          if (!token) {
            return redirect('/');
          }
          return null;
        }
      }
    ]
  }
]);

export default appRouter;
