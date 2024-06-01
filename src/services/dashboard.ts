import type { ApiResponse } from '@/types/apiResponse'

import axios, { getError } from '@/utils/axios'

export interface IDashboardResponse {
  employees: number
  presences: number
  timeoffs: number
}

export const getAllInformation = async (): Promise<
  ApiResponse<IDashboardResponse>
> => {
  try {
    const { data } = await axios.get('/all-information')

    return data as ApiResponse<IDashboardResponse>
  } catch (error) {
    throw getError<unknown>(error)
  }
}
