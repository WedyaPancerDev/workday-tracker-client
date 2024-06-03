import type { AppState } from '@/store/Store'

import { Fragment } from 'react'
import dynamic from 'next/dynamic'

import AppCard from '@/components/Card/AppCard'
import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

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
  const router = useRouter()
  const { cid } = router.query

  const { messages } = useSelector((state: AppState) => state.chat)

  return (
    <AppCard>
      <ChatSidebar />

      <Box
        flexGrow={1}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        {messages?.length < 0 || cid ? (
          <Fragment>
            <ChatContent />
            <ChatMsgSent conversationId={cid as string} />
          </Fragment>
        ) : (
          <Box
            p={2}
            py={1}
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="h5" fontSize="18px" fontWeight={600}>
              Belum ada percakapan {':"('}
            </Typography>
          </Box>
        )}
      </Box>
    </AppCard>
  )
}

export default ChatContainer
