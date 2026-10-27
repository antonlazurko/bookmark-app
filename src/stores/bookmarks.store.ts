import { defineStore } from 'pinia'
import { ref } from 'vue'

import { deleteBookmarkById, getBookmarksByCategoryId, postBookmark } from '@/api/bookmarks'
import type { IBookmark, IBookmarkCreate } from '@/interfaces/bookmark.interface'

export const useBookmarksStore = defineStore('bookmarks', () => {
  const bookmarks = ref<IBookmark[]>([])
  const isLoading = ref(false)
  const isCreating = ref(false)
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
  // Uses its own flag so the list stays visible while the server scrapes the page
  const createBookmark = async (payload: IBookmarkCreate) => {
    isCreating.value = true
    error.value = undefined
    try {
      const bookmark = await postBookmark(payload)
      bookmarks.value.push(bookmark)
      return bookmark
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error'
    } finally {
      isCreating.value = false
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

  return {
    bookmarks,
    getBookmarksByCategory,
    createBookmark,
    deleteBookmark,
    isLoading,
    isCreating,
    error,
  }
})
