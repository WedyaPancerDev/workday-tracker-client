import type { IEmployeePresenceResponse } from '@/services/employee-presence'

import Link from 'next/link'
import { useMemo } from 'react'
import {
  Box,
  InputAdornment,
  type Theme,
  Typography,
  useMediaQuery,
  Chip
} from '@mui/material'
import { IconSearch } from '@tabler/icons-react'

import { Row } from 'primereact/row'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { ColumnGroup } from 'primereact/columngroup'

import { useForm, Controller } from 'react-hook-form'

import TextField from '@/components/TextField'

import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'

import { useRouter } from 'next/router'

interface IDetailCutiPegawaiContainerProps {
  presenceEmployee: IEmployeePresenceResponse[]
  isLoading: boolean
}

const DetailCutiPegawaiContainer = ({
  isLoading,
  presenceEmployee
}: IDetailCutiPegawaiContainerProps): JSX.Element => {
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))

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
                sx={{ marginTop: lgUp ? 0 : 1, fontWeight: 600 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconSearch size={20} />
                    </InputAdornment>
                  )
                }}
                placeholder="Cari data absensi..."
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
            header="Jam Masuk"
            sortable
            field="clock_in"
            alignHeader={'center'}
            style={{ fontSize: 12 }}
          />
          <Column
            header="Lokasi Masuk"
            sortable
            field="location_in"
            alignHeader={'center'}
            style={{ fontSize: 12 }}
          />
          <Column
            header="Foto Masuk"
            sortable
            field="photo_in"
            alignHeader={'center'}
            style={{ fontSize: 12 }}
          />
          <Column
            header="Jam Keluar"
            sortable
            field="clock_out"
            alignHeader={'center'}
            style={{ fontSize: 12 }}
          />
          <Column
            header="Lokasi Keluar"
            sortable
            field="location_out"
            alignHeader={'center'}
            style={{ fontSize: 12 }}
          />
          <Column
            header="Foto Keluar"
            sortable
            field="photo_out"
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
        value={[]}
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
          body={(rowData: IEmployeePresenceResponse) => {
            return (
              <Box className="table-content">
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600,
                    textTransform: 'capitalize'
                  }}
                ></Typography>
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
          body={(rowData: IEmployeePresenceResponse) => {
            return (
              <Box className="table-content">
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600
                  }}
                ></Typography>
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
          body={(rowData: IEmployeePresenceResponse) => {
            return (
              <Box className="table-content">
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600
                  }}
                ></Typography>
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
          body={(rowData: IEmployeePresenceResponse) => {
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
                ></Typography>
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
          body={(rowData: IEmployeePresenceResponse) => {
            return (
              <Box className="table-content">
                <Typography
                  target="_blank"
                  component={Link}
                  href={rowData?.document || '/'}
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
          body={(rowData: IEmployeePresenceResponse) => {
            return (
              <Box className="table-content">
                <Chip
                  label=""
                  color={'info'}
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
                ></Typography>
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
                px="10px"
                gap="10px"
              ></Box>
            )
          }}
        ></Column>
      </DataTable>
    </Box>
  )
}

export default DetailCutiPegawaiContainer
