import type { IKeterampilanResponse } from '@/services/keterampilan'

import useSWR from 'swr'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Box, Button, InputAdornment, Typography } from '@mui/material'
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
import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import DeleteKeterampilanPopup from '@/components/Popup/Keterampilan/DeleteKeterampilanPopup'
import { encryptText } from '@/utils/helpers'

const KeterampilanContainer = (): JSX.Element => {
  const router = useRouter()

  const [isShowDeletePopup, setIsShowDeletePopup] = useState<boolean>(false)
  const [selectedKeterampilan, setSelectedKeterampilan] = useState<
    number | null
  >(null)

  const { data: dataKeterampilan, isLoading } = useSWR<IKeterampilanResponse[]>(
    '/master/keterampilan',
    fetcher
  )

  const filteringDataKeterampilan =
    (dataKeterampilan?.filter(
      (keterampilan) => keterampilan?.isaktif === 1
    ) as IKeterampilanResponse[]) ?? []

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
          href="/keterampilan/create"
          variant="contained"
          size="large"
          sx={{ fontWeight: 600, display: 'inline-flex', alignItems: 'center' }}
        >
          <IconPlus size={20} style={{ marginRight: '2px' }} />
          <span>Tambah Data Keterampilan</span>
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
                placeholder="Cari data keterampilan..."
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
            header="KETERAMPILAN"
            sortable
            field="keterampilan"
            alignHeader={'center'}
            style={{ fontSize: 12 }}
          />
          <Column
            header="KETERANGAN"
            sortable
            field="keterangan"
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
    setSelectedKeterampilan(id)
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
            ? filteringDataKeterampilan?.filter((keterampilan) => {
                return (
                  keterampilan?.keterampilan
                    ?.toLowerCase()
                    .includes(searchForm.toLowerCase()) ||
                  keterampilan?.keterangan
                    ?.toLowerCase()
                    .includes(searchForm.toLowerCase())
                )
              })
            : filteringDataKeterampilan
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
          field="keterampilan"
          header="KETERAMPILAN"
          bodyStyle={{
            textAlign: 'center',
            padding: '8px 0',
            border: '1px solid #F3F4F6',
            width: '35%'
          }}
          body={(rowData: IKeterampilanResponse) => {
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
                  {rowData?.keterampilan || '-'}
                </Typography>
              </Box>
            )
          }}
        ></Column>
        <Column
          field="keterangan"
          header="KETERANGAN"
          bodyStyle={{
            textAlign: 'center',
            padding: '8px 0',
            border: '1px solid #F3F4F6',
            width: '35%'
          }}
          body={(rowData: IKeterampilanResponse) => {
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
                  {rowData?.keterangan || '-'}
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
          body={(rowData: IKeterampilanResponse) => {
            return (
              <Box display="flex" alignItems="center" px="10px" gap="10px">
                <Button
                  fullWidth
                  type="button"
                  color="warning"
                  onClick={() => {
                    router.push(
                      `/keterampilan/edit/${encryptText(String(rowData.id))}`
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

      {selectedKeterampilan && (
        <DeleteKeterampilanPopup
          id={selectedKeterampilan}
          open={isShowDeletePopup}
          handleClose={() => {
            setIsShowDeletePopup((prev) => !prev)
            setSelectedKeterampilan(null)
          }}
        />
      )}
    </Box>
  )
}

export default KeterampilanContainer
