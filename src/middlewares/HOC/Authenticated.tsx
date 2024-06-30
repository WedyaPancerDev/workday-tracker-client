import { useEffect, type FC } from 'react'
import { type Session, type User } from 'next-auth'
import { signOut, useSession } from 'next-auth/react'

import useToast from '@/hooks/useToast'
import { CODE_OK } from '@/configs/http'
import axios, { setTokenBearer } from '@/utils/axios'
import { authMe, type ILoginResponse } from '@/services/auth'
import { useDispatch, useSelector, type AppState } from '@/store/Store'
import { setToken, setUsers, setProfile } from '@/store/apps/DashboardSlice'

import { saveCookie } from '@/utils/cookies'

export interface AuthenticatedPageProps {
  user?: User
}

export const Authenticated = <P extends AuthenticatedPageProps>(
  WrappedComponent: React.ComponentType<P>
): FC<P> => {
  const AuthenticatedPage = (props: P): JSX.Element | null => {
    const { showToast } = useToast()
    const { data: dataUser } = useSession()

    const dashboard = useSelector((state: AppState) => state.dashboard)
    const dispatch = useDispatch()

    const token = (dataUser as Session & ILoginResponse)?.token
    const users = {
      id: (dataUser as Session & ILoginResponse)?.id,
      role: (dataUser as Session & ILoginResponse)?.role
    }

    const getProfileUser = async (tokenNew: string): Promise<void> => {
      try {
        const response = await authMe(tokenNew)

        if (response?.code === CODE_OK) {
          const data = response?.data

          dispatch(
            setProfile({
              ...data
            })
          )

          return
        }

        if (response?.message === 'Unauthenticated.') {
          await signOut()

          showToast({
            message: 'Akun Anda tidak terautentikasi. Silahkan login kembali',
            type: 'error'
          })

          return
        }

        showToast({
          message: 'Failed to get profile user',
          type: 'error'
        })
      } catch (error) {
        console.error({ error })
        showToast({
          message: 'Failed to get profile user jos',
          type: 'error'
        })
      }
    }

    useEffect(() => {
      if (
        token &&
        users?.id !== '' &&
        users?.role !== '' &&
        !dashboard?.profile
      ) {
        saveCookie(token)
        setTokenBearer(token)
        dispatch(setToken(token))
        getProfileUser(token)
        axios.defaults.headers.common.Authorization = `Bearer ${token}`

        dispatch(
          setUsers({
            ...dashboard.users,
            ...users
          })
        )
      }
    }, [token, users.id, users.role, dashboard?.profile])

    return <WrappedComponent {...props} />
  }

  return AuthenticatedPage
}
