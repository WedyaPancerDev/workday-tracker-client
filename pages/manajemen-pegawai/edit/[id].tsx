import * as yup from 'yup'
import Select from 'react-select'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'

import type { IRoleValue, ISelectValue } from '@/types'
import CustomTextField from '@/components/TextField'
import SEO from '@/components/SEO'
import {
  Box,
  type Theme,
  Typography,
  useMediaQuery,
  Button
} from '@mui/material'
import useSWR, { useSWRConfig } from 'swr'
import useToast from '@/hooks/useToast'
import { BASE_URL } from '@/utils/axios'
import type { ApiResponse } from '@/types/apiResponse'
import { CODE_OK } from '@/configs/http'
import CustomFormLabel from '@/components/FormLabel'
import { getCustomStyle } from '@/utils/react-select'
import BasicBreadcrumbs from '@/components/Breadcrumb'
import { FilePond, registerPlugin } from 'react-filepond'
import { type AppState, useSelector } from '@/store/Store'
import { Authenticated } from '@/middlewares/HOC/Authenticated'
import StyledCustomOutlinedInput from '@/components/OutlineInput'
import { genderList, roleList, roleListNew } from '@/utils/constant'
import {
  type IEmployeeResponse,
  updateEmployee,
  type IEmployeePayload
} from '@/services/employee'

import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'

import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size'
import { fetcher } from '@/utils/request'
import SelectedFilePreview from '@/components/SelectedFilePreview'

registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize,
  FilePondPluginImagePreview
)

const formSchema = yup.object().shape({
  fullname: yup.string().required('Nama lengkap wajib diisi'),
  gender: yup.object().required('Gender wajib diisi'),
  position: yup.object().required('Posisi wajib diisi'),
  phone_number: yup
    .string()
    .required('No telepon harus diisi')
    .matches(
      /\+?([ -]?\d+)+|\(\d+\)([ -]\d+)/gi,
      'Format nomor telepon tidak sesuai'
    )
    .min(10, 'Minimal 10 karakter')
    .max(16, 'Maksimal 16 karakter'),
  avatar: yup.array().nullable(),
  address: yup.string().required('Alamat wajib diisi'),
  joined_company_at: yup.string().required('Tanggal bergabung wajib diisi')
})

const EditManajemenPegawai = (): JSX.Element => {
  const router = useRouter()
  const { id: pegawaiId = '' } = router.query

  const { showToast } = useToast()
  const dashboard = useSelector((state: AppState) => state.dashboard)
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))

  const [isSubmitting, setSubmitting] = useState<boolean>(false)

  const { mutate } = useSWRConfig()
  const { data: dataDetailEmployee, isLoading: isLoadingEmployee } = useSWR<
    ApiResponse<IEmployeeResponse>
  >(`/employees/${pegawaiId as string}`, fetcher)

  const { control, handleSubmit, watch, getValues, setValue } = useForm({
    defaultValues: {
      fullname: '',
      gender: '',
      position: '',
      phone_number: '',
      avatar: [],
      address: '',
      joined_company_at: ''
    },
    resolver: yupResolver(formSchema)
  })

  const form = watch()

  const getPayload = (): IEmployeePayload => {
    const {
      gender,
      avatar,
      address,
      position,
      fullname,
      phone_number: phoneNumber,
      joined_company_at: joinedCompanyAt
    } = getValues()

    const findAvatar = (avatar ?? [])[0]?.data?.url || ''

    return {
      fullname,
      gender: (gender as ISelectValue)?.value,
      position: (position as IRoleValue)?.role,
      phone_number: phoneNumber,
      avatar: findAvatar,
      address,
      joined_company_at: joinedCompanyAt
    }
  }

  const onSubmit = async (): Promise<void> => {
    const payload = getPayload()

    try {
      setSubmitting(true)

      const response = await updateEmployee(payload, pegawaiId as string)

      if (response?.code === CODE_OK) {
        showToast({
          type: 'success',
          message: 'Berhasil mengupdate pegawai'
        })

        mutate('/employees')
        router.replace('/manajemen-pegawai')
      }

      setSubmitting(false)
    } catch (error) {
      showToast({
        type: 'error',
        message: 'Gagal mengupdate pegawai'
      })
      console.error({ error })
      setSubmitting(false)
    }
  }

  useEffect(() => {
    if (dataDetailEmployee?.data) {
      const { data } = dataDetailEmployee

      setValue('address', data.address)
      setValue('fullname', data.fullname)
      setValue('phone_number', data.phone_number)
      setValue('joined_company_at', data.joined_company_at)
      setValue(
        'gender',
        genderList?.find((item) => item?.value === data?.gender) as ISelectValue
      )
      setValue(
        'position',
        [...roleListNew, ...roleList]?.find(
          (item) => item?.role === data?.position
        ) as IRoleValue
      )
      setValue('avatar', [{ data: { url: data.avatar } }])
    }
  }, [dataDetailEmployee?.data])

  return (
    <Fragment>
      <SEO title="Edit Pegawai | Eurocar Service" />

      <Box
        component="section"
        sx={{
          width: '100%',
          maxWidth: lgUp ? '800px' : '100%'
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
            Edit Pegawai
          </Typography>
          <BasicBreadcrumbs
            titleTo="Manajemen Pegawai"
            linkTo="/manajemen-pegawai"
            subLink={{
              title: 'Edit Pegawai',
              link: `/manajemen-pegawai/edit/${pegawaiId as string}`
            }}
          />
        </Box>

        <Box
          method="POST"
          component="form"
          onSubmit={(e) => {
            handleSubmit(onSubmit)(e)
          }}
          marginTop={6}
        >
          <Controller
            name="fullname"
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <Box className="form-control">
                  <CustomFormLabel htmlFor="fullname">
                    Masukan Nama Lengkap
                  </CustomFormLabel>
                  <StyledCustomOutlinedInput
                    {...field}
                    fullWidth
                    type="text"
                    id="fullname"
                    error={!!error}
                    autoComplete="name"
                    sx={{ fontWeight: 600 }}
                    disabled={isLoadingEmployee}
                    placeholder="Contoh: John Doe"
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
            name="gender"
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <Box className="form-control">
                  <CustomFormLabel htmlFor="gender">
                    Jenis Kelamin
                  </CustomFormLabel>
                  <Select<ISelectValue>
                    {...(field as any)}
                    inputId="gender"
                    getOptionLabel={(option) => option.label}
                    getOptionValue={(option) => option.value}
                    classNamePrefix="select"
                    placeholder="Jenis Kelamin"
                    options={genderList ?? []}
                    isDisabled={isLoadingEmployee}
                    isLoading={isLoadingEmployee}
                    styles={getCustomStyle(error)}
                    onChange={(option) => {
                      field.onChange(option)
                    }}
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
            name="position"
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <Box className="form-control">
                  <CustomFormLabel htmlFor="position">
                    Posisi Jabatan
                  </CustomFormLabel>
                  <Select<IRoleValue>
                    {...(field as any)}
                    inputId="position"
                    getOptionLabel={(option) => option.label}
                    getOptionValue={(option) => option.role}
                    classNamePrefix="select"
                    placeholder="Pilih Posisi Jabatan"
                    isDisabled={isLoadingEmployee}
                    isLoading={isLoadingEmployee}
                    options={[...roleListNew, ...roleList] ?? []}
                    styles={getCustomStyle(error)}
                    onChange={(option) => {
                      field.onChange(option)
                    }}
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
            name="phone_number"
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <Box className="form-control">
                  <CustomFormLabel htmlFor="phone_number">
                    Masukan Nomor Telepon
                  </CustomFormLabel>
                  <StyledCustomOutlinedInput
                    {...field}
                    fullWidth
                    type="text"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const value = e.target.value
                      if (!/[^0-9]/.test(value)) {
                        field.onChange(value.replace(/[^0-9]/, ''))
                      }
                    }}
                    inputMode="numeric"
                    id="phone_number"
                    error={!!error}
                    autoComplete="name"
                    sx={{ fontWeight: 600 }}
                    disabled={isLoadingEmployee}
                    placeholder="Contoh: 089777222888"
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
            name="avatar"
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <Box className="form-control">
                  <CustomFormLabel htmlFor="avatar">
                    Masukan Foto Profil
                  </CustomFormLabel>

                  <Box className="relative">
                    {(form.avatar ?? []).length > 0 ? (
                      <Box sx={{ marginTop: 2.5 }}>
                        {form?.avatar?.map((file, index, array) => {
                          return (
                            <SelectedFilePreview
                              onDelete={null}
                              linkUrl={file}
                              key={index}
                              label=""
                            />
                          )
                        })}
                      </Box>
                    ) : (
                      <FilePond
                        server={{
                          process: {
                            url: `${BASE_URL}/upload/employee`,
                            method: 'POST',
                            headers: {
                              Authorization: `Bearer ${dashboard.token}`
                            },
                            onload: (response) => {
                              const res = JSON.parse(response)

                              setValue('avatar', [...(field?.value ?? []), res])
                              return res
                            }
                          }
                        }}
                        name="file"
                        acceptedFileTypes={[
                          'image/jpeg',
                          'image/png',
                          'image/jpg'
                        ]}
                        allowMultiple
                        maxFiles={1}
                        labelIdle="Drop atau pilih file foto profil"
                        allowDrop
                        credits={false}
                        maxFileSize="4MB"
                      />
                    )}
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
                </Box>
              )
            }}
          />

          <Controller
            name="address"
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <Box className="form-control">
                  <CustomFormLabel htmlFor="address">
                    Masukan Alamat
                  </CustomFormLabel>
                  <CustomTextField
                    {...field}
                    fullWidth
                    type="text"
                    id="address"
                    multiline
                    rows={6}
                    error={!!error}
                    sx={{ fontWeight: 600 }}
                    disabled={isLoadingEmployee}
                    placeholder="Contoh: Jalan Tangkuban Perahu Gg. Bebek"
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
            name="joined_company_at"
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <Box className="form-control">
                  <CustomFormLabel htmlFor="joined_company_at">
                    Tanggal Bergabung
                  </CustomFormLabel>
                  <StyledCustomOutlinedInput
                    {...field}
                    fullWidth
                    type="date"
                    error={!!error}
                    autoComplete="name"
                    id="joined_company_at"
                    sx={{ fontWeight: 600 }}
                    disabled={isLoadingEmployee}
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

          <Box
            marginTop={3}
            gap="12px"
            display="grid"
            gridTemplateColumns="1fr"
          >
            <Button
              fullWidth
              size="large"
              type="submit"
              color="warning"
              variant="contained"
              disabled={isSubmitting}
              sx={{
                fontWeight: 600,
                textTransform: 'capitalize',
                fontSize: 14
              }}
            >
              {isSubmitting ? 'Mengubah...' : 'Ubah Pegawai'}
            </Button>
            <Button
              fullWidth
              size="large"
              type="button"
              color="inherit"
              variant="text"
              onClick={() => {
                router.replace('/manajemen-pegawai')
              }}
              sx={{
                fontWeight: 600,
                textTransform: 'capitalize',
                fontSize: 14
              }}
            >
              Kembali
            </Button>
          </Box>
        </Box>
      </Box>
    </Fragment>
  )
}

export default Authenticated(EditManajemenPegawai)
