import { environment } from '@/config/environment'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const api = axios.create({
  baseURL: environment.baseUrl,
})

const toast = useToast()
const router = useRouter()

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(environment.tokenKey)
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status

    if (status === 401 || status === 403) {
      toast.error('Session expired. Please login again.')
      router.push('/auth/login')
    } else if (status >= 500) {
      toast.error('Server error. Please try again later.')
    } else if (error.response?.data?.message) {
      toast.error(error.response.data.message)
    } else {
      toast.error('Something went wrong.')
    }

    return Promise.reject(error)
  },
)

export default api
