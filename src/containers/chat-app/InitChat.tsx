import { Box, Button, Card, CircularProgress } from '@mui/material'
import { IconMessage } from '@tabler/icons-react'

import useToast from '@/hooks/useToast'
import Logo from '@/components/Icon/Logo'
import { type AppState, useSelector, useDispatch } from '@/store/Store'

import { setChatExist } from '@/store/apps/ChatSlice'
import useAuthFirebase from '@/hooks/useAuthFirebase'

import { setUserRegistered } from '@/services/auth'

const InitChat = (): JSX.Element => {
  const dispatch = useDispatch()
  const { showToast } = useToast()
  const { profile } = useSelector((state: AppState) => state.dashboard)
  const { isAuthLogin, autoRegister, autoLogin } = useAuthFirebase()

  async function handleInitChat(): Promise<void> {
    const userId = profile?.user_id || ''

    try {
      if (profile?.is_regis === 0) {
        await Promise.all([setUserRegistered(userId), autoRegister()])
      }

      await autoLogin()
      showToast({
        type: 'success',
        message: 'Chat berhasil dimulai'
      })

      dispatch(setChatExist('exist'))
    } catch (error) {}
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
          disabled={isAuthLogin}
          onClick={() => {
            handleInitChat()
          }}
          sx={{
            marginTop: '20px',
            fontWeight: 600,
            gap: '6px'
          }}
        >
          {isAuthLogin ? (
            <>
              <CircularProgress sx={{ color: '#ADADAE' }} size={18} />
              Memproses ...
            </>
          ) : (
            <>
              <IconMessage size={20} />
              Mulai Percakapan
            </>
          )}
        </Button>
      </Box>
    </Card>
  )
}

export default InitChat
