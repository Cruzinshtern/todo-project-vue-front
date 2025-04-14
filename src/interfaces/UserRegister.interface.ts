import type { UserAuth } from './UserAuth.interface'

export interface UserRegister extends UserAuth {
  firstName: string
  lastName: string
}
