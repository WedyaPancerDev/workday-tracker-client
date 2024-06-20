import { nanoid } from 'nanoid'
import { useCallback, useState } from 'react'

import useToast from './useToast'
import { db } from '@/configs/firebase'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'

export interface IFindUserResponse {
  email: string
  fullname: string
  joined_company_at: string
  position: string
  user_id: string
}

export interface IConversationResponse {
  conversationId: string
  date_created: number
  members: string[]
}

export interface IConversationUserResponse {
  user: {
    receiverId: string
    role: string
    fullname: string
  }
  conversationId: string
}

export interface IMessageResponse {
  conversationId: string
  date_created: number
  message: string
  senderId: string
}

interface ReturnProps {
  isLoadingConversation: boolean
  createConversation: (senderId: string, receiverId: string) => Promise<void>
}

const useMessage = (): ReturnProps => {
  const { showToast } = useToast()

  const [isLoadingConversation, setIsLoadingConversation] =
    useState<boolean>(false)

  const createConversation = useCallback(
    async (senderId: string, receiverId: string) => {
      const conversationId = nanoid()

      try {
        setIsLoadingConversation(true)
        await setDoc(doc(db, 'conversations', conversationId), {
          conversationId,
          members: [senderId, receiverId],
          date_created: serverTimestamp()
        })

        showToast({
          message: 'Conversation created successfully',
          type: 'success'
        })
        setIsLoadingConversation(false)
      } catch (error) {
        showToast({
          message: 'Failed to create conversation',
          type: 'error'
        })
        setIsLoadingConversation(false)
        console.error({ error })
      }
    },
    []
  )

  return {
    isLoadingConversation,
    createConversation
  }
}

export default useMessage
