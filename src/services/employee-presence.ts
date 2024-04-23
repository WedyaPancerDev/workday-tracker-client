import type { ApiResponse } from '@/types/apiResponse'

import axios, { getError } from '@/utils/axios'

export interface IEmployeePresenceResponse {
  uuid: string
  clock_in: string
  clock_out: string | null
  ip_address: string | null
  device: 'web' | 'android' | 'ios'
  latitude_in: string
  longitude_in: string
  latitude_out: string | null
  longitude_out: string | null
  distance_in: number
  distance_out: number | null
  photo_in: string | null
  photo_out: string | null
  presence_date: string
  presence_by: number
}

export interface IEmployeePresencePayloadClockIn {
  clock_in: string
  ip_address: string
  device: 'web' | 'android' | 'ios'
  latitude_in: string
  longitude_in: string
  photo_in: string
}

export interface IEmployeePresencePayloadClockOut {
  clock_out: string
  latitude_out: string
  longitude_out: string
  photo_out: string
}

export interface IEmployeeCurrentPresenceResponse {
  presence_in: boolean
  presence_out: boolean
}

export const getHistoryEmployeePresence = async (
  employeeId: string
): Promise<ApiResponse<IEmployeePresenceResponse>> => {
  try {
    const { data } = await axios.get(`/history-presences/${employeeId}`)

    return data as ApiResponse<IEmployeePresenceResponse>
  } catch (error) {
    throw getError<unknown>(error)
  }
}

export const employeePresenceClockIn = async (
  payload: IEmployeePresencePayloadClockIn,
  employeeId: string
): Promise<ApiResponse<null>> => {
  try {
    const { data } = await axios.post(
      `/presence?empl_id=${employeeId}`,
      payload
    )

    return data as ApiResponse<null>
  } catch (error) {
    throw getError<unknown>(error)
  }
}

export const employeePresenceClockOut = async (
  payload: IEmployeePresencePayloadClockOut,
  employeeId: string
): Promise<ApiResponse<null>> => {
  try {
    const { data } = await axios.post(
      `/presence?empl_id=${employeeId}`,
      payload
    )

    return data as ApiResponse<null>
  } catch (error) {
    throw getError<unknown>(error)
  }
}

export const checkCurrentPresenceEmployee = async (
  employeeId: string
): Promise<ApiResponse<IEmployeeCurrentPresenceResponse>> => {
  try {
    const { data } = await axios.get(`/presence/check/${employeeId}`)

    return data as ApiResponse<IEmployeeCurrentPresenceResponse>
  } catch (error) {
    throw getError<unknown>(error)
  }
}
