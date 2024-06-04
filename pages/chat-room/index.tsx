import dynamic from 'next/dynamic'

import { Fragment } from 'react'
import SEO from '@/components/SEO'
import { Box, type Theme, useMediaQuery, Typography } from '@mui/material'

import { Authenticated } from '@/middlewares/HOC/Authenticated'

const ChatContainer = dynamic(
  async () => await import('@/containers/chat-app/ChatContainer'),
  {
    ssr: false
  }
)

const ChatRoom = (): JSX.Element => {
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))

  if (!lgUp) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        minHeight="80vh"
        p={2}
      >
        <Typography variant="h6" color="textSecondary" align="center">
          Please use a device with a larger screen to view the chat room.
        </Typography>
      </Box>
    )
  }

  return (
    <Fragment>
      <SEO title="Chat Room | Workday Tracker" />

      <ChatContainer />
    </Fragment>
  )
}

export default Authenticated(ChatRoom)
