import { AUTH_URL } from '../constants'

export const getUser = async (token: string): Promise<{ user?: Record<string, string>; error?: string }> => {
  try {
    const info = { status: 0, error: '' }
    const response = await fetch(`${AUTH_URL}current/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        if (response.status !== 200) {
          info.status = response.status
          info.error = response.statusText
          const contentType = response.headers.get('content-type')
          if (contentType && contentType.includes('application/json')) {
            return response.json()
          }
        }
        return response.json()
      })
      .catch(err => {
        info.error = err.message
      })

    if (!!info.error) return { error: response.detail || info.error }
    return { user: response }
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'unknown' }
  }
}
