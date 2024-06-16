import type { AppState } from '@/store/Store'

import dynamic from 'next/dynamic'
import { Box } from '@mui/material'
import { Fragment, useEffect } from 'react'

// import InitChat from './InitChat'
import { useSelector } from '@/store/Store'
import AppCard from '@/components/Card/AppCard'

import { getFromLocalStorage } from '@/utils/cookies'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/configs/firebase'
import useAuthFirebase from '@/hooks/useAuthFirebase'

const InitChat = dynamic(async () => await import('./InitChat'), {
  ssr: false
})

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
  const isAutoLogin = getFromLocalStorage('@auto-auth') || ''

  console.log({ isAutoLogin }, ' : DEBUG')
  const { isAlreadyExist, isOpenChat } = useSelector(
    (state: AppState) => state.chat
  )

  const { getUserInfo } = useAuthFirebase()

  useEffect(() => {
    let unSub: () => void = () => {}

    if (isAutoLogin === 'done') {
      unSub = onAuthStateChanged(auth, (user) => {
        getUserInfo(user?.uid || '')
      })
    }

    return () => {
      unSub()
    }
  }, [isAutoLogin])

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
