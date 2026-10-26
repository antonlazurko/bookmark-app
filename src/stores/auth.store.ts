import { defineStore } from 'pinia'
import { ref } from 'vue'

import { login } from '@/api/auth'
import type { ILoginRequest } from '@/interfaces/auth.interface'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string>()
  const isLoading = ref(false)
  const error = ref<string>()

  const fetchLogin = async (credentials: ILoginRequest) => {
    isLoading.value = true
    error.value = undefined
    try {
      const data = await login(credentials)
      token.value = data.token
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error'
    } finally {
      isLoading.value = false
    }
  }

  return { token, fetchLogin, isLoading, error }
})
