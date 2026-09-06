import NavigationRoutes from '@/routes'

import { AuthContextProvivider } from '@/context/auth.context'
import { SnackbarContextProvider } from '@/context/snackbar.context'

import { Snackbar } from '@/components/Snackbar'

import './src/styles/global.css'
import { BottomSheetProvider } from '@/context/bottomSheet.context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { TransactionProvider } from '@/context/transaction.context'

export default function App() {
  return (
    <GestureHandlerRootView className='flex-1'>
      <SnackbarContextProvider>
        <AuthContextProvivider>
          <TransactionProvider>
            <BottomSheetProvider>
              <NavigationRoutes />
              <Snackbar />
            </BottomSheetProvider>
          </TransactionProvider>
        </AuthContextProvivider>
      </SnackbarContextProvider>
    </GestureHandlerRootView>
  )
}


