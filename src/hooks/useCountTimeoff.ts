import useSWR from 'swr'
import { fetcher } from '@/utils/request'

import type { IEmployeeTimeoffResponse } from '@/services/timeoff'
import type { ApiResponse } from '@/types/apiResponse'

interface ReturnValues {
  pendingCount: number
  pendingName: IEmployeeTimeoffResponse[]
}

const usePendingTimeOffCount = (): ReturnValues => {
  const { data: pendingTimeoff, isLoading: pendingTimeoffLoading } = useSWR<
    ApiResponse<IEmployeeTimeoffResponse[]>
  >('/check-timeoff', fetcher)

  const pendingCount = (
    !pendingTimeoffLoading ? pendingTimeoff?.data?.length : 0
  ) as number
  const pendingName = (
    !pendingTimeoffLoading ? pendingTimeoff?.data : []
  ) as IEmployeeTimeoffResponse[]

  return {
    pendingCount,
    pendingName
  }
}

export default usePendingTimeOffCount
