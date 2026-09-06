import { Image, Text, TouchableOpacity, View } from 'react-native'

import { MaterialIcons } from '@expo/vector-icons'

import { useAuthContext } from '@/context/auth.context'
import { useBottomSheetContext } from '@/context/bottomSheet.context'

import { NewTransaction } from '../NewTransaction'

import { colors } from '@/shared/colors'

export const AppHeader = () => {
  const { handleLogout } = useAuthContext()
  const { openBottomSheet } = useBottomSheetContext()

  return (
    <View className='flex-row w-full p-8 justify-between bg-background-primary'>
      <View>
        <Image
          source={require('@/assets/Logo.png')}
          className='w-[130px] h-[30px]'
        />
        <TouchableOpacity onPress={handleLogout} className='flex-row items-center gap-2 mt-2'>
          <MaterialIcons
            name='logout'
            color={colors.gray[700]}
            size={16}
          />
          <Text className='text-base text-gray-700'>
            Sair da conta
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {
          openBottomSheet(<NewTransaction />, 0)
        }}
        className='bg-accent-brand w-[130px] h-[40px] items-center justify-center rounded-xl'
      >
        <Text className='text-white font-bold text-sm'>
          Nova transação
        </Text>
      </TouchableOpacity>
    </View>
  )
}