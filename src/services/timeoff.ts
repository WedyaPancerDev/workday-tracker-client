import type { ApiResponse } from '@/types/apiResponse'

import axios, { getError } from '@/utils/axios'

type TypeTimeoff =
  | 'annual'
  | 'sick_without_docs'
  | 'sick_with_docs'
  | 'holiday'
  | 'unpaid'
  | 'special_permit'

export interface IEmployeeTimeoffResponse {
  id: number
  uuid: string
  accepted_by: number
  type: TypeTimeoff
  start_date: string
  end_date: string
  description: string
  document: string
  status: 'pending' | 'approved' | 'rejected'
  total_days: number
}

export interface IEmployeeTimeoffPayload {
  accepted_by: number
  employee_id: number
  type: TypeTimeoff
  start_date: string
  end_date: string
  description: string
  document: string
  total_days: number
}

export const getEmployeeTimeoffById = async (
  employeeId: string
): Promise<ApiResponse<IEmployeeTimeoffResponse[]>> => {
  try {
    const { data } = await axios.get(`/timeoff/${employeeId}`)

    return data as ApiResponse<IEmployeeTimeoffResponse[]>
  } catch (error) {
    throw getError<unknown>(error)
  }
}

export const addEmployeeTimeoff = async (
  payload: IEmployeeTimeoffPayload
): Promise<ApiResponse<null>> => {
  try {
    const { data } = await axios.post('/timeoff', payload)

    return data as ApiResponse<null>
  } catch (error) {
    throw getError<unknown>(error)
  }
}

export const updateTimeoffEmployee = async (
  payload: IEmployeeTimeoffPayload,
  employeeId: string
): Promise<ApiResponse<null>> => {
  try {
    const { data } = await axios.patch(`/timeoff/${employeeId}`, payload)

    return data as ApiResponse<null>
  } catch (error) {
    throw getError<unknown>(error)
  }
}

export const updateStatusTimeoffEmployee = async (
  payload: { status: 'approved' | 'rejected' | 'pending' },
  employeeId: string
): Promise<ApiResponse<null>> => {
  try {
    const { data } = await axios.put(
      `/validate-status/timeoff/${employeeId}`,
      payload
    )

    return data as ApiResponse<null>
  } catch (error) {
    throw getError<unknown>(error)
  }
}
