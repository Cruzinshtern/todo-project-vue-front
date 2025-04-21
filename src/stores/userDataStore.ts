import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode'
import type { JwtPayload } from '@/interfaces/JwtPayload.interface'
import { LocalStorageService } from '@/services/LocalStorageService'

export const useUserDataStore = defineStore('userData', {
  state: () => ({
    name: '' as string,
    email: '' as string,
  }),
  actions: {
    setUserFromToken(token: string) {
      try {
        const decoded = jwtDecode<JwtPayload>(token)
        this.name = `${decoded.firstName} ${decoded.lastName}`
        this.email = decoded.email
      } catch (e: any) {
        console.error(`Invalid token: ${e}`)
      }
    },
    logout() {
      this.name = ''
      this.email = ''
      LocalStorageService.deleteToken()
    },
  },
  persist: true,
})
