import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { fetchMetaAndFirstEntries } from '@src/redux/asyncActions'
import { RootState } from '@src/redux/index'

export type ViewMode = 'topic' | 'region' | 'neutral'

interface State {
  viewMode: ViewMode
}

const initialState: State = { viewMode: 'neutral' }

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    changeViewMode: (state, action: PayloadAction<ViewMode>) => {
      state.viewMode = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMetaAndFirstEntries.fulfilled, (state, action) => {
      state.viewMode = action.payload.mode
    })
  }
})

export const selectViewMode = (state: RootState) => state.ui.viewMode

export const { changeViewMode } = uiSlice.actions

export default uiSlice.reducer
