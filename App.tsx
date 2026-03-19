import NavigationRoutes from '@/routes'

import { AuthContextProvivider } from '@/context/auth.context'
import { SnackbarContextProvider } from '@/context/snackbar.context'

import { Snackbar } from '@/components/Snackbar'

import './src/styles/global.css'
import { BottomSheetProvider } from '@/context/bottomSheet.context'

export default function App() {
  return (
    <SnackbarContextProvider>
      <AuthContextProvivider>
        <BottomSheetProvider>
          <NavigationRoutes />
          <Snackbar />
        </BottomSheetProvider>
      </AuthContextProvivider>
    </SnackbarContextProvider>
  )
}


