import { Fragment } from 'react'
import dynamic from 'next/dynamic'

import SEO from '@/components/SEO'
import { Box, Typography } from '@mui/material'
import BasicBreadcrumbs from '@/components/Breadcrumb'

import { Authenticated } from '@/middlewares/HOC/Authenticated'

const ManajemenCutiPegawaiContainer = dynamic(
  async () => await import('@/containers/ManajemenCutiPegawaiContainer'),
  {
    ssr: false
  }
)

const ManajemenCutiPegawai = (): JSX.Element => {
  return (
    <Fragment>
      <SEO title="Manajemen Cuti Pegawai | Workday Tracker" />

      <Box component="section">
        <Box display="flex" flexDirection="column">
          <Typography
            variant="h2"
            fontSize="28px"
            fontWeight={700}
            letterSpacing="-0.01em"
            mb={2}
          >
            Informasi Manajemen Cuti Pegawai
          </Typography>
          <BasicBreadcrumbs
            titleTo="Manajemen Cuti Pegawai"
            linkTo="/cuti-pegawai"
          />
        </Box>

        <Box marginTop={6}>
          <ManajemenCutiPegawaiContainer />
        </Box>
      </Box>
    </Fragment>
  )
}

export default Authenticated(ManajemenCutiPegawai)
