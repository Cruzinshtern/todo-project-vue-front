import { environment } from '@/config/environment'

export const LocalStorageService = {
  setToken(token: string) {
    localStorage.setItem(environment.tokenKey, token)
  },

  getToken() {
    return localStorage.getItem(environment.tokenKey)
  },

  deleteToken() {
    localStorage.removeItem(environment.tokenKey)
  },
}
