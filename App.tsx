import NavigationRoutes from '@/routes'

import { AuthContextProvivider } from '@/context/auth.context'

import './src/styles/global.css'

export default function App() {
  return (
    <AuthContextProvivider>
      <NavigationRoutes />
    </AuthContextProvivider>
  )
}


