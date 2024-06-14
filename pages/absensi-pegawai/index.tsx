import { Fragment } from 'react'
import dynamic from 'next/dynamic'

import SEO from '@/components/SEO'
import { Box, Typography } from '@mui/material'
import BasicBreadcrumbs from '@/components/Breadcrumb'

import { Authenticated } from '@/middlewares/HOC/Authenticated'

const ManajemenAbsensiPegawaiContainer = dynamic(
  async () => await import('@/containers/ManajemenAbsensiPegawaiContainer'),
  {
    ssr: false
  }
)

const AbsensiPegawai = (): JSX.Element => {
  return (
    <Fragment>
      <SEO title="Manajemen Cuti Pegawai | Eurocar Service" />

      <Box component="section">
        <Box display="flex" flexDirection="column">
          <Typography
            variant="h2"
            fontSize="28px"
            fontWeight={700}
            letterSpacing="-0.01em"
            mb={2}
          >
            Informasi Manajemen Absensi Pegawai
          </Typography>
          <BasicBreadcrumbs
            titleTo="Manajemen Absensi Pegawai"
            linkTo="/absensi-pegawai"
          />
        </Box>

        <Box marginTop={6}>
          <ManajemenAbsensiPegawaiContainer />
        </Box>
      </Box>
    </Fragment>
  )
}

export default Authenticated(AbsensiPegawai)
