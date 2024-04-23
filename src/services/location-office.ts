import type { ApiResponse } from '@/types/apiResponse'
import axios, { getError } from '@/utils/axios'

export interface ILocationOfficeResponse {
  id: number
  location_name: string
  location_address: string
  latitude: string
  longitude: string
}

export interface ILocationOfficePayload {
  location_name: string
  location_address: string
  latitude: string
  longitude: string
}

export const getLocationOffice = async (): Promise<
  ApiResponse<ILocationOfficeResponse>
> => {
  try {
    const { data } = await axios.get('/location-office')

    return data as ApiResponse<ILocationOfficeResponse>
  } catch (error) {
    throw getError<unknown>(error)
  }
}

export const addLocationOffice = async (
  payload: ILocationOfficePayload
): Promise<ApiResponse<null>> => {
  try {
    const { data } = await axios.post('/location-office', payload)

    return data as ApiResponse<null>
  } catch (error) {
    throw getError<unknown>(error)
  }
}
