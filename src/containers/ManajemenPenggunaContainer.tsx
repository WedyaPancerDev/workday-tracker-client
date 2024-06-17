import type { ApiResponse } from '@/types/apiResponse'
import type { IUsersResponse } from '@/services/users'

import useSWR from 'swr'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import {
  Box,
  Button,
  Chip,
  InputAdornment,
  type Theme,
  Typography,
  useMediaQuery
} from '@mui/material'
import {
  IconPencil,
  IconPlus,
  IconSearch,
  IconTrash
} from '@tabler/icons-react'

import { Row } from 'primereact/row'
import { useRouter } from 'next/router'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { ColumnGroup } from 'primereact/columngroup'

import { useForm, Controller } from 'react-hook-form'

import TextField from '@/components/TextField'

import { fetcher } from '@/utils/request'
import { encryptText } from '@/utils/helpers'
import { deactiveUserById } from '@/services/users'
import DeleteConfirmationPopup from '@/components/Popup/DeleteConfirmationPopup'

import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'

const ManajemenPenggunaContainer = (): JSX.Element => {
  const router = useRouter()
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))

  const [isShowDeletePopup, setIsShowDeletePopup] = useState<boolean>(false)
  const [selectedUser, setSelectedUser] = useState<number | null>(null)

  const { data: dataUser, isLoading } = useSWR<ApiResponse<IUsersResponse[]>>(
    '/users',
    fetcher
  )

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
          href="/manajemen-pengguna/create"
          variant="contained"
          size="large"
          sx={{ fontWeight: 600, display: 'inline-flex', alignItems: 'center' }}
        >
          <IconPlus size={20} style={{ marginRight: '2px' }} />
          <span>Tambah Data Pengguna</span>
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
                placeholder="Cari data pengguna..."
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
            header="EMAIL"
            sortable
            field="email"
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
            header="STATUS AKUN"
            sortable
            field="account_status"
            alignHeader={'center'}
            style={{ fontSize: 12 }}
          />
          <Column
            header="AKSI"
            field="action"
            alignHeader={'center'}
            style={{ fontSize: 12, width: lgUp ? '30%' : '25%' }}
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
            ? dataUser?.data?.filter((user) => {
                return (
                  user?.fullname
                    .toLowerCase()
                    .includes(searchForm.toLowerCase()) ||
                  user?.email
                    .toLowerCase()
                    .includes(searchForm.toLowerCase()) ||
                  user?.position
                    .toLowerCase()
                    .includes(searchForm.toLowerCase()) ||
                  user?.account_status
                    .toLowerCase()
                    .includes(searchForm.toLowerCase())
                )
              })
            : dataUser?.data ?? []
        }
        scrollHeight="auto"
        headerColumnGroup={HeaderGroup}
        tableStyle={{ minWidth: '50rem' }}
        paginator
        showGridlines
        stripedRows
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
          body={(rowData: IUsersResponse) => {
            return (
              <Box className="table-content">
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600,
                    maxWidth: '220px',
                    margin: '0 auto',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {rowData?.fullname ?? '-'}{' '}
                </Typography>
              </Box>
            )
          }}
        ></Column>
        <Column
          field="email"
          header="EMAIL"
          bodyStyle={{
            textAlign: 'center',
            padding: '8px 0'
          }}
          body={(rowData: IUsersResponse) => {
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
                  {rowData?.email ?? '-'}
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
          body={(rowData: IUsersResponse) => {
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
                  {rowData?.position ?? '-'}
                </Typography>
              </Box>
            )
          }}
        ></Column>
        <Column
          field="account_status"
          header="ACCOUNT STATUS"
          bodyStyle={{
            textAlign: 'center',
            padding: '8px 0'
          }}
          body={(rowData: IUsersResponse) => {
            return (
              <Box className="table-content">
                <Chip
                  color="primary"
                  sx={{ textTransform: 'capitalize', fontWeight: 600 }}
                  label={rowData?.account_status ?? '-'}
                />
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
                    router.push(
                      `/manajemen-pengguna/edit/${encryptText(rowData?.uuid)}`
                    )
                  }}
                  variant="contained"
                  sx={{ fontWeight: 700, fontSize: '12px' }}
                >
                  <IconPencil size={18} />
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
                  <IconTrash size={18} style={{ flexShrink: 0 }} />
                  Non-Aktifkan
                </Button>
              </Box>
            )
          }}
        ></Column>
      </DataTable>

      {selectedUser && (
        <DeleteConfirmationPopup
          url="/users"
          title="Pengguna"
          id={selectedUser}
          open={isShowDeletePopup}
          onDelete={deactiveUserById}
          handleClose={() => {
            setSelectedUser(null)
            setIsShowDeletePopup((prev) => !prev)
          }}
        />
      )}
    </Box>
  )
}

export default ManajemenPenggunaContainer
