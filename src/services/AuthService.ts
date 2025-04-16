import type { UserAuth } from '@/interfaces/UserAuth.interface'
import type { UserRegister } from '@/interfaces/UserRegister.interface'
import type { LoginResponse } from '@/interfaces/LoginResponse.interface'
import publicApi from './publicApi'

export const AuthService = {
  async register(data: UserRegister): Promise<void> {
    await publicApi.post('/users/create', data)
  },

  async login(data: UserAuth): Promise<LoginResponse> {
    const response = await publicApi.post('/auth/login', data)
    return response.data
  },
}
