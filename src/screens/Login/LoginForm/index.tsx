import { Fragment } from 'react'
import { Text, View } from 'react-native'
import { useForm } from 'react-hook-form'

import { AppInput } from '@/components/AppInput'
import { AppButton } from '@/components/AppButton'

export interface FormLoginParams {
  email: string
  password: string
}

export const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<FormLoginParams>()

  return (
    <Fragment>
      <AppInput
        control={control}
        leftIconName='email'
        name='email'
        label='E-mail'
        placeholder='Digite seu email'
      />

      <AppInput
        control={control}
        leftIconName='lock'
        name='password'
        label='Senha'
        placeholder='Senha senha'
        secureTextEntry
      />

      <View className='flex-1 justify-between mt-8 mb-6 min-h-[250px]'>
        <AppButton iconName='arrow-forward'>
          Login
        </AppButton>

        <View>
          <Text className='mb-6 text-gray-300 text-base'>
            Ainda não possui uma conta?
          </Text>
          <AppButton mode='outline' iconName='arrow-forward'>
            Cadastrar
          </AppButton>
        </View>
      </View>
    </Fragment>
  )
}