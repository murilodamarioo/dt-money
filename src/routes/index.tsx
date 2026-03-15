
import { NavigationContainer } from '@react-navigation/native'
import { useCallback, useState } from 'react'

import { PublicRoutes } from './PublickRoutes'
import { PrivateRoutes } from './PrivateRoutes'
import { StatusBar } from 'expo-status-bar'

const NavigationRoutes = () => {
  const [user, setUser] = useState(undefined)

  const Routes = useCallback(() => {
    return !user ? <PublicRoutes /> : <PrivateRoutes />
  }, [user])

  return (
    <NavigationContainer>
      <StatusBar style={'light'} />
      <Routes />
    </NavigationContainer>
  )
}

export default NavigationRoutes