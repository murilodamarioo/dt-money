
import { NavigationContainer } from '@react-navigation/native'
import { useCallback, useState } from 'react'

import { PublicRoutes } from './PublickRoutes'
import { PrivateRoutes } from './PrivateRoutes'

const NavigationRoutes = () => {
  const [user, setUser] = useState(undefined)

  const Routes = useCallback(() => {
    return !user ? <PublicRoutes /> : <PrivateRoutes />
  }, [user])

  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  )
}

export default NavigationRoutes