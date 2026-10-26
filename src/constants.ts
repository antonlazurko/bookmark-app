export const API_BASE = 'http://localhost:3000/api'
export const API_ROUTES = {
  GET_PROFILE: '/profile',
  GET_CATEGORIES: '/categories',
  GET_BOOKMARKS_BY_CATEGORY_ID: (id: number) => `/categories/${id}/bookmarks`,
  AUTH: {
    LOGIN: '/auth/login',
  },
}
