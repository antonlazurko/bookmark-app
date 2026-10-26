import { defineStore } from 'pinia'
import { ref } from 'vue'

import { getCategories } from '@/api/categories'
import type { ICategory } from '@/interfaces/category.interface'

export const useCategoriesStore = defineStore('categories', () => {
  const categories = ref<ICategory[]>([])
  const isLoading = ref(false)
  const error = ref<string>()

  const fetchCategories = async () => {
    isLoading.value = true
    error.value = undefined
    try {
      categories.value = await getCategories()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error'
    } finally {
      isLoading.value = false
    }
  }
  function getCategoryByAlias(alias?: string | string[]): ICategory | undefined {
    if (typeof alias == 'string') {
      return categories.value.find((c) => c.alias == alias)
    }
    return
  }

  return { categories, fetchCategories, getCategoryByAlias, isLoading, error }
})
