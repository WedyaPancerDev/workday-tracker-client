import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Box } from '@mui/material'

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
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false)

  return (
    <AppCard>
      <ChatSidebar
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => {
          setMobileSidebarOpen((prev) => !prev)
        }}
      />

      <Box
        flexGrow={1}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <ChatContent
          toggleChatSidebar={() => {
            setMobileSidebarOpen((prev) => !prev)
          }}
        />
        <ChatMsgSent />
      </Box>
    </AppCard>
  )
}

export default ChatContainer
