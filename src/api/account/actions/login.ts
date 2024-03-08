'use client'
import { apiGetData } from './get'
import { setCookie, getLifespan } from '../utils'

export const authWithCredentials = async (data: Record<string, string>): Promise<{ user?: Record<string, string>; error?: string }> => {
  const response = await apiGetData('login', data)

  if (!!response.error) return response

  const { access, refresh } = response
  if (access) {
    setCookie({
      access,
      expires: getLifespan(1),
      samesite: 'lax',
    })
  }
  if (refresh) {
    setCookie({
      refresh,
      expires: getLifespan(60),
      samesite: 'lax',
    })
  }

  return response
}
