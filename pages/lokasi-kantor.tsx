import {
  type ILocationOfficePayload,
  addLocationOffice,
  type ILocationOfficeResponse
} from '@/services/location-office'
import type { ApiResponse } from '@/types/apiResponse'
import { Fragment, useEffect } from 'react'

import useSWR, { useSWRConfig } from 'swr'
import * as yup from 'yup'
import SEO from '@/components/SEO'
import {
  Box,
  type Theme,
  Typography,
  useMediaQuery,
  Button
} from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import BasicBreadcrumbs from '@/components/Breadcrumb'

import { Authenticated } from '@/middlewares/HOC/Authenticated'
import CustomTextField from '@/components/OutlineInput'
import CustomFormLabel from '@/components/FormLabel'
import { fetcher } from '@/utils/request'
import useToast from '@/hooks/useToast'
import { defaultLocationData } from '@/utils/constant'

const formSchema = yup.object().shape({
  location_name: yup.string().required('Nama lokasi kantor wajib diisi'),
  location_address: yup.string().required('Alamat lokasi kantor wajib diisi'),
  latitude: yup.string().required('Latitude wajib diisi'),
  longitude: yup.string().required('Longitude wajib diisi'),
  is_edit: yup.boolean()
})

const ManajemenCutiPegawai = (): JSX.Element => {
  const { showToast } = useToast()
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))

  const { mutate } = useSWRConfig()
  const { data: locationData, isLoading } = useSWR<
    ApiResponse<ILocationOfficeResponse>
  >('/location-office', fetcher)

  console.log({ locationData })

  const { control, watch, handleSubmit, setValue } = useForm({
    defaultValues: {
      location_name: '',
      location_address: '',
      latitude: '',
      longitude: '',
      is_edit: false
    },
    resolver: yupResolver(formSchema)
  })

  const {
    longitude,
    latitude,
    location_address: locationAddress,
    location_name: locationName
  } = watch()

  const getPayload = (isEdit: boolean): ILocationOfficePayload => {
    const payload = {
      longitude,
      latitude,
      location_address: locationAddress,
      location_name: locationName,
      is_edit: true
    }

    return isEdit ? payload : defaultLocationData
  }

  const onSubmit = async (isEdit: boolean): Promise<void> => {
    const payload = getPayload(isEdit)

    try {
      const response = await addLocationOffice(payload)

      if (response?.code === 200) {
        mutate('/location-office')

        showToast({
          type: 'success',
          message: 'Berhasil mengubah lokasi kantor'
        })

        return
      }

      showToast({
        type: 'error',
        message: 'Gagal mengubah lokasi kantor'
      })
    } catch (error) {
      console.error({ error })
    }
  }

  useEffect(() => {
    if (!isLoading && locationData) {
      setValue('location_name', locationData.data?.location_name || '')
      setValue('location_address', locationData.data?.location_address || '')
      setValue('latitude', locationData.data?.latitude || '')
      setValue('longitude', locationData.data?.longitude || '')
    }
  }, [locationData, isLoading])

  return (
    <Fragment>
      <SEO title="Lokasi Kantor | Eurocar Service" />

      <Box component="section">
        <Box display="flex" flexDirection="column">
          <Typography
            variant="h2"
            fontSize="28px"
            fontWeight={700}
            letterSpacing="-0.01em"
            mb={2}
          >
            Informasi Lokasi Kantor
          </Typography>
          <BasicBreadcrumbs titleTo="Lokasi Kantor" linkTo="/lokasi-kantor" />
        </Box>

        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit(() => {
              onSubmit(true)
            })(e)
          }}
          marginTop={6}
          display="grid"
          gridTemplateColumns="repeat(1, 1fr)"
          maxWidth={lgUp ? '50%' : '100%'}
        >
          <Controller
            name="location_name"
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <Box className="form-control">
                  <CustomFormLabel htmlFor="location_name">
                    Masukan Nama Lokasi Kantor
                  </CustomFormLabel>
                  <CustomTextField
                    {...field}
                    fullWidth
                    type="text"
                    id="location_name"
                    error={!!error}
                    sx={{ fontWeight: 600 }}
                    placeholder="Contoh: Eurocar Service"
                  />

                  {error && (
                    <Typography
                      variant="caption"
                      fontSize="12px"
                      fontWeight={600}
                      color="red"
                    >
                      {error.message}
                    </Typography>
                  )}
                </Box>
              )
            }}
          />

          <Controller
            name="location_address"
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <Box className="form-control">
                  <CustomFormLabel htmlFor="location_address">
                    Masukan Alamat Lokasi Kantor
                  </CustomFormLabel>
                  <CustomTextField
                    {...field}
                    fullWidth
                    type="text"
                    id="location_address"
                    error={!!error}
                    sx={{ fontWeight: 600 }}
                    placeholder="Contoh: Jl. Bypass Ngurah Rai No.95, Sanur, Denpasar Selatan, Kota Denpasar, Bali 80228"
                  />

                  {error && (
                    <Typography
                      variant="caption"
                      fontSize="12px"
                      fontWeight={600}
                      color="red"
                    >
                      {error.message}
                    </Typography>
                  )}
                </Box>
              )
            }}
          />

          <Controller
            name="longitude"
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <Box className="form-control">
                  <CustomFormLabel htmlFor="longitude">
                    Masukan Koodinat Longitude
                  </CustomFormLabel>
                  <CustomTextField
                    {...field}
                    fullWidth
                    type="text"
                    id="longitude"
                    error={!!error}
                    sx={{ fontWeight: 600 }}
                    placeholder="Contoh: 115.2559701"
                  />

                  {error && (
                    <Typography
                      variant="caption"
                      fontSize="12px"
                      fontWeight={600}
                      color="red"
                    >
                      {error.message}
                    </Typography>
                  )}
                </Box>
              )
            }}
          />

          <Controller
            name="latitude"
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <Box className="form-control">
                  <CustomFormLabel htmlFor="latitude">
                    Masukan Koodinat Latitude
                  </CustomFormLabel>
                  <CustomTextField
                    {...field}
                    fullWidth
                    type="text"
                    id="latitude"
                    error={!!error}
                    sx={{ fontWeight: 600 }}
                    placeholder="Contoh: -8.6928216"
                  />

                  {error && (
                    <Typography
                      variant="caption"
                      fontSize="12px"
                      fontWeight={600}
                      color="red"
                    >
                      {error.message}
                    </Typography>
                  )}
                </Box>
              )
            }}
          />

          <Typography
            variant="caption"
            fontSize="12px"
            marginTop={2}
            fontWeight={600}
            color="text.secondary"
          >
            *Koodinat bisa didapat dari Google Maps atau aplikasi sejenisnya
            Contoh: <b>-8.6928216 (Latitude)</b> dan{' '}
            <b>115.2559701 (Longitude)</b> jika dilihat dari Google Maps
          </Typography>

          <Box marginTop="28px">
            {locationData?.data?.is_edit === 1 ? (
              <Button
                type="button"
                variant="text"
                color="inherit"
                size="large"
                onClick={() => {
                  onSubmit(false)
                }}
                sx={{
                  textTransform: 'capitalize',
                  fontWeight: 600,
                  border: '1px solid #9ca3af',
                  marginRight: '10px',
                  padding: '8px 12px',
                  '&:hover': {
                    border: '1px solid #000'
                  }
                }}
              >
                Reset ke awal
              </Button>
            ) : null}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              sx={{
                textTransform: 'capitalize',
                fontWeight: 600
              }}
            >
              Ubah Lokasi
            </Button>
          </Box>
        </Box>
      </Box>
    </Fragment>
  )
}

export default Authenticated(ManajemenCutiPegawai)
