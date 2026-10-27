export interface IBookmark {
  id: number
  category_id: number
  url: string
  title: string
  image?: string
  created_at: string
}

// title / image are optional: the server scrapes them from the page when omitted
export interface IBookmarkCreate {
  category_id: number
  url: string
  title?: string
  image?: string
}
