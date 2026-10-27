import { API_ROUTES } from '@/constants'
import type { IProfile } from '@/interfaces/profile.interface'

import { http } from './http'

export const getProfile = async () => {
  const { data } = await http.get<IProfile>(API_ROUTES.AUTH.PROFILE)
  return data
}
