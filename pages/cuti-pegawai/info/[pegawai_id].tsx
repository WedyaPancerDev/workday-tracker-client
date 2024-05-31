import type { ApiResponse } from '@/types/apiResponse'
import type { IEmployeeResponse } from '@/services/employee'
import type { IEmployeeTimeoffResponse } from '@/services/timeoff'

import useSWR from 'swr'
import { Fragment, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import SEO from '@/components/SEO'
import { fetcher } from '@/utils/request'
import BasicBreadcrumbs from '@/components/Breadcrumb'
import { Authenticated } from '@/middlewares/HOC/Authenticated'
import { Box, type Theme, Typography, useMediaQuery } from '@mui/material'

const DetailCutiPegawaiContainer = dynamic(
  async () =>
    await import('@/containers/cuti-pegawai/DetailCutiPegawaiContainer'),
  { ssr: false }
)

const InfoCutiPegawai = (): JSX.Element => {
  const router = useRouter()
  const { pegawai_id: pegawaiId = '' } = router.query

  const { data: dataCutiPegawai, isLoading } = useSWR<
    ApiResponse<IEmployeeTimeoffResponse[]>
  >(pegawaiId ? `/timeoff/${pegawaiId as string}` : null, fetcher)

  const { data: dataDetailPegawai, isLoading: isLoadingDetailPegawai } = useSWR<
    ApiResponse<IEmployeeResponse>
  >(pegawaiId ? `/employees/${pegawaiId as string}` : null, fetcher)

  const finalData = {
    timeoff: dataCutiPegawai?.data || [],
    employee: dataDetailPegawai?.data || null
  }

  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))

  return (
    <Fragment>
      <SEO title="Detail Cuti Pegawai | Workday Tracker" />

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
            Info Cuti Pegawai
          </Typography>
          <BasicBreadcrumbs
            titleTo="Cuti Pegawai"
            linkTo="/cuti-pegawai"
            subLink={{
              title: 'Info Cuti Pegawai',
              link: `/cuti-pegawai/info/${pegawaiId as string}`
            }}
          />
        </Box>

        <Box
          gap="12px"
          display="grid"
          marginTop={lgUp ? 6 : 4}
          gridTemplateColumns={lgUp ? '1fr 2fr' : 'repeat(1, 1fr)'}
        ></Box>

        <Box component="div" className="table-container">
          <DetailCutiPegawaiContainer
            timeOffEmployee={finalData?.timeoff || []}
            isLoading={isLoading}
          />
        </Box>
      </Box>
    </Fragment>
  )
}

export default Authenticated(InfoCutiPegawai)
