import type { ApiResponse } from '@/types/apiResponse'
import axios, { getError } from '@/utils/axios'

export interface ILoginPayload {
  email: string
  password: string
}

export interface ILoginResponse {
  id: string
  token: string
  role: string
}

export interface IProfileResponse {
  user_id: string
  email: string
  account_status: 'active' | 'inactive'
  uuid: string
  fullname: string
  is_regis: number
  position: string
  phone_number: string | null
  avatar: string | null
  address: string | null
  joined_company_at: string
  password: string
}

export const authLogin = async (
  payload: ILoginPayload
): Promise<ApiResponse<ILoginResponse | undefined>> => {
  try {
    const response = await axios.post('/login', payload)

    return response.data as ApiResponse<ILoginResponse | undefined>
  } catch (error) {
    return getError<unknown>(error)
  }
}

export const authLogout = async (): Promise<ApiResponse<unknown>> => {
  try {
    const response = await axios.post('/logout')

    return response.data as ApiResponse<unknown>
  } catch (error) {
    return getError<unknown>(error)
  }
}

export const authMe = async (
  token: string
): Promise<ApiResponse<IProfileResponse | undefined>> => {
  try {
    const response = await axios.get('/profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data as ApiResponse<IProfileResponse | undefined>
  } catch (error) {
    return getError<unknown>(error)
  }
}

export const setUserRegistered = async (userId: string): Promise<void> => {
  try {
    const response = await axios.patch(`/is-signed/${userId}`)

    return response.data
  } catch (error) {
    return getError<unknown>(error)
  }
}
