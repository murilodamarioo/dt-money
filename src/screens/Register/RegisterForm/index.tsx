import { Fragment } from 'react'
import { useForm } from 'react-hook-form'
import { Text, View } from 'react-native'

import { AppButton } from '@/components/AppButton'
import { AppInput } from '@/components/AppInput'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { PublicStackParamsList } from '@/routes/PublickRoutes'

export interface FormRegisterParams {
  name: string
  email: string
  password: string
  confirmPassord: string
}

export const RegisterForm = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<FormRegisterParams>()

  const navigation = useNavigation<NavigationProp<PublicStackParamsList>>()

  return (
    <Fragment>
      <AppInput
        control={control}
        name='name'
        label='NOME'
        leftIconName='person'
        placeholder='Seu nome completo'
      />

      <AppInput
        control={control}
        name='email'
        label='E-MAIL'
        leftIconName='email'
        placeholder='Seu nome completo'
      />

      <AppInput
        control={control}
        name='password'
        label='SENHA'
        leftIconName='lock'
        placeholder='Sua senha'
        secureTextEntry
      />

      <AppInput
        control={control}
        name='confirmPassord'
        label='SENHA'
        leftIconName='lock'
        placeholder='Confirme sua senha'
        secureTextEntry
      />

      <View className='flex-1 justify-between mt-8 mb-6 min-h-[250px]'>
        <AppButton iconName='arrow-forward'>
          Cadastrar
        </AppButton>

        <View>
          <Text className='mb-6 text-gray-300 text-base'>
            Já tem uma conta?
          </Text>
          <AppButton
            onPress={() => navigation.goBack()}
            mode='outline'
            iconName='arrow-forward'
          >
            Acessar
          </AppButton>
        </View>
      </View>
    </Fragment>
  )
}