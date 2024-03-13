import { getCookieValue } from '../account'

type TOptions = {
  method: 'PUT'
  headers: Record<string, string>
  body: string
}

export const putData = async <T>(url: string, body: string, auth = false): Promise<{ data?: T; error?: string }> => {
  try {
    const info: { status: number; error: string | null } = { status: 0, error: null }
    const options: TOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body,
    }
    if (auth) {
      const token = getCookieValue('access')
      if (token) options.headers.Authorization = `Bearer ${token}`
    }
    const response = await fetch(url, options)
      .then(response => {
        info.status = response.status
        if (response.status !== 200) {
          info.error = response.statusText
        }

        const contentType = response.headers.get('content-type')
        if (contentType && contentType.includes('application/json')) {
          return response.json()
        }
      })
      .catch(err => {
        info.error = err.message
      })

    if (info.error) {
      const error = `${response ? response.detail : info.error} (${info.status})`
      return { error }
    }
    return { data: response }
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'unknown' }
  }
}
