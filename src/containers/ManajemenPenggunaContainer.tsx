import type { ApiResponse } from '@/types/apiResponse'
import type { IUsersResponse } from '@/services/users'

import useSWR from 'swr'
import Link from 'next/link'
import { useMemo } from 'react'
import {
  Box,
  Button,
  Chip,
  InputAdornment,
  type Theme,
  Typography,
  useMediaQuery
} from '@mui/material'
import { IconPencil, IconPlus, IconSearch } from '@tabler/icons-react'

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
// import DeleteKeterampilanPopup from '@/components/Popup/Keterampilan/DeleteKeterampilanPopup'
import { encryptText } from '@/utils/helpers'

const ManajemenPenggunaContainer = (): JSX.Element => {
  const router = useRouter()
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))

  const { data: dataUser, isLoading } = useSWR<ApiResponse<IUsersResponse[]>>(
    '/users',
    fetcher
  )

  const finalDataUser = dataUser?.data

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
            sortable
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
            header="EMAIL"
            sortable
            field="email"
            alignHeader={'center'}
            style={{ fontSize: 12 }}
          />
          <Column
            header="POSITION"
            sortable
            field="position"
            alignHeader={'center'}
            style={{ fontSize: 12 }}
          />
          <Column
            header="ACCOUNT STATUS"
            sortable
            field="account_status"
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
            ? finalDataUser?.filter((user) => {
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
            : finalDataUser ?? []
        }
        scrollHeight="auto"
        headerColumnGroup={HeaderGroup}
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
            border: '1px solid #F3F4F6',
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
            padding: '8px 0',
            border: '1px solid #F3F4F6'
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
            padding: '8px 0',
            border: '1px solid #F3F4F6'
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
            padding: '8px 0',
            border: '1px solid #F3F4F6'
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
            padding: '8px 0',
            border: '1px solid #F3F4F6'
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
            padding: '8px 0',
            border: '1px solid #F3F4F6'
          }}
          body={(rowData) => {
            return (
              <Box display="flex" alignItems="center" px="10px" gap="10px">
                <Button
                  fullWidth
                  type="button"
                  color="warning"
                  onClick={() => {
                    router.push(
                      `/manajemen-pengguna/edit/${encryptText(String(rowData.uuid))}`
                    )
                  }}
                  variant="contained"
                  sx={{ fontWeight: 700 }}
                >
                  <IconPencil size={18} />
                  Ubah
                </Button>
                <Button
                  fullWidth
                  type="button"
                  color="error"
                  sx={{ fontWeight: 700, fontSize: '14px' }}
                  variant="contained"
                  onClick={() => {}}
                >
                  Hapus
                </Button>
              </Box>
            )
          }}
        ></Column>
      </DataTable>

      {/* {selectedKeterampilan && (
        <DeleteKeterampilanPopup
          id={selectedKeterampilan}
          open={isShowDeletePopup}
          handleClose={() => {
            setIsShowDeletePopup((prev) => !prev)
            setSelectedKeterampilan(null)
          }}
        />
      )} */}
    </Box>
  )
}

export default ManajemenPenggunaContainer
