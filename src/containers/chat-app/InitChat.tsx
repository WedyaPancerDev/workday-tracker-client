import { useState } from 'react'
import { Box, Button, Card } from '@mui/material'
import { IconMessage } from '@tabler/icons-react'

import useToast from '@/hooks/useToast'
import Logo from '@/components/Icon/Logo'
import { saveToLocalStorage } from '@/utils/cookies'
import { type AppState, useSelector, useDispatch } from '@/store/Store'
import { checkIfExist, initChat, createConversation } from '@/services/chat'

import { setChatExist } from '@/store/apps/chat/ChatSlice'
import { useRouter } from 'next/router'

const InitChat = (): JSX.Element => {
  const router = useRouter()

  const dispatch = useDispatch()
  const { showToast } = useToast()

  const { users, profile } = useSelector((state: AppState) => state.dashboard)
  const { isAlreadyExist } = useSelector((state: AppState) => state.chat)

  const [isLoadingExist, setIsLoadingExist] = useState<boolean>(false)
  const [isLoadingInitChat, setIsLoadingInitChat] = useState<boolean>(false)

  const userId = users?.id ?? ''

  async function handleCheckIfExist(): Promise<boolean | undefined> {
    try {
      setIsLoadingExist(true)
      const response = await checkIfExist(userId)
      const userCheck = response?.data?.user_check ?? false

      setIsLoadingExist(false)

      return userCheck
    } catch (error) {
      setIsLoadingExist(false)
    }
  }

  async function handleCreateChat(userIds: string): Promise<void> {
    try {
      const response = await createConversation({
        receiveId: '0390f3125f5d5c93ea6d836ce382',
        senderId: userIds
      })

      if (response?.code === 200) {
        console.log('OK')

        saveToLocalStorage('@chat-start', 'start')
        router.reload()
      }
    } catch (error) {
      console.error({ error })
    }
  }

  async function handleInitChat(): Promise<void> {
    try {
      setIsLoadingInitChat(true)
      const isExist = await handleCheckIfExist()

      if (isAlreadyExist === 'exist' && isExist) {
        showToast({
          type: 'success',
          message: 'Selamat datang kembali!'
        })
      } else {
        await initChat(userId)
        users?.role !== 'administrator' &&
          (await handleCreateChat(profile?.user_id ?? ''))
        saveToLocalStorage('@chat-exist', 'exist')

        showToast({
          type: 'success',
          message: 'Chat berhasil dimulai'
        })
      }

      dispatch(setChatExist('exist'))
      setIsLoadingInitChat(false)
    } catch (error) {
      setIsLoadingInitChat(false)
    }
  }

  return (
    <Card
      sx={{
        px: 3,
        py: 2,
        zIndex: 1,
        width: '100%',
        maxWidth: '450px',
        border: '1px solid #E5E7EB'
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="center">
        <Logo sx={{ width: '60px', height: '60px' }} />
      </Box>

      <Box textAlign="center">
        <h2>Welcome to Eurocar Chat</h2>
        <p>Start a conversation with your team</p>

        <Button
          fullWidth
          type="button"
          color="primary"
          variant="contained"
          disabled={isLoadingExist || isLoadingInitChat}
          onClick={() => {
            handleInitChat()
          }}
          sx={{
            marginTop: '20px',
            fontWeight: 600,
            gap: '6px'
          }}
        >
          Mulai Percakapan
          <IconMessage size={20} />
        </Button>
      </Box>
    </Card>
  )
}

export default InitChat
