import { Fragment, useState } from 'react'
import dynamic from 'next/dynamic'

import SEO from '@/components/SEO'
import { Box } from '@mui/material'

import { Authenticated } from '@/middlewares/HOC/Authenticated'
import { getFromLocalStorage } from '@/utils/cookies'

const ChatContainer = dynamic(
  async () => await import('@/containers/chat-app/ChatContainer'),
  {
    ssr: false
  }
)

const InitChat = dynamic(
  async () => await import('@/containers/chat-app/InitChat'),
  {
    ssr: false
  }
)

const ChatRoom = (): JSX.Element => {
  const [getChatExist, setGetChatExist] = useState<string | null>(
    () => getFromLocalStorage('@chat-exist') || null
  )

  return (
    <Fragment>
      <SEO title="Chat Room | Workday Tracker" />

      <Box
        display="flex"
        minHeight="60vh"
        component="section"
        alignItems="center"
        justifyContent="center"
      >
        {getChatExist === 'exist' ? (
          <ChatContainer />
        ) : (
          <InitChat setGetChatExist={setGetChatExist} />
        )}
      </Box>
    </Fragment>
  )
}

export default Authenticated(ChatRoom)
