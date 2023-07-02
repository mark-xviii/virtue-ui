import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { LoginResponseInterface } from '../../interfaces/api/login.interface'

export interface AuthState {
  accessToken?: string | null
}

// I could have used hydration and persist libraries but I didn't. >)

const initialState: AuthState = {
  accessToken: localStorage.getItem('accessToken'),
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<LoginResponseInterface>) => {
      state.accessToken = action.payload.accessToken

      localStorage.setItem('accessToken', action.payload.accessToken)
    },
  },
})

export const { setAuthData } = authSlice.actions

export default authSlice.reducer
