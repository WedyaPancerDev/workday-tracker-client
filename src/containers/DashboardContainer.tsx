import type { ApiResponse } from '@/types/apiResponse'
import type { IDashboardResponse } from '@/services/dashboard'

import useSWR from 'swr'
import moment from 'moment'

import { fetcher } from '@/utils/request'
import SlimCard from '@/components/SlimCard'
import { Box } from '@mui/material'
import usePendingTimeOffCount from '@/hooks/useCountTimeoff'

const DashboardContainer = (): JSX.Element => {
  const currentDate = moment(new Date()).format('YYYY-MM-DD')
  const { pendingCount } = usePendingTimeOffCount()

  const { data: informationData, isLoading } = useSWR<
    ApiResponse<IDashboardResponse>
  >(
    currentDate ? `/all-information?date=${currentDate}` : '/all-information',
    fetcher
  )

  return (
    <Box
      sx={{
        marginTop: 4,
        display: 'grid',
        gridTemplateColumns: 'repeat(1,1fr)',
        '@media (min-width: 768px)': {
          gridTemplateColumns: 'repeat(2,1fr)'
        },
        '@media (min-width: 992px)': {
          gridTemplateColumns: 'repeat(3,1fr)'
        },
        gap: '16px'
      }}
    >
      <SlimCard
        title="Jumlah Pegawai"
        type="employee"
        isLoading={isLoading}
        value={informationData?.data?.employees ?? 0}
      />
      <SlimCard
        isDay
        type="attendance"
        isLoading={isLoading}
        title="Jumlah Absensi Hari ini"
        value={informationData?.data?.presences ?? 0}
      />
      <SlimCard
        isDay
        type="timeoffs"
        isLoading={isLoading}
        title="Jumlah Pegawai Cuti Hari ini"
        value={informationData?.data?.timeoffs ?? 0}
      />
      <SlimCard
        type="timeoffs"
        isLoading={isLoading}
        title="Cuti Belum Disetujui"
        value={pendingCount ?? 0}
      />
    </Box>
  )
}

export default DashboardContainer
