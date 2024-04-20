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
  email: string
  account_status: 'active' | 'inactive'
  uuid: string
  id: string
  fullname: string
  position: string
  phone_number: string | null
  avatar: string | null
  address: string | null
  joined_company_at: string
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

export const authMe = async (): Promise<
  ApiResponse<IProfileResponse | undefined>
> => {
  try {
    const response = await axios.get('/profile')

    return response.data as ApiResponse<IProfileResponse | undefined>
  } catch (error) {
    return getError<unknown>(error)
  }
}
