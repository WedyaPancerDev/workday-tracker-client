import { useState } from 'react'
import { signOut } from 'next-auth/react'

import useToast from './useToast'
import { CODE_OK } from '@/configs/http'
import { authLogout } from '@/services/auth'
import { removeTokenFromCookie } from '@/utils/cookies'

interface ILogoutHookReturn {
  handleLogout: () => Promise<void>
  isLoadingLogout: boolean
}

const useLogout = (): ILogoutHookReturn => {
  const { showToast } = useToast()

  const [isLoadingLogout, setIsLoadingLogout] = useState<boolean>(false)

  const handleLogout = async (): Promise<void> => {
    try {
      setIsLoadingLogout(true)
      const response = await authLogout()

      if (response?.code === CODE_OK) {
        await signOut()
      }

      removeTokenFromCookie()
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
