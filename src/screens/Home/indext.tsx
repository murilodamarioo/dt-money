import { useEffect } from 'react'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { AppHeader } from '@/components/AppHeader'

import { useTransactionContext } from '@/context/transaction.context'

import { useErrorHandler } from '@/shared/hooks/useErrorHandler'

export const Home = () => {
  const { fetchCategories } = useTransactionContext()
  const { handleError } = useErrorHandler()

  const handleFetchCategories = async () => {
    try {
      await fetchCategories()
    } catch (error) {
      handleError(error, 'Falha aon buscar as categorias')
    }
  }

  useEffect(() => {
    (async () => {
      await handleFetchCategories()
    })()
  }, [])

  return (
    <SafeAreaView className='flex-1 bg-background-primary'>
      <AppHeader />
      <Text>Tela de Home</Text>
    </SafeAreaView>
  )
}