import { createContext, FC, PropsWithChildren, useCallback, useContext, useState } from 'react'

import { TransactionCategory } from '@/shared/interfaces/https/transaction-category-response'
import { CreateTransactionRequest } from '@/shared/interfaces/https/create-transaction-request'
import { UpdateTransactionRequest } from '@/shared/interfaces/https/update-transaction-request'
import { Transaction } from '@/shared/interfaces/transaction'
import { TotalTransactions } from '@/shared/interfaces/https/total-transactions'
import * as transactionService from '@/shared/services/dt-money/transaction.service'

export type TransactionContextType = {
  refreshTransactions: () => Promise<void>
  fetchCategories: () => Promise<void>
  fetchTransactions: () => Promise<void>
  createTransaction: (transaction: CreateTransactionRequest) => Promise<void>
  updateTransaction: (transaction: UpdateTransactionRequest) => Promise<void>
  categories: TransactionCategory[]
  totalTransactions: TotalTransactions
  transactions: Transaction[]
  loading: boolean
}

export const TransactionContext = createContext({} as TransactionContextType)

export const TransactionProvider: FC<PropsWithChildren> = ({ children }) => {
  const [categories, setCategories] = useState<TransactionCategory[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(false)
  const [totalTransactions, setTotalTransaction] = useState<TotalTransactions>({
    expense: 0,
    revenue: 0,
    total: 0
  })

  const refreshTransactions = async () => {
    setLoading(true)
    const transactionResponse = await transactionService.getTransactions({
      page: 1,
      perPage: 10
    })
    setTransactions(transactionResponse.data)
    setTotalTransaction(transactionResponse.totalTransactions)
    setLoading(false)
  }

  const fetchCategories = async () => {
    const categoriesResponse = await transactionService.getTransactionCategories()

    setCategories(categoriesResponse)
  }

  const fetchTransactions = useCallback(async () => {
    const transactionResponse = await transactionService.getTransactions({
      page: 1,
      perPage: 10
    })
    setTransactions(transactionResponse.data)
    setTotalTransaction(transactionResponse.totalTransactions)
  }, [])

  const createTransaction = async (transaction: CreateTransactionRequest) => {
    await transactionService.createTransaction(transaction)
    await refreshTransactions()
  }

  const updateTransaction = async (transaction: UpdateTransactionRequest) => {
    await transactionService.updateTransaction(transaction)
    await refreshTransactions()
  }

  return (
    <TransactionContext.Provider
      value={{
        refreshTransactions,
        fetchCategories,
        fetchTransactions,
        createTransaction,
        updateTransaction,
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