import React from 'react'
import { Drawer, type Theme, useMediaQuery } from '@mui/material'
import ChatListing from './ChatListing'

interface IChatType {
  isMobileSidebarOpen: boolean
  onSidebarClose: (event: React.MouseEvent<HTMLElement>) => void
}

const drawerWidth = 320

const ChatSidebar = ({
  isMobileSidebarOpen,
  onSidebarClose
}: IChatType): JSX.Element => {
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))

  return (
    <Drawer
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
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
