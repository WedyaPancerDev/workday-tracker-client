import type { IEmployeePresenceResponse } from '@/services/employee-presence'

import Link from 'next/link'
import { useMemo } from 'react'
import { Box, Typography } from '@mui/material'

import { Row } from 'primereact/row'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { ColumnGroup } from 'primereact/columngroup'

import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import { generateGoogleMapsLink } from '@/utils/helpers'
import moment from 'moment'

interface IDetailCutiPegawaiContainerProps {
  presenceEmployee: IEmployeePresenceResponse[]
  isLoading: boolean
}

const DetailCutiPegawaiContainer = ({
  isLoading,
  presenceEmployee
}: IDetailCutiPegawaiContainerProps): JSX.Element => {
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
            header="JAM MASUK"
            sortable
            field="clock_in"
            alignHeader={'center'}
            style={{ fontSize: 12 }}
          />
          <Column
            header="LOKASI MASUK"
            sortable
            field="location_in"
            alignHeader={'center'}
            style={{ fontSize: 12 }}
          />
          <Column
            header="FOTO MASUK"
            sortable
            field="photo_in"
            alignHeader={'center'}
            style={{ fontSize: 12 }}
          />
          <Column
            header="JAM KELUAR"
            sortable
            field="clock_out"
            alignHeader={'center'}
            style={{ fontSize: 12 }}
          />
          <Column
            header="LOKASI KELUAR"
            sortable
            field="location_out"
            alignHeader={'center'}
            style={{ fontSize: 12 }}
          />
          <Column
            header="FOTO KELUAR"
            sortable
            field="photo_out"
            alignHeader={'center'}
            style={{ fontSize: 12 }}
          />
          <Column
            header="PRESENSI DIBUAT"
            sortable
            field="presence_date"
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
        value={presenceEmployee || []}
        scrollHeight="auto"
        headerColumnGroup={HeaderGroup}
        showGridlines
        stripedRows
        tableStyle={{ minWidth: '50rem' }}
        paginator
        rows={10}
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
          field="clock_in"
          header="JAM MASUK"
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
                >
                  {rowData?.clock_in ?? '-'}
                </Typography>
              </Box>
            )
          }}
        ></Column>

        <Column
          field="location_in"
          header="LOKASI MASUK"
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
                  href={
                    generateGoogleMapsLink(
                      rowData?.latitude_in,
                      rowData?.longitude_in
                    ) || '/'
                  }
                  sx={{
                    fontWeight: 700,
                    color: '#4b5563',
                    textDecoration: 'underline',
                    '&:hover': { textDecoration: 'none' }
                  }}
                >
                  Lihat Lokasi
                </Typography>
              </Box>
            )
          }}
        ></Column>

        <Column
          field="photo_in"
          header="FOTO MASUK"
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
                  href={rowData?.photo_in || '#'}
                  sx={{
                    fontWeight: 700,
                    color: '#4b5563',
                    textDecoration: 'underline',
                    '&:hover': { textDecoration: 'none' }
                  }}
                >
                  Lihat Foto
                </Typography>
              </Box>
            )
          }}
        ></Column>

        <Column
          field="clock_out"
          header="JAM KELUAR"
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
                >
                  {rowData?.clock_out ?? '-'}
                </Typography>
              </Box>
            )
          }}
        ></Column>

        <Column
          field="location_out"
          header="LOKASI KELUAR"
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
                  href={
                    (rowData?.latitude_out &&
                      rowData?.longitude_out &&
                      generateGoogleMapsLink(
                        rowData?.latitude_out,
                        rowData?.longitude_out
                      )) ||
                    '/'
                  }
                  sx={{
                    fontWeight: 700,
                    color: '#4b5563',
                    textDecoration: 'underline',
                    '&:hover': { textDecoration: 'none' }
                  }}
                >
                  Lihat Lokasi
                </Typography>
              </Box>
            )
          }}
        ></Column>

        <Column
          field="photo_out"
          header="FOTO KELUAR"
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
                  href={rowData?.photo_out || '#'}
                  sx={{
                    fontWeight: 700,
                    color: '#4b5563',
                    textDecoration: 'underline',
                    '&:hover': { textDecoration: 'none' }
                  }}
                >
                  Lihat Foto
                </Typography>
              </Box>
            )
          }}
        ></Column>

        <Column
          field="presence_date"
          header="PRESENSI DIBUAT"
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
                >
                  {moment(rowData?.presence_date).format('YYYY - MM - DD') ??
                    '-'}
                </Typography>
              </Box>
            )
          }}
        ></Column>
      </DataTable>
    </Box>
  )
}

export default DetailCutiPegawaiContainer
