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
    handleloadings,
    transactions,
    loadings
  } = useTransactionContext()
  const { handleError } = useErrorHandler()

  const handleFetchCategories = async () => {
    try {
      handleloadings({ key: 'initial', value: true })
      await fetchCategories()
    } catch (error) {
      handleError(error, 'Falha ao buscar as categorias')
    } finally {
      handleloadings({ key: 'initial', value: false })
    }
  }

  const handleFetchInitialTransactions = async () => {
    try {
      handleloadings({ key: 'initial', value: true })
      await fetchTransactions({ page: 1 })
    } catch (error) {
      handleError(error, 'Falha ao buscar transações')
    } finally {
      handleloadings({ key: 'initial', value: false })
    }
  }

  const handleLoadMoreTransactions = async () => {
    try {
      handleloadings({ key: 'loadMore', value: true })
      await loadMoreTransactions()
    } catch (error) {
      handleError(error, 'Falha ao carregar novas transações')
    } finally {
      handleloadings({ key: 'loadMore', value: false })
    }
  }

  const handleRefreshTransactions = async () => {
    try {
      handleloadings({ key: 'refresh', value: true })
      await refreshTransactions()
    } catch (error) {
      handleError(error, 'Falha ao recarregar as transações')
    } finally {
      handleloadings({ key: 'refresh', value: false })
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
            refreshing={loadings.refresh}
            onRefresh={handleRefreshTransactions}
          />
        }
      />
    </SafeAreaView>
  )
}