import { useState } from 'react'
import { Box, Button, Card } from '@mui/material'
import { IconMessage } from '@tabler/icons-react'

import useToast from '@/hooks/useToast'
import Logo from '@/components/Icon/Logo'
import { checkIfExist, initChat } from '@/services/chat'
import { type AppState, useSelector } from '@/store/Store'
import { getFromLocalStorage, saveToLocalStorage } from '@/utils/cookies'

interface InitChatProps {
  setGetChatExist: React.Dispatch<React.SetStateAction<string | null>>
}

const InitChat = ({ setGetChatExist }: InitChatProps): JSX.Element => {
  const { showToast } = useToast()
  const dashboard = useSelector((state: AppState) => state.dashboard)

  const [isLoadingExist, setIsLoadingExist] = useState<boolean>(false)
  const [isLoadingInitChat, setIsLoadingInitChat] = useState<boolean>(false)

  const userId = dashboard?.users?.id ?? ''

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

  async function handleInitChat(): Promise<void> {
    const getChatExist = getFromLocalStorage('@chat-exist')

    try {
      setIsLoadingInitChat(true)
      const isExist = await handleCheckIfExist()

      if (getChatExist === 'exist' && isExist) {
        showToast({
          type: 'success',
          message: 'Selamat datang kembali!'
        })
      } else {
        await initChat(userId)
        setGetChatExist('exist')
        saveToLocalStorage('@chat-exist', 'exist')

        showToast({
          type: 'success',
          message: 'Chat berhasil dimulai'
        })
      }

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
