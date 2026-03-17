import NavigationRoutes from '@/routes'

import { AuthContextProvivider } from '@/context/auth.context'
import { SnackbarContextProvider } from '@/context/snackbar.context'

import './src/styles/global.css'

export default function App() {
  return (
    <SnackbarContextProvider>
      <AuthContextProvivider>
        <NavigationRoutes />
      </AuthContextProvivider>
    </SnackbarContextProvider>
  )
}


