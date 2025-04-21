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

  getLanguage(): string {
    return localStorage.getItem(environment.langKey) || environment.defaultLang
  },

  setLanguage(lang: string) {
    localStorage.setItem(environment.langKey, lang)
  },
}
