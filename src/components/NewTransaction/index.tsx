import { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import CurrencyInput from 'react-native-currency-input'

import { useBottomSheetContext } from '@/context/bottomSheet.context'

import { TransactionTypeSelector } from '../SelectType'
import { SelectCategoryModal } from '../SelectCategoryModal'

import { CreateTransactionRequest } from '@/shared/interfaces/https/create-transaction-request'
import { colors } from '@/shared/colors'

export const NewTransaction = () => {
  const { closeBottomSheet } = useBottomSheetContext()

  const [transaction, setTransaction] = useState<CreateTransactionRequest>({
    description: '',
    categoryId: 0,
    typeId: 0,
    value: 0
  })

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
        <TextInput
          className='text-white text-lg h-[50] bg-background-primary my-2 rounded-[6] pl-4'
          placeholder='Descrição'
          placeholderTextColor={colors.gray[700]}
          value={transaction.description}
          onChangeText={(text) => setTransactionData('description', text)}
        />

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

        <SelectCategoryModal 
          selectedCategory={transaction.categoryId}
          onSelect={(categoryId) => setTransactionData('categoryId', categoryId)}
        />

        <TransactionTypeSelector
          typeId={transaction.typeId}
          setTransactionType={(type) => setTransactionData('typeId', type)}
        />
      </View>
    </View>
  )
}