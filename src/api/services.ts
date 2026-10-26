import { API_ROUTES } from '@/constants'

import type { IProfile } from '../interfaces/profile'

export const getProfile = async () => {
  const data = await fetch(API_ROUTES.GET_PROFILE)
  if (!data.ok) throw new Error(`Failed to load profile: ${data.status}`)
  const profile = (await data.json()) as IProfile
  return profile
}
