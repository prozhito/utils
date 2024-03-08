export const getData = async <T>(url: string): Promise<{ data?: T; error?: string }> => {
  try {
    const info: { status: number; error: string | null } = { status: 0, error: null }
    const response = await fetch(url, {
      method: 'GET',
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

    if (info.error) return { error: response.detail || info.error }
    return { data: response }
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'unknown' }
  }
}
