import { createSlice } from '@reduxjs/toolkit'

interface CurrentUser {
  account_status: string
  avatar: string | null
  email: string
  fullname: string
  password: string
  position:
    | 'administrator'
    | 'owner'
    | 'head-mechanic'
    | 'mechanic'
    | 'cleaner'
    | 'office-boy'
    | 'security'
  user_id: string
}

interface ChatState {
  isLoadingUser: boolean
  currentUser: CurrentUser | null
}

const initialState: ChatState = {
  currentUser: null,
  isLoadingUser: false
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setCurrentUser: (state: ChatState, action) => {
      return {
        ...state,
        currentUser: action.payload
      }
    },
    setLoadingUser: (state: ChatState, action) => {
      return {
        ...state,
        isLoadingUser: action.payload
      }
    }
  }
})

export const { setCurrentUser, setLoadingUser } = chatSlice.actions

export default chatSlice.reducer
