import type { ApiResponse } from '@/types/apiResponse'

import axios, { getError } from '@/utils/axios'

export interface IRecapEmployeePresence {
  url: string
}

export const getRecapPresenceAll = async (
  startDate: string,
  endDate: string
): Promise<ApiResponse<IRecapEmployeePresence>> => {
  try {
    const { data } = await axios.get(
      `/recap-presence/all?start_date=${startDate}&end_date=${endDate}`
    )

    return data as ApiResponse<IRecapEmployeePresence>
  } catch (error) {
    throw getError<unknown>(error)
  }
}

export const getRecapPresenceByEmployeeId = async (
  employeeId: string,
  startDate: string,
  endDate: string
): Promise<ApiResponse<IRecapEmployeePresence>> => {
  try {
    const { data } = await axios.get(
      `/recap-presence/${employeeId}?start_date=${startDate}&end_date=${endDate}`
    )

    return data as ApiResponse<IRecapEmployeePresence>
  } catch (error) {
    throw getError<unknown>(error)
  }
}
