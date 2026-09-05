export interface CreateTransactionRequest {
  description: string
  typeId: number
  categoryId: number
  value: number
}