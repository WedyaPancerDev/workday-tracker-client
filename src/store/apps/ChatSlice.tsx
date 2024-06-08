import type { IMessageResponse } from '@/hooks/useMessage'
import { getFromLocalStorage } from '@/utils/cookies'
import { createSlice } from '@reduxjs/toolkit'

interface ChatState {
  isOpenChat: boolean

  conversationId: string
  isAlreadyExist: 'exist' | 'not-exist' | string
  isChatStart: 'start' | 'nope' | string

  whoAreYouChat: {
    role: string
    fullname: string
    user_id: string
  }

  messages: IMessageResponse[]
}

const initialState: ChatState = {
  isOpenChat: false,

  conversationId: '',
  isAlreadyExist: getFromLocalStorage('@chat-exist') || 'not-exist',
  isChatStart: getFromLocalStorage('@chat-start') || 'nope',

  whoAreYouChat: {
    role: '',
    fullname: '',
    user_id: ''
  },

  messages: []
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
    },
    setWhoAreYouChat: (state: ChatState, action) => {
      return {
        ...state,
        whoAreYouChat: action.payload
      }
    },

    setMessages: (state: ChatState, action) => {
      return {
        ...state,
        messages: action.payload
      }
    }
  }
})

export const {
  saveConversationId,
  setWhoAreYouChat,
  setChatExist,
  setOpenChat,
  setMessages
} = chatSlice.actions

export default chatSlice.reducer
