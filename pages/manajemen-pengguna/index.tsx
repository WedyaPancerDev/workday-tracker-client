import { Fragment } from 'react'
import dynamic from 'next/dynamic'

import SEO from '@/components/SEO'
import { Box, Typography } from '@mui/material'
import BasicBreadcrumbs from '@/components/Breadcrumb'

import { Authenticated } from '@/middlewares/HOC/Authenticated'

const ManajemenPenggunaContainer = dynamic(
  async () => await import('@/containers/ManajemenPenggunaContainer'),
  {
    ssr: false
  }
)

const ManajemenPengguna = (): JSX.Element => {
  return (
    <Fragment>
      <SEO title="Manajemen Pengguna | Eurocar Service" />

      <Box component="section">
        <Box display="flex" flexDirection="column">
          <Typography
            variant="h2"
            fontSize="28px"
            fontWeight={700}
            letterSpacing="-0.01em"
            mb={2}
          >
            Informasi Manajemen Pengguna
          </Typography>
          <BasicBreadcrumbs
            titleTo="Manajemen Pengguna"
            linkTo="/manajemen-pengguna"
          />
        </Box>

        <Box marginTop={6}>
          <ManajemenPenggunaContainer />
        </Box>
      </Box>
    </Fragment>
  )
}

export default Authenticated(ManajemenPengguna)
