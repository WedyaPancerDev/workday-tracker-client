import React, { useEffect, useState } from 'react'
import { Drawer, type Theme, useMediaQuery } from '@mui/material'
import ChatListing from './ChatListing'
import { type AppState, useSelector, useDispatch } from '@/store/Store'
import useToast from '@/hooks/useToast'
import { getConversationUserById } from '@/services/chat'
import { getConversationById } from '@/store/apps/chat/ChatSlice'

const drawerWidth = 320

const ChatSidebar = (): JSX.Element => {
  const [isConversationReady, setIsConversationReady] = useState<boolean>(false)

  const { showToast } = useToast()
  const dispatch = useDispatch()
  const dashboard = useSelector((state: AppState) => state.dashboard)
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))

  const userId = dashboard?.profile?.user_id || ''

  async function handleConversationByUserId(userId: string): Promise<void> {
    try {
      setIsConversationReady(true)
      const result = await getConversationUserById(userId)

      if (result?.code === 200) {
        const data = result?.data
        dispatch(getConversationById(data))
      }

      setIsConversationReady(false)
    } catch (error) {
      setIsConversationReady(false)
      showToast({
        type: 'error',
        message: 'Gagal mengambil data percakapan'
      })
    }
  }

  useEffect(() => {
    if (userId !== '') {
      handleConversationByUserId(userId)
    }
  }, [userId])

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
      <ChatListing isLoading={isConversationReady} />
    </Drawer>
  )
}

export default ChatSidebar
