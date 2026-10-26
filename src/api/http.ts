import axios from 'axios'

import { API_BASE, TOKEN_STORAGE_KEY } from '@/constants'
import { useToastStore } from '@/stores/toast.store'

export const http = axios.create({
  baseURL: API_BASE,
})

http.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY)
    if (token) config.headers.Authorization = `Bearer ${token}`
  } catch {}
  return config
})

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!axios.isCancel(error)) {
      const message = axios.isAxiosError(error)
        ? (error.response?.data?.message ?? error.response?.data?.error ?? error.message)
        : 'Unknown error'
      useToastStore().error(message)
    }
    return Promise.reject(error)
  },
)
