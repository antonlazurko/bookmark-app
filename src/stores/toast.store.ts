import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { IToast, ToastType } from '@/interfaces/toast.interface'

const DEFAULT_DURATION = 3000

export const useToastStore = defineStore('toast', () => {
  const toasts = ref<IToast[]>([])
  let nextId = 0

  const remove = (id: number) => {
    toasts.value = toasts.value.filter((toast) => toast.id !== id)
  }

  const show = (type: ToastType, message: string, duration = DEFAULT_DURATION) => {
    const id = nextId++
    toasts.value.push({ id, type, message, duration })
    if (duration > 0) setTimeout(() => remove(id), duration)
    return id
  }

  const success = (message: string, duration?: number) => show('success', message, duration)
  const warning = (message: string, duration?: number) => show('warning', message, duration)
  const error = (message: string, duration?: number) => show('error', message, duration)

  return { toasts, show, success, warning, error, remove }
})
