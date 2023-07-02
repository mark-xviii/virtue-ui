import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { UserType } from '../../types/user.type'
import { VirtueType } from '../../types/virtue.type'

const initialState: UserType = {} as UserType

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserType>) => {
      state.id = action.payload.id
      state.virtues = action.payload.virtues
      state.displayName = action.payload.displayName
      state.publicTag = action.payload.publicTag
    },
    setVirtues: (state, action: PayloadAction<VirtueType[]>) => {
      state.virtues = action.payload
    },
  },
})

export const { setUserData, setVirtues } = userSlice.actions

export default userSlice.reducer
