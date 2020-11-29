import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RegionId, Topic } from '@src/types'
import { fetchMetaAndFirstEntries } from '@src/redux/asyncActions'
import { RootState } from '@src/redux/index'

type ViewMode = 'topic' | 'region' | 'neutral'

interface State {
  viewMode: ViewMode
  selectedTopic: Topic
  selectedRegion: RegionId
}

const initialState: State = { viewMode: 'neutral', selectedTopic: '', selectedRegion: '' }

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    changeViewMode: (state, action: PayloadAction<ViewMode>) => {
      state.viewMode = action.payload
    },
    setTopic: (state, action: PayloadAction<Topic>) => {
      state.selectedTopic = action.payload
    },
    setRegion: (state, action: PayloadAction<RegionId>) => {
      state.selectedRegion = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMetaAndFirstEntries.fulfilled, (state, action) => {
      state.viewMode = 'topic'
      state.selectedTopic = action.payload.topics[0]
      state.selectedRegion = action.payload.regions[0].id
    })
  }
})

export const selectViewMode = (state: RootState) => state.ui.viewMode
export const selectViewTopic = (state: RootState) => state.ui.selectedTopic
export const selectViewRegion = (state: RootState) => state.ui.selectedRegion

export default uiSlice.reducer
