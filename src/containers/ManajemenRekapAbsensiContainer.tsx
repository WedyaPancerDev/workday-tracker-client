import React, { useMemo } from 'react'
import useSWR from 'swr'

import {
  Box,
  Button,
  type Theme,
  Typography,
  useMediaQuery,
  InputAdornment
} from '@mui/material'

import { Row } from 'primereact/row'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { ColumnGroup } from 'primereact/columngroup'
import { useForm, Controller } from 'react-hook-form'
import { IconSearch, IconUser } from '@tabler/icons-react'

import { fetcher } from '@/utils/request'
import TextField from '@/components/TextField'
import { type ApiResponse } from '@/types/apiResponse'
import { type IEmployeeResponse } from '@/services/employee'

import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'

interface IManajemenRekapPegawai {
  recapDate: {
    startDateCurrent: string
    endDateCurrent: string
  }
  isEmpty: boolean
}
const ManajemenRekapAbsensiContainer = ({
  isEmpty,
  recapDate: { endDateCurrent = '', startDateCurrent = '' }
}: IManajemenRekapPegawai): JSX.Element => {
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
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Controller
          name="search"
          control={control}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                type="text"
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
            header="FULLNAME"
            sortable
            field="fullname"
            alignHeader={'center'}
            style={{ fontSize: 12 }}
          />
          <Column
            header="AKSI"
            field="action"
            alignHeader={'center'}
            style={{ fontSize: 12, width: '30%' }}
          />
        </Row>
      </ColumnGroup>
    )
  }, [])

  return (
    <>
      <DataTable
        alwaysShowPaginator
        size="small"
        groupRowsBy="id"
        sortMode="single"
        scrollable
        value={
          searchForm
            ? dataEmployee?.data?.filter((user) => {
                return user?.fullname
                  .toLowerCase()
                  .includes(searchForm.toLowerCase())
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
                    maxWidth: '160px',
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
          field="action"
          header="AKSI"
          bodyStyle={{
            textAlign: 'center',
            padding: '8px 0'
          }}
          body={(rowData) => {
            return (
              <Box display="flex" alignItems="center" px="10px" gap="10px">
                <Button
                  fullWidth
                  type="button"
                  color="inherit"
                  sx={{ fontWeight: 700, fontSize: '14px' }}
                  variant="contained"
                  disabled={isEmpty}
                >
                  <IconUser size={16} style={{ marginRight: '4px' }} />
                  Lihat Rekap
                </Button>
              </Box>
            )
          }}
        ></Column>
      </DataTable>
    </>
  )
}

export default ManajemenRekapAbsensiContainer
