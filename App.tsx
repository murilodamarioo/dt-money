import NavigationRoutes from '@/routes'

import { AuthContextProvivider } from '@/context/auth.context'
import { SnackbarContextProvider } from '@/context/snackbar.context'

import { Snackbar } from '@/components/Snackbar'

import './src/styles/global.css'

export default function App() {
  return (
    <SnackbarContextProvider>
      <AuthContextProvivider>
        <NavigationRoutes />
        <Snackbar />
      </AuthContextProvivider>
    </SnackbarContextProvider>
  )
}


