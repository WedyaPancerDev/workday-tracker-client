import type { ApiResponse } from '@/types/apiResponse'
import type { IDashboardResponse } from '@/services/dashboard'
import { type Theme, useMediaQuery, Typography, Box } from '@mui/material'

import useSWR from 'swr'
import moment from 'moment'

import { fetcher } from '@/utils/request'
import SlimCard from '@/components/SlimCard'
import AppLayout from '@/components/AppLayout'
import BasicBreadcrumbs from '@/components/Breadcrumb'
import { Authenticated } from '@/middlewares/HOC/Authenticated'

const AdminDashboard = (): JSX.Element => {
  const currentDate = moment(new Date()).format('YYYY-MM-DD')
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

  const { data: informationData, isLoading } = useSWR<
    ApiResponse<IDashboardResponse>
  >(
    currentDate ? `/all-information?date=${currentDate}` : '/all-information',
    fetcher
  )

  return (
    <AppLayout
      title="Eurocar - Dashboard"
      sx={{ margin: mdUp ? '0 28px' : '0', marginTop: '18px' }}
    >
      <Box display="flex" flexDirection="column">
        <Typography
          variant="h2"
          fontSize="28px"
          fontWeight={700}
          letterSpacing="-0.01em"
          mb={1}
        >
          Dashboard
        </Typography>
        <BasicBreadcrumbs titleTo="Eurocar Service" linkTo="/dashboard" />
      </Box>

      <Box
        sx={{
          marginTop: 4,
          display: 'grid',
          gridTemplateColumns: 'repeat(3,1fr)',
          gap: '16px'
        }}
      >
        <SlimCard
          title="Jumlah Karyawan"
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
      </Box>
    </AppLayout>
  )
}

export default Authenticated(AdminDashboard)
