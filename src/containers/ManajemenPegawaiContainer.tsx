import type { IEmployeeResponse } from '@/services/employee'
import type { ApiResponse } from '@/types/apiResponse'

import useSWR from 'swr'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import {
  Box,
  Button,
  InputAdornment,
  type Theme,
  Typography,
  useMediaQuery
} from '@mui/material'
import { IconPlus, IconSearch } from '@tabler/icons-react'

import { Row } from 'primereact/row'
import { useRouter } from 'next/router'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { ColumnGroup } from 'primereact/columngroup'

import { useForm, Controller } from 'react-hook-form'

import TextField from '@/components/TextField'

import { fetcher } from '@/utils/request'
import { deactiveEmployeeById } from '@/services/employee'
import DeleteConfirmationPopup from '@/components/Popup/DeleteConfirmationPopup'

import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'

const ManajemenPegawaiContainer = (): JSX.Element => {
  const router = useRouter()
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))

  const [isShowDeletePopup, setIsShowDeletePopup] = useState<boolean>(false)
  const [selectedUser, setSelectedUser] = useState<number | null>(null)

  const { data: dataEmployee, isLoading } = useSWR<
    ApiResponse<IEmployeeResponse[]>
  >('/employees', fetcher, {
    revalidateOnFocus: false
  })

  const { control, watch } = useForm({
    defaultValues: {
      search: ''
    }
  })

  const { search: searchForm } = watch()

  const renderHeader = (): JSX.Element => {
    return (
      <Box
        display="flex"
        flexDirection={lgUp ? 'row' : 'column'}
        justifyContent="space-between"
        alignItems={lgUp ? 'center' : 'flex-start'}
      >
        <Button
          LinkComponent={Link}
          href="/manajemen-pegawai/create"
          variant="contained"
          size="large"
          sx={{ fontWeight: 600, display: 'inline-flex', alignItems: 'center' }}
        >
          <IconPlus size={20} style={{ marginRight: '2px' }} />
          <span>Tambah Data Karyawan</span>
        </Button>

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
            header="JENIS KELAMIN"
            sortable
            field="gender"
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
            header="NOMOR TELEPON"
            sortable
            field="phone"
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
            header="TANGGAL BERGABUNG"
            sortable
            field="joined_company_at"
            alignHeader={'center'}
            style={{ fontSize: 12 }}
          />
          <Column
            header="AKSI"
            field="action"
            alignHeader={'center'}
            style={{ fontSize: 12, width: lgUp ? '22%' : 0 }}
          />
        </Row>
      </ColumnGroup>
    )
  }, [])

  const handleOpenDeletePopup = (id: number): void => {
    setSelectedUser(id)
    setIsShowDeletePopup((prev) => !prev)
  }

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
                  user?.gender
                    .toLowerCase()
                    .includes(searchForm.toLowerCase()) ||
                  user?.position
                    .toLowerCase()
                    .includes(searchForm.toLowerCase()) ||
                  user?.phone_number
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
          header="NAMA LENGKAP"
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
                    maxWidth: '180px',
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
          field="gender"
          header="JENIS KELAMIN"
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
                    maxWidth: '80px',
                    margin: '0 auto',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    textTransform: 'capitalize'
                  }}
                >
                  {rowData?.gender ?? '-'}
                </Typography>
              </Box>
            )
          }}
        ></Column>
        <Column
          field="position"
          header="POSISI"
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
                    maxWidth: '80px',
                    margin: '0 auto',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
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
          field="phone"
          header="NOMOR TELEPON"
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
                    textOverflow: 'ellipsis',
                    textTransform: 'capitalize'
                  }}
                >
                  {rowData?.phone_number ?? '-'}
                </Typography>
              </Box>
            )
          }}
        ></Column>
        <Column
          field="avatar"
          header="FOTO PROFIL"
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
          header="TANGGAL BERGABUNG"
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
                    maxWidth: '180px',
                    margin: '0 auto',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
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
              <Box display="flex" alignItems="center" px="10px" gap="10px">
                <Button
                  fullWidth
                  size="small"
                  type="button"
                  color="warning"
                  onClick={() => {
                    router.push(`/manajemen-pegawai/edit/${rowData.uuid}`)
                  }}
                  variant="contained"
                  sx={{ fontWeight: 700, fontSize: '12px' }}
                >
                  Ubah
                </Button>
                <Button
                  fullWidth
                  size="small"
                  type="button"
                  color="error"
                  sx={{ fontWeight: 700, fontSize: '12px' }}
                  variant="contained"
                  onClick={() => {
                    handleOpenDeletePopup(rowData.uuid)
                  }}
                >
                  Non-Aktifkan
                </Button>
              </Box>
            )
          }}
        ></Column>
      </DataTable>

      {selectedUser && (
        <DeleteConfirmationPopup
          url="/employees"
          title="Pengguna"
          id={selectedUser}
          open={isShowDeletePopup}
          onDelete={deactiveEmployeeById}
          handleClose={() => {
            setSelectedUser(null)
            setIsShowDeletePopup((prev) => !prev)
          }}
        />
      )}
    </Box>
  )
}

export default ManajemenPegawaiContainer
