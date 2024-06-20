import { Fragment } from 'react'
import dynamic from 'next/dynamic'

import SEO from '@/components/SEO'
import { Box, Typography } from '@mui/material'
import BasicBreadcrumbs from '@/components/Breadcrumb'

import { Authenticated } from '@/middlewares/HOC/Authenticated'

const ManajemenPegawaiContainer = dynamic(
  async () => await import('@/containers/ManajemenPegawaiContainer'),
  {
    ssr: false
  }
)

const ManajemenPegawai = (): JSX.Element => {
  return (
    <Fragment>
      <SEO title="Manajemen Pegawai | Eurocar Service" />

      <Box component="section">
        <Box display="flex" flexDirection="column">
          <Typography
            variant="h2"
            fontSize="28px"
            fontWeight={700}
            letterSpacing="-0.01em"
            mb={2}
          >
            Informasi Manajemen Pegawai
          </Typography>
          <BasicBreadcrumbs
            titleTo="Manajemen Pegawai"
            linkTo="/manajemen-pegawai"
          />
        </Box>

        <Box marginTop={6}>
          <ManajemenPegawaiContainer />
        </Box>
      </Box>
    </Fragment>
  )
}

export default Authenticated(ManajemenPegawai)
