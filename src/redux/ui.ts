import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { fetchMetaAndFirstEntries } from '@src/redux/asyncActions'
import { RootState } from '@src/redux/index'
import { ViewMode } from '@src/types'

interface State {
  viewMode: ViewMode
  focusedToSearch: boolean
}

const initialState: State = { viewMode: 'neutral', focusedToSearch: false }

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    changeViewMode: (state, action: PayloadAction<ViewMode>) => {
      state.viewMode = action.payload
    },
    focusToSearch: (state, action: PayloadAction<boolean>) => {
      state.focusedToSearch = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMetaAndFirstEntries.fulfilled, (state, action) => {
      state.viewMode = action.payload.mode
    })
  }
})

export const selectViewMode = (state: RootState) => state.ui.viewMode
export const selectFocusedToSearch = (state: RootState) => state.ui.focusedToSearch

export const { changeViewMode, focusToSearch } = uiSlice.actions

export default uiSlice.reducer
