import { API_ROUTES } from '@/constants'
import type { ICategory } from '@/interfaces/category.interface'

import { http } from './http'

export const getCategories = async () => {
  const { data } = await http.get<ICategory[]>(API_ROUTES.GET_CATEGORIES)
  return data
}
export const postCategory = async (name: string) => {
  const { data } = await http.post<ICategory>(
    API_ROUTES.POST_CATEGORY,
    { name, alias: name.toLowerCase() },
    { successMessage: 'Category created' },
  )
  return data
}
export const putCategoryName = async (id: number, name: string) => {
  const { data } = await http.put<ICategory>(API_ROUTES.PUT_CATEGORY_NAME(id), {
    name,
    alias: name.toLowerCase(),
  })
  return data
}
export const deleteCategoryById = async (id: number) => {
  await http.delete(API_ROUTES.DELETE_CATEGORY_BY_ID(id))
}
