import {
  updateStatusTimeoffEmployee,
  type IEmployeeTimeoffResponse
} from '@/services/timeoff'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import {
  Box,
  InputAdornment,
  type Theme,
  Typography,
  useMediaQuery,
  Chip,
  Button
} from '@mui/material'
import { IconChecklist, IconSearch, IconX } from '@tabler/icons-react'

import { Row } from 'primereact/row'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { ColumnGroup } from 'primereact/columngroup'

import { useForm, Controller } from 'react-hook-form'

import TextField from '@/components/TextField'

import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import moment from 'moment'
import useToast from '@/hooks/useToast'
import { CODE_OK } from '@/configs/http'
import { useRouter } from 'next/router'
import { useSWRConfig } from 'swr'

interface IDetailCutiPegawaiContainerProps {
  timeOffEmployee: IEmployeeTimeoffResponse[]
  isLoading: boolean
}

const listMessage: Record<string, string> = {
  annual: 'Cuti Tahunan',
  sick_without_docs: 'Cuti Sakit Tanpa Surat Dokter',
  sick_with_docs: 'Cuti Sakit dengan Surat Dokter',
  holiday: 'Cuti Liburan',
  unpaid: 'Cuti Tidak Dibayar',
  special_permit: 'Cuti Khusus'
}

const DetailCutiPegawaiContainer = ({
  isLoading,
  timeOffEmployee
}: IDetailCutiPegawaiContainerProps): JSX.Element => {
  const router = useRouter()
  const { mutate } = useSWRConfig()

  const [isLoadingUpdateStatus, setIsLoadingUpdateStatus] =
    useState<boolean>(false)

  const { pegawai_id: pegawaiId = '' } = router.query
  const { showToast } = useToast()
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))

  const { control, watch } = useForm({
    defaultValues: {
      search: ''
    }
  })

  const { search: searchForm } = watch()

  const updateStatus = async (
    status: 'approved' | 'rejected',
    employeeId: string
  ): Promise<void> => {
    const payload = {
      status
    }

    try {
      setIsLoadingUpdateStatus(true)
      const response = await updateStatusTimeoffEmployee(payload, employeeId)

      if (response?.code === CODE_OK) {
        showToast({
          type: 'success',
          message: 'Berhasil mengubah status cuti pegawai'
        })

        mutate(`/timeoff/${pegawaiId as string}`)
        mutate(`/employees/${pegawaiId as string}`)

        setIsLoadingUpdateStatus(false)
        return
      }

      showToast({
        type: 'error',
        message: 'Gagal mengubah status cuti pegawai'
      })
      setIsLoadingUpdateStatus(false)
    } catch (error) {
      showToast({
        type: 'error',
        message: 'Gagal mengubah status cuti pegawai'
      })

      setIsLoadingUpdateStatus(false)
    }
  }

  const renderHeader = (): JSX.Element => {
    return (
      <Box display="flex" justifyContent="space-between" alignItems={'center'}>
        <Controller
          name="search"
          control={control}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                type="text"
                fullWidth={!lgUp}
                sx={{ marginTop: lgUp ? 0 : 1, fontWeight: 600 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconSearch size={20} />
                    </InputAdornment>
                  )
                }}
                placeholder="Cari data cuti..."
              />
            )
          }}
        />
      </Box>
    )
  }

  const header = renderHeader()
  const HeaderGroup = useMemo(() => {
    return (
      <ColumnGroup>
        <Row style={{ fontFamily: 'Plus Jakarta Sans' }}>
          <Column
            header="NO"
            field="no"
            alignHeader={'center'}
            style={{ fontSize: 12 }}
          />
          <Column
            header="TIPE CUTI"
            sortable
            field="type"
            alignHeader={'center'}
            style={{ fontSize: 12 }}
          />
          <Column
            header="CUTI DIMULAI"
            sortable
            field="start_date"
            alignHeader={'center'}
            style={{ fontSize: 12 }}
          />
          <Column
            header="CUTI BERAKHIR"
            sortable
            field="end_date"
            alignHeader={'center'}
            style={{ fontSize: 12 }}
          />
          <Column
            header="KETERANGAN"
            sortable
            field="description"
            alignHeader={'center'}
            style={{ fontSize: 12 }}
          />
          <Column
            header="DOKUMEN"
            sortable
            field="document"
            alignHeader={'center'}
            style={{ fontSize: 12 }}
          />
          <Column
            header="STATUS"
            sortable
            field="status"
            alignHeader={'center'}
            style={{ fontSize: 12 }}
          />
          <Column
            header="TOTAL CUTI"
            field="total_days"
            alignHeader={'center'}
            style={{ fontSize: 12 }}
          />
          <Column
            header="CUTI DIAJUKAN"
            field="timeoff_created_at"
            alignHeader={'center'}
            style={{ fontSize: 12 }}
          />
          <Column
            header="AKSI"
            field="action"
            alignHeader={'center'}
            style={{ fontSize: 12 }}
          />
        </Row>
      </ColumnGroup>
    )
  }, [])

  return (
    <Box marginTop={8}>
      <DataTable
        alwaysShowPaginator
        size="small"
        groupRowsBy="id"
        sortMode="single"
        scrollable
        value={
          searchForm
            ? timeOffEmployee?.filter((timeoff) => {
                return (
                  timeoff?.type
                    .toLowerCase()
                    .includes(searchForm.toLowerCase()) ||
                  timeoff?.status
                    .toLowerCase()
                    .includes(searchForm.toLowerCase()) ||
                  timeoff?.description
                    .toLowerCase()
                    .includes(searchForm.toLowerCase()) ||
                  timeoff?.total_days
                    .toString()
                    .toLowerCase()
                    .includes(searchForm.toLowerCase())
                )
              })
            : timeOffEmployee ?? []
        }
        scrollHeight="auto"
        headerColumnGroup={HeaderGroup}
        showGridlines
        stripedRows
        tableStyle={{ minWidth: '50rem' }}
        paginator
        rows={10}
        header={header}
        rowsPerPageOptions={[5, 10, 20, 30]}
        style={{
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)',
          fontFamily: 'Plus Jakarta Sans, sans-serif !important',
          fontSize: 14
        }}
        loading={isLoading}
      >
        <Column
          field="no"
          header="NO"
          bodyStyle={{
            textAlign: 'center',
            padding: '8px 0',
            width: '5%'
          }}
          body={(_, { rowIndex }) => {
            return (
              <div className="table-content">
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {rowIndex + 1}
                </Typography>
              </div>
            )
          }}
        ></Column>
        <Column
          field="type"
          header="TYPE"
          bodyStyle={{
            textAlign: 'center',
            padding: '8px 0'
          }}
          body={(rowData: IEmployeeTimeoffResponse) => {
            return (
              <Box className="table-content">
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600,
                    textTransform: 'capitalize'
                  }}
                >
                  {listMessage[rowData?.type] ?? '-'}
                </Typography>
              </Box>
            )
          }}
        ></Column>
        <Column
          field="start_date"
          header="START DATE"
          bodyStyle={{
            textAlign: 'center',
            padding: '8px 0'
          }}
          body={(rowData: IEmployeeTimeoffResponse) => {
            return (
              <Box className="table-content">
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600
                  }}
                >
                  {moment(rowData?.start_date).format('YYYY - MM - DD') ?? '-'}
                </Typography>
              </Box>
            )
          }}
        ></Column>
        <Column
          field="end_date"
          header="END DATE"
          bodyStyle={{
            textAlign: 'center',
            padding: '8px 0'
          }}
          body={(rowData: IEmployeeTimeoffResponse) => {
            return (
              <Box className="table-content">
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600
                  }}
                >
                  {moment(rowData?.end_date).format('YYYY - MM - DD') ?? '-'}
                </Typography>
              </Box>
            )
          }}
        ></Column>
        <Column
          field="description"
          header="description"
          bodyStyle={{
            textAlign: 'center',
            padding: '8px 0'
          }}
          body={(rowData: IEmployeeTimeoffResponse) => {
            return (
              <Box className="table-content">
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600,
                    maxWidth: '150px',
                    margin: '0 auto',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {rowData?.description ?? '-'}
                </Typography>
              </Box>
            )
          }}
        ></Column>
        <Column
          field="document"
          header="DOCUMENT"
          bodyStyle={{
            textAlign: 'center',
            padding: '8px 0'
          }}
          body={(rowData: IEmployeeTimeoffResponse) => {
            return (
              <Box className="table-content">
                <Typography
                  target="_blank"
                  component={Link}
                  href={rowData?.document || '/#'}
                  sx={{
                    fontWeight: 700,
                    color: '#4b5563',
                    textDecoration: 'underline',
                    '&:hover': { textDecoration: 'none' }
                  }}
                >
                  Lihat
                </Typography>
              </Box>
            )
          }}
        ></Column>
        <Column
          field="status"
          header="STATUS"
          bodyStyle={{
            textAlign: 'center',
            padding: '8px 0'
          }}
          body={(rowData: IEmployeeTimeoffResponse) => {
            const currentStatus: Record<
              string,
              | 'default'
              | 'error'
              | 'primary'
              | 'secondary'
              | 'info'
              | 'success'
              | 'warning'
            > = {
              approved: 'success',
              rejected: 'error',
              pending: 'warning'
            }

            return (
              <Box className="table-content">
                <Chip
                  label={rowData?.status}
                  color={currentStatus[rowData?.status] || 'info'}
                  sx={{ fontWeight: 600, textTransform: 'capitalize' }}
                />
              </Box>
            )
          }}
        ></Column>
        <Column
          field="total_days"
          header="TOTAL DAYS"
          bodyStyle={{
            textAlign: 'center',
            padding: '8px 0'
          }}
          body={(rowData) => {
            return (
              <Box className="table-content">
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600
                  }}
                >
                  {rowData?.total_days ?? '-'}
                </Typography>
              </Box>
            )
          }}
        ></Column>
        <Column
          field="timeoff_created_at"
          header="CUTI DIAJUKAN"
          bodyStyle={{
            textAlign: 'center',
            padding: '8px 0'
          }}
          body={(rowData: IEmployeeTimeoffResponse) => {
            return (
              <Box className="table-content">
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600,
                    textTransform: 'capitalize'
                  }}
                >
                  {moment(rowData?.timeoff_created_at).format(
                    'YYYY-MM-DD'
                  ) ?? '-'}
                </Typography>
              </Box>
            )
          }}
        ></Column>
        <Column
          field="action"
          header="ACTION"
          bodyStyle={{
            textAlign: 'center',
            padding: '8px 0'
          }}
          body={(rowData) => {
            return (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                px="10px"
                gap="10px"
              >
                {rowData?.status === 'pending' ? (
                  <>
                    <Button
                      fullWidth
                      size="small"
                      type="button"
                      color="primary"
                      variant="contained"
                      sx={{ fontWeight: 700 }}
                      onClick={() => {
                        updateStatus('approved', rowData?.uuid)
                      }}
                      disabled={
                        rowData?.status === 'approved' ||
                        rowData?.status === 'rejected' ||
                        isLoadingUpdateStatus
                      }
                    >
                      <IconChecklist size={18} />
                      Terima
                    </Button>
                    <Button
                      fullWidth
                      type="button"
                      color="error"
                      size="small"
                      sx={{ fontWeight: 700, fontSize: '14px' }}
                      variant="contained"
                      onClick={() => {
                        updateStatus('rejected', rowData?.uuid)
                      }}
                      disabled={
                        rowData?.status === 'rejected' ||
                        rowData?.status === 'approved' ||
                        isLoadingUpdateStatus
                      }
                    >
                      <IconX size={18} />
                      Tolak
                    </Button>
                  </>
                ) : (
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      textAlign: 'center',
                      fontSize: '12px'
                    }}
                  >
                    {rowData?.status}
                  </Typography>
                )}
              </Box>
            )
          }}
        ></Column>
      </DataTable>
    </Box>
  )
}

export default DetailCutiPegawaiContainer
