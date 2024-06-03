import nookies, { setCookie, destroyCookie } from 'nookies'

const key = '@access-point'

export const getCurrentCookie = (keyActive: string = key): string | null => {
  const currentToken = nookies.get()

  return currentToken[keyActive] || null
}

export const saveCookie = (token: string, keyActive: string = key): void => {
  const currentToken = getCurrentCookie()

  if (!currentToken) {
    setCookie(null, keyActive, String(token), {
      maxAge: 1 * 60 * 60 * 24,
      path: '/'
    })
  }
}

export const removeFromCookie = (): void => {
  destroyCookie(null, key)
}

export const saveToLocalStorage = (key: string, value: string): void => {
  typeof window !== 'undefined' && localStorage.setItem(key, value)
}

export const getFromLocalStorage = (key: string): string | null => {
  const result = typeof window !== 'undefined' && localStorage.getItem(key)

  if (!result) return null
  return result
}

export const removeFromLocalStorage = (key: string): void => {
  typeof window !== 'undefined' && localStorage.removeItem(key)
}
