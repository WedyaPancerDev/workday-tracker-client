import type { AppState } from '@/store/Store'

import { Fragment } from 'react'
import dynamic from 'next/dynamic'
import { Box } from '@mui/material'

import InitChat from './InitChat'
import { useSelector } from '@/store/Store'
import AppCard from '@/components/Card/AppCard'

const ChatSidebar = dynamic(
  async () => await import('@/components/Chats/ChatSidebar'),
  {
    ssr: false
  }
)

const ChatMsgSent = dynamic(
  async () => await import('@/components/Chats/ChatMsgSent'),
  {
    ssr: false
  }
)

const ChatContent = dynamic(
  async () => await import('@/components/Chats/ChatContent'),
  {
    ssr: false
  }
)

const ChatContainer = (): JSX.Element => {
  // const { profile } = useSelector((state: AppState) => state.dashboard)
  const { isAlreadyExist, isOpenChat } = useSelector(
    (state: AppState) => state.chat
  )

  return (
    <AppCard>
      <ChatSidebar />

      <Box
        flexGrow={1}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        {isAlreadyExist === 'exist' ? (
          <Fragment>
            <ChatContent />

            {isOpenChat && <ChatMsgSent />}
          </Fragment>
        ) : (
          <Box
            height="90%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <InitChat />
          </Box>
        )}
      </Box>
    </AppCard>
  )
}

export default ChatContainer
