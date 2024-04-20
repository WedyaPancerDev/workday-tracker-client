import useSWR from 'swr'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Box, Button, InputAdornment, Typography } from '@mui/material'
import {
  IconEye,
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
import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import DeleteInformasiPopup from '@/components/Popup/Information/DeleteInformasiPopup'
import { encryptText } from '@/utils/helpers'
import { type IInformationResponse } from '@/services/dinas/information'

const InformasiContainer = (): JSX.Element => {
  const router = useRouter()

  const [isShowDeletePopup, setIsShowDeletePopup] = useState<boolean>(false)
  const [selectedInformasi, setSelectedInformasi] = useState<number | null>(
    null
  )

  const { data: dataInformasi, isLoading } = useSWR<IInformationResponse[]>(
    '/informasi/data/1',
    fetcher
  )

  const filteringDataInformation = dataInformasi?.filter(
    (information) =>
      information?.isaktif === 1 &&
      information?.deskripsi !== null &&
      information?.kategori !== null
  ) as IInformationResponse[]

  const { control, watch } = useForm({
    defaultValues: {
      search: ''
    }
  })

  const { search: searchForm } = watch()

  const renderHeader = (): JSX.Element => {
    return (
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Button
          LinkComponent={Link}
          href="/informasi/create"
          variant="contained"
          size="large"
          sx={{ fontWeight: 600, display: 'inline-flex', alignItems: 'center' }}
        >
          <IconPlus size={20} style={{ marginRight: '2px' }} />
          <span>Tambah Data Informasi</span>
        </Button>

        <Controller
          name="search"
          control={control}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                type="text"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconSearch size={20} />
                    </InputAdornment>
                  )
                }}
                placeholder="Cari data informasi..."
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
            header="DESKRIPSI"
            sortable
            field="deskripsi"
            alignHeader={'center'}
            style={{ fontSize: 12 }}
          />
          <Column
            header="KATEGORI"
            sortable
            field="kategori"
            alignHeader={'center'}
            style={{ fontSize: 12 }}
          />
          <Column
            header="TOTAL FILE"
            sortable
            field="total_file"
            alignHeader={'center'}
            style={{ fontSize: 12 }}
          />
          <Column
            header="AKSI"
            field="action"
            alignHeader={'center'}
            style={{ fontSize: 12, width: '20%' }}
          />
        </Row>
      </ColumnGroup>
    )
  }, [])

  const handleOpenDeletePopup = (id: number): void => {
    setSelectedInformasi(id)
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
            ? filteringDataInformation?.filter((informasi) => {
                return (
                  informasi?.deskripsi
                    ?.toLowerCase()
                    .includes(searchForm.toLowerCase()) ||
                  informasi?.kategori
                    ?.toLowerCase()
                    .includes(searchForm.toLowerCase())
                )
              })
            : filteringDataInformation
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
          field="deskripsi"
          header="DESKRIPSI"
          bodyStyle={{
            padding: '16px',
            border: '1px solid #F3F4F6'
          }}
          body={(rowData: IInformationResponse) => {
            return (
              <Box className="table-content">
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600,
                    maxWidth: '400px',
                    minWidth: '200px',
                    margin: '0 auto',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {rowData.deskripsi ?? '-'}
                </Typography>
              </Box>
            )
          }}
        ></Column>
        <Column
          field="kategori"
          header="KATEGORI"
          bodyStyle={{
            padding: '16px',
            border: '1px solid #F3F4F6',
            textAlign: 'center'
          }}
          body={(rowData: IInformationResponse) => {
            return (
              <Box className="table-content">
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600,
                    maxWidth: '400px',
                    minWidth: '200px',
                    margin: '0 auto',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {rowData.kategori ?? '-'}
                </Typography>
              </Box>
            )
          }}
        ></Column>
        <Column
          field="total_file"
          header="TOTAL FILE"
          bodyStyle={{
            padding: '16px',
            border: '1px solid #F3F4F6',
            textAlign: 'center'
          }}
          body={(rowData: IInformationResponse) => {
            return (
              <Box className="table-content">
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600,
                    maxWidth: '400px',
                    minWidth: '200px',
                    margin: '0 auto',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {rowData.detail_informasi?.length ?? '0'}
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
            padding: '8px 0',
            border: '1px solid #F3F4F6'
          }}
          body={(rowData: IInformationResponse) => {
            return (
              <Box display="flex" alignItems="center" px="10px" gap="10px">
                <Button
                  fullWidth
                  type="button"
                  color="inherit"
                  sx={{ fontWeight: 600, backgroundColor: '#F3F4F6' }}
                  variant="contained"
                  onClick={() => {
                    router.push(
                      `/informasi/detail/${encryptText(String(rowData.id))}`
                    )
                  }}
                >
                  <IconEye size={18} />
                  Detail
                </Button>
                <Button
                  fullWidth
                  type="button"
                  color="warning"
                  onClick={() => {
                    router.push(
                      `/informasi/edit/${encryptText(String(rowData.id))}`
                    )
                  }}
                  variant="contained"
                  sx={{ fontWeight: 600 }}
                >
                  <IconPencil size={18} />
                  Ubah
                </Button>
                <Button
                  fullWidth
                  type="button"
                  color="error"
                  sx={{ fontWeight: 600 }}
                  variant="contained"
                  onClick={() => {
                    handleOpenDeletePopup(rowData.id)
                  }}
                >
                  <IconTrash size={18} />
                  Hapus
                </Button>
              </Box>
            )
          }}
        ></Column>
      </DataTable>

      {selectedInformasi && (
        <DeleteInformasiPopup
          id={selectedInformasi}
          open={isShowDeletePopup}
          handleClose={() => {
            setIsShowDeletePopup((prev) => !prev)
            setSelectedInformasi(null)
          }}
        />
      )}
    </Box>
  )
}

export default InformasiContainer
