export const LocalStorageService = {
  async setToken(token: string) {
    localStorage.setItem('token', token)
  },
}
