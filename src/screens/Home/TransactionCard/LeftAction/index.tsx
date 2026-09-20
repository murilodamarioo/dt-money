import { FC, } from 'react'
import { TouchableOpacity, View } from 'react-native'

import { MaterialIcons } from '@expo/vector-icons'

import { useBottomSheetContext } from '@/context/bottomSheet.context'

import { EditTransactionForm } from './EditTransactionForm'

import { Transaction } from '@/shared/interfaces/transaction'
import { colors } from '@/shared/colors'

interface Params {
  transaction: Transaction
}

export const LeftAction: FC<Params> = ({ transaction }) => {
  const { openBottomSheet } = useBottomSheetContext()

  return (
    <TouchableOpacity onPress={() => {
      openBottomSheet(<EditTransactionForm transaction={transaction} />, 0)
    }}>
      <View
        className='h-[140] bg-accent-blue-dark w-[80] rounded-l-[6] justify-center items-center'
      >
        <MaterialIcons name='edit' size={30} color={colors.white} />
      </View>
    </TouchableOpacity>
  )
}