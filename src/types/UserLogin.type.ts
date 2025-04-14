import type { UserAuth } from '@/interfaces/UserAuth.interface'

export type UserLoginType = {
  (event: 'register', value: UserAuth): void
}
