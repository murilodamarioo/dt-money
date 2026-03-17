import { useAuthContext } from '@/context/auth.context'
import { View, Text, TouchableOpacity } from 'react-native'

export const Home = () => {
  const { handleLogout } = useAuthContext()

  return (
    <View className='flex-1 items-center justify-center'>
      <Text>Tela de Home</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text>
          Sair
        </Text>
      </TouchableOpacity>
    </View>
  )
}