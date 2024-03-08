import { AUTH_URL } from '../constants'

export const apiGetData = async (route: string, data: Record<string, string>) => {
  try {
    const info = { status: 0, error: '' }
    const response = await fetch(`${AUTH_URL}${route}/`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
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
    return response
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'unknown' }
  }
}
