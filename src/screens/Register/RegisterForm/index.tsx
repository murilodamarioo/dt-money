import { Fragment } from 'react'
import { useForm } from 'react-hook-form'
import { Text, View } from 'react-native'
import { NavigationProp, useNavigation } from '@react-navigation/native'

import { yupResolver } from '@hookform/resolvers/yup'

import { schema } from './schema'

import { AppButton } from '@/components/AppButton'
import { AppInput } from '@/components/AppInput'

import { PublicStackParamsList } from '@/routes/PublickRoutes'

export interface FormRegisterParams {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export const RegisterForm = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<FormRegisterParams>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    resolver: yupResolver(schema)
  })

  const navigation = useNavigation<NavigationProp<PublicStackParamsList>>()

  const onSubmit = () => { }

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
        name='confirmPassword'
        label='SENHA'
        leftIconName='lock'
        placeholder='Confirme sua senha'
        secureTextEntry
      />

      <View className='flex-1 justify-between mt-8 mb-6 min-h-[250px]'>
        <AppButton onPress={handleSubmit(onSubmit)} iconName='arrow-forward'>
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