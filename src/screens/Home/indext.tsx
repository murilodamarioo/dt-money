import { useEffect } from 'react'
import { FlatList, RefreshControl } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { ListHeader } from './ListHeader'

import { useTransactionContext } from '@/context/transaction.context'

import { useErrorHandler } from '@/shared/hooks/useErrorHandler'
import { TransactionCard } from './TransactionCard'

export const Home = () => {
  const {
    refreshTransactions,
    fetchCategories,
    fetchTransactions,
    loadMoreTransactions,
    transactions,
    loading
  } = useTransactionContext()
  const { handleError } = useErrorHandler()

  const handleFetchCategories = async () => {
    try {
      await fetchCategories()
    } catch (error) {
      handleError(error, 'Falha ao buscar as categorias')
    }
  }

  const handleFetchInitialTransactions = async () => {
    try {
      await fetchTransactions({ page: 1 })
    } catch (error) {
      handleError(error, 'Falha ao buscar transações')
    }
  }

  const handleLoadMoreTransactions = async () => {
    try {
      await loadMoreTransactions()
    } catch (error) {
      handleError(error, 'Falha ao carregar novas transações')
    }
  }

  const handleRefreshTransactions = async () => {
    try {
      await refreshTransactions()
    } catch (error) {
      handleError(error, 'Falha ao recarregar as transações')
    }
  }

  useEffect(() => {
    void Promise.all([
      handleFetchCategories(),
      handleFetchInitialTransactions()
    ])
  }, [])

  return (
    <SafeAreaView className='flex-1 bg-background-primary'>
      <FlatList
        className='bg-background-secondary'
        data={transactions}
        keyExtractor={({ id }) => `transaction-${id}`}
        onEndReached={handleLoadMoreTransactions}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => <TransactionCard transaction={item} />}
        ListHeaderComponent={ListHeader}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={handleRefreshTransactions}
          />
        }
      />
    </SafeAreaView>
  )
}