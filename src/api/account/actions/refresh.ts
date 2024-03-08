import { apiGetData } from './get'
import { setCookie, getLifespan } from '../utils'

export const getNewToken = async (refresh: string) => {
  const response = await apiGetData('refresh', { refresh })

  if (!!response.error) return response

  const { access } = response
  if (access) {
    setCookie({
      access,
      expires: getLifespan(1),
      samesite: 'lax',
    })
    return { access }
  }

  return { error: 'No token' }
}
