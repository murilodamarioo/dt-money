
import { NavigationContainer } from '@react-navigation/native'
import { useCallback, useState } from 'react'

import { StatusBar } from 'expo-status-bar'

import { PublicRoutes } from './PublickRoutes'
import { PrivateRoutes } from './PrivateRoutes'

import { useAuthContext } from '@/context/auth.context'
import { Loading } from '@/screens/Loading'

const NavigationRoutes = () => {
  const [loading, setLoading] = useState(true)
  const { user, token } = useAuthContext()

  const Routes = useCallback(() => {
    if (loading) {
      return <Loading setLoading={setLoading} />
    }

    return !user || !token ? <PublicRoutes /> : <PrivateRoutes />
  }, [user, token, loading])

  return (
    <NavigationContainer>
      <StatusBar style={'light'} />
      <Routes />
    </NavigationContainer>
  )
}

export default NavigationRoutes