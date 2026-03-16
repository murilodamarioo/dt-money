import { Platform } from 'react-native'

import axios from 'axios'

const baseURL = Platform.select({
  ios: 'http://localhost:3001',
  android: 'http://10.0.2.2:3001',
})

export const dtMoneyApi = axios.create({
  baseURL
})