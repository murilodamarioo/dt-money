import { Fragment } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { useForm } from 'react-hook-form'
import { NavigationProp, useNavigation } from '@react-navigation/native'

import { yupResolver } from '@hookform/resolvers/yup'

import { schema } from './schema'

import { AppInput } from '@/components/AppInput'
import { AppButton } from '@/components/AppButton'

import { useAuthContext } from '@/context/auth.context'

import { PublicStackParamsList } from '@/routes/PublickRoutes'

import { useErrorHandler } from '@/shared/hooks/useErrorHandler'
import { colors } from '@/shared/colors'

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

  const { handleAuthenticate } = useAuthContext()
  const { handleError } = useErrorHandler()

  const navigation = useNavigation<NavigationProp<PublicStackParamsList>>()

  const onSubmit = async (userData: FormLoginParams) => {
    try {
      await handleAuthenticate(userData)
    } catch (error) {
      handleError(error, 'Falha ao logar')
    }
  }

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
          {isSubmitting ? (<ActivityIndicator color={colors.white} />
          ) : (
            'Login'
          )}
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