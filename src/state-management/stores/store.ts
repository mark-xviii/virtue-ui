import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../slices/auth.slice'
import authAPI from '../api/auth.api'
import userAPI from '../api/user.api'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authAPI.middleware)
      .concat(userAPI.middleware),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
