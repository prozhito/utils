// const DEV = process.env.NODE_ENV === 'development'

export const getLifespan = (days: number) => {
  const age = 60 * 60 * 24 * days
  return new Date(Date.now() + age * 1000).toUTCString()
}

export const setCookie = (props: Record<string, string>) => {
  const cookieString = Object.keys(props).reduce((acc, key) => (acc += `${key}=${props[key]};`), '')
  // if (!DEV) cookieString += 'secure=true'
  if (typeof document !== 'undefined') document.cookie = cookieString
}

export const getCookieValue = (key: string) => {
  return typeof document !== 'undefined' ? document.cookie.replace(new RegExp(`(?:(?:^|.*;\\s*)${key}\\s*\\=\\s*([^;]*).*$)|^.*$`), '$1') : ''
}
