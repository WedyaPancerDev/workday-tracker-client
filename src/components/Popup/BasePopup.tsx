import React, { Fragment } from 'react'
import { Dialog, DialogContent, Box, DialogTitle } from '@mui/material'
import { styled } from '@mui/material/styles'
import { IconX } from '@tabler/icons-react'

interface IBasePopupLayout {
  open: boolean
  handleClose: () => void
  title?: string
  children: React.ReactNode
}

const CloseButton = styled('button')({
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer'
})

const BasePopupLayout = ({
  title = '',
  open = true,
  handleClose,
  children
}: IBasePopupLayout): JSX.Element => {
  return (
    <Fragment>
      <Dialog open={open} onClose={handleClose} aria-labelledby="base-dialog">
        <Box sx={{ padding: '10px 10px 10px 0' }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <DialogTitle sx={{ fontSize: '18px', fontWeight: 700 }}>
              {title}
            </DialogTitle>
            <CloseButton type="button" onClick={handleClose}>
              <IconX size={24} color="#949494" />
            </CloseButton>
          </Box>
          <DialogContent>{children}</DialogContent>
        </Box>
      </Dialog>
    </Fragment>
  )
}

export default BasePopupLayout
