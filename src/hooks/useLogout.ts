import { useState } from 'react'
import { signOut } from 'next-auth/react'

import useToast from './useToast'
import { CODE_OK } from '@/configs/http'
import { useDispatch } from '@/store/Store'
import { authLogout } from '@/services/auth'
import { setToken, setProfile, setUsers } from '@/store/apps/DashboardSlice'

interface ILogoutHookReturn {
  handleLogout: () => Promise<void>
  isLoadingLogout: boolean
}

const useLogout = (): ILogoutHookReturn => {
  const dispatch = useDispatch()
  const { showToast } = useToast()

  const [isLoadingLogout, setIsLoadingLogout] = useState<boolean>(false)

  const resetGlobalState = (): void => {
    dispatch(setToken(''))
    dispatch(setProfile(null))
    dispatch(
      setUsers({
        id: '',
        role: ''
      })
    )
  }

  const handleLogout = async (): Promise<void> => {
    try {
      setIsLoadingLogout(true)
      const response = await authLogout()

      if (response?.code === CODE_OK) {
        await signOut()
        resetGlobalState()
      }

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
