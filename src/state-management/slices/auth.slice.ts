import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { LoginResponseInterface } from '../../interfaces/api/auth.interface'

export interface AuthState {
  accessToken?: string | null
  id?: string | null
}

// I could have used hydration and persist libraries but I didn't. >)

const initialState: AuthState = {
  accessToken: localStorage.getItem('accessToken'),
  id: localStorage.getItem('id'),
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<LoginResponseInterface>) => {
      state.accessToken = action.payload.accessToken
      state.id = action.payload.id

      localStorage.setItem('accessToken', action.payload.accessToken)
      localStorage.setItem('id', action.payload.id)
    },
    logOut: (state) => {
      state.accessToken = null
      state.id = null

      localStorage.clear()
    },
  },
})

export const { setAuthData, logOut } = authSlice.actions

export default authSlice.reducer
