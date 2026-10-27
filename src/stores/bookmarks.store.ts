import { defineStore } from 'pinia'
import { ref } from 'vue'

import { deleteBookmarkById, getBookmarksByCategoryId } from '@/api/bookmarks'
import type { IBookmark } from '@/interfaces/bookmark.interface'

export const useBookmarksStore = defineStore('bookmarks', () => {
  const bookmarks = ref<IBookmark[]>([])
  const isLoading = ref(false)
  const error = ref<string>()

  const getBookmarksByCategory = async (id: number) => {
    isLoading.value = true
    error.value = undefined
    try {
      bookmarks.value = await getBookmarksByCategoryId(id)
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error'
    } finally {
      isLoading.value = false
    }
  }
  const deleteBookmark = async (id: number, category_id: number) => {
    isLoading.value = true
    error.value = undefined
    try {
      await deleteBookmarkById(id)
      await getBookmarksByCategory(category_id)
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error'
    } finally {
      isLoading.value = false
    }
  }

  return { bookmarks, getBookmarksByCategory, deleteBookmark, isLoading, error }
})
