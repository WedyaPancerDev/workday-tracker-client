import { useState } from 'react'
import { signOut } from 'next-auth/react'

import useToast from './useToast'
import { CODE_OK } from '@/configs/http'
import { authLogout } from '@/services/auth'
import { removeFromCookie, saveToLocalStorage } from '@/utils/cookies'

import { signOut as signOutFirebase } from 'firebase/auth'
import { auth } from '@/configs/firebase'

interface ILogoutHookReturn {
  handleLogout: () => Promise<void>
  isLoadingLogout: boolean
}

const useLogout = (): ILogoutHookReturn => {
  // const router = useRouter()
  const { showToast } = useToast()

  const [isLoadingLogout, setIsLoadingLogout] = useState<boolean>(false)

  const handleLogout = async (): Promise<void> => {
    try {
      setIsLoadingLogout(true)
      const response = await authLogout()

      if (response?.code === CODE_OK) {
        saveToLocalStorage('@auto-auth', 'logout')
        saveToLocalStorage('@chat-exist', 'not-exist')
        await signOutFirebase(auth)
        await signOut()
      }

      removeFromCookie()
      setIsLoadingLogout(false)
    } catch (error) {
      showToast({
        type: 'error',
        message: 'Gagal logout, silahkan coba lagi!'
      })
      console.error({ error })
    }
  }

  return { handleLogout, isLoadingLogout }
}

export default useLogout
