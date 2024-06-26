import { useState } from 'react'
import {
  Box,
  Menu,
  Avatar,
  Typography,
  Divider,
  Button,
  IconButton,
  Stack
} from '@mui/material'

import useLogout from '@/hooks/useLogout'
import { IconMail } from '@tabler/icons-react'
import { type AppState, useSelector } from '@/store/Store'

const Profile = (): JSX.Element => {
  const { handleLogout, isLoadingLogout } = useLogout()
  const dashboard = useSelector((state: AppState) => state.dashboard)

  const [anchorEl2, setAnchorEl2] = useState<any | null>(null)
  const handleClick2 = (event: React.SyntheticEvent<EventTarget>): void => {
    setAnchorEl2(event.currentTarget)
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
          ...(typeof anchorEl2 === 'object' && {
            color: 'primary.main'
          })
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={'/images/profile/user-1.jpg'}
          alt={'ProfileImg'}
          sx={{
            width: 35,
            height: 35
          }}
        />
      </IconButton>

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
            width: '360px',
            p: 4
          }
        }}
      >
        <Typography variant="h5">User Profile</Typography>
        <Stack direction="row" py={3} spacing={2} alignItems="center">
          <Avatar
            src={'/images/profile/user-1.jpg'}
            alt={'ProfileImg'}
            sx={{ width: 95, height: 95 }}
          />
          <Box>
            <Typography
              variant="subtitle2"
              color="textPrimary"
              fontWeight={600}
              sx={{
                width: '120px',
                marginTop: '2px',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis'
              }}
            >
              {dashboard?.profile?.fullname || '...'}
            </Typography>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              textTransform="capitalize"
            >
              {dashboard?.profile?.position || '...'}
            </Typography>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              display="flex"
              alignItems="center"
              sx={{
                width: '150px',
                marginTop: '8px',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                fontWeight: 500
              }}
              gap={1}
            >
              <IconMail width={15} height={15} />
              {dashboard?.profile?.email || '...'}
            </Typography>
          </Box>
        </Stack>
        <Divider />
        <Box mt={2}>
          <Button
            type="button"
            variant="outlined"
            color="primary"
            disabled={isLoadingLogout}
            onClick={() => {
              handleLogout()
            }}
            fullWidth
          >
            {isLoadingLogout ? 'Memproses...' : 'Keluar'}
          </Button>
        </Box>
      </Menu>
    </Box>
  )
}

export default Profile
