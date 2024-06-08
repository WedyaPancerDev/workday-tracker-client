import { configureStore } from '@reduxjs/toolkit'

import CustomizerReducer from './customizer/CustomizerSlice'
import AuthenticationFirebase from './apps/AuthenticationFirebaseSlice'
import DashboardReducer from './apps/DashboardSlice'
import ChatsReducer from './apps/ChatSlice'

import { combineReducers } from 'redux'
import {
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
  type TypedUseSelectorHook
} from 'react-redux'

export const store = configureStore({
  reducer: {
    customizer: CustomizerReducer,
    dashboard: DashboardReducer,
    chat: ChatsReducer,
    authFirebase: AuthenticationFirebase
  }
})

const rootReducer = combineReducers({
  authFirebase: AuthenticationFirebase,
  customizer: CustomizerReducer,
  dashboard: DashboardReducer,
  chat: ChatsReducer
})

export type AppState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

export const { dispatch } = store
export const useDispatch = (): AppDispatch => useAppDispatch<AppDispatch>()

export const useSelector: TypedUseSelectorHook<AppState> = useAppSelector

export default store
