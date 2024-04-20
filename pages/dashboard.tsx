import { type Theme, useMediaQuery } from '@mui/material'
import AppLayout from '@/components/AppLayout'

import { Authenticated } from '@/middlewares/HOC/Authenticated'

const AdminDashboard = (): JSX.Element => {
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

  return (
    <AppLayout
      title="Workday Tracker - Dashboard"
      sx={{ margin: mdUp ? '0 28px' : '0', marginTop: '18px' }}
    >
      Jos
    </AppLayout>
  )
}

export default Authenticated(AdminDashboard)
