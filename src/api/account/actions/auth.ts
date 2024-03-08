import { getCookieValue } from '../utils'
import { getUser } from './current'
import { getNewToken } from './refresh'

interface AuthWithToken {
  (
    access?: string,
    refresh?: string
  ): Promise<{
    user?: Record<string, string>
    error?: string
  }>
}

export const authWithToken: AuthWithToken = async (access, refresh) => {
  if (!access && typeof window !== 'undefined') access = getCookieValue('access')
  console.log('have Token:', !!access)
  if (!!access) {
    const res = await getUser(access)
    if (!res.error) return res
  }

  if (!refresh && typeof window !== 'undefined') refresh = getCookieValue('refresh')
  console.log('have Refresh:', !!refresh)
  if (!!refresh) {
    const { access } = await getNewToken(refresh)
    console.log('new Token:', !!access)
    if (!!access) {
      const res = await getUser(access)
      if (!res.error) return { user: { ...res.user, access } }
    }
  }

  return { error: 'No token' }
}
