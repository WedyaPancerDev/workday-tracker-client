import * as yup from 'yup'
import Select from 'react-select'
import { useRouter } from 'next/router'
import { Fragment, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'

import SEO from '@/components/SEO'
import {
  Box,
  type Theme,
  Typography,
  useMediaQuery,
  IconButton,
  Button
} from '@mui/material'
import BasicBreadcrumbs from '@/components/Breadcrumb'
import { type IEmployeeResponse } from '@/services/employee'
import CustomFormLabel from '@/components/FormLabel'
import StyledCustomOutlinedInput from '@/components/OutlineInput'
import { IconEye, IconEyeOff } from '@tabler/icons-react'
import { getCustomStyle } from '@/utils/react-select'
import { Authenticated } from '@/middlewares/HOC/Authenticated'
import { CODE_CREATED } from '@/configs/http'
import useToast from '@/hooks/useToast'
import { addUser } from '@/services/users'
import useSWR, { useSWRConfig } from 'swr'
import { fetcher } from '@/utils/request'
import type { ApiResponse } from '@/types/apiResponse'

interface IEmployeeValue {
  uuid: string | number
  fullname: string
}

interface IPayloadForm {
  email: string
  password: string
  employee_id: string
}

const formSchema = yup.object().shape({
  email: yup.string().email('Email tidak valid').required('Email wajib diisi'),
  password: yup.string().required('Password wajib diisi'),
  retype_password: yup
    .string()
    .oneOf([yup.ref('password')], 'Password tidak sama')
    .required('Password wajib diisi'),
  employee_id: yup.object().required('ID  wajib diisi')
})

const CreateManajemenPengguna = (): JSX.Element => {
  const router = useRouter()
  const { showToast } = useToast()
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [isSubmitting, setSubmitting] = useState<boolean>(false)

  const { mutate } = useSWRConfig()
  const { data: dataIsNotRegisteredEmployees, isLoading } = useSWR<
    ApiResponse<IEmployeeResponse[]>
  >('/not-registered-employees', fetcher)

  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      email: '',
      password: '',
      employee_id: '',
      retype_password: ''
    },
    resolver: yupResolver(formSchema)
  })

  const form = watch()

  const getPayload = (): IPayloadForm => {
    const payload = {
      email: form.email,
      password: form.password,
      employee_id: (form.employee_id as unknown as IEmployeeValue)
        ?.uuid as string
    }

    return payload
  }

  const onSubmit = async (): Promise<void> => {
    const payload = getPayload()

    try {
      setSubmitting(true)

      const response = await addUser(payload)

      if (response?.code === CODE_CREATED) {
        showToast({
          type: 'success',
          message: 'Berhasil menambahkan pengguna baru'
        })

        mutate('/users')
        router.replace('/manajemen-pengguna')
      }

      setSubmitting(false)
    } catch (error) {
      showToast({
        type: 'error',
        message: 'Gagal menambahkan pengguna baru'
      })
      console.error({ error })
      setSubmitting(false)
    }
  }

  return (
    <Fragment>
      <SEO title="Buat Pengguna Baru | Eurocar Service" />

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
            Tambah Pengguna Baru
          </Typography>
          <BasicBreadcrumbs
            titleTo="Manajemen Pengguna"
            linkTo="/manajemen-pengguna"
            subLink={{
              title: 'Tambah Pengguna Baru',
              link: '/manajemen-pengguna/create'
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
            name="employee_id"
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <Box className="form-control">
                  <CustomFormLabel htmlFor="pegawai">
                    Pilih Pegawai
                  </CustomFormLabel>
                  <Select<IEmployeeValue>
                    {...(field as any)}
                    inputId="pegawai"
                    getOptionLabel={(option) => option.fullname}
                    getOptionValue={(option) => option.uuid}
                    classNamePrefix="select"
                    placeholder="Pilih pegawai"
                    options={dataIsNotRegisteredEmployees?.data ?? []}
                    isDisabled={isLoading}
                    isLoading={isLoading}
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
            name="email"
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <Box className="form-control">
                  <CustomFormLabel htmlFor="email">
                    Masukan email
                  </CustomFormLabel>
                  <StyledCustomOutlinedInput
                    {...field}
                    fullWidth
                    type="text"
                    id="email"
                    error={!!error}
                    sx={{ fontWeight: 600 }}
                    autoComplete="name"
                    placeholder="Contoh: kevin@eurocarservice.com"
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
            name="password"
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <Box className="form-control">
                  <CustomFormLabel htmlFor="password">
                    Masukan password
                  </CustomFormLabel>
                  <StyledCustomOutlinedInput
                    {...field}
                    fullWidth
                    autoComplete="new-password"
                    sx={{ fontWeight: 600 }}
                    endAdornment={
                      <IconButton
                        onClick={() => {
                          setShowPassword((prev) => !prev)
                        }}
                      >
                        {showPassword ? (
                          <IconEyeOff size={24} color="#9ca3af" />
                        ) : (
                          <IconEye size={24} color="#9ca3af" />
                        )}
                      </IconButton>
                    }
                    id="password"
                    placeholder="****"
                    type={showPassword ? 'text' : 'password'}
                  />

                  {error ? (
                    <Typography
                      variant="caption"
                      fontSize="12px"
                      fontWeight={600}
                      color="red"
                    >
                      {error.message}
                    </Typography>
                  ) : (
                    <Typography
                      variant="caption"
                      fontSize="12px"
                      fontWeight={600}
                      sx={{ color: '#6b7280' }}
                    >
                      Password minimal 8 karakter
                    </Typography>
                  )}
                </Box>
              )
            }}
          />

          <Controller
            name="retype_password"
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <Box className="form-control">
                  <CustomFormLabel htmlFor="retype_password">
                    Masukan ulang password
                  </CustomFormLabel>
                  <StyledCustomOutlinedInput
                    {...field}
                    fullWidth
                    autoComplete="new-password"
                    sx={{ fontWeight: 600 }}
                    endAdornment={
                      <IconButton
                        onClick={() => {
                          setShowPassword((prev) => !prev)
                        }}
                      >
                        {showPassword ? (
                          <IconEyeOff size={24} color="#9ca3af" />
                        ) : (
                          <IconEye size={24} color="#9ca3af" />
                        )}
                      </IconButton>
                    }
                    id="retype_password"
                    placeholder="****"
                    type={showPassword ? 'text' : 'password'}
                  />

                  {form.password !== form.retype_password &&
                  form.retype_password?.length > 3 ? (
                    <Typography
                      variant="caption"
                      fontSize="12px"
                      fontWeight={600}
                      color="red"
                    >
                      Password yang dimasukan tidak sama!
                    </Typography>
                  ) : null}

                  {error && (
                    <Typography
                      variant="caption"
                      fontSize="12px"
                      fontWeight={600}
                      color="red"
                    >
                      {error?.message}
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
              color="primary"
              variant="contained"
              disabled={
                isSubmitting ||
                Object.values(form).some((v) => v === '') ||
                form.password !== form.retype_password ||
                form.password?.length < 8 ||
                form.retype_password?.length < 8
              }
              sx={{
                fontWeight: 600,
                textTransform: 'capitalize',
                fontSize: 14
              }}
            >
              {isSubmitting ? 'Menambahkan...' : 'Tambah Pengguna Baru'}
            </Button>
            <Button
              fullWidth
              size="large"
              type="button"
              color="inherit"
              variant="text"
              onClick={() => {
                router.replace('/manajemen-pengguna')
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

export default Authenticated(CreateManajemenPengguna)
