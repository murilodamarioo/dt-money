import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useState
} from 'react'

import { TransactionCategory } from '@/shared/interfaces/https/transaction-category-response'
import { CreateTransactionRequest } from '@/shared/interfaces/https/create-transaction-request'
import { UpdateTransactionRequest } from '@/shared/interfaces/https/update-transaction-request'
import { Pagination } from '@/shared/interfaces/https/get-transaction-request'
import { Transaction } from '@/shared/interfaces/transaction'
import { TotalTransactions } from '@/shared/interfaces/https/total-transactions'
import * as transactionService from '@/shared/services/dt-money/transaction.service'

interface FetchTransactionsParams {
  page: number
}

interface loadingss {
  initial: boolean
  refresh: boolean
  loadMore: boolean
}

interface HandleloadingsParams {
  key: keyof loadingss
  value: boolean
}

export type TransactionContextType = {
  refreshTransactions: () => Promise<void>
  fetchCategories: () => Promise<void>
  fetchTransactions: (params: FetchTransactionsParams) => Promise<void>
  createTransaction: (transaction: CreateTransactionRequest) => Promise<void>
  updateTransaction: (transaction: UpdateTransactionRequest) => Promise<void>
  loadMoreTransactions: () => Promise<void>
  handleloadings: (params: HandleloadingsParams) => void
  categories: TransactionCategory[]
  totalTransactions: TotalTransactions
  transactions: Transaction[]
  loadings: loadingss
}

export const TransactionContext = createContext({} as TransactionContextType)

export const TransactionProvider: FC<PropsWithChildren> = ({ children }) => {
  const [categories, setCategories] = useState<TransactionCategory[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loadings, setloadings] = useState<loadingss>({
    initial: false,
    refresh: false,
    loadMore: false
  })
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    perPage: 15,
    totalRows: 0,
    totalPages: 0
  })
  const [totalTransactions, setTotalTransaction] = useState<TotalTransactions>({
    expense: 0,
    revenue: 0,
    total: 0
  })

  const handleloadings = ({ key, value }: HandleloadingsParams) => {
    setloadings((prevValue) => ({ ...prevValue, [key]: value }))
  }

  const refreshTransactions = useCallback(
    async () => {
      const { page, perPage } = pagination
      const transactionResponse = await transactionService.getTransactions({
        page: 1,
        perPage: page * perPage
      })
      setTransactions(transactionResponse.data)
      setTotalTransaction(transactionResponse.totalTransactions)
      setPagination({
        ...pagination,
        page,
        totalPages: transactionResponse.totalPages,
        totalRows: transactionResponse.totalRows
      })
    }, [pagination])

  const fetchCategories = async () => {
    const categoriesResponse = await transactionService.getTransactionCategories()

    setCategories(categoriesResponse)
  }

  const fetchTransactions = useCallback(
    async ({ page = 1 }: FetchTransactionsParams) => {

      const transactionResponse = await transactionService.getTransactions({
        page,
        perPage: pagination.perPage
      })

      if (page === 1) {
        setTransactions(transactionResponse.data)
      } else {
        setTransactions((prevState) => [...prevState, ...transactionResponse.data])
      }

      setTotalTransaction(transactionResponse.totalTransactions)
      setPagination({
        ...pagination,
        page,
        totalRows: transactionResponse.totalRows,
        totalPages: transactionResponse.totalPages
      })
    }, [pagination])

  const createTransaction = async (transaction: CreateTransactionRequest) => {
    await transactionService.createTransaction(transaction)
    await refreshTransactions()
  }

  const updateTransaction = async (transaction: UpdateTransactionRequest) => {
    await transactionService.updateTransaction(transaction)
    await refreshTransactions()
  }

  const loadMoreTransactions = useCallback(async () => {
    if (loadings || pagination.page >= pagination.totalPages) return

    await fetchTransactions({ page: pagination.page + 1 })
  }, [loadings.loadMore, pagination])

  return (
    <TransactionContext.Provider
      value={{
        refreshTransactions,
        fetchCategories,
        fetchTransactions,
        createTransaction,
        updateTransaction,
        loadMoreTransactions,
        handleloadings,
        categories,
        totalTransactions,
        transactions,
        loadings
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}

export const useTransactionContext = () => {
  return useContext(TransactionContext)
}