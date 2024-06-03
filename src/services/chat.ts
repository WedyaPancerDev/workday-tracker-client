import type { ApiResponse } from '@/types/apiResponse'
import axios, { getError, BASE_URL_CHAT } from '@/utils/axios'

interface InitChatResponse {
  user_check: boolean
}

export const checkIfExist = async (
  userId: string
): Promise<ApiResponse<InitChatResponse>> => {
  try {
    const url = `${BASE_URL_CHAT}/sv/users/${userId}/check`
    const result = await axios.get(url)

    return result.data
  } catch (error) {
    return getError(error)
  }
}

export const initChat = async (userId: string): Promise<ApiResponse<null>> => {
  try {
    const url = `${BASE_URL_CHAT}/sv/users/${userId}`
    const result = await axios.get(url)

    return result.data
  } catch (error) {
    return getError(error)
  }
}

export interface ConversationUserByIdResponse {
  user: {
    receiverId: string
    role: string
    fullname: string
  }
  conversationId: string
}

export const getConversationUserById = async (
  userId: string
): Promise<ApiResponse<ConversationUserByIdResponse[]>> => {
  try {
    const url = `${BASE_URL_CHAT}/conversations/${userId}`
    const result = await axios.get(url)

    return result.data
  } catch (error) {
    return getError(error)
  }
}

export interface MessageResponse {
  user: {
    uuid: string
    fullname: string
    role: string
    email: string
  }
  message: string
}

export const getMessageByConversationId = async (
  conversationId: string
): Promise<ApiResponse<MessageResponse[]>> => {
  try {
    const url = `${BASE_URL_CHAT}/message/${conversationId}`
    const result = await axios.get(url)

    return result.data
  } catch (error) {
    return getError(error)
  }
}

export interface SendMessagePayload {
  conversationId: string
  senderId: string
  message: string
}

interface SendMessageResponse {
  conversationId: string[]
  senderId: string
  message: string
}

export const sendMessageByConversationId = async (
  payload: SendMessagePayload
): Promise<ApiResponse<SendMessageResponse>> => {
  try {
    const url = `${BASE_URL_CHAT}/message`
    const result = await axios.post(url, payload)

    return result.data
  } catch (error) {
    return getError(error)
  }
}
