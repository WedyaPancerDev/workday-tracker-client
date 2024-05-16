import type { ApiResponse } from '@/types/apiResponse'
import type { IEmployeeResponse } from '@/services/employee'
import type { IEmployeeTimeoffResponse } from '@/services/timeoff'

import useSWR from 'swr'
import Image from 'next/image'
import { Fragment, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import SEO from '@/components/SEO'
import { fetcher } from '@/utils/request'
import BasicBreadcrumbs from '@/components/Breadcrumb'
import { Authenticated } from '@/middlewares/HOC/Authenticated'
import { Box, type Theme, Typography, useMediaQuery } from '@mui/material'
import CustomFormLabel from '@/components/FormLabel'
import StyledCustomOutlinedInput from '@/components/OutlineInput'
import { Controller, useForm } from 'react-hook-form'

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

  const { control, setValue } = useForm({
    defaultValues: {
      fullname: '-',
      phone_number: '-',
      position: '-',
      joined_company_at: '-'
    }
  })

  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))

  useEffect(() => {
    if (!isLoadingDetailPegawai) {
      setValue('fullname', finalData?.employee?.fullname || '-')
      setValue('phone_number', finalData?.employee?.phone_number || '-')
      setValue('position', finalData?.employee?.position?.toUpperCase() || '-')
      setValue(
        'joined_company_at',
        finalData?.employee?.joined_company_at || '-'
      )
    }
  }, [isLoadingDetailPegawai])

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
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: '330px',
              // height: '430px',
              // aspectRatio: '330 / 430',
              objectFit: 'cover',
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden'
            }}
          >
            <Image
              src={
                !isLoadingDetailPegawai
                  ? finalData?.employee?.avatar || '/images/profile/user-1.jpg'
                  : '/images/profile/user-1.jpg'
              }
              alt={
                !isLoadingDetailPegawai
                  ? finalData?.employee?.fullname || 'Default user'
                  : 'Default user'
              }
              sizes="(min-width: 640px) 100vw, 330px"
              // width={330}
              // height={430}
              fill
              priority
            />
          </Box>
          <Box sx={{ padding: '16px' }}>
            <Typography variant="h5" sx={{ textDecoration: 'underline' }}>
              Informasi Pegawai
            </Typography>

            <Box
              marginTop={1}
              display="flex"
              component="div"
              flexDirection="column"
              className="information-detail"
            >
              <Controller
                name="fullname"
                control={control}
                render={({ field }) => {
                  return (
                    <Box component="div" className="item-control">
                      <CustomFormLabel htmlFor="fullname">
                        Nama Lengkap
                      </CustomFormLabel>
                      <StyledCustomOutlinedInput
                        {...field}
                        readOnly
                        fullWidth
                        disabled
                        type="text"
                        id="fullname"
                        sx={{ fontWeight: 600 }}
                      />
                    </Box>
                  )
                }}
              />

              <Controller
                name="phone_number"
                control={control}
                render={({ field }) => {
                  return (
                    <Box component="div" className="item-control">
                      <CustomFormLabel htmlFor="phone_number">
                        Nomor Telepon
                      </CustomFormLabel>
                      <StyledCustomOutlinedInput
                        {...field}
                        readOnly
                        fullWidth
                        disabled
                        type="text"
                        id="phone_number"
                        sx={{ fontWeight: 600 }}
                      />
                    </Box>
                  )
                }}
              />

              <Controller
                name="position"
                control={control}
                render={({ field }) => {
                  return (
                    <Box component="div" className="item-control">
                      <CustomFormLabel htmlFor="position">
                        Posisi
                      </CustomFormLabel>
                      <StyledCustomOutlinedInput
                        {...field}
                        readOnly
                        fullWidth
                        disabled
                        type="text"
                        id="position"
                        sx={{ fontWeight: 600 }}
                      />
                    </Box>
                  )
                }}
              />

              <Controller
                name="joined_company_at"
                control={control}
                render={({ field }) => {
                  return (
                    <Box component="div" className="item-control">
                      <CustomFormLabel htmlFor="joined_company_at">
                        Tanggal Bergabung
                      </CustomFormLabel>
                      <StyledCustomOutlinedInput
                        {...field}
                        readOnly
                        fullWidth
                        disabled
                        type="text"
                        id="joined_company_at"
                        sx={{ fontWeight: 600 }}
                      />
                    </Box>
                  )
                }}
              />
            </Box>
          </Box>
        </Box>

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
