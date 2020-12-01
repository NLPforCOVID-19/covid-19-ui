import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RegionId, Region, Topic } from '@src/types'
import { fetchMetaAndFirstEntries } from '@src/redux/asyncActions'
import { RootState } from '@src/redux'

interface State {
  regions: {
    byId: Record<RegionId, Region>
    allIds: RegionId[]
  }
  topics: {
    allIds: Topic[]
  }
  activeRegion: RegionId
  activeTopic: Topic
  loaded: boolean
}

const initialState: State = {
  regions: { byId: {}, allIds: [] },
  topics: { allIds: [] },
  activeRegion: '',
  activeTopic: '',
  loaded: false
}

const regionsTopicsSlice = createSlice({
  name: 'regionsTopics',
  initialState,
  reducers: {
    setActiveRegion: (state, action: PayloadAction<RegionId>) => {
      const target = action.payload
      if (!state.regions.allIds.includes(target)) {
        return
      }
      state.activeRegion = target
    },
    setActiveTopic: (state, action: PayloadAction<Topic>) => {
      const target = action.payload
      if (!state.topics.allIds.includes(target)) {
        return
      }
      state.activeTopic = target
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMetaAndFirstEntries.fulfilled, (state, action) => {
      const { regions, topics, activeTopic, activeRegion } = action.payload
      state.regions.allIds = regions.map((r) => r.id)
      for (const region of regions) {
        state.regions.byId[region.id] = region
      }
      state.topics.allIds = topics
      state.activeRegion = state.regions.allIds.includes(activeRegion) ? activeRegion : state.regions.allIds[0]
      state.activeTopic = state.topics.allIds.includes(activeTopic) ? activeTopic : state.topics.allIds[0]
      state.loaded = true
    })
  }
})

export const { setActiveRegion, setActiveTopic } = regionsTopicsSlice.actions

export const selectRegionTopicLoaded = (state: RootState) => state.regionsTopics.loaded
export const selectRegions = (state: RootState) => state.regionsTopics.regions
export const selectTopics = (state: RootState) => state.regionsTopics.topics.allIds
export const selectActive = (state: RootState) => {
  return {
    region: state.regionsTopics.activeRegion,
    topic: state.regionsTopics.activeTopic
  }
}

export default regionsTopicsSlice.reducer
