
import { NavigationContainer } from '@react-navigation/native'
import { useCallback } from 'react'

import { StatusBar } from 'expo-status-bar'

import { PublicRoutes } from './PublickRoutes'
import { PrivateRoutes } from './PrivateRoutes'

import { useAuthContext } from '@/context/auth.context'

const NavigationRoutes = () => {
  const { user, token } = useAuthContext()

  const Routes = useCallback(() => {
    return !user || !token ? <PublicRoutes /> : <PrivateRoutes />
  }, [user, token])

  return (
    <NavigationContainer>
      <StatusBar style={'light'} />
      <Routes />
    </NavigationContainer>
  )
}

export default NavigationRoutes