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

export type TransactionContextType = {
  refreshTransactions: () => Promise<void>
  fetchCategories: () => Promise<void>
  fetchTransactions: (params: FetchTransactionsParams) => Promise<void>
  createTransaction: (transaction: CreateTransactionRequest) => Promise<void>
  updateTransaction: (transaction: UpdateTransactionRequest) => Promise<void>
  categories: TransactionCategory[]
  totalTransactions: TotalTransactions
  transactions: Transaction[]
  loading: boolean
  loadMoreTransactions: () => Promise<void>
}

export const TransactionContext = createContext({} as TransactionContextType)

export const TransactionProvider: FC<PropsWithChildren> = ({ children }) => {
  const [categories, setCategories] = useState<TransactionCategory[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    perPage: 3,
    totalRows: 0,
    totalPages: 0
  })
  const [totalTransactions, setTotalTransaction] = useState<TotalTransactions>({
    expense: 0,
    revenue: 0,
    total: 0
  })

  const refreshTransactions = async () => {
    const { page, perPage } = pagination

    setLoading(true)
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
    setLoading(false)
  }

  const fetchCategories = async () => {
    const categoriesResponse = await transactionService.getTransactionCategories()

    setCategories(categoriesResponse)
  }

  const fetchTransactions = useCallback(
    async ({ page = 1 }: FetchTransactionsParams) => {
      setLoading(true)

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
      setLoading(false)
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
    if (loading || pagination.page >= pagination.totalPages) return

    fetchTransactions({ page: pagination.page + 1 })
  }, [loading, pagination])

  return (
    <TransactionContext.Provider
      value={{
        refreshTransactions,
        fetchCategories,
        fetchTransactions,
        createTransaction,
        updateTransaction,
        loadMoreTransactions,
        categories,
        totalTransactions,
        transactions,
        loading
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}

export const useTransactionContext = () => {
  return useContext(TransactionContext)
}