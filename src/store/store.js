import { configureStore } from '@reduxjs/toolkit'
import { authSlice, uiSlice } from './index'
import { chatSlice } from './chatSlice'

export const store = configureStore({
  reducer: {
    auth:authSlice.reducer,
    ui:uiSlice.reducer,
    chat:chatSlice.reducer,
  },
})