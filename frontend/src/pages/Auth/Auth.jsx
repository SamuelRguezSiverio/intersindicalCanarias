import { useState } from 'react'

import { Box } from '@mui/system'

import LoginCard from '../../components/LoginCard/LoginCard'
import SignupCard from '../../components/SignupCard/SignupCard'


function Auth() {
  const [isLogin, setIsLogin] = useState(true)

  function toggleLoginSignup() {
    setIsLogin((oldState) => !oldState)
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#9db668',
      }}
    >
      {isLogin ? (
        <LoginCard changeToSignup={toggleLoginSignup} />
      ) : (
        <SignupCard changeToLogin={toggleLoginSignup} />
      )}
    </Box>
  )
}

export default Auth
