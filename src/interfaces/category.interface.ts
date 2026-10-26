import type { IBookmark } from './bookmark.interface'

export interface ICategory {
  id: number
  name: string
  alias: string
  bookmarks: IBookmark[] | null
}
