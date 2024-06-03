import {
  Box,
  Typography,
  Button,
  Stack,
  Divider,
  IconButton
} from '@mui/material'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import { Fragment, useState } from 'react'
import { IconEye, IconEyeOff } from '@tabler/icons-react'

import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import useToast from '@/hooks/useToast'
import CustomFormLabel from '../FormLabel'
import CustomTextField from '../OutlineInput'

import Logo from '@/components/Icon/Logo'

interface AuthLoginProps {
  email: string
  password: string
}

const formSchema = yup.object().shape({
  email: yup.string().email('Email tidak valid').required('Email wajib diisi'),
  password: yup.string().required('Password wajib diisi')
})

const AuthLogin = (): JSX.Element => {
  const { showToast } = useToast()
  const router = useRouter()
  const callbackUrl = (router.query.callbackUrl as string) || '/dashboard'

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const { handleSubmit, watch, control, getValues, setError, setValue } =
    useForm({
      defaultValues: {
        email: '',
        password: ''
      },
      resolver: yupResolver(formSchema)
    })

  const form = watch()

  const clearForm = (): void => {
    setValue('email', '')
    setValue('password', '')
  }

  const getPayload = (): AuthLoginProps => {
    const values = getValues()

    return {
      email: values.email,
      password: values.password
    }
  }

  const onSubmit = async (): Promise<void> => {
    const payload = getPayload()

    try {
      setIsSubmitting(true)

      const result = await signIn('credentials', {
        email: payload.email,
        password: payload.password,
        callbackUrl,
        redirect: false
      })

      if (result?.ok) {
        clearForm()

        router.replace(callbackUrl)
      } else {
        if (result?.status === 401 || result?.status === 500) {
          showToast({
            type: 'error',
            message: 'Oops! Terjadi kesalahan saat masuk. Coba lagi nanti ya!'
          })

          clearForm()
          setIsSubmitting(false)
          return
        }

        setError('password', {
          type: 'manual',
          message: 'Email atau password salah'
        })
      }

      setIsSubmitting(false)
    } catch (error) {
      setIsSubmitting(false)
    }
  }

  const isDisabled =
    form.email === '' || form.password === '' || form.password.length < 8

  return (
    <Fragment>
      <Box mt={3}>
        <Box marginY="10px" display="flex" justifyContent="center">
          <Logo sx={{ height: 50, width: 50 }} />
        </Box>

        <Divider>
          <Typography
            component="span"
            color="textSecondary"
            variant="body1"
            fontWeight="600"
            position="relative"
            px={2}
          >
            Masuk ke Akun anda
          </Typography>
        </Divider>
      </Box>

      <Box
        component="form"
        method="POST"
        onSubmit={(e) => {
          handleSubmit(onSubmit)(e)
        }}
      >
        <Stack>
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <Box className="form-control">
                  <CustomFormLabel htmlFor="email">
                    Masukan Email
                  </CustomFormLabel>
                  <CustomTextField
                    {...field}
                    fullWidth
                    type="email"
                    id="email"
                    error={!!error}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const value = e.target.value
                      field.onChange(value.toLowerCase())
                    }}
                    sx={{ fontWeight: 600 }}
                    autoComplete="email"
                    disabled={isSubmitting}
                    placeholder="Contoh: kevin@eurocar.com"
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
                    Masukan Password
                  </CustomFormLabel>

                  <CustomTextField
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
                    disabled={isSubmitting}
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
                      color="gray"
                    >
                      Kata sandi minimal 8 karakter
                    </Typography>
                  )}
                </Box>
              )
            }}
          />
        </Stack>
        <Box mt={3} mb={2}>
          <Button
            fullWidth
            size="large"
            type="submit"
            color="primary"
            variant="contained"
            sx={{ fontWeight: 600 }}
            disabled={isSubmitting || isDisabled}
          >
            {isSubmitting ? 'Memproses...' : 'Masuk'}
          </Button>
        </Box>
      </Box>

      <Typography variant="caption" fontWeight={600}>
        @{new Date().getFullYear()} - Eurocar Service
      </Typography>
    </Fragment>
  )
}

export default AuthLogin
