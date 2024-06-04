import type {
  ConversationUserByIdResponse,
  MessageResponse
} from '@/services/chat'
import { getFromLocalStorage } from '@/utils/cookies'
import { createSlice } from '@reduxjs/toolkit'

interface ChatState {
  conversationId: string
  messages: MessageResponse[]
  conversationList: ConversationUserByIdResponse[]
  isAlreadyExist: 'exist' | 'not-exist' | string
  isChatStart: 'start' | 'nope' | string
  isOpenChat: boolean
}

const initialState: ChatState = {
  isOpenChat: false,

  conversationId: '',
  messages: [],
  conversationList: [],
  isAlreadyExist: getFromLocalStorage('@chat-exist') || 'not-exist',
  isChatStart: getFromLocalStorage('@chat-start') || 'nope'
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    saveConversationId: (state: ChatState, action) => {
      return {
        ...state,
        conversationId: action.payload
      }
    },
    getConversationById: (state, action) => {
      return {
        ...state,
        conversationList: action.payload
      }
    },
    getMessages: (state: ChatState, action) => {
      return {
        ...state,
        messages: action.payload
      }
    },
    setChatExist: (state: ChatState, action) => {
      return {
        ...state,
        isAlreadyExist: action.payload
      }
    },
    setChatStart: (state: ChatState, action) => {
      return {
        ...state,
        isChatStart: action.payload
      }
    },
    setOpenChat: (state: ChatState, action) => {
      return {
        ...state,
        isOpenChat: action.payload
      }
    }
  }
})

export const {
  getConversationById,
  saveConversationId,
  getMessages,
  setChatExist,
  setOpenChat
} = chatSlice.actions

export default chatSlice.reducer
