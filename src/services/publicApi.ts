import axios from 'axios'
import { environment } from '@/config/environment'

const publicApi = axios.create({
  baseURL: environment.baseUrl,
})

export default publicApi
