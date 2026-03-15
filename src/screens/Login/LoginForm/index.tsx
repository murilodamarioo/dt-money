import { Fragment } from 'react'
import { Text, View } from 'react-native'
import { useForm } from 'react-hook-form'
import { NavigationProp, useNavigation } from '@react-navigation/native'

import { yupResolver } from '@hookform/resolvers/yup'

import { schema } from './schema'

import { AppInput } from '@/components/AppInput'
import { AppButton } from '@/components/AppButton'

import { PublicStackParamsList } from '@/routes/PublickRoutes'

export interface FormLoginParams {
  email: string
  password: string
}

export const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<FormLoginParams>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: yupResolver(schema)
  })

  const navigation = useNavigation<NavigationProp<PublicStackParamsList>>()

  const onSubmit = async () => { }

  return (
    <Fragment>
      <AppInput
        control={control}
        leftIconName='email'
        name='email'
        label='E-MAIL'
        placeholder='Digite seu email'
      />

      <AppInput
        control={control}
        leftIconName='lock'
        name='password'
        label='SENHA'
        placeholder='Sua senha'
        secureTextEntry
      />

      <View className='flex-1 justify-between mt-8 mb-6 min-h-[250px]'>
        <AppButton onPress={handleSubmit(onSubmit)} iconName='arrow-forward'>
          Login
        </AppButton>

        <View>
          <Text className='mb-6 text-gray-300 text-base'>
            Ainda não possui uma conta?
          </Text>
          <AppButton
            onPress={() => navigation.navigate('Register')}
            mode='outline'
            iconName='arrow-forward'
          >
            Cadastrar
          </AppButton>
        </View>
      </View>
    </Fragment>
  )
}