import nookies, { setCookie, destroyCookie } from 'nookies'

const key = '@access-point'

export const getCurrentToken = (): string | null => {
  const currentToken = nookies.get()

  return currentToken[key] || null
}

export const saveTokenToCookie = (token: string): void => {
  const currentToken = getCurrentToken()

  if (!currentToken) {
    setCookie(null, key, token, {
      maxAge: 1 * 60 * 60 * 24,
      path: '/'
    })
  }
}

export const removeTokenFromCookie = (): void => {
  destroyCookie(null, key)
}
