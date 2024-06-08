import { Drawer, type Theme, useMediaQuery } from '@mui/material'
import ChatListing from './ChatListing'

const drawerWidth = 320

const ChatSidebar = (): JSX.Element => {
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))

  return (
    <Drawer
      open
      variant={lgUp ? 'permanent' : 'temporary'}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        zIndex: lgUp ? 0 : 1,
        '& .MuiDrawer-paper': { position: 'relative' }
      }}
    >
      <ChatListing />
    </Drawer>
  )
}

export default ChatSidebar
