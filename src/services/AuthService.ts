import type { UserAuth } from '@/interfaces/UserAuth.interface'
import type { UserRegister } from '@/interfaces/UserRegister.interface'
import axios from 'axios'

export const AuthService = {
  async register(data: UserRegister) {
    const response = await axios.post('/api/users/create', data)
    return response.data
  },

  async login(data: UserAuth) {
    const response = await axios.post('/api/auth/login', data)
    return response.data
  },
}
