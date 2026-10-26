import { API_ROUTES } from '@/constants'
import type { ILoginRequest, ILoginResponse } from '@/interfaces/auth.interface'

import { http } from './http'

export const login = async (credentials: ILoginRequest) => {
  const { data } = await http.post<ILoginResponse>(API_ROUTES.AUTH.LOGIN, credentials)
  return data
}
