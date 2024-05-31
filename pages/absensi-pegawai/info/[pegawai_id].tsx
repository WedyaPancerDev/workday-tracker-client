import type { ApiResponse } from '@/types/apiResponse'
import type { IEmployeePresenceResponse } from '@/services/employee-presence'

import useSWR from 'swr'
import { Fragment } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import SEO from '@/components/SEO'
import { fetcher } from '@/utils/request'
import BasicBreadcrumbs from '@/components/Breadcrumb'
import { Authenticated } from '@/middlewares/HOC/Authenticated'
import { Box, type Theme, Typography, useMediaQuery } from '@mui/material'

const DetailAbsensiPegawaiContainer = dynamic(
  async () =>
    await import('@/containers/absensi-pegawai/DetailAbsensiPegawaiContainer'),
  { ssr: false }
)

const InfoCutiPegawai = (): JSX.Element => {
  const router = useRouter()
  const { pegawai_id: pegawaiId = '' } = router.query

  const { data: dataHistoryPresence, isLoading } = useSWR<
    ApiResponse<IEmployeePresenceResponse[]>
  >(pegawaiId ? `/history-presences/${pegawaiId as string}` : null, fetcher)

  const finalData = {
    presences: dataHistoryPresence?.data || []
  }

  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))

  return (
    <Fragment>
      <SEO title="Detail Absensi Pegawai | Workday Tracker" />

      <Box
        component="section"
        sx={{
          width: '100%',
          maxWidth: lgUp ? '70rem' : '100%'
        }}
      >
        <Box display="flex" flexDirection="column">
          <Typography
            variant="h2"
            fontSize="28px"
            fontWeight={700}
            letterSpacing="-0.01em"
            mb={1}
          >
            Info Absensi Pegawai
          </Typography>
          <BasicBreadcrumbs
            titleTo="Absensi Pegawai"
            linkTo="/absensi-pegawai"
            subLink={{
              title: 'Info Absensi Pegawai',
              link: `/absensi-pegawai/info/${pegawaiId as string}`
            }}
          />
        </Box>

        <Box component="div" className="table-container">
          <DetailAbsensiPegawaiContainer
            timeOffEmployee={[]}
            isLoading={isLoading}
          />
        </Box>
      </Box>
    </Fragment>
  )
}

export default Authenticated(InfoCutiPegawai)
