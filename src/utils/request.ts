import axios, { getError } from './axios'
import { getCurrentToken } from './cookies'

interface RequestProps {
  url: string
  method?: string
  headers?: Record<string, string>
  body?: Record<string, unknown>
}

export const request = async ({
  url,
  method = 'GET',
  headers = {},
  body = undefined
}: RequestProps): Promise<any> => {
  const result = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    body: body ? JSON.stringify(body) : undefined
  })

  return result
}

export const fetcher = async (url: string): Promise<any> => {
  try {
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${getCurrentToken()}`
      }
    })

    return data
  } catch (error) {
    return getError(error)
  }
}
