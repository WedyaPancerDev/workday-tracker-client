import { useEffect, useState, type FC } from 'react'
import type { Session, User } from 'next-auth'
import { useSession } from 'next-auth/react'

import useToast from '@/hooks/useToast'
import { CODE_OK } from '@/configs/http'
import { setTokenBearer } from '@/utils/axios'
import { authMe, type ILoginResponse } from '@/services/auth'
import { useDispatch, useSelector, type AppState } from '@/store/Store'
import { setToken, setUsers, setProfile } from '@/store/apps/DashboardSlice'

export interface AuthenticatedPageProps {
  user?: User
}

export const Authenticated = <P extends AuthenticatedPageProps>(
  WrappedComponent: React.ComponentType<P>
): FC<P> => {
  const AuthenticatedPage = (props: P): JSX.Element | null => {
    const { showToast } = useToast()
    const dashboard = useSelector((state: AppState) => state.dashboard)
    const dispatch = useDispatch()

    const [isAlreadySave, setIsAlreadySave] = useState<boolean>(false)

    const { data: dataUser } = useSession()

    const token = (dataUser as Session & ILoginResponse)?.token
    const users = {
      id: (dataUser as Session & ILoginResponse)?.id,
      role: (dataUser as Session & ILoginResponse)?.role
    }

    const getProfileUser = async (): Promise<void> => {
      try {
        const response = await authMe()

        if (response?.code === CODE_OK) {
          const data = response?.data

          dispatch(
            setProfile({
              ...data
            })
          )

          return
        }

        showToast({
          message: 'Failed to get profile user',
          type: 'error'
        })
      } catch (error) {
        console.error({ error })
        showToast({
          message: 'Failed to get profile user',
          type: 'error'
        })
      }
    }

    setTokenBearer(token)

    useEffect(() => {
      if (token && users?.id !== '' && users?.role !== '') {
        setIsAlreadySave(true)

        dispatch(setToken(token))
        dispatch(
          setUsers({
            ...dashboard.users,
            ...users
          })
        )
      }
    }, [token, users.id, users.role])

    useEffect(() => {
      if (isAlreadySave && !dashboard?.profile) {
        getProfileUser()
      }
    }, [isAlreadySave, dashboard?.profile])

    return <WrappedComponent {...props} />
  }

  return AuthenticatedPage
}
