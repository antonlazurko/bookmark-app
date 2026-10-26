import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { login } from '@/api/auth'
import { TOKEN_STORAGE_KEY } from '@/constants'
import type { ILoginRequest } from '@/interfaces/auth.interface'

const readToken = () => {
  try {
    return localStorage.getItem(TOKEN_STORAGE_KEY) ?? undefined
  } catch {
    return undefined
  }
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | undefined>(readToken())
  const isLoading = ref(false)
  const error = ref<string>()

  const isAuthenticated = computed(() => Boolean(token.value))

  const setToken = (value?: string) => {
    token.value = value
    try {
      if (value) localStorage.setItem(TOKEN_STORAGE_KEY, value)
      else localStorage.removeItem(TOKEN_STORAGE_KEY)
    } catch {}
  }

  const fetchLogin = async (credentials: ILoginRequest) => {
    isLoading.value = true
    error.value = undefined
    try {
      const data = await login(credentials)
      setToken(data.token)
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error'
    } finally {
      isLoading.value = false
    }
  }

  const logout = () => setToken(undefined)

  return { token, isAuthenticated, isLoading, error, fetchLogin, logout }
})
