import axios from 'axios'

import { API_BASE } from '@/constants'
import { useToastStore } from '@/stores/toast.store'

export const http = axios.create({
  baseURL: API_BASE,
})

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!axios.isCancel(error)) {
      const message = axios.isAxiosError(error)
        ? (error.response?.data?.message ?? error.message)
        : 'Unknown error'
      useToastStore().error(message)
    }
    return Promise.reject(error)
  },
)
