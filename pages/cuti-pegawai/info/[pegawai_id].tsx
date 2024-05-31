import type { ApiResponse } from '@/types/apiResponse'
import type { IEmployeeResponse } from '@/services/employee'
import type { IEmployeeTimeoffResponse } from '@/services/timeoff'

import useSWR from 'swr'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { Fragment, useMemo } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { IconArrowLeft, IconReload } from '@tabler/icons-react'

import SEO from '@/components/SEO'
import { fetcher } from '@/utils/request'
import CustomTextField from '@/components/TextField'
import BasicBreadcrumbs from '@/components/Breadcrumb'
import { Authenticated } from '@/middlewares/HOC/Authenticated'
import {
  Box,
  type Theme,
  Typography,
  useMediaQuery,
  Button
} from '@mui/material'

const DetailCutiPegawaiContainer = dynamic(
  async () =>
    await import('@/containers/cuti-pegawai/DetailCutiPegawaiContainer'),
  { ssr: false }
)

const InfoCutiPegawai = (): JSX.Element => {
  const router = useRouter()
  const { pegawai_id: pegawaiId = '' } = router.query

  const { control, watch, setValue } = useForm({
    defaultValues: {
      start_date: '',
      end_date: ''
    }
  })

  const { start_date: startDate, end_date: endDate } = watch()

  const url = pegawaiId
    ? startDate && endDate
      ? `/timeoff/${pegawaiId as string}?start_date=${startDate}&end_date=${endDate}`
      : `/timeoff/${pegawaiId as string}`
    : null

  const { data: dataCutiPegawai, isLoading } = useSWR<
    ApiResponse<IEmployeeTimeoffResponse[]>
  >(pegawaiId ? url : null, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  })

  const { data: dataDetailPegawai } = useSWR<ApiResponse<IEmployeeResponse>>(
    pegawaiId ? `/employees/${pegawaiId as string}` : null,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  )

  const memoFinalData = useMemo(() => {
    return {
      timeoff: dataCutiPegawai?.data || [],
      employee: dataDetailPegawai?.data || null
    }
  }, [dataCutiPegawai, dataDetailPegawai])

  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))

  const handleReset = (): void => {
    setValue('start_date', '')
    setValue('end_date', '')
  }

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
            Info Cuti Pegawai :{' '}
            <span style={{ color: '#9ca3af', textDecoration: 'underline' }}>
              {memoFinalData?.employee?.fullname || '-'}
            </span>
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

        <Box sx={{ display: 'flex' }}>
          <Button
            type="button"
            color="inherit"
            variant="contained"
            onClick={() => {
              router.back()
            }}
            sx={{ fontWeight: 600, marginTop: 4 }}
          >
            <IconArrowLeft size={16} style={{ marginRight: '4px' }} />
            Kembali
          </Button>
        </Box>

        <Box border="1px solid #e5e7eb" padding={2} marginTop={4}>
          <Typography variant="body1" fontWeight={600} paddingBottom={2}>
            Filter Data Cuti Pegawai
          </Typography>

          <Box
            gap="12px"
            display="flex"
            alignItems="center"
            flexDirection={lgUp ? 'row' : 'column'}
          >
            <Box
              component="div"
              display="flex"
              alignItems="center"
              flexGrow={lgUp ? 2 : 1}
              width={lgUp ? 'auto' : '100%'}
            >
              <Controller
                name="start_date"
                control={control}
                render={({ field }) => {
                  return (
                    <CustomTextField
                      {...field}
                      fullWidth
                      id="start_date"
                      type="date"
                      sx={{ fontWeight: 600 }}
                    />
                  )
                }}
              />

              <Typography
                variant="h6"
                fontSize="16px"
                fontWeight={700}
                letterSpacing="-0.01em"
                marginX={2}
              >
                s/d
              </Typography>

              <Controller
                name="end_date"
                control={control}
                render={({ field }) => {
                  return (
                    <CustomTextField
                      {...field}
                      fullWidth
                      id="end_date"
                      type="date"
                      sx={{ fontWeight: 600 }}
                    />
                  )
                }}
              />
            </Box>

            <Box width={lgUp ? 'auto' : '100%'}>
              <Button
                type="button"
                color="warning"
                variant="contained"
                onClick={handleReset}
                sx={{ fontWeight: 600 }}
              >
                <IconReload size={16} style={{ marginRight: '4px' }} />
                Reset
              </Button>
            </Box>
          </Box>
        </Box>

        <Box component="div" className="table-container">
          <DetailCutiPegawaiContainer
            timeOffEmployee={memoFinalData?.timeoff || []}
            isLoading={startDate && endDate ? false : isLoading}
          />
        </Box>
      </Box>
    </Fragment>
  )
}

export default Authenticated(InfoCutiPegawai)
