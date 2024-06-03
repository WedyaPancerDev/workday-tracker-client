import type {
  ConversationUserByIdResponse,
  MessageResponse
} from '@/services/chat'
import { createSlice } from '@reduxjs/toolkit'

interface ChatState {
  conversationId: string
  messages: MessageResponse[]
  conversationList: ConversationUserByIdResponse[]
}

const initialState: ChatState = {
  conversationId: '',
  messages: [],
  conversationList: []
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
    }
  }
})

export const { getConversationById, saveConversationId, getMessages } =
  chatSlice.actions

export default chatSlice.reducer
