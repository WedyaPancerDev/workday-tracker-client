import { Box, Avatar, Typography, useMediaQuery } from '@mui/material'
import { type AppState, useSelector } from '@/store/Store'

export const Profile = (): JSX.Element => {
  const customizer = useSelector((state: AppState) => state.customizer)
  const dashboard = useSelector((state: AppState) => state.dashboard)

  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'))
  const hideMenu = lgUp
    ? customizer.isCollapse && !customizer.isSidebarHover
    : ''

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
            <Typography
              variant="h6"
              sx={{
                width: '80px',
                marginTop: '2px',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis'
              }}
            >
              {dashboard?.profile?.fullname || '...'}
            </Typography>
            <Typography variant="caption" sx={{ textTransform: 'capitalize' }}>
              {dashboard?.profile?.position || '...'}
            </Typography>
          </Box>
        </>
      ) : (
        ''
      )}
    </Box>
  )
}
