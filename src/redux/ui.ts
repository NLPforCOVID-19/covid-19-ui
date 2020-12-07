import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { fetchMetaAndFirstEntries } from '@src/redux/asyncActions'
import { RootState } from '@src/redux/index'
import { Entry, ViewMode } from '@src/types'

interface State {
  viewMode: ViewMode
  focusedToSearch: boolean
  editMode: boolean
  editEntry: Entry | null
}

const initialState: State = { viewMode: 'neutral', focusedToSearch: false, editMode: false, editEntry: null }

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    changeViewMode: (state, action: PayloadAction<ViewMode>) => {
      state.viewMode = action.payload
    },
    focusToSearch: (state, action: PayloadAction<boolean>) => {
      state.focusedToSearch = action.payload
    },
    changeEditMode: (state, action: PayloadAction<boolean>) => {
      state.editMode = action.payload
    },
    startEdit: (state, action: PayloadAction<Entry>) => {
      state.editEntry = action.payload
    },
    cancelEdit: (state) => {
      state.editEntry = null
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
export const selectEditMode = (state: RootState) => state.ui.editMode
export const selectEditEntry = (state: RootState) => state.ui.editEntry

export const { changeViewMode, focusToSearch, changeEditMode, startEdit, cancelEdit } = uiSlice.actions

export default uiSlice.reducer
