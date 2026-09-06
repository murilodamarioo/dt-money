import { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native'
import CurrencyInput from 'react-native-currency-input'

import * as Yup from 'yup'

import { useBottomSheetContext } from '@/context/bottomSheet.context'

import { TransactionTypeSelector } from '../SelectType'
import { SelectCategoryModal } from '../SelectCategoryModal'
import { AppButton } from '../AppButton'

import { CreateTransactionRequest } from '@/shared/interfaces/https/create-transaction-request'
import { colors } from '@/shared/colors'

import { transactionSchema } from './schema'
import { ErrorMessage } from '../ErrorMessage'
import { useTransactionContext } from '@/context/transaction.context'
import { useErrorHandler } from '@/shared/hooks/useErrorHandler'


type ValidationErrorsTypes = Record<keyof CreateTransactionRequest, string>

export const NewTransaction = () => {
  const { closeBottomSheet } = useBottomSheetContext()
  const { createTransaction } = useTransactionContext()
  const { handleError } = useErrorHandler()

  const [loading, setLoading] = useState(false)

  const [validationErrrors, setVaidationErrors] = useState<ValidationErrorsTypes>()

  const [transaction, setTransaction] = useState<CreateTransactionRequest>({
    description: '',
    categoryId: 0,
    typeId: 0,
    value: 0
  })

  const handleCreateTransaction = async () => {
    try {
      setLoading(true)
      await transactionSchema.validate(transaction, { abortEarly: false })

      await createTransaction(transaction)

      closeBottomSheet()
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = {} as ValidationErrorsTypes

        error.inner.forEach((err) => {
          if (err.path) {
            errors[err.path as keyof CreateTransactionRequest] = err.message
          }
        })
        setVaidationErrors(errors)
      } else {
        handleError(error, 'Falha ao criar transação')
      }
    } finally {
      setLoading(false)
    }
  }

  const setTransactionData = (key: keyof CreateTransactionRequest, value: string | number) => {
    setTransaction((prevData) => ({ ...prevData, [key]: value }))
  }

  return (
    <View className='px-8 py5'>
      <TouchableOpacity className='w-full flex-row items-center justify-between'>
        <Text className='text-xl text-white font-bold'>
          Nova transação
        </Text>
        <MaterialIcons
          name='close'
          size={20}
          color={colors.gray[700]}
          onPress={closeBottomSheet}
        />
      </TouchableOpacity>

      <View className='flex-1 mt-8 mb-8'>
        {
          validationErrrors?.description && <ErrorMessage>{validationErrrors.description}</ErrorMessage>
        }
        <TextInput
          className='text-white text-lg h-[50] bg-background-primary my-2 rounded-[6] pl-4'
          placeholder='Descrição'
          placeholderTextColor={colors.gray[700]}
          value={transaction.description}
          onChangeText={(text) => setTransactionData('description', text)}
        />


        {
          validationErrrors?.value && <ErrorMessage>{validationErrrors.value}</ErrorMessage>
        }
        <CurrencyInput
          className='text-white text-lg h-[50] bg-background-primary my-2 rounded-[6] pl-4'
          value={transaction.value}
          prefix='R$'
          delimiter='.'
          separator=','
          precision={2}
          minValue={0}
          onChangeValue={(value) => setTransactionData('value', value ?? 0)}
        />


        {
          validationErrrors?.categoryId && <ErrorMessage>{validationErrrors.categoryId}</ErrorMessage>
        }
        <SelectCategoryModal
          selectedCategory={transaction.categoryId}
          onSelect={(categoryId) => setTransactionData('categoryId', categoryId)}
        />


        {
          validationErrrors?.typeId && <ErrorMessage>{validationErrrors.typeId}</ErrorMessage>
        }
        <TransactionTypeSelector
          typeId={transaction.typeId}
          setTransactionType={(type) => setTransactionData('typeId', type)}
        />


        <View className='my-4'>
          <AppButton onPress={handleCreateTransaction}>
            {loading ? <ActivityIndicator color={colors.white} /> : 'Registrar'}
          </AppButton>
        </View>
      </View>
    </View>
  )
}