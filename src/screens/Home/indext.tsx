import { useEffect } from 'react'
import { FlatList, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { ListHeader } from './ListHeader'

import { useTransactionContext } from '@/context/transaction.context'

import { useErrorHandler } from '@/shared/hooks/useErrorHandler'

export const Home = () => {
  const { fetchCategories, fetchTransactions } = useTransactionContext()
  const { handleError } = useErrorHandler()

  const handleFetchCategories = async () => {
    try {
      await Promise.all([
        fetchCategories(),
        fetchTransactions()
      ])
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
      <FlatList
        className='bg-background-secondary'
        data={[]}
        renderItem={() => <></>}
        ListHeaderComponent={ListHeader}
      />
    </SafeAreaView>
  )
}