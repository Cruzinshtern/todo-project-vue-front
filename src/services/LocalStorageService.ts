import { environment } from '@/config/environment'

export const LocalStorageService = {
  setToken(token: string) {
    localStorage.setItem(environment.tokenKey, token)
  },

  getToken(): string | null {
    return localStorage.getItem(environment.tokenKey)
  },

  deleteToken() {
    localStorage.removeItem(environment.tokenKey)
  },
}
