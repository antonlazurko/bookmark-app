import { API_ROUTES } from '@/constants'
import type { ICategory } from '@/interfaces/category.interface'

import { http } from './http'

export const getCategories = async () => {
  const { data } = await http.get<ICategory[]>(API_ROUTES.GET_CATEGORIES)
  return data
}
