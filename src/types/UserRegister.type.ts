import type { UserRegister } from '@/interfaces/UserRegister.interface'

export type UserRegisterType = {
  (event: 'register', value: UserRegister): void
}
