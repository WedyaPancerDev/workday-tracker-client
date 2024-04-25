import type { ApiResponse } from '@/types/apiResponse'
import type { Roles } from '@/types/role'

import axios, { getError } from '@/utils/axios'

export interface IEmployeeResponse {
  id: string | number
  uuid: string
  fullname: string
  gender: 'laki-laki' | 'perempuan'
  position: Roles
  phone_number: string
  avatar: string | null
  address: string
  joined_company_at: string
  status: 'active' | 'inactive'
  is_deleted: '0' | '1'
}

export interface IEmployeePayload {
  fullname: string
  gender: 'laki-laki' | 'perempuan' | string
  position: Roles | string
  phone_number: string
  avatar: string | null
  address: string
  joined_company_at: string
}

export const getEmployees = async (): Promise<
  ApiResponse<IEmployeeResponse[]>
> => {
  try {
    const { data } = await axios.get('/employees')

    return data as ApiResponse<IEmployeeResponse[]>
  } catch (error) {
    throw getError<unknown>(error)
  }
}

export const addEmployee = async (
  payload: IEmployeePayload
): Promise<ApiResponse<null>> => {
  try {
    const { data } = await axios.post('/employees', payload)

    return data as ApiResponse<null>
  } catch (error) {
    throw getError<unknown>(error)
  }
}

export const getDetailEmployee = async (
  employeeId: string
): Promise<ApiResponse<IEmployeeResponse>> => {
  try {
    const { data } = await axios.get(`/employees/${employeeId}`)

    return data as ApiResponse<IEmployeeResponse>
  } catch (error) {
    throw getError<unknown>(error)
  }
}

export const updateEmployee = async (
  payload: IEmployeePayload,
  employeeId: string
): Promise<ApiResponse<null>> => {
  try {
    const { data } = await axios.patch(`/employees/${employeeId}`, payload)

    return data as ApiResponse<null>
  } catch (error) {
    throw getError<unknown>(error)
  }
}

export const deactiveEmployeeById = async (
  employeeId: string
): Promise<ApiResponse<null>> => {
  try {
    const { data } = await axios.delete(`/employees/${employeeId}`)

    return data as ApiResponse<null>
  } catch (error) {
    throw getError<unknown>(error)
  }
}

export const getNotRegisteredEmployee = async (): Promise<
  ApiResponse<IEmployeeResponse[]>
> => {
  try {
    const { data } = await axios.get('/not-registered-employees')

    return data as ApiResponse<IEmployeeResponse[]>
  } catch (error) {
    throw getError<unknown>(error)
  }
}
