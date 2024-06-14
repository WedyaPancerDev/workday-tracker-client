import * as yup from 'yup'
import moment from 'moment'
import { Fragment, useState } from 'react'
import dynamic from 'next/dynamic'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { Box, Typography, type TextFieldProps, Button } from '@mui/material'

import SEO from '@/components/SEO'
import CustomFormLabel from '@/components/FormLabel'
import BasicBreadcrumbs from '@/components/Breadcrumb'
import CustomTextFieldDate from '@/components/TextField/TextFieldDate'

import { Authenticated } from '@/middlewares/HOC/Authenticated'
import { getRecapPresenceAll } from '@/services/recap-presence'
import { CODE_OK } from '@/configs/http'
import useToast from '@/hooks/useToast'

const ManajemenRekapAbsensiContainer = dynamic(
  async () =>
    await import('@/containers/ManajemenRekapAbsensiContainer'),
  { ssr: false }
)

const formSchema = yup.object().shape({
  start_date: yup.string().required('Tanggal Mulai harus diisi'),
  end_date: yup
    .string()
    .required('Tanggal Selesai harus diisi')
    .test(
      'access_exam_expire_date_is_not_valid',
      // eslint-disable-next-line @typescript-eslint/quotes
      "Tanggal yang di-inputkan kurang dari 'Tanggal mulai'",
      (value, context) => {
        const valueDate = value ?? ''
        const accessExamStartDate = context?.parent?.start_date

        if (valueDate < accessExamStartDate) return false

        return true
      }
    )
})

const RekapPegawai = (): JSX.Element => {
  const { showToast } = useToast()

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const { control, handleSubmit, watch, trigger } = useForm({
    defaultValues: {
      start_date: '',
      end_date: ''
    },
    resolver: yupResolver(formSchema)
  })

  const form = watch()

  const onSubmit = async (): Promise<void> => {
    const { start_date: startDate, end_date: endDate } = form

    try {
      setIsSubmitting(true)

      const response = await getRecapPresenceAll(startDate, endDate)

      if (response?.code === CODE_OK) {
        const url = response?.data?.url || ''

        if (typeof window !== 'undefined' && url !== '') {
          window.open(url, '_blank')
        }

        return
      }

      showToast({
        message: 'Gagal menampilkan rekap absensi',
        type: 'error'
      })

      setIsSubmitting(false)
    } catch (error) {
      setIsSubmitting(false)
    }
  }

  const isDisabled = Object.values(form).some((value) => value === '')

  return (
    <Fragment>
      <SEO title="Rekap Absensi | Eurocar Service" />

      <Box component="section">
        <Box display="flex" flexDirection="column">
          <Typography
            variant="h2"
            fontSize="28px"
            fontWeight={700}
            letterSpacing="-0.01em"
            mb={2}
          >
            Informasi Rekap Absensi
          </Typography>
          <BasicBreadcrumbs titleTo="Rekap Absensi" linkTo="/rekap-absensi" />
        </Box>

        <Box marginTop={8} gap="20px" display="grid" gridTemplateColumns="1fr">
          <Box
            component="form"
            className="form-control"
            onSubmit={(e) => {
              handleSubmit(onSubmit)(e)
            }}
            sx={{
              padding: '12px',
              border: '1px solid #e5e7eb'
            }}
          >
            <Typography
              variant="h4"
              fontWeight={700}
              paddingBottom="14px"
              sx={{ textDecoration: 'underline', cursor: 'pointer' }}
            >
              Rekap Semua Absensi
            </Typography>

            <Controller
              name="start_date"
              control={control}
              render={({
                field: { onChange, ref, value, ...rest },
                fieldState: { error }
              }) => {
                return (
                  <Box className="form-control">
                    <CustomFormLabel htmlFor="start_date">
                      Pilih Tanggal Mulai
                    </CustomFormLabel>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        inputRef={ref}
                        value={value ? moment(value) : null}
                        renderInput={(inputProps: TextFieldProps) => (
                          <CustomTextFieldDate
                            {...rest}
                            fullWidth
                            id="start_date"
                            variant="outlined"
                            error={Boolean(error)}
                            color={error ? 'error' : 'primary'}
                            sx={{
                              fontWeight: 600
                            }}
                            {...inputProps}
                          />
                        )}
                        onChange={(date) => {
                          const formattedDate = date
                            ? moment(date).format('YYYY-MM-DD')
                            : ''

                          onChange(formattedDate)
                          trigger('start_date')
                        }}
                        inputFormat="dd/MM/yyyy"
                      />
                    </LocalizationProvider>

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
              name="end_date"
              control={control}
              render={({
                field: { onChange, ref, value, ...rest },
                fieldState: { error }
              }) => {
                return (
                  <Box className="form-control">
                    <CustomFormLabel htmlFor="end_date">
                      Pilih Tanggal Selesai
                    </CustomFormLabel>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        inputRef={ref}
                        value={value ? moment(value) : null}
                        renderInput={(inputProps: TextFieldProps) => (
                          <CustomTextFieldDate
                            {...rest}
                            fullWidth
                            id="end_date"
                            variant="outlined"
                            error={Boolean(error)}
                            color={error ? 'error' : 'primary'}
                            sx={{ fontWeight: 600 }}
                            {...inputProps}
                          />
                        )}
                        onChange={(date) => {
                          const formattedDate = date
                            ? moment(date).format('YYYY-MM-DD')
                            : ''

                          onChange(formattedDate)
                          trigger('end_date')
                        }}
                        inputFormat="dd/MM/yyyy"
                      />
                    </LocalizationProvider>

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

            <Button
              fullWidth
              size="large"
              type="submit"
              color="primary"
              variant="contained"
              disabled={
                isSubmitting ||
                Object.values(form).some((value) => value === '')
              }
              sx={{
                fontWeight: 600,
                textTransform: 'capitalize',
                fontSize: 14,
                marginTop: 4
              }}
            >
              Tampilkan Seluruh Rekap Absensi
            </Button>
          </Box>
          <Box sx={{ overflowX: 'scroll' }}>
            <ManajemenRekapAbsensiContainer
              isEmpty={isDisabled}
              recapDate={{
                startDateCurrent: form.start_date || '',
                endDateCurrent: form.end_date || ''
              }}
            />
          </Box>
        </Box>
      </Box>
    </Fragment>
  )
}

export default Authenticated(RekapPegawai)
