import { defineStore } from 'pinia'
import { ref } from 'vue'

import { deleteCategoryById, getCategories, putCategoryName } from '@/api/categories'
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
  let loading: Promise<void> | undefined

  // Loads categories once; concurrent callers share the same request
  const ensureCategories = async () => {
    if (categories.value.length) return
    loading ??= fetchCategories().finally(() => (loading = undefined))
    await loading
  }

  function getCategoryByAlias(alias?: string | string[]): ICategory | undefined {
    if (typeof alias == 'string') {
      return categories.value.find((c) => c.alias == alias)
    }
    return
  }

  const updateCategory = async (id: number, name: string) => {
    isLoading.value = true
    try {
      await putCategoryName(id, name)
      const category = categories.value.find((c) => c.id == id)
      if (category) {
        category.name = name
        category.alias = name.toLowerCase()
      }
      isLoading.value = false
      return category
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error'
      isLoading.value = false
    }
  }
  const deleteCategory = async (id: number) => {
    isLoading.value = true
    try {
      await deleteCategoryById(id)
      await fetchCategories()
      isLoading.value = false
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error'
      isLoading.value = false
    }
  }

  return {
    categories,
    fetchCategories,
    ensureCategories,
    getCategoryByAlias,
    updateCategory,
    deleteCategory,
    isLoading,
    error,
  }
})
