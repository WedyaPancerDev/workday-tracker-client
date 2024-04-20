import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Tooltip,
  useMediaQuery
} from '@mui/material'
import { IconPower } from '@tabler/icons-react'
import { type AppState, useSelector } from '@/store/Store'

import { signOut } from 'next-auth/react'

export const Profile = (): JSX.Element => {
  const customizer = useSelector((state: AppState) => state.customizer)
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'))
  const hideMenu = lgUp
    ? customizer.isCollapse && !customizer.isSidebarHover
    : ''

  const handleLogout = async (): Promise<void> => {
    await signOut()
  }

  return (
    <Box
      display={'flex'}
      alignItems="center"
      gap={2}
      sx={{ m: 3, p: 2, bgcolor: `${'secondary.light'}` }}
    >
      {!hideMenu ? (
        <>
          <Avatar alt="Remy Sharp" src={'/images/profile/user-1.jpg'} />

          <Box>
            <Typography variant="h6">Mathew</Typography>
            <Typography variant="caption">Designer</Typography>
          </Box>
          <Box sx={{ ml: 'auto' }}>
            <Tooltip title="Logout" placement="top">
              <IconButton
                type="button"
                onClick={() => {
                  handleLogout()
                }}
                color="primary"
                aria-label="logout"
                size="small"
              >
                <IconPower size="20" />
              </IconButton>
            </Tooltip>
          </Box>
        </>
      ) : (
        ''
      )}
    </Box>
  )
}
