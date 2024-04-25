import { useState } from 'react'
import BasePopupLayout from '@/components/Popup/BasePopup'
import {
  type Theme,
  useMediaQuery,
  Box,
  Typography,
  Button
} from '@mui/material'
import { useSWRConfig } from 'swr'

import useToast from '@/hooks/useToast'

interface IDeleteConfirmationPopup {
  id: number
  open: boolean
  title: string
  url: string
  handleClose: () => void
  onDelete: any
}

const DeleteConfirmationPopup = ({
  id,
  url,
  open,
  title,
  onDelete,
  handleClose
}: IDeleteConfirmationPopup): JSX.Element => {
  const { showToast } = useToast()
  const { mutate } = useSWRConfig()
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

  const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false)

  const onSubmit = async (): Promise<void> => {
    setIsLoadingDelete(true)
    try {
      await onDelete(String(id))
      mutate(url)
      showToast({
        message: `Data ${title} berhasil dihapus`
      })

      handleClose()
    } catch (error) {
      showToast({
        message: `Terjadi kesalahan saat menghapus data ${title}. Silahkan coba lagi.`,
        type: 'error'
      })
      console.error({ error })
    } finally {
      setIsLoadingDelete(false)
    }
  }

  return (
    <BasePopupLayout
      open={open}
      handleClose={handleClose}
      title={`Konfirmasi Hapus Data ${title}`}
    >
      <Box sx={{ maxWidth: mdUp ? '350px' : '100%', width: '100%' }}>
        <Typography
          variant="h6"
          fontSize="16px"
          lineHeight={1.5}
          marginBottom={5}
          fontWeight={500}
        >
          Apakah Anda yakin ingin menghapus data {title} ini?
        </Typography>

        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          gap="8px"
        >
          <Button
            type="button"
            fullWidth
            color="error"
            variant="contained"
            sx={{ fontWeight: 600 }}
            onClick={() => {
              onSubmit()
            }}
            disabled={isLoadingDelete}
          >
            {isLoadingDelete ? 'Menghapus...' : 'Ya, Hapus'}
          </Button>
          <Button
            type="button"
            fullWidth
            variant="text"
            color="inherit"
            sx={{ fontWeight: 600 }}
            disabled={isLoadingDelete}
            onClick={handleClose}
          >
            Tidak
          </Button>
        </Box>
      </Box>
    </BasePopupLayout>
  )
}

export default DeleteConfirmationPopup
