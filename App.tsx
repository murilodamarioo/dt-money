import NavigationRoutes from '@/routes'

import { AuthContextProvivider } from '@/context/auth.context'
import { SnackbarContextProvider } from '@/context/snackbar.context'

import { Snackbar } from '@/components/Snackbar'

import './src/styles/global.css'
import { BottomSheetProvider } from '@/context/bottomSheet.context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function App() {
  return (
    <GestureHandlerRootView className='flex-1'>
      <SnackbarContextProvider>
        <AuthContextProvivider>
          <BottomSheetProvider>
            <NavigationRoutes />
            <Snackbar />
          </BottomSheetProvider>
        </AuthContextProvivider>
      </SnackbarContextProvider>
    </GestureHandlerRootView>
  )
}


