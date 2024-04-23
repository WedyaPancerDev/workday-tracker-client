import type { ApiResponse } from '@/types/apiResponse'
import type { Roles } from '@/types/role'
import axios, { getError } from '@/utils/axios'

export interface IUsersResponse {
  id: string | number
  uuid: string
  email: string
  account_status: 'active' | 'inactive'
  fullname: string
  position: Roles
  is_deleted: '0' | '1'
}

export interface IUsersPayload {
  email: string
  password: string
  employee_id: number
}

export const getUsers = async (): Promise<ApiResponse<IUsersResponse[]>> => {
  try {
    const { data } = await axios.get('/users')

    return data as ApiResponse<IUsersResponse[]>
  } catch (error) {
    throw getError<unknown>(error)
  }
}

export const addUser = async (
  payload: IUsersPayload
): Promise<ApiResponse<null>> => {
  try {
    const { data } = await axios.post('/users', payload)

    return data as ApiResponse<null>
  } catch (error) {
    throw getError<unknown>(error)
  }
}

export interface IDetailUserResponse {
  uuid: string
  email: string
  employee_id: number
}

export const getDetailUser = async (
  userId: string
): Promise<ApiResponse<IDetailUserResponse>> => {
  try {
    const { data } = await axios.get(`/users/${userId}`)

    return data as ApiResponse<IDetailUserResponse>
  } catch (error) {
    throw getError<unknown>(error)
  }
}

export const updateUserEmail = async (
  payload: { email: string },
  userId: string
): Promise<ApiResponse<null>> => {
  try {
    const { data } = await axios.patch(`/users/${userId}`, payload)

    return data as ApiResponse<null>
  } catch (error) {
    throw getError<unknown>(error)
  }
}

export const deactiveUserById = async (
  userId: string
): Promise<ApiResponse<null>> => {
  try {
    const { data } = await axios.delete(`/users/${userId}`)

    return data as ApiResponse<null>
  } catch (error) {
    throw getError<unknown>(error)
  }
}
