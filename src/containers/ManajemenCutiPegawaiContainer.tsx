import type { IEmployeeResponse } from '@/services/employee'
import type { ApiResponse } from '@/types/apiResponse'

import useSWR from 'swr'
import Link from 'next/link'
import { useMemo } from 'react'
import {
  Box,
  Button,
  InputAdornment,
  type Theme,
  Typography,
  useMediaQuery
} from '@mui/material'
import { IconSearch, IconUser } from '@tabler/icons-react'

import { Row } from 'primereact/row'
import { useRouter } from 'next/router'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { ColumnGroup } from 'primereact/columngroup'

import { useForm, Controller } from 'react-hook-form'

import TextField from '@/components/TextField'

import { fetcher } from '@/utils/request'

import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'

const ManajemenPegawaiContainer = (): JSX.Element => {
  const router = useRouter()
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))

  const { data: dataEmployee, isLoading } = useSWR<
    ApiResponse<IEmployeeResponse[]>
  >('/employees', fetcher)

  const { control, watch } = useForm({
    defaultValues: {
      search: ''
    }
  })

  const { search: searchForm } = watch()

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
                sx={{ marginTop: lgUp ? 0 : 1 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconSearch size={20} />
                    </InputAdornment>
                  )
                }}
                placeholder="Cari data pegawai..."
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
            header="NAMA LENGKAP"
            sortable
            field="fullname"
            alignHeader={'center'}
            style={{ fontSize: 12 }}
          />
          <Column
            header="POSISI"
            sortable
            field="position"
            alignHeader={'center'}
            style={{ fontSize: 12 }}
          />
          <Column
            header="FOTO PROFIL"
            sortable
            field="avatar"
            alignHeader={'center'}
            style={{ fontSize: 12 }}
          />
          <Column
            header="BERGABUNG PADA"
            sortable
            field="joined_company_at"
            alignHeader={'center'}
            style={{ fontSize: 12 }}
          />
          <Column
            header="AKSI"
            field="action"
            alignHeader={'center'}
            style={{ fontSize: 12, width: '15%' }}
          />
        </Row>
      </ColumnGroup>
    )
  }, [])

  return (
    <Box>
      <DataTable
        alwaysShowPaginator
        size="small"
        groupRowsBy="id"
        sortMode="single"
        scrollable
        value={
          searchForm
            ? dataEmployee?.data?.filter((user) => {
                return (
                  user?.fullname
                    .toLowerCase()
                    .includes(searchForm.toLowerCase()) ||
                  user?.position
                    .toLowerCase()
                    .includes(searchForm.toLowerCase())
                )
              })
            : dataEmployee?.data ?? []
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
          field="fullname"
          header="FULLNAME"
          bodyStyle={{
            textAlign: 'center',
            padding: '8px 0'
          }}
          body={(rowData: IEmployeeResponse) => {
            return (
              <Box className="table-content">
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600,
                    maxWidth: '200px',
                    margin: '0 auto',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {rowData?.fullname ?? '-'}
                </Typography>
              </Box>
            )
          }}
        ></Column>
        <Column
          field="position"
          header="POSITION"
          bodyStyle={{
            textAlign: 'center',
            padding: '8px 0'
          }}
          body={(rowData: IEmployeeResponse) => {
            return (
              <Box className="table-content">
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600,
                    textTransform: 'capitalize'
                  }}
                >
                  {rowData?.position ?? '-'}
                </Typography>
              </Box>
            )
          }}
        ></Column>
        <Column
          field="avatar"
          header="avatar"
          bodyStyle={{
            textAlign: 'center',
            padding: '8px 0'
          }}
          body={(rowData: IEmployeeResponse) => {
            return (
              <Box className="table-content">
                <Typography
                  target="_blank"
                  component={Link}
                  href={rowData?.avatar || '/'}
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
          field="joined_company_at"
          header="JOINED_COMPANY_AT"
          bodyStyle={{
            textAlign: 'center',
            padding: '8px 0'
          }}
          body={(rowData: IEmployeeResponse) => {
            return (
              <Box className="table-content">
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600,
                    textTransform: 'capitalize'
                  }}
                >
                  {rowData?.joined_company_at ?? '-'}
                </Typography>
              </Box>
            )
          }}
        ></Column>
        <Column
          field="action"
          header="AKSI"
          bodyStyle={{
            textAlign: 'center',
            padding: '8px 0'
          }}
          body={(rowData) => {
            return (
              <Box
                px="10px"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Button
                  type="button"
                  color="inherit"
                  sx={{
                    fontWeight: 700
                  }}
                  onClick={() => {
                    router.push(`/cuti-pegawai/info/${String(rowData.uuid)}`)
                  }}
                  variant="contained"
                >
                  <IconUser size={16} style={{ marginRight: '4px' }} />
                  Lihat Detail
                </Button>
              </Box>
            )
          }}
        ></Column>
      </DataTable>
    </Box>
  )
}

export default ManajemenPegawaiContainer
