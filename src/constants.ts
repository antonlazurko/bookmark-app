export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000/api'

export const TOKEN_STORAGE_KEY = 'bookmarkly-token'
export const API_ROUTES = {
  GET_PROFILE: '/profile',
  GET_CATEGORIES: '/categories',
  GET_BOOKMARKS_BY_CATEGORY_ID: (id: number) => `/categories/${id}/bookmarks`,
  AUTH: {
    LOGIN: '/auth/login',
    PROFILE: '/auth/profile',
  },
  POST_CATEGORY: '/categories',
  PUT_CATEGORY_NAME: (id: number) => `/categories/${id}`,
  DELETE_CATEGORY_BY_ID: (id: number) => `/categories/${id}`,
  POST_BOOKMARK: '/bookmarks',
  DELETE_BOOKMARK_BY_ID: (id: number) => `/bookmarks/${id}`,
}
