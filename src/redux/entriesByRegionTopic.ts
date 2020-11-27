import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Topic, Url } from './entries'
import { RegionId } from './regions'

interface StateForEachRegionTopic {
  entries: Url[]
  isNoMore: boolean
}

const createInitialStateForEachRegionTopic = (): StateForEachRegionTopic => {
  return {
    entries: [],
    isNoMore: false
  }
}

const initialState: Record<RegionId, Record<Topic, StateForEachRegionTopic>> = {}

interface LinkEntryPayload {
  region: RegionId
  topic: Topic
  url: Url
}

interface SetNoMorePayload {
  region: RegionId
  topic: Topic
}

const entriesByRegionTopicSlice = createSlice({
  name: 'entriesByRegionTopic',
  initialState,
  reducers: {
    linkEntryToRegionTopic(state, action: PayloadAction<LinkEntryPayload>) {
      const { region, topic, url } = action.payload
      if (!state[region]) {
        state[region] = {}
      }
      if (!state[region][topic]) {
        state[region][topic] = createInitialStateForEachRegionTopic()
      }
      state[region][topic].entries.push(url)
    },
    setNoMoreToTrue(state, action: PayloadAction<SetNoMorePayload>) {
      const { region, topic } = action.payload
      if (!state[region]) {
        state[region] = {}
      }
      if (!state[region][topic]) {
        state[region][topic] = createInitialStateForEachRegionTopic()
      }
      state[region][topic].isNoMore = true
    }
  }
})

export const { linkEntryToRegionTopic, setNoMoreToTrue } = entriesByRegionTopicSlice.actions

export default entriesByRegionTopicSlice.reducer
