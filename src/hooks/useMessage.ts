import { useCallback, useState } from 'react'

import useToast from './useToast'
import { useDispatch } from '@/store/Store'
import { getMessageByConversationId } from '@/services/chat'
import { getMessages, saveConversationId } from '@/store/apps/chat/ChatSlice'

interface ReturnProps {
  isLoading: boolean
  getMessageConversation: (conversationId: string) => Promise<void>
}

const useMessage = (): ReturnProps => {
  const dispatch = useDispatch()

  const { showToast } = useToast()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getMessageConversation = useCallback(async (conversationId: string) => {
    try {
      setIsLoading(true)
      const response = await getMessageByConversationId(conversationId)

      if (response?.code === 200) {
        const data = response?.data || []

        // window.history.pushState('', '', `chat-room?cid=${conversationId}`)
        dispatch(saveConversationId(conversationId))
        dispatch(getMessages(data))
      }
      setIsLoading(false)
    } catch (error) {
      showToast({
        type: 'error',
        message: 'Gagal mengambil data percakapan'
      })

      setIsLoading(false)
      console.error({ error })
    }
  }, [])

  return {
    isLoading,
    getMessageConversation
  }
}

export default useMessage
