import React, { useState } from 'react'
import {
  IconButton,
  Box,
  Badge,
  Menu,
  Typography,
  Chip,
  Stack
} from '@mui/material'

import { IconBellRinging } from '@tabler/icons-react'
import usePendingTimeOffCount from '@/hooks/useCountTimeoff'

const Notifications = (): JSX.Element => {
  const [anchorEl2, setAnchorEl2] = useState<any | null>(null)
  const { pendingCount } = usePendingTimeOffCount()

  const handleClick2 = (event: React.SyntheticEvent<EventTarget>): void => {
    const value = event.currentTarget
    setAnchorEl2(value)
  }

  const handleClose2 = (): void => {
    setAnchorEl2(null)
  }

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          color: anchorEl2 ? 'primary.main' : 'text.secondary'
        }}
        onClick={handleClick2}
      >
        <Badge variant="dot" color={pendingCount < 1 ? 'default' : 'primary'}>
          <IconBellRinging size="21" stroke="1.5" />
        </Badge>
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: '360px'
          }
        }}
      >
        <Stack
          direction="row"
          py={2}
          px={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6" fontSize="14px">
            Pegawai Cuti Belum Diproses
          </Typography>
          <Chip label={`${pendingCount} new`} color="primary" size="small" />
        </Stack>
      </Menu>
    </Box>
  )
}

export default Notifications
