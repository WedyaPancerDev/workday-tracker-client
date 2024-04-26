import type { AppDispatch } from '@/store/Store'

import { sub } from 'date-fns'
import { nanoid as uniqueId } from 'nanoid'
import { createSlice } from '@reduxjs/toolkit'

interface StateType {
  chats: any[]
  chatContent: number
  chatSearch: string
}

const initialState = {
  chats: [],
  chatContent: 1,
  chatSearch: ''
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    getChats: (state, action) => {
      return {
        ...state,
        chats: action.payload
      }
    },
    SearchChat: (state, action) => {
      return {
        ...state,
        chatSearch: action.payload
      }
    },
    SelectChat: (state, action) => {
      return {
        ...state,
        chatContent: action.payload
      }
    },
    sendMsg: (state: StateType, action) => {
      const conversation = action.payload
      const { id, msg } = conversation

      const newMessage = {
        id,
        msg,
        type: 'text',
        attachments: [],
        createdAt: sub(new Date(), { seconds: 1 }),
        senderId: uniqueId()
      }

      state.chats = state.chats.map((chat) =>
        chat.id === action.payload.id
          ? {
              ...chat,
              ...chat.messages.push(newMessage)
            }
          : chat
      )
    }
  }
})

export const { SearchChat, getChats, sendMsg, SelectChat } = chatSlice.actions

export const fetchChats = () => async (dispatch: AppDispatch) => {}

export default chatSlice.reducer
