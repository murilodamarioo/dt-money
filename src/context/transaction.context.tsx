import { createContext, FC, PropsWithChildren, useCallback, useContext, useState } from 'react'

import { TransactionCategory } from '@/shared/interfaces/https/transaction-category-response'

import * as transactionService from '@/shared/services/dt-money/transaction.service'
import { CreateTransactionRequest } from '@/shared/interfaces/https/create-transaction-request'
import { Transaction } from '@/shared/interfaces/transaction'

export type TransactionContextType = {
  fetchCategories: () => Promise<void>
  fetchTransactions: () => Promise<void>
  createTransaction: (transaction: CreateTransactionRequest) => Promise<void>
  categories: TransactionCategory[]
}

export const TransactionContext = createContext({} as TransactionContextType)

export const TransactionProvider: FC<PropsWithChildren> = ({ children }) => {
  const [categories, setCategories] = useState<TransactionCategory[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])

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
  }, [])

  const createTransaction = async (transaction: CreateTransactionRequest) => {
    await transactionService.createTransaction(transaction)
  }

  return (
    <TransactionContext.Provider
      value={{
        fetchCategories,
        fetchTransactions,
        createTransaction,
        categories
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}

export const useTransactionContext = () => {
  return useContext(TransactionContext)
}