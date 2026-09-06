import qs from 'qs'

import { dtMoneyApi } from '@/shared/api/dt.money'
import { CreateTransactionRequest } from '@/shared/interfaces/https/create-transaction-request'
import { GetTransactionsParams, GetTransactionsResponse } from '@/shared/interfaces/https/get-transaction-request'
import { TransactionCategory } from '@/shared/interfaces/https/transaction-category-response'

export const getTransactionCategories = async (): Promise<TransactionCategory[]> => {
  const { data } = await dtMoneyApi.get<TransactionCategory[]>('/transaction/categories')

  return data
}

export const createTransaction = async (transaction: CreateTransactionRequest) => {
  await dtMoneyApi.post<CreateTransactionRequest>('/transaction', transaction)
}

export const getTransactions = async (params: GetTransactionsParams): Promise<GetTransactionsResponse> => {
  const { data } = await dtMoneyApi.get<GetTransactionsResponse>('/transaction', {
    params,
    paramsSerializer: (p) => qs.stringify(p, { arrayFormat: 'repeat' })
  })

  return data
}