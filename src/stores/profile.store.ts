import { defineStore } from 'pinia'
import { ref } from 'vue'

import { getProfile } from '@/api/profile'
import type { IProfile } from '@/interfaces/profile.interface'

export const useProfileStore = defineStore('profile', () => {
  const profile = ref<IProfile>()
  const isLoading = ref(false)
  const error = ref<string>()

  const fetchProfile = async () => {
    isLoading.value = true
    error.value = undefined
    try {
      profile.value = await getProfile()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error'
    } finally {
      isLoading.value = false
    }
  }

  return { profile, fetchProfile, isLoading, error }
})
