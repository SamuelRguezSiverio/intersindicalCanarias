// Importaciones necesarias
import { createBrowserRouter, redirect } from 'react-router-dom'
import App from '../App'
import Auth from '../pages/Auth/Auth'
import Home from '../pages/Home/Home'
import Admin from '../pages/Admin/Admin'
import Profile from '../components/Profile/Profile'
import Estatutaria from '../components/Estatutaria/Estatutaria'
import Laboral from '../components/Laboral/Laboral'
import TestExamen from '../components/TestExamen/TestExamen'
import CategoryCard from '../components/CategoryCard/CategoryCard' // Asegúrate de importar CategoryCard
import TestExamenEst from '../components/TestExamenEst/TestExamenEst'
import CategoryCardEst from '../components/CategoryCardEst/CategoryCardEst'
import Results from '../components/Results/Results'
// Función para comprobar la autenticación
const checkAuth = () => {
  const token = localStorage.getItem('token')
  const isAdmin = localStorage.getItem('isAdmin') === 'true'
  return { token, isAdmin }
}

// Función para importar dinámicamente las preguntas basadas en la categoría
const importarPreguntas = async (categoria) => {
  try {
    const modulo = await import(`../questionsData/laboral/${categoria}.js`)
    return modulo.default
  } catch (error) {
    console.error('Error al importar las preguntas:', error)
    return [] // Retorna un array vacío si hay un error
  }
}

// Función para importar dinámicamente las preguntas basadas en la categoría
const importarPreguntasEst = async (categoria) => {
  try {
    const modulo = await import(`../questionsData/estatutaria/${categoria}.js`)
    return modulo.default
  } catch (error) {
    console.error('Error al importar las preguntas:', error)
    return [] // Retorna un array vacío si hay un error
  }
}

// Configuración del router
const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Auth />,
  },
  {
    path: '/',
    element: <App />,
    loader: () => {
      const { token } = checkAuth()
      if (!token) {
        return redirect('/')
      }
      return null
    },
    children: [
      {
        path: '/home',
        element: <Home />,
        loader: () => {
          const { token } = checkAuth()
          if (!token) {
            return redirect('/')
          }
          return null
        },
      },
      {
        path: '/admin',
        element: <Admin />,
        loader: () => {
          const { token, isAdmin } = checkAuth()
          if (!token || !isAdmin) {
            return redirect('/')
          }
          return null
        },
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/results',
        element: <Results />,
      },
      {
        path: '/estatutaria',
        element: <Estatutaria />,
      },
      {
        path: '/laboral',
        element: <Laboral />,
      },
      {
        path: '/laboral/categoria/:categoria',
        element: <CategoryCard />,
        loader: async ({ params }) => {
          const { token } = checkAuth()
          if (!token) {
            return redirect('/')
          }
          // Aquí puedes cargar datos adicionales si es necesario
          return { categoria: params.categoria }
        },
      },
      {
        path: '/laboral/:categoria',
        element: <TestExamen />,
        loader: async ({ params }) => {
          const { token } = checkAuth()
          if (!token) {
            return redirect('/')
          }
          const preguntas = await importarPreguntas(params.categoria)
          return { preguntas }
        },
      },
      {
        path: '/estatutaria/categoria/:categoria',
        element: <CategoryCardEst />,
        loader: async ({ params }) => {
          const { token } = checkAuth()
          if (!token) {
            return redirect('/')
          }
          // Aquí puedes cargar datos adicionales si es necesario
          return { categoria: params.categoria }
        },
      },
      {
        path: '/estatutaria/:categoria',
        element: <TestExamenEst />,
        loader: async ({ params }) => {
          const { token } = checkAuth()
          if (!token) {
            return redirect('/')
          }
          const preguntas = await importarPreguntasEst(params.categoria)
          return { preguntas }
        },
      },
    ],
  },
])

export default appRouter
