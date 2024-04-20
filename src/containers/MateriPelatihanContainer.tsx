import type { IMateriPelatihanResponse } from '@/services/materi-pelatihan'

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
import DeleteMateriPelatihanPopup from '@/components/Popup/MateriPelatihan/DeleteMateriPelatihanPopup'
import { encryptText } from '@/utils/helpers'

const MateriPelatihanContainer = (): JSX.Element => {
  const router = useRouter()

  const [isShowDeletePopup, setIsShowDeletePopup] = useState<boolean>(false)
  const [selectedMateriPelatihan, setSelectedMateriPelatihan] = useState<number | null>(
    null
  )

  const { data: dataMateriPelatihan, isLoading } = useSWR<IMateriPelatihanResponse[]>(
    '/master/pelatihanMateri',
    fetcher
  )

  const filteringDataMateriPelatihan =
    (dataMateriPelatihan?.filter(
      (materi) => materi?.isaktif === 1
    ) as IMateriPelatihanResponse[]) ?? []

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
          href="/materi-pelatihan/create"
          variant="contained"
          size="large"
          sx={{ fontWeight: 600, display: 'inline-flex', alignItems: 'center' }}
        >
          <IconPlus size={20} style={{ marginRight: '2px' }} />
          <span>Tambah Data Materi Pelatihan</span>
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
                placeholder="Cari data materi pelatihan..."
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
            header="MATERI"
            sortable
            field="materi"
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
    setSelectedMateriPelatihan(id)
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
            ? filteringDataMateriPelatihan?.filter((materi) => {
                return materi?.materi
                  ?.toLowerCase()
                  .includes(searchForm.toLowerCase())
              })
            : filteringDataMateriPelatihan
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
          field="materi"
          header="MATERI"
          bodyStyle={{
            textAlign: 'center',
            padding: '8px 0',
            border: '1px solid #F3F4F6'
          }}
          body={(rowData: IMateriPelatihanResponse) => {
            return (
              <div className="table-content">
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {rowData?.materi || '-'}
                </Typography>
              </div>
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
          body={(rowData: IMateriPelatihanResponse) => {
            return (
              <Box display="flex" alignItems="center" px="10px" gap="10px">
                <Button
                  fullWidth
                  type="button"
                  color="warning"
                  onClick={() => {
                    router.push(
                      `/materi-pelatihan/edit/${encryptText(String(rowData.id))}`
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

      {selectedMateriPelatihan && (
        <DeleteMateriPelatihanPopup
          id={selectedMateriPelatihan}
          open={isShowDeletePopup}
          handleClose={() => {
            setIsShowDeletePopup((prev) => !prev)
            setSelectedMateriPelatihan(null)
          }}
        />
      )}
    </Box>
  )
}

export default MateriPelatihanContainer
