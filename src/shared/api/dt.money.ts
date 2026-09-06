import { Platform } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import axios from 'axios'

import { AppError } from '../helpers/AppError'
import { addTokenToRequest } from '../helpers/axios.helper'
import { IAuthenticateResponse } from '../interfaces/https/authenticate-response'

const baseURL = Platform.select({
  ios: 'http://localhost:3001',
  android: 'http://10.0.2.2:3001',
})

export const dtMoneyApi = axios.create({
  baseURL
})

addTokenToRequest(dtMoneyApi)

dtMoneyApi.interceptors.response.use(
  (config) => config,
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message))
    } else {
      return Promise.reject(new AppError('Falha na requisição'))
    }
  }
)