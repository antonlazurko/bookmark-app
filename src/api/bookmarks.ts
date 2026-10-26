import { API_ROUTES } from '@/constants'
import type { IBookmark } from '@/interfaces/bookmark.interface'

import { http } from './http'

export const getBookmarksByCategoryId = async (id: number) => {
  const { data } = await http.get<IBookmark[]>(API_ROUTES.GET_BOOKMARKS_BY_CATEGORY_ID(id))
  return data
}
