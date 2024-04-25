import type { ApiResponse } from '@/types/apiResponse'

import axios, { type AxiosError, type AxiosInstance } from 'axios'
import { exceptionResponse } from './exception'
import { getCurrentToken } from './cookies'
import { CODE_OK } from '@/configs/http'

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? ''

export const getError = <T>(error: unknown): any => {
  const axiosError = error as AxiosError
  const axiosResponse = axiosError?.response
  const responseData = axiosResponse?.data as ApiResponse<T>

  return responseData
}

const handleUseInterceptors = (axiosInstance: AxiosInstance): void => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    (err) => {
      exceptionResponse(err)

      throw err
    }
  )
}

axios.defaults.headers.common.Accept = 'application/json'
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

const instance = axios.create({
  baseURL: BASE_URL,
  validateStatus: (status) => {
    if (status >= CODE_OK && status < 300) {
      return true
    }

    return false
  }
})

const currentToken = getCurrentToken() ?? ''
instance.defaults.headers.common.Authorization = `Bearer ${currentToken}`

export const setTokenBearer = (token: string): void => {
  instance.defaults.headers.common.Authorization = `Bearer ${currentToken || token}`
}

handleUseInterceptors(instance)

export default instance
