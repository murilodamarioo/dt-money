import { Image, Text, TouchableOpacity, View } from 'react-native'

import { MaterialIcons } from '@expo/vector-icons'

import { colors } from '@/shared/colors'
import { useAuthContext } from '@/context/auth.context'

export const AppHeader = () => {
  const { handleLogout } = useAuthContext()

  return (
    <View className='flex-row w-full p-8 justify-between'>
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
      <TouchableOpacity className='bg-accent-brand w-[130px] h-[40px] items-center justify-center rounded-xl'>
        <Text className='text-white font-bold text-sm'>
          Nova transação
        </Text>
      </TouchableOpacity>
    </View>
  )
}