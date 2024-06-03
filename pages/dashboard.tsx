import { type Theme, useMediaQuery, Typography, Box } from '@mui/material'

import dynamic from 'next/dynamic'

import AppLayout from '@/components/AppLayout'
import BasicBreadcrumbs from '@/components/Breadcrumb'
import { Authenticated } from '@/middlewares/HOC/Authenticated'

const DashboardContainer = dynamic(
  async () => await import('@/containers/DashboardContainer'),
  {
    ssr: false
  }
)

const AdminDashboard = (): JSX.Element => {
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

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

      <DashboardContainer />
    </AppLayout>
  )
}

export default Authenticated(AdminDashboard)
