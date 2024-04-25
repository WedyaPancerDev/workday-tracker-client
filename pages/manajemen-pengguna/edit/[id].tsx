import * as yup from 'yup'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'

import SEO from '@/components/SEO'
import {
  Box,
  type Theme,
  Typography,
  useMediaQuery,
  Button
} from '@mui/material'
import BasicBreadcrumbs from '@/components/Breadcrumb'
import CustomFormLabel from '@/components/FormLabel'
import StyledCustomOutlinedInput from '@/components/OutlineInput'
import { Authenticated } from '@/middlewares/HOC/Authenticated'
import { CODE_OK } from '@/configs/http'
import useToast from '@/hooks/useToast'
import { updateUserEmail, type IDetailUserResponse } from '@/services/users'
import useSWR, { useSWRConfig } from 'swr'
import type { ApiResponse } from '@/types/apiResponse'
import { fetcher } from '@/utils/request'

const formSchema = yup.object().shape({
  email: yup.string().email('Email tidak valid').required('Email wajib diisi')
})

const EditManajemenPengguna = (): JSX.Element => {
  const router = useRouter()
  const { id: decryptId = '' } = router.query

  const { showToast } = useToast()
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))

  const [isSubmitting, setSubmitting] = useState<boolean>(false)

  const { mutate } = useSWRConfig()
  const { data: dataDetailUser, isLoading } = useSWR<
    ApiResponse<IDetailUserResponse>
  >(`/users/${decryptId as string}`, fetcher)

  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      email: ''
    },
    resolver: yupResolver(formSchema)
  })

  const form = watch()

  const onSubmit = async (): Promise<void> => {
    const payload = {
      email: form.email
    }

    try {
      setSubmitting(true)

      const response = await updateUserEmail(payload, decryptId as string)

      if (response?.code === CODE_OK) {
        showToast({
          type: 'success',
          message: 'Berhasil mengubah email pengguna'
        })

        mutate('/users')
        router.replace('/manajemen-pengguna')
      }

      setSubmitting(false)
    } catch (error) {
      showToast({
        type: 'error',
        message: 'Gagal mengubah email pengguna'
      })
      console.error({ error })
      setSubmitting(false)
    }
  }

  useEffect(() => {
    if (dataDetailUser?.data) {
      const data = dataDetailUser?.data

      setValue('email', data?.email)
    }
  }, [dataDetailUser?.data])

  return (
    <Fragment>
      <SEO title="Edit Pengguna Baru | Workday Tracker" />

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
            Edit Pengguna Baru
          </Typography>
          <BasicBreadcrumbs
            titleTo="Manajemen Pengguna"
            linkTo="/manajemen-pengguna"
            subLink={{
              title: 'Edit Pengguna Baru',
              link: `/manajemen-pengguna/edit/${decryptId as string}`
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
                    disabled={isLoading}
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
              disabled={
                isSubmitting || Object.values(form).some((v) => v === '')
              }
              sx={{
                fontWeight: 600,
                textTransform: 'capitalize',
                fontSize: 14
              }}
            >
              {isSubmitting ? 'Mengubah...' : 'Edit Email Pengguna'}
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

export default Authenticated(EditManajemenPengguna)
