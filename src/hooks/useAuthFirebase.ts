import { useState } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'

import { db, auth } from '@/configs/firebase'
import { type AppState, useDispatch, useSelector } from '@/store/Store'
import { setCurrentUser } from '@/store/apps/AuthenticationFirebaseSlice'

import { saveToLocalStorage } from '@/utils/cookies'

interface IReturnProps {
  isAuthLogin: boolean
  isLoadingUser: boolean

  autoLogin: () => Promise<void>
  autoRegister: () => Promise<void>
  getUserInfo: (uid: string) => Promise<void>
}

const useAuthFirebase = (): IReturnProps => {
  const dispatch = useDispatch()
  const { profile } = useSelector((state: AppState) => state.dashboard)

  const [isLoadingUser, setLoadingUser] = useState<boolean>(false)
  const [isAuthLogin, setAuthLogin] = useState<boolean>(false)

  const getUserInfo = async (uid: string): Promise<void> => {
    if (!uid) return

    try {
      setLoadingUser(true)
      const userRef = doc(db, 'users', uid)
      const userSnap = await getDoc(userRef)

      if (userSnap.exists()) {
        const user = userSnap.data()
        dispatch(setCurrentUser(user))
      }

      setLoadingUser(false)
    } catch (error) {
      setLoadingUser(false)
      console.error({ error })
    }
  }

  const autoLogin = async (): Promise<void> => {
    const payload = {
      email: profile?.email || '',
      password: profile?.user_id || ''
    }

    try {
      setAuthLogin(true)

      await signInWithEmailAndPassword(auth, payload.email, payload.password)
      saveToLocalStorage('@chat-exist', 'exist')
      saveToLocalStorage('@auto-auth', 'done')

      setAuthLogin(false)
    } catch (error) {
      setAuthLogin(false)
      console.error({ error })
    }
  }

  const autoRegister = async (): Promise<void> => {
    const payload = {
      email: profile?.email || '',
      password: profile?.user_id || ''
    }

    try {
      setAuthLogin(true)

      const response = await createUserWithEmailAndPassword(
        auth,
        payload.email,
        payload.password
      )

      await setDoc(doc(db, 'users', response.user.uid), {
        user_id: response.user.uid, // id from firebase
        email: payload.email,
        position: profile?.position || '',
        fullname: profile?.fullname || '',
        joined_company_at: profile?.joined_company_at || '',
      })

      setAuthLogin(false)
    } catch (error) {
      setAuthLogin(false)
      console.error({ error })
    }
  }

  return { autoLogin, autoRegister, getUserInfo, isLoadingUser, isAuthLogin }
}

export default useAuthFirebase
