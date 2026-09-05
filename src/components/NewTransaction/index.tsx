import { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { Text, TouchableOpacity, View } from 'react-native'

import { useBottomSheetContext } from '@/context/bottomSheet.context'

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
    </View>
  )
}