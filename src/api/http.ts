import axios from 'axios'

import { API_BASE, TOKEN_STORAGE_KEY } from '@/constants'
import { useToastStore } from '@/stores/toast.store'

declare module 'axios' {
  export interface AxiosRequestConfig {
    successMessage?: string
    silent?: boolean
  }
}

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
  (response) => {
    if (response.config.successMessage) {
      useToastStore().success(response.config.successMessage)
    }
    return response
  },
  (error) => {
    if (!axios.isCancel(error)) {
      const config = axios.isAxiosError(error) ? error.config : undefined
      if (!config?.silent) {
        const message = axios.isAxiosError(error)
          ? (error.response?.data?.message ?? error.response?.data?.error ?? error.message)
          : 'Unknown error'
        useToastStore().error(message)
      }
    }
    return Promise.reject(error)
  },
)
