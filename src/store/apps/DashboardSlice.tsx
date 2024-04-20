import type { IProfileResponse } from '@/services/auth'
import { createSlice } from '@reduxjs/toolkit'

interface DashboardState {
  users: {
    id: string
    role: string
  }
  profile: IProfileResponse | null
  token: string
}

const initialState: DashboardState = {
  users: {
    id: '',
    role: ''
  },
  profile: null,
  token: ''
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setUsers: (state: DashboardState, action) => {
      return {
        ...state,
        users: action.payload
      }
    },
    setToken: (state: DashboardState, action) => {
      return {
        ...state,
        token: action.payload
      }
    },
    setProfile: (state: DashboardState, action) => {
      return {
        ...state,
        profile: action.payload
      }
    }
  }
})

export const { setUsers, setToken, setProfile } = dashboardSlice.actions

export default dashboardSlice.reducer
